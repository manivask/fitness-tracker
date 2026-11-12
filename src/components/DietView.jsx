import React, { useState } from 'react';
import { 
  Utensils, 
  CheckCircle2, 
  Circle, 
  Clock, 
  Camera, 
  Sparkles, 
  Info, 
  ChevronDown, 
  ChevronUp, 
  Flame, 
  Footprints,
  PieChart
} from 'lucide-react';

export default function DietView({ user, loggedDiet, onToggleDietItem }) {
  const [photoUploaded, setPhotoUploaded] = useState(false);
  const [showNotes, setShowNotes] = useState(true);

  // Calculate completion percentage and total planned calories
  const allItems = user.dietSections.flatMap(s => s.items);
  const totalItems = allItems.length;
  const completedCount = Object.values(loggedDiet).filter(Boolean).length;
  const progressPercent = Math.round((completedCount / (totalItems || 1)) * 100);

  // Total daily planned calories and macros
  const totalPlannedCalories = allItems.reduce((acc, it) => acc + (it.calories || 0), 0);
  const totalPlannedProtein = allItems.reduce((acc, it) => acc + (it.protein || 0), 0);
  const totalPlannedCarbs = allItems.reduce((acc, it) => acc + (it.carbs || 0), 0);
  const totalPlannedFat = allItems.reduce((acc, it) => acc + (it.fat || 0), 0);

  // Consumed calories so far
  const consumedCalories = allItems
    .filter(it => loggedDiet[it.id])
    .reduce((acc, it) => acc + (it.calories || 0), 0);

  return (
    <div className="space-y-6">
      {/* Diet Adherence Card with Calories & Macro Breakdown */}
      <div className="bg-gradient-to-br from-zinc-900 to-zinc-950 border border-zinc-800 rounded-3xl p-5 sm:p-7 relative overflow-hidden shadow-xl">
        <div className="absolute top-0 right-0 w-80 h-80 bg-lime-500/5 rounded-full blur-3xl pointer-events-none" />
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-5 relative z-10">
          <div>
            <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold uppercase tracking-wider text-lime-400 mb-1">
              <Sparkles className="w-4 h-4" />
              <span>Phase 1 Nutrition Protocol • {user.name}</span>
            </div>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-white tracking-tight">
              {user.dietBase} Weight Loss Plan
            </h2>
            <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs sm:text-sm text-zinc-400 mt-2">
              <span className="bg-zinc-800 px-3 py-1 rounded-lg border border-zinc-700/50 font-bold text-white">
                Planned: <strong className="text-lime-400 font-mono">{totalPlannedCalories} kcal</strong>
              </span>
              <span className="bg-zinc-800 px-3 py-1 rounded-lg border border-zinc-700/50 font-bold text-zinc-300">
                Protein: ~{totalPlannedProtein.toFixed(0)}g
              </span>
              <span className="bg-zinc-800 px-3 py-1 rounded-lg border border-zinc-700/50 font-bold text-zinc-300">
                Carbs: ~{totalPlannedCarbs.toFixed(0)}g
              </span>
              <span className="bg-zinc-800 px-3 py-1 rounded-lg border border-zinc-700/50 font-bold text-zinc-300">
                Fat: ~{totalPlannedFat.toFixed(0)}g
              </span>
            </div>
          </div>

          <div className="bg-zinc-900/90 border border-zinc-800/90 p-4 sm:p-5 rounded-2xl flex items-center gap-4 sm:gap-5 min-w-[260px] shadow-lg">
            <div className="relative w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center shrink-0">
              <svg className="w-16 h-16 sm:w-20 sm:h-20 transform -rotate-90">
                <circle
                  cx="40"
                  cy="40"
                  r="32"
                  stroke="#27272a"
                  strokeWidth="6"
                  fill="transparent"
                />
                <circle
                  cx="40"
                  cy="40"
                  r="32"
                  stroke="#a3e635"
                  strokeWidth="6"
                  strokeDasharray={201}
                  strokeDashoffset={201 - (201 * progressPercent) / 100}
                  strokeLinecap="round"
                  fill="transparent"
                  className="transition-all duration-500 ease-out"
                />
              </svg>
              <span className="absolute text-sm sm:text-base font-bold font-mono text-white">{progressPercent}%</span>
            </div>
            <div>
              <div className="text-xs text-zinc-400 font-medium">Logged Today</div>
              <div className="text-base sm:text-lg font-bold text-white tracking-tight">{consumedCalories} / {totalPlannedCalories} kcal</div>
              <div className="text-xs text-lime-400 font-semibold mt-0.5">
                {completedCount} of {totalItems} items checked
              </div>
            </div>
          </div>
        </div>

        {/* Coach Rules & Notes Dropdown */}
        <div className="mt-6 pt-5 border-t border-zinc-800/80">
          <button 
            onClick={() => setShowNotes(!showNotes)}
            className="flex items-center justify-between w-full text-left text-xs sm:text-sm font-semibold text-zinc-300 hover:text-white transition-colors"
          >
            <div className="flex items-center gap-2">
              <Info className="w-4 h-4 text-lime-400" />
              <span>Coach Guidelines & Specific Notes for {user.shortName}</span>
            </div>
            {showNotes ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>

          {showNotes && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-3">
              {user.dietNotes.map((note) => (
                <div key={note.id} className="p-3.5 bg-zinc-950/70 border border-zinc-800/80 rounded-xl text-xs sm:text-sm">
                  <div className="font-bold text-lime-400 mb-1">{note.label}</div>
                  <div className="text-zinc-300 leading-relaxed">{note.text}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Chronological Meal Sections */}
      <div className="space-y-4">
        {user.dietSections.map((section) => {
          const isSos = section.isSos;
          const sectionDone = section.items.every(it => loggedDiet[it.id]);
          const sectionCals = section.items.reduce((s, it) => s + (it.calories || 0), 0);

          return (
            <div 
              key={section.id}
              className={`rounded-2xl border transition-all duration-200 ${
                isSos 
                  ? 'bg-amber-950/20 border-amber-900/40' 
                  : sectionDone
                    ? 'bg-zinc-900/40 border-lime-500/30'
                    : 'bg-zinc-900/70 border-zinc-800/80 hover:border-zinc-700'
              } p-4 sm:p-5 shadow-lg backdrop-blur-md`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 mb-3 border-b border-zinc-800/60">
                <div className="flex items-center gap-2.5">
                  <div className={`p-2.5 rounded-xl ${
                    isSos ? 'bg-amber-400/10 text-amber-400' : 'bg-lime-400/10 text-lime-400'
                  }`}>
                    {isSos ? <Flame className="w-4 h-4 sm:w-5 sm:h-5" /> : <Utensils className="w-4 h-4 sm:w-5 sm:h-5" />}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-base sm:text-lg font-bold text-white">
                        {section.title}
                      </h3>
                      {sectionCals > 0 && (
                        <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-zinc-800 text-lime-300 border border-zinc-700/50">
                          ~{sectionCals} kcal
                        </span>
                      )}
                      {section.requiresPhoto && (
                        <span className="flex items-center gap-1 text-[11px] font-medium bg-purple-500/10 text-purple-400 border border-purple-500/20 px-2 py-0.5 rounded-full">
                          <Camera className="w-3 h-3" /> Photo Check-in
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-zinc-400 mt-0.5">
                      <Clock className="w-3.5 h-3.5 text-zinc-500" />
                      <span>{section.time}</span>
                    </div>
                  </div>
                </div>

                {/* Photo Check-in for Meal 2 */}
                {section.requiresPhoto && (
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setPhotoUploaded(!photoUploaded)}
                      className={`text-xs px-3.5 py-2 rounded-xl border flex items-center gap-1.5 font-semibold transition-all ${
                        photoUploaded 
                          ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-300'
                          : 'bg-zinc-800/60 border-zinc-700/60 text-zinc-300 hover:text-white hover:bg-zinc-800'
                      }`}
                    >
                      <Camera className="w-3.5 h-3.5" />
                      {photoUploaded ? 'Photo Captured ✓' : 'Log Plate Photo'}
                    </button>
                  </div>
                )}
              </div>

              {/* Items List */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {section.items.map((item) => {
                  const isChecked = !!loggedDiet[item.id];

                  return (
                    <div
                      key={item.id}
                      onClick={() => onToggleDietItem(item.id)}
                      className={`cursor-pointer group flex items-start justify-between p-3.5 sm:p-4 rounded-xl border transition-all ${
                        isChecked
                          ? 'bg-lime-950/20 border-lime-500/40 shadow-sm'
                          : 'bg-zinc-950/40 border-zinc-800/80 hover:bg-zinc-800/40 hover:border-zinc-700'
                      }`}
                    >
                      <div className="flex items-start gap-3 sm:gap-3.5">
                        <button className="mt-0.5 text-zinc-500 group-hover:text-zinc-300 transition-colors">
                          {isChecked ? (
                            <CheckCircle2 className="w-5 h-5 sm:w-6 sm:h-6 text-lime-400 fill-lime-400/20" />
                          ) : (
                            <Circle className="w-5 h-5 sm:w-6 sm:h-6 text-zinc-600 group-hover:text-zinc-400" />
                          )}
                        </button>

                        <div>
                          <div className={`text-sm sm:text-base font-bold transition-colors ${isChecked ? 'text-zinc-400 line-through' : 'text-white'}`}>
                            {item.name}
                          </div>
                          <div className="text-xs sm:text-sm text-zinc-400 mt-0.5 leading-snug">
                            {item.note}
                          </div>

                          {/* Nutrition Macro Badges */}
                          <div className="flex flex-wrap items-center gap-1.5 mt-2">
                            {item.calories > 0 && (
                              <span className="text-[11px] font-mono font-bold bg-lime-400/10 text-lime-400 px-2 py-0.5 rounded border border-lime-400/20">
                                {item.calories} kcal
                              </span>
                            )}
                            {item.protein > 0 && (
                              <span className="text-[11px] font-mono text-zinc-300 bg-zinc-800/80 px-1.5 py-0.5 rounded border border-zinc-700/50">
                                P: {item.protein}g
                              </span>
                            )}
                            {item.carbs > 0 && (
                              <span className="text-[11px] font-mono text-zinc-400 bg-zinc-800/80 px-1.5 py-0.5 rounded border border-zinc-700/50">
                                C: {item.carbs}g
                              </span>
                            )}
                            {item.fat > 0 && (
                              <span className="text-[11px] font-mono text-zinc-400 bg-zinc-800/80 px-1.5 py-0.5 rounded border border-zinc-700/50">
                                F: {item.fat}g
                              </span>
                            )}
                            {item.caloriesBurned > 0 && (
                              <span className="text-[11px] font-mono font-bold text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded border border-amber-400/20">
                                ~{item.caloriesBurned} kcal burn
                              </span>
                            )}
                          </div>

                          {item.isStepTarget && (
                            <div className="flex items-center gap-1.5 mt-1.5 text-xs font-semibold text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-lg w-fit">
                              <Footprints className="w-3.5 h-3.5" /> {item.quantity} Goal
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="text-right shrink-0 ml-3">
                        <span className="font-mono text-xs sm:text-sm font-bold px-2.5 py-1.5 rounded-lg bg-zinc-800/90 text-zinc-200 border border-zinc-700/50 shadow-inner">
                          {item.quantity}
                        </span>
                      </div>
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
}
