import { useState } from 'react';
import { Plus, Search, Trash2, Edit3, ExternalLink, Filter, X, ChevronDown } from 'lucide-react';
import { useAppStore } from '../store/appStore';
import type { ReferenceItem, ReferenceStatus } from '../types';

const platforms = ['YouTube', 'Behance', 'Dribbble', 'Pinterest', 'Instagram', 'TikTok', 'Vimeo', 'Adobe Help', 'Other'];
const styleCategories = ['Kinetic Typography', 'Motion Graphics', 'VFX/Composite', 'Social/Reels', 'Product Ad', 'Transition', 'Lower Third', 'Caption Style', 'Intro/Bumper', 'Color Grade', 'Other'];
const statusOptions: { value: ReferenceStatus; label: string; color: string }[] = [
  { value: 'saved', label: 'Saved', color: 'bg-gray-700 text-gray-300' },
  { value: 'analyzed', label: 'Analyzed', color: 'bg-blue-800 text-blue-300' },
  { value: 'recreated', label: 'Recreated', color: 'bg-purple-800 text-purple-300' },
  { value: 'variant-created', label: 'Variant Created', color: 'bg-green-800 text-green-300' },
];

const emptyRef = (): Omit<ReferenceItem, 'id' | 'createdAt'> => ({
  title: '', url: '', platform: 'YouTube', tags: [], styleCategory: 'Motion Graphics',
  whyItWorks: '', hook: '', motion: '', typography: '', color: '', effects: '', sound: '',
  transition: '', toolsLikelyUsed: '', difficulty: 3, status: 'saved', timecodes: '',
});

