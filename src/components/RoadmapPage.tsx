import { useState } from 'react';
import { CheckCircle2, Target, Trophy } from 'lucide-react';
import { useAppStore } from '../store/appStore';
import { allDays } from '../data/curriculum';

const monthColors = [
  { bg: 'bg-blue-900/30', border: 'border-blue-700/40', text: 'text-blue-400', dot: 'bg-blue-500', glow: 'shadow-blue-500/20' },
  { bg: 'bg-purple-900/30', border: 'border-purple-700/40', text: 'text-purple-400', dot: 'bg-purple-500', glow: 'shadow-purple-500/20' },
  { bg: 'bg-pink-900/30', border: 'border-pink-700/40', text: 'text-pink-400', dot: 'bg-pink-500', glow: 'shadow-pink-500/20' },
];

const monthOutcomes = [
  '15–30 sec beginner edit with text animation, shapes, masks, transitions, color, sound, and basic tracking/roto/composite attempt.',
  '30–45 sec modern edit or product/social ad with advanced typography, transitions, camera, tracking/compositing, and sound design.',
  '3 portfolio projects + 1 final 45–60 sec showreel/demo edit.',
];

const monthGoals = [
  'Build strong AE fundamentals and creative observation habits.',
  'Move from beginner to real systems: animation principles, advanced motion, VFX, compositing, templates, and speed workflow.',
  'Convert skills into portfolio-ready ability. Build production workflow, reusable systems, and a final showreel.',
];

