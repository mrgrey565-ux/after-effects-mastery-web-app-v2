import ReactMarkdown from 'react-markdown';
import { useState } from 'react';
import { Send, Bot, Copy } from 'lucide-react';
import { useAppStore, getApiKey } from '../store/appStore';
import { getDayData } from '../data/curriculum';

const promptTemplates = [
  {
    id: 'daily-coach',
    label: '📅 Daily Plan Adjuster',
    template: (vars: Record<string, string>) =>
      `You are my After Effects learning coach. I am an absolute beginner following a 90-day mastery plan. I have ${vars.time || '75'} minutes today. Current day: ${vars.day}. Current focus: ${vars.focus}. Create a focused consume-first-then-recreate plan with exact search keywords and one export goal.`,
    vars: ['time'],
  },
  {
    id: 'deconstructor',
    label: '🔍 Effect Deconstructor',
    template: (vars: Record<string, string>) =>
      `Break down this reference/effect for an After Effects learner: ${vars.description || '[describe the effect]'}. Explain likely layers, AE tools, effects, timing, sound design, search keywords, and step-by-step recreation plan. Include beginner and intermediate versions.`,
    vars: ['description'],
  },
  {
    id: 'keywords',
    label: '🔎 Keyword Generator',
    template: (vars: Record<string, string>) =>
      `I want to learn this effect/style in After Effects: ${vars.effect || '[effect name]'}. Give exact search keywords for YouTube, Adobe Help, Behance, Dribbble, Pinterest, TikTok/Reels, and plugin-free alternatives.`,
    vars: ['effect'],
  },
  {
    id: 'critique',
    label: '🎯 Self-Critique Coach',
    template: (vars: Record<string, string>) =>
      `Critique my After Effects project. Goal: ${vars.goal || '[project goal]'}. Tools used: ${vars.tools || '[tools]'}. What I struggled with: ${vars.struggles || '[struggles]'}. Score 1–5 for timing, smoothness, design, clarity, creativity, technical execution, sound, export quality. Then give the next 3 fixes.`,
    vars: ['goal', 'tools', 'struggles'],
  },
  {
    id: 'idea-mixer',
    label: '💡 Idea Mixer',
    template: (vars: Record<string, string>) =>
      `Combine these references into 5 new beginner-to-intermediate After Effects edit ideas: ${vars.references || '[describe references]'}. Each idea should include hook, visual style, tools needed, effect list, sound idea, difficulty, and exact keywords to learn it.`,
    vars: ['references'],
  },
  {
    id: 'weak-tool',
    label: '🔧 Weak Tool Repair',
    template: (vars: Record<string, string>) =>
      `My weak After Effects tool is ${vars.tool || '[tool name]'}. My confidence is ${vars.confidence || '2'}/5. Create a 3-day repair plan with consume tasks, exact searches, recreations, variations, and tests to prove I understand it.`,
    vars: ['tool', 'confidence'],
  },
  {
    id: 'portfolio',
    label: '🏆 Portfolio Planner',
    template: (vars: Record<string, string>) =>
      `Create a portfolio-ready After Effects project plan for this style: ${vars.style || '[style]'}. Include brief, story, scene list, tools, effects, search keywords, asset list, timeline, critique rubric, and export formats.`,
    vars: ['style'],
  },
  {
    id: 'showreel',
    label: '🎬 Showreel Critique Coach',
    template: (vars: Record<string, string>) =>
      `Critique my After Effects showreel/demo reel plan: ${vars.plan || '[describe your reel content]'}. Evaluate pacing, clip selection, variety of skills shown, opening strength, sound design approach, and overall impact. Suggest the top 3 improvements.`,
    vars: ['plan'],
  },
  {
    id: 'week-review',
    label: '📊 Week/Month Review Coach',
    template: (vars: Record<string, string>) =>
      `I just finished Week/Month ${vars.period || '[week or month number]'} of my After Effects learning. Projects completed: ${vars.projects || '[list projects]'}. Skills practiced: ${vars.skills || '[list skills]'}. Biggest struggles: ${vars.struggles || '[struggles]'}. Analyze my progress, identify patterns in my weaknesses, and create a focused improvement plan for next week.`,
    vars: ['period', 'projects', 'skills', 'struggles'],
  },
  {
    id: 'recreate-checklist',
    label: '✅ Recreate Checklist Generator',
    template: (vars: Record<string, string>) =>
      `Generate a step-by-step After Effects recreation checklist for this effect: ${vars.effect || '[effect description]'}. Break it down into: setup steps, key effects/tools, timing approach, and quality check criteria. Include common mistakes to avoid.`,
    vars: ['effect'],
  },
];

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export default function AICoach() {
  const { aiSettings, currentDay } = useAppStore();
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [templateVars, setTemplateVars] = useState<Record<string, string>>({});
  const [messages, setMessages] = useState<Message[]>([]);
  const [customPrompt, setCustomPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);

  const todayData = getDayData(currentDay);

  const isConfigured = !!(aiSettings.chatUrl || aiSettings.baseUrl) && !!aiSettings.selectedModel;

  const getBuiltPrompt = () => {
    const template = promptTemplates.find(t => t.id === selectedTemplate);
    if (!template) return customPrompt;

    const baseVars: Record<string, string> = {
      day: currentDay.toString(),
      focus: todayData?.focus || '',
      goal: todayData?.goal || '',
      tools: todayData?.tools.join(', ') || '',
      ...templateVars,
    };
    return template.template(baseVars);
  };

  const sendMessage = async () => {
    const prompt = getBuiltPrompt().trim();
    if (!prompt) return;

    const apiKey = getApiKey(aiSettings);
    if (!apiKey) {
      setError('No API key configured. Go to AI Settings to configure your provider.');
      return;
    }

    const userMsg: Message = { role: 'user', content: prompt };
    setMessages(prev => [...prev, userMsg]);
    setLoading(true);
    setError('');
    setCustomPrompt('');

    try {
      const chatUrl = aiSettings.chatUrl || `${aiSettings.baseUrl}/chat/completions`;
      const headers: Record<string, string> = { 'Content-Type': 'application/json' };

      if (aiSettings.authType === 'bearer') headers['Authorization'] = `Bearer ${apiKey}`;
      else if (aiSettings.authType === 'x-api-key') headers['x-api-key'] = apiKey;
      else if (aiSettings.authType === 'custom') headers[aiSettings.customAuthHeaderName] = apiKey;

      const allMessages = [
        { role: 'system', content: aiSettings.systemPrompt || 'You are an expert After Effects coach.' },
        ...messages,
        userMsg,
      ];

      const body = JSON.stringify({
        model: aiSettings.selectedModel,
        messages: allMessages,
        temperature: aiSettings.temperature,
        max_tokens: aiSettings.maxOutputTokens,
      });

      const res = await fetch(chatUrl, { method: 'POST', headers, body });
      if (!res.ok) {
        const errText = await res.text();
        throw new Error(`HTTP ${res.status}: ${errText.slice(0, 200)}`);
      }

      const data = await res.json();
      const content = data?.choices?.[0]?.message?.content
        || data?.output?.[0]?.content?.[0]?.text
        || data?.content?.[0]?.text
        || JSON.stringify(data);

      setMessages(prev => [...prev, { role: 'assistant', content }]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error occurred');
      setMessages(prev => prev.slice(0, -1)); // remove the user message on error
    } finally {
      setLoading(false);
    }
  };

  const copyMessage = (idx: number, content: string) => {
    navigator.clipboard.writeText(content);
    setCopiedIdx(idx);
    setTimeout(() => setCopiedIdx(null), 2000);
  };

  return (
    <div className="flex flex-col h-full p-4 lg:p-6 pb-24 lg:pb-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white">AI Coach</h1>
        <p className="text-gray-400 text-sm mt-1">
          {isConfigured
            ? `✅ Connected: ${aiSettings.providerName || aiSettings.selectedModel}`
            : '⚠️ Configure AI provider in AI Settings to use this feature. App works without AI.'}
        </p>
      </div>

      {/* Template picker */}
      <div className="mb-4">
        <div className="text-xs text-gray-400 mb-2 font-medium uppercase tracking-wide">Prompt Templates</div>
        <div className="flex flex-wrap gap-2">
          {promptTemplates.map(t => (
            <button
              key={t.id}
              onClick={() => { setSelectedTemplate(selectedTemplate === t.id ? null : t.id); setTemplateVars({}); }}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                selectedTemplate === t.id ? 'bg-purple-600 text-white' : 'bg-gray-800 text-gray-400 hover:text-white hover:bg-gray-700'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Template vars */}
      {selectedTemplate && (() => {
        const template = promptTemplates.find(t => t.id === selectedTemplate);
        if (!template || template.vars.length === 0) return null;
        return (
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-4 mb-4">
            <div className="text-xs text-gray-400 mb-3 font-medium">Fill in template variables:</div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
              {template.vars.map(v => (
                <div key={v}>
                  <label className="text-xs text-gray-400 block mb-1 capitalize">{v.replace(/_/g, ' ')}</label>
                  <input
                    type="text"
                    value={templateVars[v] || ''}
                    onChange={e => setTemplateVars({ ...templateVars, [v]: e.target.value })}
                    placeholder={`Enter ${v}...`}
                    className="w-full bg-gray-800 border border-gray-700 text-gray-200 px-3 py-2 rounded-lg text-sm focus:outline-none focus:border-purple-500"
                  />
                </div>
              ))}
            </div>
            <div className="mt-3">
              <div className="text-xs text-gray-500 mb-1">Preview:</div>
              <div className="text-xs text-gray-300 bg-gray-800 rounded p-2 max-h-24 overflow-y-auto">
                {getBuiltPrompt()}
              </div>
            </div>
          </div>
        );
      })()}

      {/* Messages */}
      <div className="flex-1 bg-gray-900 border border-gray-800 rounded-xl p-4 mb-4 overflow-y-auto space-y-4 min-h-[200px] max-h-[400px]">
        {messages.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <Bot size={32} className="mx-auto mb-2 opacity-50" />
            <div className="text-sm">Select a prompt template or type a custom question</div>
            {!isConfigured && (
              <div className="mt-3 text-xs text-orange-400">Configure AI provider in Settings to chat</div>
            )}
          </div>
        ) : (
          messages.map((msg, idx) => (
            <div key={idx} className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
              <div className={`w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center text-xs font-bold ${
                msg.role === 'user' ? 'bg-purple-600 text-white' : 'bg-gray-700 text-gray-300'
              }`}>
                {msg.role === 'user' ? 'You' : <Bot size={14} />}
              </div>
              <div className={`inline-block px-4 py-3 rounded-xl text-sm leading-relaxed overflow-x-auto ${
  msg.role === 'user'
    ? 'bg-purple-600 text-white whitespace-pre-wrap'
    : 'bg-gray-800 text-gray-200 w-full'
}`}>
  {msg.role === 'user' ? (
    msg.content
  ) : (
    <ReactMarkdown className="markdown-body">
      {msg.content}
    </ReactMarkdown>
  )}
</div>          <div className={`inline-block px-4 py-3 rounded-xl text-sm leading-relaxed whitespace-pre-wrap ${
                {msg.role === 'assistant' && (
                  <div className="flex gap-2 mt-1">
                    <button
                      onClick={() => copyMessage(idx, msg.content)}
                      className="text-xs text-gray-500 hover:text-gray-300 flex items-center gap-1"
                    >
                      <Copy size={10} /> {copiedIdx === idx ? 'Copied!' : 'Copy'}
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
        {loading && (
          <div className="flex gap-3">
            <div className="w-7 h-7 rounded-full bg-gray-700 flex items-center justify-center">
              <Bot size={14} className="text-gray-300" />
            </div>
            <div className="bg-gray-800 px-4 py-3 rounded-xl">
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Error */}
      {error && (
        <div className="bg-red-900/30 border border-red-700/40 text-red-300 text-sm px-4 py-3 rounded-lg mb-4">
          {error}
        </div>
      )}

      {/* Input */}
      <div className="flex gap-3">
        <textarea
          value={selectedTemplate ? getBuiltPrompt() : customPrompt}
          onChange={e => {
            if (!selectedTemplate) setCustomPrompt(e.target.value);
          }}
          onKeyDown={e => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              sendMessage();
            }
          }}
          placeholder={isConfigured ? 'Type a question or select a template above...' : 'Configure AI provider in Settings first...'}
          disabled={!isConfigured}
          className="flex-1 bg-gray-900 border border-gray-700 text-gray-200 px-4 py-3 rounded-xl text-sm focus:outline-none focus:border-purple-500 disabled:opacity-50 disabled:cursor-not-allowed resize-none min-h-[80px]"
        />
        <button
          onClick={sendMessage}
          disabled={!isConfigured || loading}
          className="self-end bg-purple-600 hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed text-white p-3 rounded-xl transition-colors"
        >
          <Send size={18} />
        </button>
      </div>

      {messages.length > 0 && (
        <button
          onClick={() => setMessages([])}
          className="mt-2 text-xs text-gray-500 hover:text-gray-300"
        >
          Clear conversation
        </button>
      )}
    </div>
  );
}