export default function ReferencePage() {
  const { references, addReference, updateReference, deleteReference } = useAppStore();
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [filterPlatform, setFilterPlatform] = useState('all');
  const [filterStatus, setFilterStatus] = useState<ReferenceStatus | 'all'>('all');
  const [filterDifficulty, setFilterDifficulty] = useState<number | 'all'>('all');
  const [showFilters, setShowFilters] = useState(false);
  const [form, setForm] = useState(emptyRef());
  const [tagInput, setTagInput] = useState('');
  const [expandedRef, setExpandedRef] = useState<string | null>(null);

  const filtered = references.filter(r => {
    if (search && !r.title.toLowerCase().includes(search.toLowerCase()) &&
      !r.tags.some(t => t.toLowerCase().includes(search.toLowerCase())) &&
      !r.styleCategory.toLowerCase().includes(search.toLowerCase())) return false;
    if (filterPlatform !== 'all' && r.platform !== filterPlatform) return false;
    if (filterStatus !== 'all' && r.status !== filterStatus) return false;
    if (filterDifficulty !== 'all' && r.difficulty !== filterDifficulty) return false;
    return true;
  });

  const handleSubmit = () => {
    if (!form.title.trim()) return;
    if (editingId) {
      updateReference(editingId, form);
      setEditingId(null);
    } else {
      addReference({ ...form, id: Date.now().toString(), createdAt: new Date().toISOString() });
    }
    setForm(emptyRef());
    setShowForm(false);
    setTagInput('');
  };

  const handleEdit = (ref: ReferenceItem) => {
    setForm({ ...ref });
    setEditingId(ref.id);
    setShowForm(true);
    setExpandedRef(null);
  };

  const addTag = () => {
    if (tagInput.trim() && !form.tags.includes(tagInput.trim())) {
      setForm({ ...form, tags: [...form.tags, tagInput.trim()] });
      setTagInput('');
    }
  };

  const removeTag = (tag: string) => {
    setForm({ ...form, tags: form.tags.filter(t => t !== tag) });
  };

  const cycleStatus = (id: string, current: ReferenceStatus) => {
    const order: ReferenceStatus[] = ['saved', 'analyzed', 'recreated', 'variant-created'];
    const next = order[(order.indexOf(current) + 1) % order.length];
    updateReference(id, { status: next });
  };

  return (
    <div className="p-4 lg:p-6 pb-24 lg:pb-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white">Reference Vault</h1>
          <p className="text-gray-400 text-sm mt-1">{references.length} references saved</p>
        </div>
        <button
          onClick={() => { setForm(emptyRef()); setEditingId(null); setShowForm(!showForm); }}
          className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
        >
          <Plus size={16} /> Add Reference
        </button>
      </div>

      {/* Add/Edit form */}
      {showForm && (
        <div className="bg-gray-900 border border-gray-700 rounded-xl p-5 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-white">{editingId ? 'Edit Reference' : 'Add Reference'}</h2>
            <button onClick={() => { setShowForm(false); setEditingId(null); }} className="text-gray-400 hover:text-white">
              <X size={18} />
            </button>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Field label="Title *">
              <input type="text" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })}
                placeholder="Reference title..." className={inputCls} />
            </Field>
            <Field label="URL">
              <input type="url" value={form.url} onChange={e => setForm({ ...form, url: e.target.value })}
                placeholder="https://..." className={inputCls} />
            </Field>
            <Field label="Platform">
              <select value={form.platform} onChange={e => setForm({ ...form, platform: e.target.value })} className={inputCls}>
                {platforms.map(p => <option key={p} value={p}>{p}</option>)}
              </select>
            </Field>
            <Field label="Style Category">
              <select value={form.styleCategory} onChange={e => setForm({ ...form, styleCategory: e.target.value })} className={inputCls}>
                {styleCategories.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </Field>
            <Field label="Tags">
              <div className="flex gap-2">
                <input type="text" value={tagInput} onChange={e => setTagInput(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && addTag()}
                  placeholder="Add tag + Enter" className={`${inputCls} flex-1`} />
                <button onClick={addTag} className="bg-purple-600 text-white px-3 py-2 rounded-lg text-sm">Add</button>
              </div>
              <div className="flex flex-wrap gap-1 mt-2">
                {form.tags.map(tag => (
                  <span key={tag} className="flex items-center gap-1 bg-gray-700 text-gray-300 text-xs px-2 py-1 rounded-full">
                    {tag} <button onClick={() => removeTag(tag)}><X size={10} /></button>
                  </span>
                ))}
              </div>
            </Field>
            <Field label="Timecodes / Key Moments">
              <input type="text" value={form.timecodes} onChange={e => setForm({ ...form, timecodes: e.target.value })}
                placeholder="e.g. 0:15 — hook, 1:30 — key effect" className={inputCls} />
            </Field>
            <Field label="Why It Works">
              <textarea value={form.whyItWorks} onChange={e => setForm({ ...form, whyItWorks: e.target.value })}
                placeholder="Why does this reference catch attention?" className={`${inputCls} min-h-[60px]`} />
            </Field>
            <Field label="Hook">
              <input type="text" value={form.hook} onChange={e => setForm({ ...form, hook: e.target.value })}
                placeholder="What grabs attention in the first 3 seconds?" className={inputCls} />
            </Field>
            <Field label="Motion">
              <input type="text" value={form.motion} onChange={e => setForm({ ...form, motion: e.target.value })}
                placeholder="Motion style, speed, arcs..." className={inputCls} />
            </Field>
            <Field label="Typography">
              <input type="text" value={form.typography} onChange={e => setForm({ ...form, typography: e.target.value })}
                placeholder="Font style, animation, size..." className={inputCls} />
            </Field>
            <Field label="Color">
              <input type="text" value={form.color} onChange={e => setForm({ ...form, color: e.target.value })}
                placeholder="Color palette, mood, grade..." className={inputCls} />
            </Field>
            <Field label="Effects">
              <input type="text" value={form.effects} onChange={e => setForm({ ...form, effects: e.target.value })}
                placeholder="Key effects used..." className={inputCls} />
            </Field>
            <Field label="Sound">
              <input type="text" value={form.sound} onChange={e => setForm({ ...form, sound: e.target.value })}
                placeholder="Music, SFX, ambient..." className={inputCls} />
            </Field>
            <Field label="Transitions">
              <input type="text" value={form.transition} onChange={e => setForm({ ...form, transition: e.target.value })}
                placeholder="Transition types and style..." className={inputCls} />
            </Field>
            <Field label="Tools Likely Used">
              <input type="text" value={form.toolsLikelyUsed} onChange={e => setForm({ ...form, toolsLikelyUsed: e.target.value })}
                placeholder="Estimated AE tools..." className={inputCls} />
            </Field>
            <Field label={`Difficulty: ${form.difficulty}/5`}>
              <input type="range" min="1" max="5" value={form.difficulty}
                onChange={e => setForm({ ...form, difficulty: parseInt(e.target.value) })}
                className="w-full accent-purple-500" />
            </Field>
          </div>
          <div className="flex gap-3 mt-4">
            <button onClick={handleSubmit} className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg text-sm font-medium">
              {editingId ? 'Update' : 'Save Reference'}
            </button>
            <button onClick={() => { setShowForm(false); setEditingId(null); setForm(emptyRef()); }}
              className="bg-gray-800 hover:bg-gray-700 text-gray-300 px-4 py-2 rounded-lg text-sm">
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Search and filters */}
      <div className="flex flex-wrap gap-2 mb-4">
        <div className="relative flex-1 min-w-48">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input type="text" placeholder="Search references..." value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full bg-gray-900 border border-gray-700 pl-9 pr-3 py-2 rounded-lg text-sm text-gray-200 focus:outline-none focus:border-purple-500" />
        </div>
        <button onClick={() => setShowFilters(!showFilters)}
          className="flex items-center gap-1 bg-gray-800 border border-gray-700 text-gray-400 px-3 py-2 rounded-lg text-sm">
          <Filter size={14} /> Filters
        </button>
      </div>

      {showFilters && (
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-4 mb-4 flex flex-wrap gap-3">
          <div>
            <label className="text-xs text-gray-400 block mb-1">Platform</label>
            <select value={filterPlatform} onChange={e => setFilterPlatform(e.target.value)}
              className="bg-gray-800 border border-gray-700 text-gray-300 px-2 py-1 rounded text-xs">
              <option value="all">All</option>
              {platforms.map(p => <option key={p} value={p}>{p}</option>)}
            </select>
          </div>
          <div>
            <label className="text-xs text-gray-400 block mb-1">Status</label>
            <select value={filterStatus} onChange={e => setFilterStatus(e.target.value as typeof filterStatus)}
              className="bg-gray-800 border border-gray-700 text-gray-300 px-2 py-1 rounded text-xs">
              <option value="all">All</option>
              {statusOptions.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
            </select>
          </div>
          <div>
            <label className="text-xs text-gray-400 block mb-1">Difficulty</label>
            <select value={filterDifficulty} onChange={e => setFilterDifficulty(e.target.value === 'all' ? 'all' : parseInt(e.target.value))}
              className="bg-gray-800 border border-gray-700 text-gray-300 px-2 py-1 rounded text-xs">
              <option value="all">All</option>
              {[1, 2, 3, 4, 5].map(d => <option key={d} value={d}>{d}/5</option>)}
            </select>
          </div>
        </div>
      )}

      {/* Reference list */}
      {filtered.length === 0 ? (
        <div className="text-center py-16 text-gray-500">
          <div className="text-4xl mb-3">📚</div>
          <div className="text-lg font-medium text-gray-400 mb-1">No references yet</div>
          <p className="text-sm">Start building your vault by adding references you analyze.</p>
          <button onClick={() => setShowForm(true)} className="mt-4 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm">
            Add First Reference
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map(ref => {
            const statusConf = statusOptions.find(s => s.value === ref.status);
            const isExpanded = expandedRef === ref.id;
            return (
              <div key={ref.id} className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden hover:border-gray-700 transition-colors">
                <div className="flex items-center gap-3 p-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-semibold text-white text-sm">{ref.title}</span>
                      <span className="text-xs bg-gray-800 text-gray-400 px-2 py-0.5 rounded">{ref.platform}</span>
                      <span className="text-xs bg-gray-800 text-gray-400 px-2 py-0.5 rounded">{ref.styleCategory}</span>
                      <button
                        onClick={() => cycleStatus(ref.id, ref.status)}
                        className={`text-xs px-2 py-0.5 rounded ${statusConf?.color || 'bg-gray-700 text-gray-300'} cursor-pointer`}
                      >
                        {statusConf?.label}
                      </button>
                    </div>
                    {ref.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-1">
                        {ref.tags.map(tag => (
                          <span key={tag} className="text-xs text-purple-400 bg-purple-900/20 px-1.5 py-0.5 rounded">#{tag}</span>
                        ))}
                      </div>
                    )}
                    {ref.whyItWorks && (
                      <p className="text-xs text-gray-400 mt-1 truncate">{ref.whyItWorks}</p>
                    )}
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <span className="text-xs text-yellow-400">★ {ref.difficulty}/5</span>
                    {ref.url && (
                      <a href={ref.url} target="_blank" rel="noopener noreferrer"
                        className="text-gray-400 hover:text-blue-400" onClick={e => e.stopPropagation()}>
                        <ExternalLink size={14} />
                      </a>
                    )}
                    <button onClick={() => handleEdit(ref)} className="text-gray-400 hover:text-white">
                      <Edit3 size={14} />
                    </button>
                    <button onClick={() => deleteReference(ref.id)} className="text-gray-400 hover:text-red-400">
                      <Trash2 size={14} />
                    </button>
                    <button onClick={() => setExpandedRef(isExpanded ? null : ref.id)} className="text-gray-400">
                      <ChevronDown size={16} className={`transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                    </button>
                  </div>
                </div>

                {isExpanded && (
                  <div className="border-t border-gray-800 p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {[
                      { label: 'Hook', value: ref.hook },
                      { label: 'Motion', value: ref.motion },
                      { label: 'Typography', value: ref.typography },
                      { label: 'Color', value: ref.color },
                      { label: 'Effects', value: ref.effects },
                      { label: 'Sound', value: ref.sound },
                      { label: 'Transitions', value: ref.transition },
                      { label: 'Tools Likely Used', value: ref.toolsLikelyUsed },
                      { label: 'Timecodes', value: ref.timecodes },
                    ].filter(item => item.value).map(item => (
                      <div key={item.label} className="bg-gray-800/50 rounded-lg p-2">
                        <div className="text-xs font-medium text-gray-400 mb-0.5">{item.label}</div>
                        <div className="text-xs text-gray-200">{item.value}</div>
                      </div>
                    ))}
                    <div className="sm:col-span-2 lg:col-span-3 bg-gray-800/50 rounded-lg p-2">
                      <div className="text-xs font-medium text-gray-400 mb-0.5">Why It Works</div>
                      <div className="text-xs text-gray-200">{ref.whyItWorks || '—'}</div>
                    </div>
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
