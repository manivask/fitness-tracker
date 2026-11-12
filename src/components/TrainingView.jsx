import React, { useState } from 'react';
import { 
  CheckCircle2, 
  Circle, 
  Info, 
  AlertTriangle, 
  Layers, 
  Sparkles,
  Users,
  Flame,
  Zap
} from 'lucide-react';
import { trainingSplits, trainingGeneralNotes } from '../data/workoutData';
import ActiveTimer from './ActiveTimer';

export default function TrainingView({ 
  currentUserId, 
  user,
  loggedWorkoutSets, 
  onToggleWorkoutSet, 
  onUpdateCustomNote 
}) {
  const [selectedDayId, setSelectedDayId] = useState('day-1');
  const [showCoachNotes, setShowCoachNotes] = useState(false);

  const activeSplit = trainingSplits.find(d => d.id === selectedDayId) || trainingSplits[0];

  // Total estimated calories burned for the entire active session for this specific member
  const totalSessionBurn = activeSplit.estimatedBurnByMember?.[currentUserId] || 300;

  // Calculate calories burned from completed exercises
  const allExercises = activeSplit.sections.flatMap(s => s.exercises);
  const completedCaloriesBurned = allExercises.reduce((total, ex) => {
    // Check if at least 1 set is completed
    const isCompleted = loggedWorkoutSets[`${currentUserId}-${ex.id}-set-1`];
    if (isCompleted) {
      const exBurn = ex.caloriesBurn?.[currentUserId] || 20;
      return total + exBurn;
    }
    return total;
  }, 0);

  return (
    <div className="space-y-6">
      {/* Partner Notice & Calorie Header Banner */}
      <div className="p-4 sm:p-5 rounded-2xl bg-zinc-900/80 border border-zinc-800 flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs sm:text-sm shadow-md">
        <div className="flex items-center gap-3 text-zinc-300">
          <div className="p-2.5 rounded-xl bg-lime-400/10 text-lime-400 shrink-0">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <div className="font-extrabold text-white text-sm sm:text-base">
              Synchronized Partner Training • Member: <span className="text-lime-400">{user.name}</span>
            </div>
            <p className="text-zinc-400 mt-0.5 leading-snug">
              Workouts are calibrated for your weight and metabolic rate ({user.startWeight} kg base). Calorie burns are customized specifically for you.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 shrink-0 bg-zinc-950/80 border border-zinc-800 p-2.5 px-4 rounded-xl">
          <Flame className="w-5 h-5 text-amber-400 animate-pulse" />
          <div>
            <div className="text-[11px] text-zinc-400 uppercase font-semibold">Session Burn Target</div>
            <div className="text-base sm:text-lg font-mono font-extrabold text-amber-400">
              ~{totalSessionBurn} kcal <span className="text-xs text-zinc-400 font-sans font-normal">({completedCaloriesBurned} logged)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Day Selector Tabs - High Contrast & Touch/Tab Friendly */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
        {trainingSplits.map((day) => {
          const isSelected = day.id === selectedDayId;
          const dayBurn = day.estimatedBurnByMember?.[currentUserId] || 300;

          return (
            <button
              key={day.id}
              onClick={() => setSelectedDayId(day.id)}
              className={`p-4 sm:p-5 rounded-2xl border text-left transition-all relative overflow-hidden group ${
                isSelected
                  ? 'bg-zinc-900 border-lime-400/80 shadow-lg shadow-lime-400/15 ring-2 ring-lime-400/40'
                  : 'bg-zinc-900/60 border-zinc-800/80 hover:bg-zinc-800/50 hover:border-zinc-700'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className={`text-xs sm:text-sm font-mono font-bold px-2.5 py-0.5 rounded-md ${
                  isSelected ? 'bg-lime-400 text-zinc-950 font-extrabold' : 'bg-zinc-800 text-zinc-400'
                }`}>
                  DAY {day.dayNumber}
                </span>
                <span className="text-xs font-mono font-bold text-amber-400 flex items-center gap-1">
                  <Flame className="w-3 h-3" /> ~{dayBurn} kcal
                </span>
              </div>
              <div className="font-extrabold text-white text-sm sm:text-base line-clamp-1 group-hover:text-lime-300 transition-colors">
                {day.category}
              </div>
              <div className="text-xs text-zinc-400 mt-1 flex items-center justify-between">
                <span>{day.sections.reduce((c, s) => c + s.exercises.length, 0)} Movements</span>
                <span>{day.duration}</span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Split Header & Instructions */}
      <div className="bg-gradient-to-r from-zinc-900 via-zinc-900 to-zinc-950 border border-zinc-800 rounded-3xl p-5 sm:p-7 relative overflow-hidden shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold uppercase tracking-wider text-lime-400 mb-1">
              <Sparkles className="w-4 h-4" />
              <span>Phase 1 Training Protocol</span>
            </div>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-white tracking-tight">{activeSplit.title}</h2>
            <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs sm:text-sm text-zinc-400 mt-2.5">
              <span className="bg-zinc-800 px-3 py-1 rounded-lg border border-zinc-700/50 font-medium text-zinc-200">
                Focus: {activeSplit.category}
              </span>
              <span className="bg-zinc-800 px-3 py-1 rounded-lg border border-zinc-700/50 font-medium text-zinc-200">
                Duration: {activeSplit.duration}
              </span>
              <span className="bg-zinc-800 px-3 py-1 rounded-lg border border-zinc-700/50 font-bold text-amber-400 flex items-center gap-1.5">
                <Flame className="w-3.5 h-3.5" /> Est. Session Burn: {totalSessionBurn} kcal ({user.shortName})
              </span>
              <span className="bg-zinc-800 px-3 py-1 rounded-lg border border-zinc-700/50 font-bold text-lime-400">
                Sets Rule: 2 sets (Weeks 1-2) → 3 sets (Week 3+)
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowCoachNotes(!showCoachNotes)}
              className="text-xs sm:text-sm bg-zinc-800 hover:bg-zinc-700 text-zinc-200 px-4 py-2.5 rounded-xl font-bold border border-zinc-700 flex items-center gap-2 transition-colors"
            >
              <Info className="w-4 h-4 text-lime-400" />
              {showCoachNotes ? 'Hide Rules' : 'Coach Rules'}
            </button>
          </div>
        </div>

        {/* Special split note if exists */}
        {activeSplit.specialTrackingNote && (
          <div className="mt-4 p-3.5 bg-amber-500/10 border border-amber-500/30 rounded-xl text-xs sm:text-sm text-amber-200 flex items-start gap-2.5">
            <AlertTriangle className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-amber-300">Form & Tracking Priority: </span>
              {activeSplit.specialTrackingNote}
            </div>
          </div>
        )}

        {/* General coach rules */}
        {showCoachNotes && (
          <div className="mt-4 pt-4 border-t border-zinc-800/80">
            <h4 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-zinc-400 mb-2">Fundamental Execution Principles</h4>
            <ul className="space-y-2 text-xs sm:text-sm text-zinc-300">
              {trainingGeneralNotes.map((note, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-lime-400 font-bold">•</span>
                  <span>{note}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Floating / Active Rest Timer */}
      <ActiveTimer defaultSeconds={60} />

      {/* Workout Sections */}
      <div className="space-y-6">
        {activeSplit.sections.map((section, sIdx) => (
          <div key={sIdx} className="space-y-3">
            <div className="flex items-center justify-between px-1">
              <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-zinc-400 flex items-center gap-2">
                <Layers className="w-4 h-4 text-lime-400" />
                {section.title}
              </h3>
              <span className="text-xs text-zinc-500">{section.exercises.length} exercises</span>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:gap-4">
              {section.exercises.map((exercise) => {
                const maxSets = exercise.maxSets || exercise.sets || 2;
                const setsArr = Array.from({ length: maxSets }, (_, i) => i + 1);
                const exBurn = exercise.caloriesBurn?.[currentUserId] || 20;

                return (
                  <div 
                    key={exercise.id}
                    className="p-4 sm:p-5 rounded-2xl bg-zinc-900/80 border border-zinc-800/80 hover:border-zinc-700/80 transition-all shadow-md"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <h4 className="font-extrabold text-white text-base sm:text-lg">{exercise.name}</h4>
                          <span className="text-xs font-mono font-bold bg-amber-500/10 text-amber-400 border border-amber-500/30 px-2.5 py-0.5 rounded-lg flex items-center gap-1">
                            <Flame className="w-3 h-3 fill-current" /> ~{exBurn} kcal
                          </span>
                          {exercise.highlightFirstSet && (
                            <span className="text-[11px] bg-amber-400/10 text-amber-300 border border-amber-400/30 px-2.5 py-0.5 rounded-md font-semibold">
                              Log Set 1 Duration
                            </span>
                          )}
                        </div>
                        <p className="text-xs sm:text-sm text-zinc-400 mt-1 leading-snug">{exercise.notes}</p>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <span className="text-xs sm:text-sm font-mono bg-zinc-800 px-3 py-1 rounded-lg text-zinc-300 border border-zinc-700/50">
                          Load: <strong className="text-lime-400 font-bold">{exercise.load}</strong>
                        </span>
                        <span className="text-xs sm:text-sm font-mono bg-zinc-800 px-3 py-1 rounded-lg text-zinc-300 border border-zinc-700/50">
                          Target: <strong className="text-white font-bold">{exercise.reps}</strong>
                        </span>
                      </div>
                    </div>

                    {/* Interactive Set Checkers & Loggers - Touch optimized button sizes */}
                    <div className="mt-4 pt-3.5 border-t border-zinc-800/80 flex flex-wrap items-center justify-between gap-3">
                      <div className="flex items-center gap-2.5 flex-wrap">
                        <span className="text-xs sm:text-sm text-zinc-400 font-medium">Log Sets:</span>
                        {setsArr.map((setNum) => {
                          const setKey = `${currentUserId}-${exercise.id}-set-${setNum}`;
                          const isDone = !!loggedWorkoutSets[setKey];

                          return (
                            <button
                              key={setNum}
                              onClick={() => onToggleWorkoutSet(setKey)}
                              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all border ${
                                isDone
                                  ? 'bg-lime-400 text-zinc-950 border-lime-400 shadow-md shadow-lime-400/20'
                                  : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700'
                              }`}
                            >
                              {isDone ? (
                                <CheckCircle2 className="w-4 h-4 fill-current" />
                              ) : (
                                <Circle className="w-4 h-4 text-zinc-600" />
                              )}
                              <span>Set {setNum}</span>
                            </button>
                          );
                        })}
                      </div>

                      {/* Log hold time or weight note */}
                      <div className="flex items-center gap-2 w-full sm:w-auto">
                        <input
                          type="text"
                          placeholder={exercise.isTimed ? "Log hold time (e.g. 45s)" : "Logged reps / load"}
                          value={loggedWorkoutSets[`${currentUserId}-${exercise.id}-note`] || ''}
                          onChange={(e) => onUpdateCustomNote(`${currentUserId}-${exercise.id}-note`, e.target.value)}
                          className="w-full sm:w-48 bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2 text-xs sm:text-sm text-zinc-200 placeholder-zinc-600 focus:outline-none focus:border-lime-400/70 font-mono"
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
