import { useState, useRef } from 'react';
import { Download, Upload, Trash2, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { useAppStore } from '../store/appStore';

export default function BackupPage() {
  const { exportData, importData, resetAll, resetProgress, resetReferences, resetProjects, resetAISettings, references, projects, dayProgress, creativeIdeas } = useAppStore();
  const [importStatus, setImportStatus] = useState<{ success: boolean; message: string } | null>(null);
  const [confirmReset, setConfirmReset] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleExport = () => {
    const json = exportData();
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ae-mastery-backup-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const text = ev.target?.result as string;
      const success = importData(text);
      setImportStatus({
        success,
        message: success
          ? `Successfully imported backup file.`
          : 'Failed to import. Make sure this is a valid AE Mastery backup JSON file.',
      });
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  const handleReset = (type: string) => {
    switch (type) {
      case 'all': resetAll(); break;
      case 'progress': resetProgress(); break;
      case 'references': resetReferences(); break;
      case 'projects': resetProjects(); break;
      case 'ai': resetAISettings(); break;
    }
    setConfirmReset(null);
  };

  const completedDays = Object.values(dayProgress).filter(d => d.completedAt).length;

  return (
    <div className="p-4 lg:p-6 pb-24 lg:pb-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Backup & Data Management</h1>
        <p className="text-gray-400 text-sm mt-1">Export, import, and manage your learning data</p>
      </div>

      {/* Data summary */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
        <h2 className="font-semibold text-white mb-4">Current Data Summary</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {[
            { label: 'Days Completed', value: completedDays, total: 90 },
            { label: 'References', value: references.length },
            { label: 'Projects', value: projects.length },
            { label: 'Ideas', value: creativeIdeas.length },
          ].map(item => (
            <div key={item.label} className="bg-gray-800 rounded-lg p-3 text-center">
              <div className="text-2xl font-bold text-purple-400">
                {item.value}{item.total ? `/${item.total}` : ''}
              </div>
              <div className="text-xs text-gray-400 mt-1">{item.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Export */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
        <h2 className="font-semibold text-white mb-2">Export Backup</h2>
        <p className="text-gray-400 text-sm mb-4">
          Export all your progress, references, projects, and settings as a JSON file. Save this regularly to avoid losing data.
        </p>
        <button
          onClick={handleExport}
          className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-5 py-2.5 rounded-lg text-sm font-medium transition-colors"
        >
          <Download size={16} /> Export All Data as JSON
        </button>
      </div>

      {/* Import */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
        <h2 className="font-semibold text-white mb-2">Import Backup</h2>
        <p className="text-gray-400 text-sm mb-4">
          Import a previously exported JSON backup file. This will overwrite your current data.
        </p>
        <input
          ref={fileInputRef}
          type="file"
          accept=".json"
          onChange={handleImport}
          className="hidden"
        />
        <button
          onClick={() => fileInputRef.current?.click()}
          className="flex items-center gap-2 bg-blue-700 hover:bg-blue-600 text-white px-5 py-2.5 rounded-lg text-sm font-medium transition-colors"
        >
          <Upload size={16} /> Import JSON Backup
        </button>

        {importStatus && (
          <div className={`mt-3 flex items-start gap-2 px-4 py-3 rounded-lg text-sm border ${
            importStatus.success
              ? 'bg-green-900/20 border-green-700/40 text-green-300'
              : 'bg-red-900/20 border-red-700/40 text-red-300'
          }`}>
            {importStatus.success ? <CheckCircle2 size={16} /> : <AlertTriangle size={16} />}
            {importStatus.message}
          </div>
        )}
      </div>

      {/* Reset options */}
      <div className="bg-gray-900 border border-red-900/40 rounded-xl p-5">
        <div className="flex items-center gap-2 mb-2">
          <AlertTriangle size={16} className="text-red-400" />
          <h2 className="font-semibold text-white">Reset Options</h2>
        </div>
        <p className="text-gray-400 text-sm mb-4">
          Reset data permanently. This cannot be undone. Export a backup first.
        </p>
        <div className="space-y-3">
          {[
            { id: 'progress', label: 'Reset Progress Only', desc: 'Clears day completions, streak, and notes. Keeps references and projects.' },
            { id: 'references', label: 'Reset Reference Vault', desc: 'Deletes all saved references.' },
            { id: 'projects', label: 'Reset Project Gallery', desc: 'Deletes all logged projects.' },
            { id: 'ai', label: 'Reset AI Settings', desc: 'Clears all AI provider configuration.' },
            { id: 'all', label: 'Reset Everything', desc: 'Deletes all data and resets to day 1.', danger: true },
          ].map(option => (
            <div key={option.id} className={`flex items-center justify-between p-3 rounded-lg border ${
              option.danger ? 'border-red-800/60 bg-red-950/20' : 'border-gray-700 bg-gray-800/40'
            }`}>
              <div>
                <div className={`text-sm font-medium ${option.danger ? 'text-red-300' : 'text-gray-200'}`}>{option.label}</div>
                <div className="text-xs text-gray-500">{option.desc}</div>
              </div>
              {confirmReset === option.id ? (
                <div className="flex gap-2">
                  <button onClick={() => handleReset(option.id)}
                    className="bg-red-600 hover:bg-red-700 text-white px-3 py-1.5 rounded text-xs font-medium">
                    Confirm
                  </button>
                  <button onClick={() => setConfirmReset(null)}
                    className="bg-gray-700 text-gray-300 px-3 py-1.5 rounded text-xs">
                    Cancel
                  </button>
                </div>
              ) : (
                <button onClick={() => setConfirmReset(option.id)}
                  className={`text-xs px-3 py-1.5 rounded font-medium ${
                    option.danger ? 'bg-red-900/60 text-red-300 hover:bg-red-900' : 'bg-gray-700 text-gray-400 hover:text-gray-200'
                  }`}>
                  <Trash2 size={12} className="inline mr-1" />
                  Reset
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Tips */}
      <div className="bg-blue-950/20 border border-blue-800/40 rounded-xl p-4">
        <h3 className="text-sm font-semibold text-blue-300 mb-2">💡 Data Tips</h3>
        <ul className="space-y-1 text-sm text-blue-200/70">
          <li>• Export a backup at the end of each week</li>
          <li>• Store backup files in your AE project folder</li>
          <li>• All data is stored locally in your browser — clearing browser data will erase it</li>
          <li>• Import your backup on any device to continue your progress</li>
          <li>• API keys in session storage are cleared when you close the tab</li>
        </ul>
      </div>
    </div>
  );
}
