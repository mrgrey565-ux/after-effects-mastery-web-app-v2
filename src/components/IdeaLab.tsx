import { useState } from 'react';
import { Plus, Trash2, Shuffle, Zap, Target, Clock, Music, X } from 'lucide-react';
import { useAppStore } from '../store/appStore';
import type { CreativeIdea } from '../types';

const styles = ['Kinetic Typography', 'Glitch/Cyber', 'Minimal Clean', 'Luxury Cinematic', 'Hype/Viral', 'Lo-fi Aesthetic', 'Corporate Motion', 'Product Ad', 'Abstract Motion', 'Documentary Style'];
const moods = ['Energetic', 'Calm', 'Mysterious', 'Euphoric', 'Dark/Moody', 'Playful', 'Professional', 'Raw/Gritty', 'Premium/Luxury', 'Nostalgic'];
const toolConstraints = ['Built-in effects only', 'No plugins', 'Text only', 'Shape layers only', 'One transition', 'No transitions', 'Expressions only', 'No color correction', 'Single comp', '3D layers only'];
const formats = ['9:16 Vertical (Reels)', '16:9 Horizontal', '1:1 Square', '4:5 Portrait', 'Any format'];
const soundTypes = ['No sound', 'Single music track', 'SFX only (no music)', 'Voiceover', 'Beat-driven', 'Ambient/Atmospheric', 'Silence with hits', 'Full sound design'];
const timeLimits = ['5 seconds', '10 seconds', '15 seconds', '30 seconds', '45 seconds', '60 seconds', '90 seconds', 'No limit'];

const constraintChallenges = [
  { title: 'Built-in Only Challenge', desc: 'Create a 10-second tech intro using only text animators, shape layers, and glow.', tools: 'Text Animators, Shape Layers, Glow', time: '10 sec' },
  { title: 'Caption Master', desc: 'Recreate a viral caption style, then turn it into a premium brand version.', tools: 'Text Layers, Text Animators, Track Mattes', time: '15 sec' },
  { title: 'Product No-Plugin', desc: 'Make a product ad shot using no plugins: camera push, text callouts, glow, sound hits.', tools: 'Camera, Glow, Null Object, Audio Layers', time: '20 sec' },
  { title: 'One Transition Rule', desc: 'Create a 30-second edit using only ONE type of transition throughout.', tools: 'Single Transition Type', time: '30 sec' },
  { title: 'Expressions Only', desc: 'Animate an entire 8-second loop using only expressions — no manual keyframes for motion.', tools: 'wiggle, loopOut, time, sliders', time: '8 sec loop' },
  { title: 'Mobile First', desc: 'Design a 15-second caption-driven edit where every element is readable at arm\'s length.', tools: 'Captions, Text Animators, Safe Areas', time: '15 sec' },
  { title: 'Silent Film', desc: 'Create a 20-second emotional edit with zero music — only carefully timed SFX.', tools: 'Audio Layers, Timing, SFX Design', time: '20 sec' },
  { title: 'Color Only', desc: 'Create mood and emotion using ONLY color changes — no motion, only color/opacity transitions.', tools: 'Lumetri, Adjustment Layers, Blending Modes', time: '15 sec' },
];

const hookIdeas = [
  'Freeze frame + text punch in 0.5 sec',
  'Fast zoom with whoosh into title',
  'Subject appears from black with rim light',
  'Text slams in with motion blur',
  'Split screen reveal with music hit',
  'Countdown glitch before main content',
  'Slow motion B-roll with bold caption',
  'Quick product close-up then pull back',
  'Name/brand letter-by-letter on beat',
  'Before/after split reveal',
];

const emptyIdea = (): Omit<CreativeIdea, 'id' | 'createdAt'> => ({
  title: '', description: '', style: '', mood: '', tools: [],
  format: '', soundType: '', timeLimit: '', difficulty: 3,
  sourceRefs: [], status: 'idea',
});

function pickRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

