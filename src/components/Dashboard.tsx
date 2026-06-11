import React from 'react';
import {
  Flame, TrendingUp, Wrench, BookOpen, FolderKanban,
  PlayCircle, Plus, Bot, ArrowRight, CheckCircle2, Clock, Star
} from 'lucide-react';
import { useAppStore } from '../store/appStore';
import { getDayData } from '../data/curriculum';

const statusScore: Record<string, number> = {
  'not-started': 0, watched: 1, recreated: 2, 'used-independently': 3, 'can-explain': 4,
};

export default function Dashboard() {
  const {
    currentDay, dayProgress, toolMastery, references, projects,
    streak, setCurrentSection, setCurrentDay
  } = useAppStore();

  const todayData = getDayData(currentDay);

  // Calculate stats
  const totalDays = 90;
  const completedDays = Object.values(dayProgress).filter(d => d.completedAt).length;
  const overallProgress = (completedDays / totalDays) * 100;

  const month1Complete = Object.values(dayProgress)
    .filter(d => d.completedAt && d.day <= 30).length;
  const month2Complete = Object.values(dayProgress)
    .filter(d => d.completedAt && d.day > 30 && d.day <= 66).length;
  const month3Complete = Object.values(dayProgress)
    .filter(d => d.completedAt && d.day > 66).length;

  const totalConsumeMinutes = Object.values(dayProgress)
    .reduce((sum, d) => sum + (d.consumeMinutes || 0), 0);
  const totalPracticeMinutes = Object.values(dayProgress)
    .reduce((sum, d) => sum + (d.practiceMinutes || 0), 0);
  const consumePracticeRatio = totalConsumeMinutes > 0
    ? (totalConsumeMinutes / Math.max(totalPracticeMinutes, 1)).toFixed(1)
    : '0';

  // Tool mastery average
  const toolScores = Object.values(toolMastery).map(t => statusScore[t.status] || 0);
  const avgToolScore = toolScores.length > 0
    ? (toolScores.reduce((a, b) => a + b, 0) / toolScores.length).toFixed(1)
    : '0';



  // Today's tasks
  const todayProgress = dayProgress[currentDay];
  const todayTasks = todayData ? [
    { id: 'consume', label: 'Consume: ' + (todayData.consume[0] || ''), type: 'consume' },
    { id: 'recreate', label: 'Recreate: ' + todayData.recreate.slice(0, 60) + '...', type: 'recreate' },
    { id: 'variation', label: 'Variation: ' + todayData.variation.slice(0, 60) + '...', type: 'variation' },
    { id: 'reflect', label: 'Reflect on today\'s work', type: 'reflect' },
    { id: 'export', label: 'Export / save project', type: 'export' },
  ] : [];

  const completedTasks = todayProgress?.tasksCompleted || [];
  const todayCompletedCount = completedTasks.length;
  const todayTotalCount = todayTasks.length;

  // Weak tools (confidence < 3, not not-started)
  const weakTools = Object.values(toolMastery)
    .filter(t => t.status !== 'not-started' && t.confidence < 3)
    .slice(0, 3);

  const taskTypeColors: Record<string, string> = {
    consume: 'text-blue-400',
    recreate: 'text-purple-400',
    variation: 'text-pink-400',
    reflect: 'text-yellow-400',
    export: 'text-green-400',
  };

  return (
    <div className="p-4 lg:p-6 space-y-6 pb-24 lg:pb-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Dashboard</h1>
          <p className="text-gray-400 text-sm mt-1">
            {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
          </p>
        </div>
        <div className="text-right">
          <div className="text-3xl font-bold text-purple-400">Day {currentDay}</div>
          <div className="text-gray-400 text-sm">
            Month {todayData?.month || 1} · Week {todayData?.week || 1}
          </div>
        </div>
      </div>

      {/* Today's focus */}
      {todayData && (
        <div className="bg-gradient-to-r from-purple-900/40 to-pink-900/40 border border-purple-700/40 rounded-xl p-5">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="text-xs text-purple-300 font-medium mb-1 uppercase tracking-wide">Today's Focus</div>
              <h2 className="text-lg font-bold text-white">{todayData.focus}</h2>
              <p className="text-gray-300 text-sm mt-1">{todayData.goal}</p>
              <div className="flex items-center gap-3 mt-3">
                <span className="text-xs bg-purple-800/60 text-purple-300 px-2 py-1 rounded-full flex items-center gap-1">
                  <Clock size={10} /> {todayData.estimatedMinutes} min
                </span>
                <span className="text-xs bg-gray-800 text-gray-400 px-2 py-1 rounded-full">
                  Difficulty {todayData.difficulty}/5
                </span>
                {todayData.isWeeklyProject && (
                  <span className="text-xs bg-green-800/60 text-green-300 px-2 py-1 rounded-full">📦 Mini Project</span>
                )}
                {todayData.isFinalProject && (
                  <span className="text-xs bg-yellow-800/60 text-yellow-300 px-2 py-1 rounded-full">🏆 Final Project</span>
                )}
              </div>
            </div>
            <div className="ml-4">
              <div className="relative w-16 h-16">
                <svg className="w-16 h-16 -rotate-90" viewBox="0 0 64 64">
                  <circle cx="32" cy="32" r="28" fill="none" stroke="#374151" strokeWidth="6" />
                  <circle
                    cx="32" cy="32" r="28" fill="none" stroke="#a855f7" strokeWidth="6"
                    strokeDasharray={`${(todayCompletedCount / todayTotalCount) * 175.9} 175.9`}
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-xs font-bold text-white">{todayCompletedCount}/{todayTotalCount}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Today checklist */}
          <div className="mt-4 space-y-2">
            {todayTasks.map(task => (
              <div key={task.id} className="flex items-center gap-3">
                <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                  completedTasks.includes(task.id)
                    ? 'bg-green-500 border-green-500'
                    : 'border-gray-600'
                }`}>
                  {completedTasks.includes(task.id) && <CheckCircle2 size={10} className="text-white" />}
                </div>
                <span className={`text-sm ${completedTasks.includes(task.id) ? 'line-through text-gray-500' : 'text-gray-300'}`}>
                  <span className={`font-medium ${taskTypeColors[task.type] || 'text-gray-400'}`}>
                    {task.type.charAt(0).toUpperCase() + task.type.slice(1)}:
                  </span>{' '}
                  {task.label.replace(/^[^:]+: /, '')}
                </span>
              </div>
            ))}
          </div>

          <button
            onClick={() => { setCurrentSection('plan'); setCurrentDay(currentDay); }}
            className="mt-4 w-full bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2"
          >
            <PlayCircle size={16} /> Open Today's Session
          </button>
        </div>
      )}

      {/* Stats grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <StatCard
          label="Streak"
          value={streak.toString()}
          unit="days"
          icon={<Flame size={18} className="text-orange-400" />}
          color="orange"
        />
        <StatCard
          label="Progress"
          value={`${completedDays}`}
          unit="/ 90 days"
          icon={<TrendingUp size={18} className="text-green-400" />}
          color="green"
        />
        <StatCard
          label="References"
          value={references.length.toString()}
          unit="saved"
          icon={<BookOpen size={18} className="text-blue-400" />}
          color="blue"
        />
        <StatCard
          label="Projects"
          value={projects.length.toString()}
          unit="exported"
          icon={<FolderKanban size={18} className="text-pink-400" />}
          color="pink"
        />
      </div>

      {/* Progress bars */}
      <div className="bg-gray-900 rounded-xl p-5 border border-gray-800">
        <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
          <TrendingUp size={16} className="text-purple-400" /> 90-Day Progress
        </h3>

        <div className="mb-4">
          <div className="flex justify-between text-sm mb-1">
            <span className="text-gray-400">Overall</span>
            <span className="text-white font-medium">{completedDays}/90 days</span>
          </div>
          <div className="h-3 bg-gray-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transition-all duration-500"
              style={{ width: `${overallProgress}%` }}
            />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3">
          {[
            { month: 1, completed: month1Complete, total: 30, color: 'from-blue-500 to-blue-400', label: 'Month 1' },
            { month: 2, completed: month2Complete, total: 36, color: 'from-purple-500 to-purple-400', label: 'Month 2' },
            { month: 3, completed: month3Complete, total: 24, color: 'from-pink-500 to-pink-400', label: 'Month 3' },
          ].map(m => (
            <div key={m.month}>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-gray-400">{m.label}</span>
                <span className="text-gray-300">{m.completed}/{m.total}</span>
              </div>
              <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                <div
                  className={`h-full bg-gradient-to-r ${m.color} rounded-full transition-all`}
                  style={{ width: `${(m.completed / m.total) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* More stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-4">
          <div className="text-xs text-gray-400 mb-1">Consume Time</div>
          <div className="text-xl font-bold text-blue-400">{totalConsumeMinutes}</div>
          <div className="text-xs text-gray-500">minutes total</div>
        </div>
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-4">
          <div className="text-xs text-gray-400 mb-1">Practice Time</div>
          <div className="text-xl font-bold text-purple-400">{totalPracticeMinutes}</div>
          <div className="text-xs text-gray-500">minutes total</div>
        </div>
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-4">
          <div className="text-xs text-gray-400 mb-1">C:P Ratio</div>
          <div className={`text-xl font-bold ${parseFloat(consumePracticeRatio) > 1.5 ? 'text-orange-400' : 'text-green-400'}`}>
            {consumePracticeRatio}:1
          </div>
          <div className="text-xs text-gray-500">consume:practice</div>
        </div>
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-4">
          <div className="text-xs text-gray-400 mb-1">Tool Mastery</div>
          <div className="text-xl font-bold text-pink-400">{avgToolScore}/4</div>
          <div className="text-xs text-gray-500">avg score</div>
        </div>
      </div>

      {/* Recommendations */}
      <RecommendationsPanel
        consumeTime={totalConsumeMinutes}
        practiceTime={totalPracticeMinutes}
        weakTools={weakTools}
        references={references.length}
        projects={projects.length}
        dayProgress={dayProgress}
        currentDay={currentDay}
      />

      {/* Quick Actions */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
        <h3 className="font-semibold text-white mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
          {[
            { label: 'Start Today', icon: PlayCircle, color: 'purple', action: () => { setCurrentSection('plan'); } },
            { label: 'Add Reference', icon: Plus, color: 'blue', action: () => setCurrentSection('references') },
            { label: 'Add Project', icon: Plus, color: 'green', action: () => setCurrentSection('projects') },
            { label: 'Ask AI Coach', icon: Bot, color: 'pink', action: () => setCurrentSection('ai-coach') },
            { label: 'Review Tools', icon: Wrench, color: 'yellow', action: () => setCurrentSection('tools') },
            { label: 'Export Backup', icon: ArrowRight, color: 'gray', action: () => setCurrentSection('backup') },
          ].map(item => (
            <button
              key={item.label}
              onClick={item.action}
              className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 border border-gray-700 hover:border-gray-600 rounded-lg px-3 py-3 text-sm text-gray-300 hover:text-white transition-all"
            >
              <item.icon size={16} className={`text-${item.color}-400`} />
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* Anti-tutorial-trap rules */}
      <div className="bg-orange-950/30 border border-orange-700/40 rounded-xl p-4">
        <h3 className="font-semibold text-orange-300 mb-3 flex items-center gap-2">
          ⚠️ Anti-Tutorial-Trap Rules
        </h3>
        <ul className="space-y-2 text-sm text-orange-200/80">
          <li>• Never watch more than 2 tutorials without opening After Effects.</li>
          <li>• Every day should end with an export, screenshot, or saved project file.</li>
          <li>• Recreate once with guidance, then redo the core move from memory.</li>
          <li>• Add one original variation to every recreation.</li>
          <li>• Save references with notes, not just links.</li>
        </ul>
      </div>
    </div>
  );
}

function StatCard({ label, value, unit, icon, color }: {
  label: string; value: string; unit: string;
  icon: React.ReactNode; color: string;
}) {
  const borderColor = {
    orange: 'border-orange-700/40',
    green: 'border-green-700/40',
    blue: 'border-blue-700/40',
    pink: 'border-pink-700/40',
  }[color] || 'border-gray-700/40';

  return (
    <div className={`bg-gray-900 border ${borderColor} rounded-xl p-4`}>
      <div className="flex items-center gap-2 mb-2">{icon}<span className="text-xs text-gray-400">{label}</span></div>
      <div className="text-2xl font-bold text-white">{value}</div>
      <div className="text-xs text-gray-500">{unit}</div>
    </div>
  );
}

function RecommendationsPanel({ consumeTime, practiceTime, weakTools, references, projects, dayProgress, currentDay }: {
  consumeTime: number; practiceTime: number;
  weakTools: { tool: string; confidence: number }[];
  references: number; projects: number;
  dayProgress: Record<number, { completedAt?: string; tasksCompleted: string[] }>;
  currentDay: number;
}) {
  const recommendations: { text: string; type: 'warning' | 'info' | 'success' }[] = [];

  if (consumeTime > practiceTime * 1.5 && consumeTime > 0) {
    recommendations.push({ text: 'Your consume time is much higher than practice time. Open AE and recreate more today!', type: 'warning' });
  }

  const todayProgress = dayProgress[currentDay];
  if (todayProgress?.tasksCompleted.includes('recreate') && !todayProgress.tasksCompleted.includes('reflect')) {
    recommendations.push({ text: 'Practice done but no reflection yet. Reflect for 5 minutes to lock in your learning.', type: 'info' });
  }

  if (weakTools.length > 0) {
    recommendations.push({ text: `${weakTools[0].tool} has low confidence. Schedule a weak-tool repair session.`, type: 'warning' });
  }

  // Check if no reference added this week
  const thisWeek = new Date();
  thisWeek.setDate(thisWeek.getDate() - 7);
  if (references < 5) {
    recommendations.push({ text: 'Add more references to your vault. Aim for 5+ this week.', type: 'info' });
  }

  if (projects === 0) {
    recommendations.push({ text: 'No projects exported yet. Finish one small export before learning more.', type: 'warning' });
  }

  if (recommendations.length === 0) {
    recommendations.push({ text: 'Great work! Keep following the CRVR loop: Consume → Recreate → Vary → Reflect.', type: 'success' });
  }

  const colors = {
    warning: 'border-orange-700/40 bg-orange-950/20 text-orange-200',
    info: 'border-blue-700/40 bg-blue-950/20 text-blue-200',
    success: 'border-green-700/40 bg-green-950/20 text-green-200',
  };

  const icons = { warning: '⚠️', info: 'ℹ️', success: '✅' };

  return (
    <div className="space-y-2">
      <h3 className="font-semibold text-white flex items-center gap-2">
        <Star size={16} className="text-yellow-400" /> Recommendations
      </h3>
      {recommendations.map((rec, i) => (
        <div key={i} className={`border rounded-lg px-4 py-3 text-sm ${colors[rec.type]}`}>
          {icons[rec.type]} {rec.text}
        </div>
      ))}
    </div>
  );
}
