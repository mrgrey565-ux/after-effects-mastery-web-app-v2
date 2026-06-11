import { useState } from 'react';
import {
  Search, ChevronDown, ChevronUp, CheckCircle2, Circle,
  Clock, BookOpen, Paintbrush, Lightbulb, PenLine,
  Download, Filter
} from 'lucide-react';
import { useAppStore } from '../store/appStore';
import { allDays } from '../data/curriculum';
import type { CurriculumDay } from '../types';

const taskTypeConfig = {
  consume: { label: 'Consume', color: 'text-blue-400', bg: 'bg-blue-900/30 border-blue-700/40', icon: BookOpen },
  recreate: { label: 'Recreate', color: 'text-purple-400', bg: 'bg-purple-900/30 border-purple-700/40', icon: Paintbrush },
  variation: { label: 'Variation', color: 'text-pink-400', bg: 'bg-pink-900/30 border-pink-700/40', icon: Lightbulb },
  reflect: { label: 'Reflect', color: 'text-yellow-400', bg: 'bg-yellow-900/30 border-yellow-700/40', icon: PenLine },
  export: { label: 'Export', color: 'text-green-400', bg: 'bg-green-900/30 border-green-700/40', icon: Download },
};

const difficultyColors = ['', 'bg-green-500', 'bg-blue-500', 'bg-yellow-500', 'bg-orange-500', 'bg-red-500'];

