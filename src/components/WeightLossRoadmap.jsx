import React, { useState } from 'react';
import { 
  TrendingDown, 
  Target, 
  Flame, 
  Zap, 
  Calendar, 
  Clock, 
  Info, 
  ArrowRight, 
  Award,
  Sparkles,
  CheckCircle2,
  Sliders
} from 'lucide-react';

export default function WeightLossRoadmap({ user, currentWeightVal }) {
  const currentWeight = parseFloat(currentWeightVal) || parseFloat(user.startWeight);
  const targetWeight = Math.max(30, currentWeight - user.targetLossKg);

  // Calculate user planned daily intake (excluding non-caloric items)
  const plannedDailyIntake = user.dietSections
    .flatMap(s => s.items)
    .reduce((sum, item) => sum + (item.calories || 0), 0);

  // Configurable sliders for user customization
  const [customIntake, setCustomIntake] = useState(plannedDailyIntake);
  const [customBurn, setCustomBurn] = useState(user.workoutBurnAvg);
  const [tdee, setTdee] = useState(user.estimatedTDEE);

  // Total daily expenditure = Baseline TDEE + Workout/AM Step burn
  const totalDailyExpenditure = tdee + customBurn;
  const dailyDeficit = Math.max(100, totalDailyExpenditure - customIntake);
  const weeklyDeficit = dailyDeficit * 7;

  // 1 kg of fat ~= 7,700 kcal
  const weeklyLossKg = weeklyDeficit / 7700;
  const totalWeeksNeeded = Math.ceil(user.targetLossKg / (weeklyLossKg || 0.1));

  // Build projected trajectory data week by week
  const trajectory = [];
  let simulatedWeight = currentWeight;
  const maxWeeks = Math.min(totalWeeksNeeded + 2, 40);

  for (let w = 0; w <= maxWeeks; w++) {
    const isTargetReached = simulatedWeight <= targetWeight;
    trajectory.push({
      week: w,
      weight: Math.max(targetWeight, simulatedWeight).toFixed(1),
      lossSoFar: (currentWeight - Math.max(targetWeight, simulatedWeight)).toFixed(1),
      reached: isTargetReached
    });
    if (isTargetReached && w >= totalWeeksNeeded) break;
    simulatedWeight -= weeklyLossKg;
  }

  // Estimated completion date
  const targetDate = new Date();
  targetDate.setDate(targetDate.getDate() + totalWeeksNeeded * 7);
  const targetDateStr = targetDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-br from-zinc-900 via-zinc-900 to-zinc-950 border border-zinc-800 rounded-3xl p-5 sm:p-7 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-lime-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-5 relative z-10">
          <div>
            <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold uppercase tracking-wider text-lime-400 mb-1">
              <Target className="w-4 h-4" />
              <span>Weight Transformation Model • -15 kg Target</span>
            </div>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-white tracking-tight">
              {user.name}’s 15 kg Fat Loss Roadmap
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400 mt-1 max-w-xl leading-relaxed">
              Based on your Phase 1 prescribed meal calories and scheduled workout energy expenditure with daily caloric deficit dynamics.
            </p>
          </div>

          <div className="bg-zinc-900/90 border border-zinc-800 p-4 sm:p-5 rounded-2xl flex items-center gap-4 sm:gap-6 shadow-lg min-w-[280px]">
            <div>
              <div className="text-xs text-zinc-400 font-medium">Starting Weight</div>
              <div className="text-2xl sm:text-3xl font-extrabold font-mono text-white">{currentWeight} kg</div>
            </div>
            <ArrowRight className="w-5 h-5 text-lime-400 shrink-0" />
            <div>
              <div className="text-xs text-zinc-400 font-medium">Target Weight</div>
              <div className="text-2xl sm:text-3xl font-extrabold font-mono text-lime-400">{targetWeight.toFixed(1)} kg</div>
            </div>
          </div>
        </div>

        {/* Top 4 KPI Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mt-6 pt-6 border-t border-zinc-800/80">
          <div className="p-3.5 bg-zinc-950/60 border border-zinc-800/80 rounded-2xl">
            <div className="flex items-center gap-1.5 text-xs text-zinc-400 mb-1">
              <Calendar className="w-3.5 h-3.5 text-lime-400" />
              <span>Est. Timeline</span>
            </div>
            <div className="text-xl sm:text-2xl font-mono font-extrabold text-white">
              ~{totalWeeksNeeded} <span className="text-sm font-sans font-normal text-zinc-400">Weeks</span>
            </div>
            <div className="text-[11px] text-zinc-500 mt-0.5">Est. Goal: {targetDateStr}</div>
          </div>

          <div className="p-3.5 bg-zinc-950/60 border border-zinc-800/80 rounded-2xl">
            <div className="flex items-center gap-1.5 text-xs text-zinc-400 mb-1">
              <TrendingDown className="w-3.5 h-3.5 text-emerald-400" />
              <span>Weekly Fat Loss</span>
            </div>
            <div className="text-xl sm:text-2xl font-mono font-extrabold text-emerald-400">
              ~{weeklyLossKg.toFixed(2)} <span className="text-sm font-sans font-normal text-zinc-400">kg/wk</span>
            </div>
            <div className="text-[11px] text-zinc-500 mt-0.5">Safe, sustainable rate</div>
          </div>

          <div className="p-3.5 bg-zinc-950/60 border border-zinc-800/80 rounded-2xl">
            <div className="flex items-center gap-1.5 text-xs text-zinc-400 mb-1">
              <Flame className="w-3.5 h-3.5 text-amber-400" />
              <span>Daily Caloric Deficit</span>
            </div>
            <div className="text-xl sm:text-2xl font-mono font-extrabold text-amber-400">
              -{dailyDeficit} <span className="text-sm font-sans font-normal text-zinc-400">kcal/day</span>
            </div>
            <div className="text-[11px] text-zinc-500 mt-0.5">Burn: {totalDailyExpenditure} | Diet: {customIntake}</div>
          </div>

          <div className="p-3.5 bg-zinc-950/60 border border-zinc-800/80 rounded-2xl">
            <div className="flex items-center gap-1.5 text-xs text-zinc-400 mb-1">
              <Zap className="w-3.5 h-3.5 text-cyan-400" />
              <span>Total Deficit Needed</span>
            </div>
            <div className="text-xl sm:text-2xl font-mono font-extrabold text-cyan-400">
              115,500 <span className="text-sm font-sans font-normal text-zinc-400">kcal</span>
            </div>
            <div className="text-[11px] text-zinc-500 mt-0.5">15 kg × 7,700 kcal/kg</div>
          </div>
        </div>
      </div>

      {/* Interactive Calorie Simulator Sliders */}
      <div className="bg-zinc-900/80 border border-zinc-800 rounded-3xl p-5 sm:p-6 shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Sliders className="w-4 h-4 text-lime-400" />
            <h3 className="text-sm sm:text-base font-extrabold text-white">
              Calorie Burn & Intake Simulator
            </h3>
          </div>
          <button
            onClick={() => {
              setCustomIntake(plannedDailyIntake);
              setCustomBurn(user.workoutBurnAvg);
              setTdee(user.estimatedTDEE);
            }}
            className="text-xs text-zinc-400 hover:text-white underline"
          >
            Reset to Coach Plan
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Diet Intake */}
          <div className="space-y-2 bg-zinc-950/50 p-4 rounded-2xl border border-zinc-800/60">
            <div className="flex justify-between items-center text-xs">
              <span className="text-zinc-400">Daily Food Intake:</span>
              <span className="font-mono font-bold text-lime-400">{customIntake} kcal</span>
            </div>
            <input
              type="range"
              min="900"
              max="2200"
              step="25"
              value={customIntake}
              onChange={(e) => setCustomIntake(Number(e.target.value))}
              className="w-full accent-lime-400 cursor-pointer"
            />
            <div className="text-[11px] text-zinc-500">Coach Diet P1 base is ~{plannedDailyIntake} kcal</div>
          </div>

          {/* Workout Burn */}
          <div className="space-y-2 bg-zinc-950/50 p-4 rounded-2xl border border-zinc-800/60">
            <div className="flex justify-between items-center text-xs">
              <span className="text-zinc-400">Workout & Steps Burn:</span>
              <span className="font-mono font-bold text-amber-400">+{customBurn} kcal</span>
            </div>
            <input
              type="range"
              min="150"
              max="700"
              step="25"
              value={customBurn}
              onChange={(e) => setCustomBurn(Number(e.target.value))}
              className="w-full accent-amber-400 cursor-pointer"
            />
            <div className="text-[11px] text-zinc-500">Training session + daily step target</div>
          </div>

          {/* Baseline TDEE */}
          <div className="space-y-2 bg-zinc-950/50 p-4 rounded-2xl border border-zinc-800/60">
            <div className="flex justify-between items-center text-xs">
              <span className="text-zinc-400">Resting BMR + Normal Activity:</span>
              <span className="font-mono font-bold text-cyan-400">{tdee} kcal</span>
            </div>
            <input
              type="range"
              min="1600"
              max="2800"
              step="50"
              value={tdee}
              onChange={(e) => setTdee(Number(e.target.value))}
              className="w-full accent-cyan-400 cursor-pointer"
            />
            <div className="text-[11px] text-zinc-500">Expenditure based on age ({user.age}y), weight & height</div>
          </div>
        </div>
      </div>

      {/* Visual Weight Trajectory Progression Chart */}
      <div className="bg-zinc-900/80 border border-zinc-800 rounded-3xl p-5 sm:p-6 shadow-lg">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
          <div>
            <h3 className="text-base sm:text-lg font-extrabold text-white">
              Projected Week-by-Week Weight Reduction
            </h3>
            <p className="text-xs sm:text-sm text-zinc-400 mt-0.5">
              Trajectory modeled with consistent -{dailyDeficit} kcal/day deficit towards your {targetWeight.toFixed(1)} kg goal.
            </p>
          </div>
          <span className="text-xs bg-lime-400/10 text-lime-400 border border-lime-400/30 px-3 py-1 rounded-xl font-mono font-bold w-fit">
            Target: ~{totalWeeksNeeded} Weeks
          </span>
        </div>

        {/* Progress Timeline Bars */}
        <div className="space-y-2.5">
          {trajectory.map((point) => {
            const percentProgress = Math.min(100, (point.lossSoFar / user.targetLossKg) * 100);
            const isMilestone = point.week === 0 || point.week % 4 === 0 || point.reached;

            if (!isMilestone && point.week > 24) return null; // keep list compact on huge numbers

            return (
              <div 
                key={point.week}
                className={`p-3 rounded-2xl border transition-all ${
                  point.reached 
                    ? 'bg-emerald-950/20 border-emerald-500/40 ring-1 ring-emerald-500/30'
                    : point.week === 0 
                      ? 'bg-zinc-950/60 border-zinc-800' 
                      : 'bg-zinc-900/40 border-zinc-800/80 hover:border-zinc-700'
                }`}
              >
                <div className="flex items-center justify-between text-xs sm:text-sm mb-1.5 font-mono">
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-0.5 rounded font-bold ${
                      point.week === 0 ? 'bg-zinc-800 text-zinc-300' : point.reached ? 'bg-emerald-500/20 text-emerald-400' : 'bg-lime-400/10 text-lime-400'
                    }`}>
                      {point.week === 0 ? 'Start' : `Week ${point.week}`}
                    </span>
                    <span className="text-zinc-400 font-sans">
                      {point.week === 0 ? 'Baseline' : `(-${point.lossSoFar} kg)`}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 font-bold">
                    <span className={point.reached ? 'text-emerald-400' : 'text-white'}>
                      {point.weight} kg
                    </span>
                    {point.reached && (
                      <span className="text-[10px] font-sans font-bold bg-emerald-400 text-zinc-950 px-2 py-0.5 rounded-full flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" /> Goal (-15 kg)!
                      </span>
                    )}
                  </div>
                </div>

                {/* Bar representation */}
                <div className="w-full bg-zinc-800/80 h-2.5 rounded-full overflow-hidden p-0.5">
                  <div
                    className={`h-full rounded-full transition-all duration-300 ${
                      point.reached ? 'bg-emerald-400' : 'bg-gradient-to-r from-lime-500 to-emerald-400'
                    }`}
                    style={{ width: `${Math.max(4, percentProgress)}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Realistic coaching insight */}
        <div className="mt-5 p-3.5 bg-zinc-950 border border-zinc-800 rounded-2xl text-xs sm:text-sm text-zinc-400 flex items-start gap-2.5">
          <Info className="w-4 h-4 text-lime-400 shrink-0 mt-0.5" />
          <div className="leading-relaxed">
            <strong className="text-zinc-200">Coach Note on Reality vs Theory:</strong> During Weeks 1–2, initial water weight drop may exceed 1–1.5 kg/week as glycogen depletes. Around Weeks 4–8, metabolic adaptation and adherence variations usually average out to a clean, steady <strong>0.5 – 0.8 kg per week</strong>, putting the 15 kg reduction goal at approximately <strong>20 to 24 consistent weeks</strong>.
          </div>
        </div>
      </div>
    </div>
  );
}

