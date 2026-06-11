import { useState } from 'react';
import { Search, ChevronDown, ChevronUp } from 'lucide-react';
import { useAppStore } from '../store/appStore';
import { toolCategories, allTools } from '../data/tools';
import type { ToolStatus } from '../types';

const statusConfig: Record<ToolStatus, { label: string; color: string; bg: string; score: number }> = {
  'not-started': { label: 'Not Started', color: 'text-gray-400', bg: 'bg-gray-800', score: 0 },
  watched: { label: 'Watched', color: 'text-blue-400', bg: 'bg-blue-900/40', score: 1 },
  recreated: { label: 'Recreated', color: 'text-purple-400', bg: 'bg-purple-900/40', score: 2 },
  'used-independently': { label: 'Used Independently', color: 'text-pink-400', bg: 'bg-pink-900/40', score: 3 },
  'can-explain': { label: 'Can Explain/Teach', color: 'text-green-400', bg: 'bg-green-900/40', score: 4 },
};

const statusOrder: ToolStatus[] = ['not-started', 'watched', 'recreated', 'used-independently', 'can-explain'];

export default function ToolsPage() {
  const { toolMastery, updateToolStatus, updateToolConfidence, updateToolNotes } = useAppStore();
  const [search, setSearch] = useState('');
  const [collapsedCategories, setCollapsedCategories] = useState<Set<string>>(new Set());
  const [filterStatus, setFilterStatus] = useState<ToolStatus | 'all'>('all');
  const [editingTool, setEditingTool] = useState<string | null>(null);

  const toggleCategory = (cat: string) => {
    const next = new Set(collapsedCategories);
    if (next.has(cat)) next.delete(cat);
    else next.add(cat);
    setCollapsedCategories(next);
  };

  const filteredTools = allTools.filter(t => {
    if (search && !t.tool.toLowerCase().includes(search.toLowerCase())) return false;
    if (filterStatus !== 'all' && toolMastery[t.tool]?.status !== filterStatus) return false;
    return true;
  });

  // Calculate category stats
  const categoryStats = toolCategories.map(cat => {
    const catTools = allTools.filter(t => t.category === cat);
    const scores = catTools.map(t => statusConfig[toolMastery[t.tool]?.status || 'not-started'].score);
    const avg = scores.length > 0 ? scores.reduce((a, b) => a + b, 0) / scores.length : 0;
    const completed = catTools.filter(t => toolMastery[t.tool]?.status === 'can-explain').length;
    return { cat, avg, completed, total: catTools.length };
  });

  const overallScores = Object.values(toolMastery).map(t => statusConfig[t.status].score);
  const overallAvg = overallScores.length > 0 ? (overallScores.reduce((a, b) => a + b, 0) / overallScores.length).toFixed(2) : '0';
  const totalMastered = Object.values(toolMastery).filter(t => t.status === 'can-explain').length;

  return (
    <div className="p-4 lg:p-6 pb-24 lg:pb-6">
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white">Tools Mastery Matrix</h1>
          <p className="text-gray-400 text-sm mt-1">Track your AE skill progression</p>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-purple-400">{overallAvg}/4</div>
          <div className="text-xs text-gray-400">avg score · {totalMastered} mastered</div>
        </div>
      </div>

      {/* Category overview */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 mb-6">
        {categoryStats.map(({ cat, avg, completed, total }) => (
          <div key={cat} className="bg-gray-900 border border-gray-800 rounded-xl p-3">
            <div className="text-xs font-medium text-gray-300 mb-2 truncate">{cat}</div>
            <div className="flex items-center justify-between mb-1">
              <span className="text-lg font-bold text-white">{avg.toFixed(1)}<span className="text-xs text-gray-500">/4</span></span>
              <span className="text-xs text-gray-500">{completed}/{total}</span>
            </div>
            <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
                style={{ width: `${(avg / 4) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2 mb-4">
        <div className="relative flex-1 min-w-48">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search tools..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full bg-gray-900 border border-gray-700 text-gray-200 pl-9 pr-3 py-2 rounded-lg text-sm focus:outline-none focus:border-purple-500"
          />
        </div>
        <div className="flex flex-wrap gap-1">
          <button
            onClick={() => setFilterStatus('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium ${filterStatus === 'all' ? 'bg-purple-600 text-white' : 'bg-gray-800 text-gray-400'}`}
          >All</button>
          {statusOrder.map(s => (
            <button
              key={s}
              onClick={() => setFilterStatus(s)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium ${filterStatus === s ? `${statusConfig[s].bg} ${statusConfig[s].color}` : 'bg-gray-800 text-gray-400'}`}
            >
              {statusConfig[s].label}
            </button>
          ))}
        </div>
      </div>

      {/* Status legend */}
      <div className="flex flex-wrap gap-2 mb-6 text-xs">
        {statusOrder.map((s, i) => (
          <div key={s} className="flex items-center gap-1.5">
            <div className={`w-2 h-2 rounded-full ${['bg-gray-500', 'bg-blue-500', 'bg-purple-500', 'bg-pink-500', 'bg-green-500'][i]}`} />
            <span className="text-gray-400">{i}: {statusConfig[s].label}</span>
          </div>
        ))}
      </div>

      {/* Tool matrix by category */}
      <div className="space-y-4">
        {toolCategories.map(cat => {
          const catTools = filteredTools.filter(t => t.category === cat);
          if (catTools.length === 0) return null;
          const isCollapsed = collapsedCategories.has(cat);

          return (
            <div key={cat} className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
              <button
                onClick={() => toggleCategory(cat)}
                className="w-full flex items-center justify-between p-4 hover:bg-gray-800/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="font-semibold text-white text-sm">{cat}</span>
                  <span className="text-xs text-gray-500">{catTools.length} tools</span>
                </div>
                <div className="flex items-center gap-2">
                  {/* Mini progress bar */}
                  <div className="w-24 h-1.5 bg-gray-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
                      style={{ width: `${(categoryStats.find(s => s.cat === cat)?.avg || 0) / 4 * 100}%` }}
                    />
                  </div>
                  {isCollapsed ? <ChevronDown size={16} className="text-gray-400" /> : <ChevronUp size={16} className="text-gray-400" />}
                </div>
              </button>

              {!isCollapsed && (
                <div className="border-t border-gray-800">
                  {catTools.map((tool, idx) => {
                    const mastery = toolMastery[tool.tool] || { status: 'not-started' as ToolStatus, confidence: 0, notes: '' };
                    const config = statusConfig[mastery.status];
                    const isEditing = editingTool === tool.tool;

                    return (
                      <div
                        key={tool.tool}
                        className={`${idx > 0 ? 'border-t border-gray-800/60' : ''} hover:bg-gray-800/30 transition-colors`}
                      >
                        <div className="flex items-center gap-3 p-3">
                          {/* Tool name */}
                          <div className="flex-1 min-w-0">
                            <div className="text-sm text-gray-200 font-medium truncate">{tool.tool}</div>
                          </div>

                          {/* Status buttons */}
                          <div className="flex gap-1">
                            {statusOrder.map((s, si) => {
                              const dotColors = ['bg-gray-600', 'bg-blue-500', 'bg-purple-500', 'bg-pink-500', 'bg-green-500'];
                              const active = mastery.status === s;
                              return (
                                <button
                                  key={s}
                                  onClick={() => updateToolStatus(tool.tool, s)}
                                  title={statusConfig[s].label}
                                  className={`w-5 h-5 rounded-full transition-all ${
                                    active ? `${dotColors[si]} ring-2 ring-white/20 scale-110` : `${dotColors[si]} opacity-30 hover:opacity-70`
                                  }`}
                                />
                              );
                            })}
                          </div>

                          {/* Confidence */}
                          <div className="flex gap-0.5 ml-2">
                            {[1, 2, 3, 4, 5].map(v => (
                              <button
                                key={v}
                                onClick={() => updateToolConfidence(tool.tool, v === mastery.confidence ? 0 : v)}
                                className={`w-3 h-3 rounded-sm transition-colors ${
                                  mastery.confidence >= v ? 'bg-yellow-400' : 'bg-gray-700 hover:bg-gray-600'
                                }`}
                                title={`Confidence ${v}/5`}
                              />
                            ))}
                          </div>

                          {/* Edit notes toggle */}
                          <button
                            onClick={() => setEditingTool(isEditing ? null : tool.tool)}
                            className="text-xs text-gray-500 hover:text-gray-300 px-2 py-1 rounded"
                          >
                            {isEditing ? 'Done' : 'Note'}
                          </button>
                        </div>

                        {/* Status label */}
                        <div className="px-3 pb-1.5 flex items-center gap-2">
                          <span className={`text-xs ${config.color}`}>{config.label}</span>
                          {mastery.confidence > 0 && (
                            <span className="text-xs text-yellow-400">★ {mastery.confidence}/5</span>
                          )}
                        </div>

                        {/* Notes editor */}
                        {isEditing && (
                          <div className="px-3 pb-3">
                            <textarea
                              value={mastery.notes}
                              onChange={e => updateToolNotes(tool.tool, e.target.value)}
                              placeholder="Add notes about this tool..."
                              className="w-full bg-gray-800 border border-gray-700 text-gray-200 px-3 py-2 rounded text-xs focus:outline-none focus:border-purple-500 min-h-[60px] resize-y"
                            />
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
