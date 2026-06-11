import { useState } from 'react';
import { Plus, Trash2, Edit3, Star, X } from 'lucide-react';
import { useAppStore } from '../store/appStore';
import type { ProjectItem, ProjectType } from '../types';

const projectTypes: { value: ProjectType; label: string; color: string }[] = [
  { value: 'micro-recreation', label: 'Micro Recreation', color: 'bg-gray-700 text-gray-300' },
  { value: 'mini-project', label: 'Mini Project', color: 'bg-green-800 text-green-300' },
  { value: 'portfolio-project', label: 'Portfolio Project', color: 'bg-purple-800 text-purple-300' },
  { value: 'showreel', label: 'Showreel', color: 'bg-yellow-800 text-yellow-300' },
];

const rubricFields = [
  { key: 'timingRating', label: 'Timing' },
  { key: 'smoothnessRating', label: 'Smoothness' },
  { key: 'designRating', label: 'Design' },
  { key: 'clarityRating', label: 'Clarity' },
  { key: 'creativityRating', label: 'Creativity' },
  { key: 'technicalRating', label: 'Technical' },
  { key: 'soundRating', label: 'Sound' },
  { key: 'exportQualityRating', label: 'Export Quality' },
] as const;

const emptyProject = (): Omit<ProjectItem, 'id'> => ({
  name: '', date: new Date().toISOString().split('T')[0],
  relatedDays: [], type: 'mini-project',
  toolsUsed: [], consumedSources: '', recreatedWhat: '',
  variationMade: '', exportLinkOrPath: '', selfRating: 0,
  timingRating: 0, smoothnessRating: 0, designRating: 0,
  clarityRating: 0, creativityRating: 0, technicalRating: 0,
  soundRating: 0, exportQualityRating: 0,
  critique: '', aiCritique: '', nextImprovement: '',
  month: 1, week: 1,
});