export default function RoadmapPage() {
  const { dayProgress, currentDay, setCurrentDay, setCurrentSection } = useAppStore();
  const [hoveredDay, setHoveredDay] = useState<number | null>(null);

  const months = [1, 2, 3] as const;

  return (
    <div className="p-4 lg:p-6 pb-24 lg:pb-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white">Roadmap View</h1>
        <p className="text-gray-400 text-sm mt-1">Visual 90-day journey overview</p>
      </div>

      {/* Overall progress bar */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-5 mb-6">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-semibold text-white">Overall 90-Day Journey</span>
          <span className="text-sm text-gray-400">
            {Object.values(dayProgress).filter(d => d.completedAt).length} / 90 days
          </span>
        </div>
        <div className="h-4 bg-gray-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full transition-all duration-700"
            style={{ width: `${(Object.values(dayProgress).filter(d => d.completedAt).length / 90) * 100}%` }}
          />
        </div>
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>Start</span>
          <span>Month 1</span>
          <span>Month 2</span>
          <span>Month 3</span>
          <span>Showreel 🎬</span>
        </div>
      </div>

      {/* Month sections */}
      <div className="space-y-8">
        {months.map(month => {
          const monthDays = allDays.filter(d => d.month === month);
          const completed = monthDays.filter(d => dayProgress[d.day]?.completedAt).length;
          const colors = monthColors[month - 1];
          const weeks = [...new Set(monthDays.map(d => d.week))];

          return (
            <div key={month} className={`${colors.bg} border ${colors.border} rounded-xl p-5`}>
              {/* Month header */}
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${colors.dot}`} />
                    <h2 className={`text-lg font-bold ${colors.text}`}>Month {month}</h2>
                  </div>
                  <p className="text-gray-300 text-sm mt-1">{monthGoals[month - 1]}</p>
                </div>
                <div className="text-right">
                  <div className={`text-2xl font-bold ${colors.text}`}>{completed}/{monthDays.length}</div>
                  <div className="text-xs text-gray-400">days done</div>
                </div>
              </div>

              {/* Progress */}
              <div className="h-2 bg-black/30 rounded-full overflow-hidden mb-4">
                <div
                  className={`h-full ${colors.dot} rounded-full transition-all duration-500`}
                  style={{ width: `${(completed / monthDays.length) * 100}%` }}
                />
              </div>

              {/* Final output */}
              <div className={`flex items-start gap-2 p-3 rounded-lg bg-black/20 mb-4`}>
                <Trophy size={14} className={`${colors.text} flex-shrink-0 mt-0.5`} />
                <div>
                  <div className={`text-xs font-semibold ${colors.text} mb-0.5`}>Month {month} Final Output</div>
                  <p className="text-gray-300 text-xs">{monthOutcomes[month - 1]}</p>
                </div>
              </div>

              {/* Weeks */}
              <div className="space-y-4">
                {weeks.map(week => {
                  const weekDays = monthDays.filter(d => d.week === week);
                  const weekCompleted = weekDays.filter(d => dayProgress[d.day]?.completedAt).length;

                  return (
                    <div key={week}>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs font-medium text-gray-400">Week {week}</span>
                        <div className="flex-1 h-px bg-gray-700/50" />
                        <span className="text-xs text-gray-500">{weekCompleted}/{weekDays.length}</span>
                      </div>

                      <div className="grid grid-cols-7 gap-1.5">
                        {weekDays.map(day => {
                          const isDone = !!dayProgress[day.day]?.completedAt;
                          const isCurrent = day.day === currentDay;
                          const isHovered = hoveredDay === day.day;

                          return (
                            <div key={day.day} className="relative">
                              <button
                                onClick={() => { setCurrentDay(day.day); setCurrentSection('plan'); }}
                                onMouseEnter={() => setHoveredDay(day.day)}
                                onMouseLeave={() => setHoveredDay(null)}
                                className={`
                                  w-full aspect-square rounded-lg flex flex-col items-center justify-center
                                  text-xs font-bold transition-all duration-200
                                  ${isDone
                                    ? `${colors.dot} text-white shadow-md ${colors.glow}`
                                    : isCurrent
                                    ? 'bg-white text-gray-900 shadow-lg'
                                    : 'bg-gray-800/60 text-gray-500 hover:bg-gray-700/60 hover:text-gray-300'
                                  }
                                `}
                                title={`Day ${day.day}: ${day.focus}`}
                              >
                                {isDone ? <CheckCircle2 size={12} /> : day.day}
                                {isCurrent && !isDone && (
                                  <div className="absolute -top-1 -right-1 w-2 h-2 bg-purple-400 rounded-full" />
                                )}
                              </button>

                              {/* Tooltip */}
                              {isHovered && (
                                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 z-50 pointer-events-none">
                                  <div className="bg-gray-900 border border-gray-700 rounded-lg p-2 text-xs whitespace-nowrap shadow-xl">
                                    <div className="font-bold text-white">Day {day.day}</div>
                                    <div className="text-gray-300">{day.focus}</div>
                                    {day.isWeeklyProject && <div className="text-green-400">📦 Mini Project</div>}
                                    {day.isFinalProject && <div className="text-yellow-400">🏆 Final</div>}
                                    {day.isReviewDay && <div className="text-blue-400">📋 Review</div>}
                                  </div>
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Milestone legend */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-4 mt-6">
        <h3 className="text-sm font-semibold text-white mb-3">Key Milestones</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {allDays.filter(d => d.isWeeklyProject || d.isFinalProject).map(day => {
            const isDone = !!dayProgress[day.day]?.completedAt;
            return (
              <button
                key={day.day}
                onClick={() => { setCurrentDay(day.day); setCurrentSection('plan'); }}
                className={`flex items-center gap-3 p-3 rounded-lg border text-left transition-colors ${
                  isDone
                    ? 'bg-green-900/20 border-green-700/40'
                    : 'bg-gray-800/60 border-gray-700 hover:border-gray-600'
                }`}
              >
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                  day.isFinalProject ? 'bg-yellow-800/60' : 'bg-green-800/60'
                }`}>
                  {day.isFinalProject ? <Trophy size={14} className="text-yellow-400" /> : <Target size={14} className="text-green-400" />}
                </div>
                <div className="min-w-0">
                  <div className="text-xs font-medium text-white truncate">Day {day.day}: {day.focus}</div>
                  <div className="text-xs text-gray-500">{day.isFinalProject ? 'Final Project' : 'Mini Project'}</div>
                </div>
                {isDone && <CheckCircle2 size={14} className="text-green-400 flex-shrink-0 ml-auto" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-4 mt-4 text-xs text-gray-400">
        <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded bg-gray-800/60 border border-gray-700" /> Not started</div>
        <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded bg-white" /> Today</div>
        <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded bg-blue-500" /> M1 Complete</div>
        <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded bg-purple-500" /> M2 Complete</div>
        <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded bg-pink-500" /> M3 Complete</div>
      </div>
    </div>
  );
}