export default function PlanPage() {
  const { currentDay, dayProgress, setCurrentDay, toggleDayTask, updateDayNotes, updateDayRating, updateDayMinutes, markDayComplete } = useAppStore();
  const [selectedMonth, setSelectedMonth] = useState<1 | 2 | 3 | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedDay, setExpandedDay] = useState<number | null>(currentDay);
  const [filterStatus, setFilterStatus] = useState<'all' | 'complete' | 'incomplete'>('all');
  const [showFilters, setShowFilters] = useState(false);

  const filteredDays = allDays.filter(day => {
    if (selectedMonth !== 'all' && day.month !== selectedMonth) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      if (!day.focus.toLowerCase().includes(q) &&
        !day.goal.toLowerCase().includes(q) &&
        !day.tools.some(t => t.toLowerCase().includes(q))) return false;
    }
    if (filterStatus === 'complete' && !dayProgress[day.day]?.completedAt) return false;
    if (filterStatus === 'incomplete' && dayProgress[day.day]?.completedAt) return false;
    return true;
  });

  const weekGroups = filteredDays.reduce<Record<number, CurriculumDay[]>>((acc, day) => {
    if (!acc[day.week]) acc[day.week] = [];
    acc[day.week].push(day);
    return acc;
  }, {});

  return (
    <div className="p-4 lg:p-6 pb-24 lg:pb-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white">90-Day Plan</h1>
          <p className="text-gray-400 text-sm">Currently on Day {currentDay}</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setExpandedDay(currentDay)}
            className="text-sm text-purple-400 hover:text-purple-300 bg-purple-900/20 border border-purple-700/40 px-3 py-2 rounded-lg"
          >
            → Today
          </button>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 text-sm text-gray-400 hover:text-white bg-gray-800 px-3 py-2 rounded-lg border border-gray-700"
          >
            <Filter size={14} /> Filters
          </button>
        </div>
      </div>

      {/* Filters */}
      {showFilters && (
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-4 mb-4 space-y-3">
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search days, tools, focus..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full bg-gray-800 text-gray-200 pl-9 pr-4 py-2 rounded-lg border border-gray-700 text-sm focus:outline-none focus:border-purple-500"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {(['all', 1, 2, 3] as const).map(m => (
              <button
                key={m}
                onClick={() => setSelectedMonth(m as typeof selectedMonth)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  selectedMonth === m ? 'bg-purple-600 text-white' : 'bg-gray-800 text-gray-400 hover:text-white'
                }`}
              >
                {m === 'all' ? 'All Months' : `Month ${m}`}
              </button>
            ))}
            <div className="w-px bg-gray-700" />
            {(['all', 'complete', 'incomplete'] as const).map(s => (
              <button
                key={s}
                onClick={() => setFilterStatus(s)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  filterStatus === s ? 'bg-purple-600 text-white' : 'bg-gray-800 text-gray-400 hover:text-white'
                }`}
              >
                {s.charAt(0).toUpperCase() + s.slice(1)}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Day list by week */}
      <div className="space-y-6">
        {Object.entries(weekGroups).map(([week, days]) => {
          const weekNum = parseInt(week);
          const monthOf = days[0]?.month;
          const monthLabel = monthOf ? `Month ${monthOf}` : '';
          return (
            <div key={week}>
              <div className="flex items-center gap-3 mb-3">
                <h2 className="text-sm font-semibold text-gray-300">
                  Week {weekNum} <span className="text-gray-600">· {monthLabel}</span>
                </h2>
                <div className="flex-1 h-px bg-gray-800" />
                <span className="text-xs text-gray-500">
                  {days.filter(d => dayProgress[d.day]?.completedAt).length}/{days.length} complete
                </span>
              </div>
              <div className="space-y-2">
                {days.map(day => (
                  <DayCard
                    key={day.day}
                    day={day}
                    isExpanded={expandedDay === day.day}
                    isCurrent={currentDay === day.day}
                    progress={dayProgress[day.day]}
                    onToggle={() => {
                      setExpandedDay(expandedDay === day.day ? null : day.day);
                      setCurrentDay(day.day);
                    }}
                    onToggleTask={(taskId) => toggleDayTask(day.day, taskId)}
                    onNotesChange={(notes) => updateDayNotes(day.day, notes)}
                    onRatingChange={(field, value) => updateDayRating(day.day, field, value)}
                    onMinutesChange={(field, value) => updateDayMinutes(day.day, field, value)}
                    onMarkComplete={() => markDayComplete(day.day)}
                  />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

interface DayCardProps {
  day: CurriculumDay;
  isExpanded: boolean;
  isCurrent: boolean;
  progress: { tasksCompleted: string[]; notes: string; difficultyRating: number; confidenceRating: number; consumeMinutes: number; practiceMinutes: number; completedAt?: string } | undefined;
  onToggle: () => void;
  onToggleTask: (taskId: string) => void;
  onNotesChange: (notes: string) => void;
  onRatingChange: (field: 'difficultyRating' | 'confidenceRating', value: number) => void;
  onMinutesChange: (field: 'consumeMinutes' | 'practiceMinutes', value: number) => void;
  onMarkComplete: () => void;
}

function DayCard({ day, isExpanded, isCurrent, progress, onToggle, onToggleTask, onNotesChange, onRatingChange, onMinutesChange, onMarkComplete }: DayCardProps) {
  const tasks = [
    { id: 'consume', label: 'Consume resources', type: 'consume' as const },
    { id: 'recreate', label: 'Recreate the effect', type: 'recreate' as const },
    { id: 'variation', label: 'Create a variation', type: 'variation' as const },
    { id: 'reflect', label: 'Reflect and write notes', type: 'reflect' as const },
    { id: 'export', label: 'Export or save project', type: 'export' as const },
  ];

  const completedTasks = progress?.tasksCompleted || [];
  const taskCount = completedTasks.length;
  const isComplete = !!progress?.completedAt;

  const borderColor = isComplete
    ? 'border-green-700/40'
    : isCurrent
    ? 'border-purple-700/40'
    : 'border-gray-800';

  const bgColor = isComplete
    ? 'bg-green-950/10'
    : isCurrent
    ? 'bg-purple-950/20'
    : 'bg-gray-900';

  return (
    <div className={`${bgColor} border ${borderColor} rounded-xl overflow-hidden transition-all`}>
      {/* Day header */}
      <button
        onClick={onToggle}
        className="w-full flex items-center gap-3 p-4 hover:bg-gray-800/30 transition-colors text-left"
      >
        {/* Day number */}
        <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-sm font-bold flex-shrink-0 ${
          isComplete ? 'bg-green-800/60 text-green-300' :
          isCurrent ? 'bg-purple-800/60 text-purple-300' :
          'bg-gray-800 text-gray-400'
        }`}>
          {isComplete ? <CheckCircle2 size={18} /> : day.day}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-semibold text-white text-sm truncate">{day.focus}</span>
            {day.isWeeklyProject && <span className="text-xs bg-green-800/60 text-green-300 px-2 py-0.5 rounded-full">Mini Project</span>}
            {day.isFinalProject && <span className="text-xs bg-yellow-800/60 text-yellow-300 px-2 py-0.5 rounded-full">Final</span>}
            {day.isReviewDay && <span className="text-xs bg-blue-800/60 text-blue-300 px-2 py-0.5 rounded-full">Review</span>}
          </div>
          <div className="text-xs text-gray-500 mt-0.5 truncate">{day.goal}</div>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-3 flex-shrink-0">
          <div className="text-right hidden sm:block">
            <div className="text-xs text-gray-400 flex items-center gap-1">
              <Clock size={10} /> {day.estimatedMinutes}m
            </div>
            <div className="text-xs text-gray-500">{taskCount}/5 tasks</div>
          </div>
          <div className={`w-2 h-2 rounded-full ${difficultyColors[day.difficulty]}`} title={`Difficulty ${day.difficulty}/5`} />
          {isExpanded ? <ChevronUp size={16} className="text-gray-400" /> : <ChevronDown size={16} className="text-gray-400" />}
        </div>
      </button>

      {/* Expanded content */}
      {isExpanded && (
        <div className="border-t border-gray-800 p-4 space-y-5">
          {/* CRVR tasks */}
          <div>
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">CRVR Daily Tasks</h3>
            <div className="space-y-2">
              {tasks.map(task => {
                const config = taskTypeConfig[task.type];
                const Icon = config.icon;
                const done = completedTasks.includes(task.id);
                return (
                  <button
                    key={task.id}
                    onClick={() => onToggleTask(task.id)}
                    className={`w-full flex items-center gap-3 p-3 rounded-lg border transition-all text-left ${
                      done ? 'bg-gray-800/60 border-gray-700 opacity-70' : `${config.bg} border`
                    }`}
                  >
                    {done
                      ? <CheckCircle2 size={16} className="text-green-400 flex-shrink-0" />
                      : <Circle size={16} className={`${config.color} flex-shrink-0`} />
                    }
                    <Icon size={14} className={`${config.color} flex-shrink-0`} />
                    <span className={`text-sm font-medium ${config.color}`}>{config.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Consume */}
          <Section title="📺 Consume" color="blue">
            <div className="space-y-1">
              {day.consume.map((item, i) => (
                <div key={i} className="text-sm text-gray-300 flex items-start gap-2">
                  <span className="text-blue-400 flex-shrink-0">•</span> {item}
                </div>
              ))}
            </div>
            <div className="mt-3">
              <div className="text-xs text-gray-500 mb-1">Platforms:</div>
              <div className="flex flex-wrap gap-1">
                {day.platforms.map((p, i) => (
                  <span key={i} className="text-xs bg-blue-900/30 text-blue-300 px-2 py-0.5 rounded-full">{p}</span>
                ))}
              </div>
            </div>
            <div className="mt-3">
              <div className="text-xs text-gray-500 mb-1">🔍 Search Keywords:</div>
              <div className="space-y-1">
                {day.searchKeywords.map((kw, i) => (
                  <div key={i} className="text-xs bg-gray-800 text-gray-300 px-2 py-1 rounded font-mono flex items-center gap-2">
                    <Search size={10} className="text-gray-500" /> {kw}
                  </div>
                ))}
              </div>
            </div>
          </Section>

          {/* Recreate */}
          <Section title="🎬 Recreate" color="purple">
            <p className="text-sm text-gray-300">{day.recreate}</p>
          </Section>

          {/* Variation */}
          <Section title="✨ Variation" color="pink">
            <p className="text-sm text-gray-300">{day.variation}</p>
          </Section>

          {/* Output */}
          <Section title="📤 Output" color="green">
            <p className="text-sm text-gray-300">{day.output}</p>
          </Section>

          {/* Reflect */}
          <Section title="💭 Reflection Prompts" color="yellow">
            <ul className="space-y-1">
              {day.reflectionPrompts.map((prompt, i) => (
                <li key={i} className="text-sm text-gray-300 flex items-start gap-2">
                  <span className="text-yellow-400 flex-shrink-0 mt-0.5">→</span> {prompt}
                </li>
              ))}
            </ul>
          </Section>

          {/* Tools */}
          <Section title="🔧 Tools Covered" color="gray">
            <div className="flex flex-wrap gap-1">
              {day.tools.map((tool, i) => (
                <span key={i} className="text-xs bg-gray-800 text-gray-300 px-2 py-0.5 rounded border border-gray-700">{tool}</span>
              ))}
            </div>
          </Section>

          {/* Time tracking */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs text-gray-400 block mb-1">Consume Minutes</label>
              <input
                type="number"
                min="0"
                max="120"
                value={progress?.consumeMinutes || 0}
                onChange={e => onMinutesChange('consumeMinutes', parseInt(e.target.value) || 0)}
                className="w-full bg-gray-800 border border-gray-700 text-gray-200 px-3 py-2 rounded-lg text-sm focus:outline-none focus:border-purple-500"
              />
            </div>
            <div>
              <label className="text-xs text-gray-400 block mb-1">Practice Minutes</label>
              <input
                type="number"
                min="0"
                max="120"
                value={progress?.practiceMinutes || 0}
                onChange={e => onMinutesChange('practiceMinutes', parseInt(e.target.value) || 0)}
                className="w-full bg-gray-800 border border-gray-700 text-gray-200 px-3 py-2 rounded-lg text-sm focus:outline-none focus:border-purple-500"
              />
            </div>
          </div>

          {/* Ratings */}
          <div className="grid grid-cols-2 gap-3">
            <RatingInput
              label="Difficulty Rating"
              value={progress?.difficultyRating || 0}
              onChange={v => onRatingChange('difficultyRating', v)}
              color="orange"
            />
            <RatingInput
              label="Confidence Rating"
              value={progress?.confidenceRating || 0}
              onChange={v => onRatingChange('confidenceRating', v)}
              color="green"
            />
          </div>

          {/* Notes */}
          <div>
            <label className="text-xs text-gray-400 block mb-1">Session Notes</label>
            <textarea
              value={progress?.notes || ''}
              onChange={e => onNotesChange(e.target.value)}
              placeholder="Write what worked, what failed, and what to repeat..."
              className="w-full bg-gray-800 border border-gray-700 text-gray-200 px-3 py-2 rounded-lg text-sm focus:outline-none focus:border-purple-500 min-h-[80px] resize-y"
            />
          </div>

          {/* Mark complete */}
          {!isComplete && taskCount >= 3 && (
            <button
              onClick={onMarkComplete}
              className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2"
            >
              <CheckCircle2 size={16} /> Mark Day Complete
            </button>
          )}
          {isComplete && (
            <div className="flex items-center justify-center gap-2 text-green-400 text-sm bg-green-900/20 border border-green-700/40 rounded-lg py-2">
              <CheckCircle2 size={16} /> Day Completed!
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function Section({ title, color, children }: { title: string; color: string; children: React.ReactNode }) {
  const borderColors: Record<string, string> = {
    blue: 'border-blue-700/30',
    purple: 'border-purple-700/30',
    pink: 'border-pink-700/30',
    green: 'border-green-700/30',
    yellow: 'border-yellow-700/30',
    gray: 'border-gray-700/30',
  };
  return (
    <div className={`border-l-2 ${borderColors[color] || borderColors.gray} pl-3`}>
      <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">{title}</h4>
      {children}
    </div>
  );
}

function RatingInput({ label, value, onChange, color }: { label: string; value: number; onChange: (v: number) => void; color: string }) {
  const colors: Record<string, string> = { orange: 'text-orange-400', green: 'text-green-400' };
  return (
    <div>
      <label className="text-xs text-gray-400 block mb-1">{label}</label>
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map(v => (
          <button
            key={v}
            onClick={() => onChange(v)}
            className={`flex-1 h-8 rounded text-xs font-medium transition-colors ${
              value >= v
                ? `bg-${color}-600 ${colors[color]} text-white`
                : 'bg-gray-800 text-gray-600 hover:bg-gray-700'
            }`}
          >
            {v}
          </button>
        ))}
      </div>
    </div>
  );
}