export default function IdeaLab() {
  const { creativeIdeas, addIdea, updateIdea, deleteIdea } = useAppStore();
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(emptyIdea());
  const [editingId, setEditingId] = useState<string | null>(null);
  const [randomPrompt, setRandomPrompt] = useState<{ style: string; mood: string; tool: string; format: string; sound: string; time: string } | null>(null);
  const [generatedHooks, setGeneratedHooks] = useState<string[]>([]);

  const generateRandom = () => {
    setRandomPrompt({
      style: pickRandom(styles),
      mood: pickRandom(moods),
      tool: pickRandom(toolConstraints),
      format: pickRandom(formats),
      sound: pickRandom(soundTypes),
      time: pickRandom(timeLimits),
    });
  };

  const generateHooks = () => {
    const shuffled = [...hookIdeas].sort(() => Math.random() - 0.5).slice(0, 5);
    setGeneratedHooks(shuffled);
  };

  const usePrompt = () => {
    if (!randomPrompt) return;
    setForm({
      ...emptyIdea(),
      style: randomPrompt.style,
      mood: randomPrompt.mood,
      tools: [randomPrompt.tool],
      format: randomPrompt.format,
      soundType: randomPrompt.sound,
      timeLimit: randomPrompt.time,
      title: `${randomPrompt.style} — ${randomPrompt.mood}`,
      description: `Create a ${randomPrompt.time} ${randomPrompt.style.toLowerCase()} edit with a ${randomPrompt.mood.toLowerCase()} mood. Constraint: ${randomPrompt.tool}. Format: ${randomPrompt.format}. Sound: ${randomPrompt.sound}.`,
    });
    setShowForm(true);
    setRandomPrompt(null);
  };

  const handleSubmit = () => {
    if (!form.title.trim()) return;
    if (editingId) {
      updateIdea(editingId, form);
      setEditingId(null);
    } else {
      addIdea({ ...form, id: Date.now().toString(), createdAt: new Date().toISOString() });
    }
    setForm(emptyIdea());
    setShowForm(false);
  };

  const statusColors: Record<string, string> = {
    idea: 'bg-gray-700 text-gray-300',
    'in-progress': 'bg-blue-800 text-blue-300',
    completed: 'bg-green-800 text-green-300',
  };

  return (
    <div className="p-4 lg:p-6 pb-24 lg:pb-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white">Creative Idea Lab</h1>
          <p className="text-gray-400 text-sm mt-1">Generate, mix, and save creative ideas</p>
        </div>
        <button
          onClick={() => { setForm(emptyIdea()); setEditingId(null); setShowForm(!showForm); }}
          className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm font-medium"
        >
          <Plus size={16} /> Add Idea
        </button>
      </div>

      {/* Random Prompt Generator */}
      <div className="bg-gradient-to-r from-purple-900/40 to-pink-900/40 border border-purple-700/40 rounded-xl p-5 mb-6">
        <div className="flex items-center gap-2 mb-3">
          <Shuffle size={18} className="text-purple-400" />
          <h2 className="font-semibold text-white">Random Prompt Generator</h2>
        </div>
        <button
          onClick={generateRandom}
          className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 mb-4"
        >
          <Shuffle size={14} /> Generate Random Prompt
        </button>

        {randomPrompt && (
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 mb-4">
            {[
              { label: '🎨 Style', value: randomPrompt.style, icon: Zap },
              { label: '😌 Mood', value: randomPrompt.mood, icon: Target },
              { label: '🔧 Tool Constraint', value: randomPrompt.tool, icon: Target },
              { label: '📐 Format', value: randomPrompt.format, icon: Target },
              { label: '🎵 Sound', value: randomPrompt.sound, icon: Music },
              { label: '⏱ Time Limit', value: randomPrompt.time, icon: Clock },
            ].map(item => (
              <div key={item.label} className="bg-gray-900/60 rounded-lg p-3">
                <div className="text-xs text-gray-400 mb-1">{item.label}</div>
                <div className="text-sm font-medium text-white">{item.value}</div>
              </div>
            ))}
          </div>
        )}

        {randomPrompt && (
          <button onClick={usePrompt} className="bg-pink-600 hover:bg-pink-700 text-white px-4 py-2 rounded-lg text-sm font-medium">
            Use This Prompt →
          </button>
        )}
      </div>

      {/* Hook Generator */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-5 mb-6">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Zap size={18} className="text-yellow-400" />
            <h2 className="font-semibold text-white">Hook Generator</h2>
          </div>
          <button onClick={generateHooks}
            className="text-sm text-yellow-400 hover:text-yellow-300 bg-yellow-900/20 border border-yellow-700/40 px-3 py-1.5 rounded-lg">
            Generate 5 Hooks
          </button>
        </div>
        {generatedHooks.length > 0 ? (
          <div className="space-y-2">
            {generatedHooks.map((hook, i) => (
              <div key={i} className="flex items-start gap-2 bg-gray-800/60 rounded-lg p-3">
                <span className="text-yellow-400 font-bold text-sm flex-shrink-0">{i + 1}.</span>
                <span className="text-sm text-gray-200">{hook}</span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-sm">Click "Generate 5 Hooks" to get opening ideas for your next edit.</p>
        )}
      </div>

      {/* Constraint Challenges */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-5 mb-6">
        <div className="flex items-center gap-2 mb-4">
          <Target size={18} className="text-green-400" />
          <h2 className="font-semibold text-white">Constraint Challenges</h2>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
          {constraintChallenges.map((challenge, i) => (
            <button
              key={i}
              onClick={() => {
                setForm({ ...emptyIdea(), title: challenge.title, description: challenge.desc, tools: [challenge.tools], timeLimit: challenge.time });
                setShowForm(true);
              }}
              className="text-left bg-gray-800/60 hover:bg-gray-800 border border-gray-700 hover:border-gray-600 rounded-xl p-4 transition-all"
            >
              <div className="font-medium text-white text-sm mb-1">{challenge.title}</div>
              <div className="text-xs text-gray-400 mb-2">{challenge.desc}</div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs text-purple-400 bg-purple-900/20 px-2 py-0.5 rounded">{challenge.tools}</span>
                <span className="text-xs text-blue-400 bg-blue-900/20 px-2 py-0.5 rounded">⏱ {challenge.time}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Add/Edit form */}
      {showForm && (
        <div className="bg-gray-900 border border-gray-700 rounded-xl p-5 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-white">{editingId ? 'Edit Idea' : 'Add Idea'}</h2>
            <button onClick={() => { setShowForm(false); setEditingId(null); }} className="text-gray-400 hover:text-white">
              <X size={18} />
            </button>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="lg:col-span-2">
              <label className="text-xs text-gray-400 block mb-1">Idea Title *</label>
              <input type="text" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })}
                placeholder="Name your idea..." className={inputCls} />
            </div>
            <div className="lg:col-span-2">
              <label className="text-xs text-gray-400 block mb-1">Description</label>
              <textarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })}
                placeholder="Describe the idea, approach, references..." className={`${inputCls} min-h-[80px]`} />
            </div>
            <div>
              <label className="text-xs text-gray-400 block mb-1">Style</label>
              <select value={form.style} onChange={e => setForm({ ...form, style: e.target.value })} className={inputCls}>
                <option value="">Select style...</option>
                {styles.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <label className="text-xs text-gray-400 block mb-1">Mood</label>
              <select value={form.mood} onChange={e => setForm({ ...form, mood: e.target.value })} className={inputCls}>
                <option value="">Select mood...</option>
                {moods.map(m => <option key={m} value={m}>{m}</option>)}
              </select>
            </div>
            <div>
              <label className="text-xs text-gray-400 block mb-1">Format</label>
              <select value={form.format} onChange={e => setForm({ ...form, format: e.target.value })} className={inputCls}>
                <option value="">Select format...</option>
                {formats.map(f => <option key={f} value={f}>{f}</option>)}
              </select>
            </div>
            <div>
              <label className="text-xs text-gray-400 block mb-1">Sound Type</label>
              <select value={form.soundType} onChange={e => setForm({ ...form, soundType: e.target.value })} className={inputCls}>
                <option value="">Select sound...</option>
                {soundTypes.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <label className="text-xs text-gray-400 block mb-1">Time Limit</label>
              <select value={form.timeLimit} onChange={e => setForm({ ...form, timeLimit: e.target.value })} className={inputCls}>
                <option value="">Select time...</option>
                {timeLimits.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
            <div>
              <label className="text-xs text-gray-400 block mb-1">Status</label>
              <select value={form.status} onChange={e => setForm({ ...form, status: e.target.value as CreativeIdea['status'] })} className={inputCls}>
                <option value="idea">Idea</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
              </select>
            </div>
            <div>
              <label className="text-xs text-gray-400 block mb-1">Difficulty: {form.difficulty}/5</label>
              <input type="range" min="1" max="5" value={form.difficulty}
                onChange={e => setForm({ ...form, difficulty: parseInt(e.target.value) })}
                className="w-full accent-purple-500" />
            </div>
          </div>
          <div className="flex gap-3 mt-4">
            <button onClick={handleSubmit} className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg text-sm font-medium">
              {editingId ? 'Update' : 'Save Idea'}
            </button>
            <button onClick={() => { setShowForm(false); setEditingId(null); }} className="bg-gray-800 text-gray-300 px-4 py-2 rounded-lg text-sm">
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Saved ideas */}
      {creativeIdeas.length > 0 && (
        <div>
          <h2 className="font-semibold text-white mb-3">Saved Ideas ({creativeIdeas.length})</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
            {creativeIdeas.map(idea => (
              <div key={idea.id} className="bg-gray-900 border border-gray-800 rounded-xl p-4 hover:border-gray-700">
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <span className="font-medium text-white text-sm">{idea.title}</span>
                      <span className={`text-xs px-2 py-0.5 rounded ${statusColors[idea.status]}`}>
                        {idea.status.replace('-', ' ')}
                      </span>
                    </div>
                    {idea.description && <p className="text-xs text-gray-400 mb-2 line-clamp-2">{idea.description}</p>}
                    <div className="flex flex-wrap gap-1">
                      {idea.style && <span className="text-xs bg-purple-900/30 text-purple-300 px-1.5 py-0.5 rounded">{idea.style}</span>}
                      {idea.mood && <span className="text-xs bg-pink-900/30 text-pink-300 px-1.5 py-0.5 rounded">{idea.mood}</span>}
                      {idea.timeLimit && <span className="text-xs bg-blue-900/30 text-blue-300 px-1.5 py-0.5 rounded">⏱ {idea.timeLimit}</span>}
                    </div>
                  </div>
                  <div className="flex gap-2 ml-2">
                    <button onClick={() => { setForm({ ...idea }); setEditingId(idea.id); setShowForm(true); }}
                      className="text-gray-400 hover:text-white">
                      <Plus size={14} />
                    </button>
                    <button onClick={() => deleteIdea(idea.id)} className="text-gray-400 hover:text-red-400">
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

const inputCls = "w-full bg-gray-800 border border-gray-700 text-gray-200 px-3 py-2 rounded-lg text-sm focus:outline-none focus:border-purple-500";