export default function ProjectGallery() {
  const { projects, addProject, updateProject, deleteProject } = useAppStore();
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyProject());
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [toolInput, setToolInput] = useState('');
  const [filterType, setFilterType] = useState<ProjectType | 'all'>('all');

  const filtered = projects.filter(p => filterType === 'all' || p.type === filterType)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const handleSubmit = () => {
    if (!form.name.trim()) return;
    if (editingId) {
      updateProject(editingId, form);
      setEditingId(null);
    } else {
      addProject({ ...form, id: Date.now().toString() });
    }
    setForm(emptyProject());
    setShowForm(false);
    setToolInput('');
  };

  const handleEdit = (p: ProjectItem) => {
    setForm({ ...p });
    setEditingId(p.id);
    setShowForm(true);
  };

  const addTool = () => {
    if (toolInput.trim() && !form.toolsUsed.includes(toolInput.trim())) {
      setForm({ ...form, toolsUsed: [...form.toolsUsed, toolInput.trim()] });
      setToolInput('');
    }
  };

  const removeTool = (tool: string) => {
    setForm({ ...form, toolsUsed: form.toolsUsed.filter(t => t !== tool) });
  };

  const avgRating = (p: ProjectItem) => {
    const ratings = rubricFields.map(f => p[f.key]).filter(v => v > 0);
    return ratings.length > 0 ? (ratings.reduce((a, b) => a + b, 0) / ratings.length).toFixed(1) : '—';
  };

  return (
    <div className="p-4 lg:p-6 pb-24 lg:pb-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white">Project Gallery</h1>
          <p className="text-gray-400 text-sm mt-1">{projects.length} projects logged</p>
        </div>
        <button
          onClick={() => { setForm(emptyProject()); setEditingId(null); setShowForm(!showForm); }}
          className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm font-medium"
        >
          <Plus size={16} /> Add Project
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <div className="bg-gray-900 border border-gray-700 rounded-xl p-5 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-white">{editingId ? 'Edit Project' : 'Add Project'}</h2>
            <button onClick={() => { setShowForm(false); setEditingId(null); }} className="text-gray-400 hover:text-white">
              <X size={18} />
            </button>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Field label="Project Name *">
              <input type="text" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}
                placeholder="Project name..." className={inputCls} />
            </Field>
            <Field label="Date">
              <input type="date" value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} className={inputCls} />
            </Field>
            <Field label="Type">
              <select value={form.type} onChange={e => setForm({ ...form, type: e.target.value as ProjectType })} className={inputCls}>
                {projectTypes.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
              </select>
            </Field>
            <Field label="Month">
              <select value={form.month} onChange={e => setForm({ ...form, month: parseInt(e.target.value) as 1 | 2 | 3 })} className={inputCls}>
                <option value={1}>Month 1</option>
                <option value={2}>Month 2</option>
                <option value={3}>Month 3</option>
              </select>
            </Field>
            <Field label="Tools Used">
              <div className="flex gap-2">
                <input type="text" value={toolInput} onChange={e => setToolInput(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && addTool()}
                  placeholder="Add tool + Enter" className={`${inputCls} flex-1`} />
                <button onClick={addTool} className="bg-purple-600 text-white px-3 py-2 rounded-lg text-sm">+</button>
              </div>
              <div className="flex flex-wrap gap-1 mt-2">
                {form.toolsUsed.map(t => (
                  <span key={t} className="flex items-center gap-1 bg-gray-700 text-gray-300 text-xs px-2 py-1 rounded-full">
                    {t} <button onClick={() => removeTool(t)}><X size={10} /></button>
                  </span>
                ))}
              </div>
            </Field>
            <Field label="Source / Tutorial / Reference">
              <input type="text" value={form.consumedSources} onChange={e => setForm({ ...form, consumedSources: e.target.value })}
                placeholder="What did you watch/read?" className={inputCls} />
            </Field>
            <Field label="What Was Recreated">
              <textarea value={form.recreatedWhat} onChange={e => setForm({ ...form, recreatedWhat: e.target.value })}
                placeholder="Describe what you recreated..." className={`${inputCls} min-h-[60px]`} />
            </Field>
            <Field label="What Variation Was Made">
              <textarea value={form.variationMade} onChange={e => setForm({ ...form, variationMade: e.target.value })}
                placeholder="Describe your variation..." className={`${inputCls} min-h-[60px]`} />
            </Field>
            <Field label="Export Link/Path">
              <input type="text" value={form.exportLinkOrPath} onChange={e => setForm({ ...form, exportLinkOrPath: e.target.value })}
                placeholder="File path or link to export..." className={inputCls} />
            </Field>
            <Field label={`Overall Self-Rating: ${form.selfRating}/5`}>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map(v => (
                  <button key={v} onClick={() => setForm({ ...form, selfRating: v })}
                    className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${
                      form.selfRating >= v ? 'bg-yellow-500 text-black' : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                    }`}>
                    {v}
                  </button>
                ))}
              </div>
            </Field>
          </div>

          {/* Rubric */}
          <div className="mt-4">
            <h3 className="text-sm font-medium text-gray-300 mb-3">Rubric Ratings (1-5)</h3>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
              {rubricFields.map(f => (
                <div key={f.key}>
                  <label className="text-xs text-gray-400 block mb-1">{f.label}</label>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map(v => (
                      <button key={v} onClick={() => setForm({ ...form, [f.key]: v === form[f.key] ? 0 : v })}
                        className={`flex-1 h-7 rounded text-xs transition-colors ${
                          (form[f.key] as number) >= v ? 'bg-purple-600 text-white' : 'bg-gray-800 text-gray-600 hover:bg-gray-700'
                        }`}>
                        {v}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4">
            <Field label="Self Critique">
              <textarea value={form.critique} onChange={e => setForm({ ...form, critique: e.target.value })}
                placeholder="What worked? What didn't?" className={`${inputCls} min-h-[80px]`} />
            </Field>
            <Field label="Next Improvement">
              <textarea value={form.nextImprovement} onChange={e => setForm({ ...form, nextImprovement: e.target.value })}
                placeholder="What to fix in the next version?" className={`${inputCls} min-h-[80px]`} />
            </Field>
          </div>

          <div className="flex gap-3 mt-4">
            <button onClick={handleSubmit} className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg text-sm font-medium">
              {editingId ? 'Update' : 'Save Project'}
            </button>
            <button onClick={() => { setShowForm(false); setEditingId(null); }} className="bg-gray-800 text-gray-300 px-4 py-2 rounded-lg text-sm">
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Filter tabs */}
      <div className="flex gap-2 mb-4 flex-wrap">
        <button
          onClick={() => setFilterType('all')}
          className={`px-3 py-1.5 rounded-lg text-sm ${filterType === 'all' ? 'bg-purple-600 text-white' : 'bg-gray-800 text-gray-400'}`}
        >All ({projects.length})</button>
        {projectTypes.map(t => (
          <button key={t.value} onClick={() => setFilterType(t.value)}
            className={`px-3 py-1.5 rounded-lg text-sm ${filterType === t.value ? 'bg-purple-600 text-white' : 'bg-gray-800 text-gray-400'}`}>
            {t.label} ({projects.filter(p => p.type === t.value).length})
          </button>
        ))}
      </div>

      {/* Project grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-16 text-gray-500">
          <div className="text-4xl mb-3">🎬</div>
          <div className="text-lg font-medium text-gray-400 mb-1">No projects yet</div>
          <p className="text-sm">Log your first project to start building your portfolio gallery.</p>
          <button onClick={() => setShowForm(true)} className="mt-4 bg-purple-600 text-white px-4 py-2 rounded-lg text-sm">
            Add First Project
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {filtered.map(p => {
            const typeConf = projectTypes.find(t => t.value === p.type);
            const isExpanded = expandedId === p.id;
            const avg = avgRating(p);

            return (
              <div key={p.id} className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden hover:border-gray-700 transition-colors">
                <div className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        <span className="font-semibold text-white">{p.name}</span>
                        <span className={`text-xs px-2 py-0.5 rounded ${typeConf?.color}`}>{typeConf?.label}</span>
                      </div>
                      <div className="text-xs text-gray-400">{p.date} · Month {p.month}</div>
                      {p.toolsUsed.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-2">
                          {p.toolsUsed.slice(0, 4).map(t => (
                            <span key={t} className="text-xs bg-gray-800 text-gray-400 px-1.5 py-0.5 rounded">{t}</span>
                          ))}
                          {p.toolsUsed.length > 4 && <span className="text-xs text-gray-500">+{p.toolsUsed.length - 4}</span>}
                        </div>
                      )}
                    </div>
                    <div className="flex items-center gap-2 ml-2">
                      {p.selfRating > 0 && (
                        <div className="flex items-center gap-1 text-yellow-400 text-sm font-bold">
                          <Star size={14} fill="currentColor" /> {p.selfRating}
                        </div>
                      )}
                      {avg !== '—' && (
                        <div className="text-xs text-purple-400 font-medium">avg {avg}</div>
                      )}
                    </div>
                  </div>

                  {p.recreatedWhat && (
                    <p className="text-xs text-gray-400 mt-2 line-clamp-2">📹 {p.recreatedWhat}</p>
                  )}

                  <div className="flex items-center justify-between mt-3">
                    <button onClick={() => setExpandedId(isExpanded ? null : p.id)}
                      className="text-xs text-purple-400 hover:text-purple-300">
                      {isExpanded ? 'Show less ↑' : 'Show details ↓'}
                    </button>
                    <div className="flex gap-2">
                      <button onClick={() => handleEdit(p)} className="text-gray-400 hover:text-white">
                        <Edit3 size={14} />
                      </button>
                      <button onClick={() => deleteProject(p.id)} className="text-gray-400 hover:text-red-400">
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                </div>

                {isExpanded && (
                  <div className="border-t border-gray-800 p-4 space-y-3">
                    {/* Rubric */}
                    <div>
                      <div className="text-xs font-medium text-gray-400 mb-2">Rubric</div>
                      <div className="grid grid-cols-2 gap-2">
                        {rubricFields.map(f => {
                          const val = p[f.key] as number;
                          return (
                            <div key={f.key} className="flex items-center justify-between">
                              <span className="text-xs text-gray-400">{f.label}</span>
                              <div className="flex gap-0.5">
                                {[1, 2, 3, 4, 5].map(v => (
                                  <div key={v} className={`w-3 h-3 rounded-sm ${val >= v ? 'bg-purple-500' : 'bg-gray-800'}`} />
                                ))}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                    {p.variationMade && (
                      <div className="bg-gray-800/50 rounded-lg p-2">
                        <div className="text-xs font-medium text-gray-400 mb-1">Variation</div>
                        <div className="text-xs text-gray-200">{p.variationMade}</div>
                      </div>
                    )}
                    {p.critique && (
                      <div className="bg-gray-800/50 rounded-lg p-2">
                        <div className="text-xs font-medium text-gray-400 mb-1">Self Critique</div>
                        <div className="text-xs text-gray-200">{p.critique}</div>
                      </div>
                    )}
                    {p.nextImprovement && (
                      <div className="bg-gray-800/50 rounded-lg p-2">
                        <div className="text-xs font-medium text-green-400 mb-1">Next Improvement</div>
                        <div className="text-xs text-gray-200">{p.nextImprovement}</div>
                      </div>
                    )}
                    {p.exportLinkOrPath && (
                      <div className="text-xs text-gray-400">
                        📁 <span className="text-gray-300">{p.exportLinkOrPath}</span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="text-xs text-gray-400 block mb-1">{label}</label>
      {children}
    </div>
  );
}

const inputCls = "w-full bg-gray-800 border border-gray-700 text-gray-200 px-3 py-2 rounded-lg text-sm focus:outline-none focus:border-purple-500";
