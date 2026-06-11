import { useState } from 'react';
import { Eye, EyeOff, RefreshCw, Zap, AlertTriangle, ChevronDown, ChevronUp, Code } from 'lucide-react';
import { useAppStore, getApiKey } from '../store/appStore';

const parseCurl = (curl: string) => {
  const result: Record<string, string> = {};
  try {
    const urlMatch = curl.match(/curl\s+['"](https?:\/\/[^'"]+)['"]/i) || curl.match(/curl\s+(https?:\/\/\S+)/i);
    if (urlMatch) result.url = urlMatch[1];

    const headerMatches = [...curl.matchAll(/-H\s+['"]([^'"]+)['"]/gi)];
    for (const match of headerMatches) {
      const [name, ...valueParts] = match[1].split(':');
      const value = valueParts.join(':').trim();
      const lower = name.trim().toLowerCase();
      if (lower === 'authorization' && value.startsWith('Bearer ')) {
        result.apiKey = value.replace('Bearer ', '').trim();
        result.authType = 'bearer';
      } else if (lower === 'x-api-key') {
        result.apiKey = value.trim();
        result.authType = 'x-api-key';
      }
      if (lower === 'content-type') result.contentType = value.trim();
    }

    const bodyMatch = curl.match(/-d\s+['"](.+?)['"]\s*$/s) || curl.match(/--data\s+['"](.+?)['"]/s) || curl.match(/-d\s+'(\{.+\})'/s);
    if (bodyMatch) {
      try {
        const body = JSON.parse(bodyMatch[1].replace(/\\n/g, '').replace(/\\"/g, '"'));
        if (body.model) result.model = body.model;
        if (body.temperature !== undefined) result.temperature = body.temperature.toString();
        if (body.max_tokens) result.maxTokens = body.max_tokens.toString();
        if (body.max_output_tokens) result.maxTokens = body.max_output_tokens.toString();
        if (body.max_completion_tokens) result.maxTokens = body.max_completion_tokens.toString();
      } catch {}
    }
  } catch {}
  return result;
};

export default function AISettingsPage() {
  const { aiSettings, updateAISettings, setAvailableModels } = useAppStore();
  const [showKey, setShowKey] = useState(false);
  const [tempKey, setTempKey] = useState('');
  const [curlInput, setCurlInput] = useState('');
  const [showCurlImport, setShowCurlImport] = useState(false);
  const [curlError, setCurlError] = useState('');
  const [fetchingModels, setFetchingModels] = useState(false);
  const [modelError, setModelError] = useState('');
  const [testing, setTesting] = useState(false);
  const [testResult, setTestResult] = useState<{ success: boolean; message: string; latency?: number; raw?: string } | null>(null);
  const [showRaw, setShowRaw] = useState(false);
  const [customModelPath, setCustomModelPath] = useState('');



  const handleCurlImport = () => {
    setCurlError('');
    const parsed = parseCurl(curlInput);
    if (!parsed.url && !curlInput.includes('curl')) {
      setCurlError('Could not find a valid URL in the cURL command. Check the format.');
      return;
    }
    const updates: Partial<typeof aiSettings> = { rawCurl: curlInput };
    if (parsed.url) updates.chatUrl = parsed.url;
    if (parsed.apiKey) {
      if (aiSettings.apiKeyStorage === 'session') {
        updateAISettings({ ...updates, apiKeyStorage: 'session' });
        setTempKey(parsed.apiKey);
        updateAISettings({ apiKey: parsed.apiKey });
      } else {
        updates.apiKey = parsed.apiKey;
      }
    }
    if (parsed.authType) updates.authType = parsed.authType as typeof aiSettings.authType;
    if (parsed.model) updates.selectedModel = parsed.model;
    if (parsed.temperature) updates.temperature = parseFloat(parsed.temperature);
    if (parsed.maxTokens) updates.maxOutputTokens = parseInt(parsed.maxTokens);
    updateAISettings(updates);
    setShowCurlImport(false);
    setCurlInput('');
  };

  const fetchModels = async () => {
    setFetchingModels(true);
    setModelError('');
    try {
      const url = aiSettings.modelListUrl || `${aiSettings.baseUrl}/models`;
      const apiKey = getApiKey(aiSettings) || aiSettings.apiKey;
      const headers: Record<string, string> = {};
      if (aiSettings.authType === 'bearer') headers['Authorization'] = `Bearer ${apiKey}`;
      else if (aiSettings.authType === 'x-api-key') headers['x-api-key'] = apiKey;
      else if (aiSettings.authType === 'custom') headers[aiSettings.customAuthHeaderName] = apiKey;

      const res = await fetch(url, { method: aiSettings.modelFetchMethod, headers });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();

      let models: string[] = [];
      const path = customModelPath || aiSettings.modelResponsePath;

      if (Array.isArray(data) && data.every(i => typeof i === 'string')) {
        models = data;
      } else if (data?.data?.length) {
        models = data.data.map((m: Record<string, string>) => m.id || m.name || m);
      } else if (data?.models?.length) {
        models = data.models.map((m: Record<string, string>) => m.id || m.name || m);
      } else {
        // Try custom path
        if (path.includes('[]')) {
          const parts = path.split('[]');
          let current = data;
          for (const part of parts[0].split('.').filter(Boolean)) {
            current = current?.[part];
          }
          if (Array.isArray(current)) {
            const field = parts[1]?.replace('.', '') || 'id';
            models = current.map((m: Record<string, string>) => m[field] || m.id || m.name || String(m));
          }
        }
      }

      if (models.length === 0) {
        setModelError('No models found. Try setting a custom response path (e.g., data[].id).\n\nRaw response: ' + JSON.stringify(data).slice(0, 300));
      } else {
        setAvailableModels(models);
        if (models.length > 0 && !aiSettings.selectedModel) {
          updateAISettings({ selectedModel: models[0] });
        }
      }
    } catch (e) {
      setModelError(e instanceof Error ? e.message : 'Failed to fetch models');
    } finally {
      setFetchingModels(false);
    }
  };

  const testConnection = async () => {
    setTesting(true);
    setTestResult(null);
    const start = Date.now();
    try {
      const chatUrl = aiSettings.chatUrl || `${aiSettings.baseUrl}/chat/completions`;
      const apiKey = getApiKey(aiSettings) || aiSettings.apiKey;
      const headers: Record<string, string> = { 'Content-Type': 'application/json' };
      if (aiSettings.authType === 'bearer') headers['Authorization'] = `Bearer ${apiKey}`;
      else if (aiSettings.authType === 'x-api-key') headers['x-api-key'] = apiKey;
      else if (aiSettings.authType === 'custom') headers[aiSettings.customAuthHeaderName] = apiKey;

      const body = JSON.stringify({
        model: aiSettings.selectedModel,
        messages: [
          { role: 'system', content: 'You are a helpful assistant.' },
          { role: 'user', content: aiSettings.testPrompt || 'Reply with exactly: AI connection working.' }
        ],
        max_tokens: 50,
        temperature: 0,
      });

      const res = await fetch(chatUrl, { method: 'POST', headers, body });
      const latency = Date.now() - start;
      const text = await res.text();

      if (!res.ok) {
        setTestResult({ success: false, message: `HTTP ${res.status}: ${text.slice(0, 200)}`, latency, raw: text });
      } else {
        const data = JSON.parse(text);
        const content = data?.choices?.[0]?.message?.content || data?.output?.[0]?.content?.[0]?.text || text;
        setTestResult({ success: true, message: content, latency, raw: text });
      }
    } catch (e) {
      setTestResult({ success: false, message: e instanceof Error ? e.message : 'Connection failed', latency: Date.now() - start });
    } finally {
      setTesting(false);
    }
  };

  const inputCls = "w-full bg-gray-800 border border-gray-700 text-gray-200 px-3 py-2 rounded-lg text-sm focus:outline-none focus:border-purple-500";
  const labelCls = "text-xs text-gray-400 block mb-1";

  return (
    <div className="p-4 lg:p-6 pb-24 lg:pb-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">AI Provider Settings</h1>
        <p className="text-gray-400 text-sm mt-1">Configure your custom AI API for the AI Coach feature</p>
      </div>

      {/* Security warning */}
      <div className="bg-orange-950/30 border border-orange-700/40 rounded-xl p-4 flex items-start gap-3">
        <AlertTriangle size={16} className="text-orange-400 flex-shrink-0 mt-0.5" />
        <div className="text-sm text-orange-200">
          <strong>Security Notice:</strong> Never share API keys. Browser-stored keys are accessible to JavaScript running on the same page. Use session-only storage when possible, or environment variables for production deployments.
        </div>
      </div>

      {/* Provider info */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-5 space-y-4">
        <h2 className="font-semibold text-white">Provider Configuration</h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div>
            <label className={labelCls}>Provider Name</label>
            <input type="text" value={aiSettings.providerName}
              onChange={e => updateAISettings({ providerName: e.target.value })}
              placeholder="e.g. OpenAI, Claude, Groq, Local LLM" className={inputCls} />
          </div>
          <div>
            <label className={labelCls}>API Style</label>
            <select value={aiSettings.apiStyle} onChange={e => updateAISettings({ apiStyle: e.target.value as typeof aiSettings.apiStyle })} className={inputCls}>
              <option value="openai-chat">OpenAI-compatible Chat Completions</option>
              <option value="openai-responses">OpenAI Responses API style</option>
              <option value="custom-curl">Custom (cURL imported)</option>
            </select>
          </div>
          <div>
            <label className={labelCls}>Base URL</label>
            <input type="url" value={aiSettings.baseUrl}
              onChange={e => updateAISettings({ baseUrl: e.target.value })}
              placeholder="https://api.openai.com/v1" className={inputCls} />
          </div>
          <div>
            <label className={labelCls}>Chat/Completions URL (overrides base + /chat/completions)</label>
            <input type="url" value={aiSettings.chatUrl}
              onChange={e => updateAISettings({ chatUrl: e.target.value })}
              placeholder="Optional override URL" className={inputCls} />
          </div>
        </div>

        {/* Auth */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 pt-2 border-t border-gray-800">
          <div>
            <label className={labelCls}>Auth Type</label>
            <select value={aiSettings.authType} onChange={e => updateAISettings({ authType: e.target.value as typeof aiSettings.authType })} className={inputCls}>
              <option value="bearer">Bearer token (Authorization: Bearer ...)</option>
              <option value="x-api-key">x-api-key header</option>
              <option value="custom">Custom header</option>
            </select>
          </div>
          {aiSettings.authType === 'custom' && (
            <div>
              <label className={labelCls}>Custom Header Name</label>
              <input type="text" value={aiSettings.customAuthHeaderName}
                onChange={e => updateAISettings({ customAuthHeaderName: e.target.value })}
                placeholder="X-Custom-Auth" className={inputCls} />
            </div>
          )}
          <div>
            <label className={labelCls}>API Key Storage</label>
            <select value={aiSettings.apiKeyStorage} onChange={e => updateAISettings({ apiKeyStorage: e.target.value as typeof aiSettings.apiKeyStorage })} className={inputCls}>
              <option value="session">Session only (cleared on refresh — safer)</option>
              <option value="local">Local device storage (persisted — less safe)</option>
              <option value="none">Don't store (enter key each session)</option>
            </select>
          </div>
          <div>
            <label className={labelCls}>API Key</label>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <input
                  type={showKey ? 'text' : 'password'}
                  value={tempKey || (aiSettings.apiKeyStorage === 'session' ? '' : aiSettings.apiKey)}
                  onChange={e => {
                    setTempKey(e.target.value);
                    updateAISettings({ apiKey: e.target.value });
                  }}
                  placeholder="Enter API key..."
                  className={`${inputCls} pr-10`}
                />
                <button onClick={() => setShowKey(!showKey)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                  {showKey ? <EyeOff size={14} /> : <Eye size={14} />}
                </button>
              </div>
            </div>
            {aiSettings.apiKeyStorage === 'session' && (
              <div className="text-xs text-orange-400 mt-1">Session only — will clear on page refresh</div>
            )}
          </div>
        </div>
      </div>

      {/* Models */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-5 space-y-4">
        <h2 className="font-semibold text-white">Model Configuration</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div>
            <label className={labelCls}>Model List URL</label>
            <input type="url" value={aiSettings.modelListUrl}
              onChange={e => updateAISettings({ modelListUrl: e.target.value })}
              placeholder="e.g. https://api.openai.com/v1/models" className={inputCls} />
          </div>
          <div>
            <label className={labelCls}>Model Fetch Method</label>
            <select value={aiSettings.modelFetchMethod} onChange={e => updateAISettings({ modelFetchMethod: e.target.value as 'GET' | 'POST' })} className={inputCls}>
              <option value="GET">GET</option>
              <option value="POST">POST</option>
            </select>
          </div>
          <div>
            <label className={labelCls}>Model Response Path (e.g. data[].id)</label>
            <input type="text" value={customModelPath || aiSettings.modelResponsePath}
              onChange={e => { setCustomModelPath(e.target.value); updateAISettings({ modelResponsePath: e.target.value }); }}
              placeholder="data[].id or models[].name" className={inputCls} />
          </div>
          <div>
            <label className={labelCls}>Selected Model</label>
            <div className="flex gap-2">
              {aiSettings.availableModels.length > 0 ? (
                <select value={aiSettings.selectedModel}
                  onChange={e => updateAISettings({ selectedModel: e.target.value })}
                  className={`${inputCls} flex-1`}>
                  <option value="">Select model...</option>
                  {aiSettings.availableModels.map(m => <option key={m} value={m}>{m}</option>)}
                </select>
              ) : (
                <input type="text" value={aiSettings.selectedModel}
                  onChange={e => updateAISettings({ selectedModel: e.target.value })}
                  placeholder="Enter model name manually..." className={`${inputCls} flex-1`} />
              )}
              <button onClick={fetchModels} disabled={fetchingModels}
                className="flex items-center gap-1 bg-blue-700 hover:bg-blue-600 disabled:opacity-50 text-white px-3 py-2 rounded-lg text-sm">
                <RefreshCw size={14} className={fetchingModels ? 'animate-spin' : ''} />
                {fetchingModels ? 'Fetching...' : 'Fetch'}
              </button>
            </div>
          </div>
        </div>
        {modelError && (
          <div className="bg-red-900/30 border border-red-700/40 text-red-300 text-xs px-3 py-2 rounded-lg whitespace-pre-wrap">
            {modelError}
          </div>
        )}
        {aiSettings.availableModels.length > 0 && (
          <div className="text-xs text-green-400">✅ {aiSettings.availableModels.length} models loaded</div>
        )}
      </div>

      {/* Generation params */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-5 space-y-4">
        <h2 className="font-semibold text-white">Generation Parameters</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <label className={labelCls}>Temperature: {aiSettings.temperature}</label>
            <input type="range" min="0" max="2" step="0.05" value={aiSettings.temperature}
              onChange={e => updateAISettings({ temperature: parseFloat(e.target.value) })}
              className="w-full accent-purple-500 mb-1" />
            <div className="flex justify-between text-xs text-gray-500">
              <span>0 (precise)</span><span>1 (balanced)</span><span>2 (creative)</span>
            </div>
          </div>

          <div>
            <label className={labelCls}>Max Context Tokens: {aiSettings.maxContextTokens.toLocaleString()}</label>
            <div className="flex gap-2">
              <input type="range" min="1000" max="1000000" step="1000" value={aiSettings.maxContextTokens}
                onChange={e => updateAISettings({ maxContextTokens: parseInt(e.target.value) })}
                className="flex-1 accent-purple-500" />
              <input type="number" min="1000" max="1000000" value={aiSettings.maxContextTokens}
                onChange={e => updateAISettings({ maxContextTokens: Math.max(1000, Math.min(1000000, parseInt(e.target.value) || 1000)) })}
                className="w-28 bg-gray-800 border border-gray-700 text-gray-200 px-2 py-1 rounded text-sm text-right focus:outline-none focus:border-purple-500" />
            </div>
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>1K</span><span>500K</span><span>1M</span>
            </div>
          </div>

          <div>
            <label className={labelCls}>Max Output Tokens: {aiSettings.maxOutputTokens.toLocaleString()}</label>
            <div className="flex gap-2">
              <input type="range" min="256" max="100000" step="256" value={aiSettings.maxOutputTokens}
                onChange={e => updateAISettings({ maxOutputTokens: parseInt(e.target.value) })}
                className="flex-1 accent-purple-500" />
              <input type="number" min="256" max="100000" value={aiSettings.maxOutputTokens}
                onChange={e => updateAISettings({ maxOutputTokens: Math.max(256, Math.min(100000, parseInt(e.target.value) || 256)) })}
                className="w-28 bg-gray-800 border border-gray-700 text-gray-200 px-2 py-1 rounded text-sm text-right focus:outline-none focus:border-purple-500" />
            </div>
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>256</span><span>50K</span><span>100K</span>
            </div>
          </div>
        </div>
      </div>

      {/* System prompt */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-5 space-y-3">
        <h2 className="font-semibold text-white">System Prompt</h2>
        <textarea value={aiSettings.systemPrompt}
          onChange={e => updateAISettings({ systemPrompt: e.target.value })}
          className="w-full bg-gray-800 border border-gray-700 text-gray-200 px-3 py-2 rounded-lg text-sm focus:outline-none focus:border-purple-500 min-h-[100px] resize-y" />
      </div>

      {/* cURL Import */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
        <button onClick={() => setShowCurlImport(!showCurlImport)}
          className="flex items-center gap-2 font-semibold text-white w-full text-left">
          <Code size={16} className="text-purple-400" />
          Import from cURL
          {showCurlImport ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>
        {showCurlImport && (
          <div className="mt-4 space-y-3">
            <p className="text-sm text-gray-400">
              Paste a cURL command from your AI provider's API documentation. The parser will extract the URL, auth headers, model, and other settings.
            </p>
            <textarea value={curlInput} onChange={e => setCurlInput(e.target.value)}
              placeholder={`curl https://api.openai.com/v1/chat/completions \\\n  -H "Content-Type: application/json" \\\n  -H "Authorization: Bearer sk-..." \\\n  -d '{"model": "gpt-4", "messages": [...]}'`}
              className="w-full bg-gray-800 border border-gray-700 text-gray-200 px-3 py-2 rounded-lg text-sm focus:outline-none focus:border-purple-500 min-h-[120px] font-mono resize-y" />
            {curlError && <div className="text-red-400 text-xs">{curlError}</div>}
            <div className="flex gap-2">
              <button onClick={handleCurlImport} className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm">
                Parse & Import
              </button>
              <button onClick={() => { setShowCurlImport(false); setCurlInput(''); setCurlError(''); }}
                className="bg-gray-700 text-gray-300 px-4 py-2 rounded-lg text-sm">
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Test connection */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-5 space-y-4">
        <h2 className="font-semibold text-white">Test Connection</h2>
        <div>
          <label className={labelCls}>Test Prompt</label>
          <input type="text" value={aiSettings.testPrompt}
            onChange={e => updateAISettings({ testPrompt: e.target.value })}
            className={inputCls} />
        </div>
        <button onClick={testConnection} disabled={testing}
          className="flex items-center gap-2 bg-green-700 hover:bg-green-600 disabled:opacity-50 text-white px-4 py-2 rounded-lg text-sm font-medium">
          <Zap size={14} className={testing ? 'animate-pulse' : ''} />
          {testing ? 'Testing...' : 'Test AI Connection'}
        </button>

        {testResult && (
          <div className={`border rounded-xl p-4 ${testResult.success ? 'bg-green-900/20 border-green-700/40' : 'bg-red-900/20 border-red-700/40'}`}>
            <div className={`font-medium text-sm mb-1 ${testResult.success ? 'text-green-400' : 'text-red-400'}`}>
              {testResult.success ? '✅ Connection Successful' : '❌ Connection Failed'}
            </div>
            <div className="text-sm text-gray-300 mb-2">{testResult.message}</div>
            {testResult.latency && (
              <div className="text-xs text-gray-400">Latency: {testResult.latency}ms</div>
            )}
            {testResult.raw && (
              <div className="mt-2">
                <button onClick={() => setShowRaw(!showRaw)} className="text-xs text-gray-400 hover:text-gray-300 flex items-center gap-1">
                  {showRaw ? <ChevronUp size={12} /> : <ChevronDown size={12} />} Raw response
                </button>
                {showRaw && (
                  <pre className="mt-2 text-xs text-gray-400 bg-gray-800 rounded p-2 overflow-x-auto max-h-40">
                    {JSON.stringify(JSON.parse(testResult.raw), null, 2)}
                  </pre>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
