import React, { useState } from 'react';
import { 
  Users, 
  Scale, 
  Flame, 
  Footprints, 
  RotateCcw, 
  Download,
  Calendar as CalendarIcon,
  Video,
  TrendingDown,
  Dumbbell,
  Utensils,
  ChevronLeft,
  ChevronRight,
  Save,
  Check
} from 'lucide-react';
import { usersData } from '../data/dietData';

export default function Navbar({ 
  currentUserId,
  onSelectUser,
  selectedDate,
  onChangeDate,
  activeTab, 
  setActiveTab, 
  stepCompleted, 
  onToggleStepGoal,
  userWeights,
  onUpdateWeight,
  onSaveDayLog,
  isSavedNotification,
  onResetToday,
  onExportData
}) {
  const currentUser = usersData[currentUserId];
  const [isEditingWeight, setIsEditingWeight] = useState(false);
  const userWeight = userWeights[currentUserId] || currentUser.startWeight;

  const navTabs = [
    { id: 'diet', label: `${currentUser.shortName}'s Diet`, icon: Utensils },
    { id: 'training', label: 'Workout Split', icon: Dumbbell },
    { id: 'roadmap', label: '15kg Loss Forecast', icon: TrendingDown, badge: '-15kg' },
    { id: 'tutorials', label: 'Video Tutorials', icon: Video, badge: 'Watch' }
  ];

  // Date navigation helpers
  const handleStepDay = (delta) => {
    const d = new Date(selectedDate + 'T00:00:00');
    d.setDate(d.getDate() + delta);
    onChangeDate(d.toISOString().slice(0, 10));
  };

  const isToday = selectedDate === new Date().toISOString().slice(0, 10);

  return (
    <header className="border-b border-zinc-800/80 bg-zinc-950/90 backdrop-blur-2xl sticky top-0 z-50 shadow-2xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
        
        {/* Top row: User Switcher & Date Picker & Quick Actions */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          
          {/* USER SELECTOR TABS (Mani vs Viji) */}
          <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
            <div className="p-1 bg-zinc-900 border border-zinc-800 rounded-2xl flex items-center shadow-inner">
              {Object.values(usersData).map((u) => {
                const isActive = u.id === currentUserId;
                return (
                  <button
                    key={u.id}
                    onClick={() => onSelectUser(u.id)}
                    className={`flex items-center gap-2 sm:gap-2.5 px-3.5 sm:px-4 py-2 rounded-xl font-bold text-xs sm:text-sm transition-all duration-200 ${
                      isActive
                        ? 'bg-gradient-to-r from-lime-400 to-emerald-400 text-zinc-950 shadow-md shadow-lime-400/20'
                        : 'text-zinc-400 hover:text-white hover:bg-zinc-800/60'
                    }`}
                  >
                    <div className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center font-extrabold text-[11px] sm:text-xs ${
                      isActive ? 'bg-zinc-950 text-lime-400' : 'bg-zinc-800 text-zinc-300'
                    }`}>
                      {u.avatarInitial}
                    </div>
                    <span>{u.name}</span>
                    <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${
                      isActive ? 'bg-zinc-950/20 text-zinc-900' : 'bg-zinc-800 text-zinc-500'
                    }`}>
                      {u.startWeight}kg
                    </span>
                  </button>
                );
              })}
            </div>

            {/* DATE PICKER COMPONENT (Date-wise Logging) */}
            <div className="flex items-center bg-zinc-900 border border-zinc-800 rounded-2xl p-1 shadow-inner">
              <button
                onClick={() => handleStepDay(-1)}
                className="p-1.5 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-lg transition-colors"
                title="Previous Day"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-1.5 px-2">
                <CalendarIcon className="w-3.5 h-3.5 text-lime-400 shrink-0" />
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => onChangeDate(e.target.value)}
                  className="bg-transparent text-white font-mono text-xs sm:text-sm focus:outline-none cursor-pointer"
                />
                {isToday && (
                  <span className="text-[10px] bg-lime-400/20 text-lime-400 px-1.5 py-0.2 rounded font-mono font-bold">
                    Today
                  </span>
                )}
              </div>

              <button
                onClick={() => handleStepDay(1)}
                className="p-1.5 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-lg transition-colors"
                title="Next Day"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Quick Metrics (Weight & Step Badge & Save/Export) */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-2.5">
            {/* Weight Input */}
            <div className="bg-zinc-900/90 border border-zinc-800 px-3 py-1.5 rounded-xl flex items-center gap-2 shadow-sm">
              <Scale className="w-4 h-4 text-lime-400 shrink-0" />
              <div className="text-xs sm:text-sm">
                <span className="text-zinc-400">Weight: </span>
                {isEditingWeight ? (
                  <input
                    type="number"
                    step="0.1"
                    value={userWeight}
                    onChange={(e) => onUpdateWeight(currentUserId, e.target.value)}
                    onBlur={() => setIsEditingWeight(false)}
                    autoFocus
                    className="w-16 bg-zinc-950 text-white font-mono text-xs sm:text-sm px-1.5 py-0.5 rounded border border-lime-400"
                  />
                ) : (
                  <span 
                    onClick={() => setIsEditingWeight(true)} 
                    className="font-mono font-bold text-white cursor-pointer hover:underline"
                    title="Click to update weight"
                  >
                    {userWeight} kg
                  </span>
                )}
              </div>
            </div>

            {/* Daily Step Goal Tracker */}
            <button
              onClick={onToggleStepGoal}
              className={`px-3 py-1.5 rounded-xl border text-xs sm:text-sm font-semibold flex items-center gap-2 transition-all ${
                stepCompleted
                  ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-300 shadow-sm'
                  : 'bg-zinc-900/90 border-zinc-800 text-zinc-300 hover:border-zinc-700'
              }`}
              title={currentUser.stepGoal.condition}
            >
              <Footprints className={`w-3.5 h-3.5 ${stepCompleted ? 'text-emerald-400' : 'text-zinc-400'}`} />
              <span className="hidden sm:inline">{currentUser.stepGoal.label}</span>
              <span className="sm:hidden">Steps</span>
              <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                stepCompleted ? 'bg-emerald-500/20 text-emerald-300' : 'bg-zinc-800 text-zinc-400'
              }`}>
                {stepCompleted ? '✓' : 'Pending'}
              </span>
            </button>

            {/* Save Log Button (to DailyLogs/*.json) */}
            <button
              onClick={onSaveDayLog}
              className={`px-3 py-1.5 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-1.5 border transition-all ${
                isSavedNotification
                  ? 'bg-emerald-500 text-zinc-950 border-emerald-400 shadow-md shadow-emerald-500/20'
                  : 'bg-lime-400/10 hover:bg-lime-400 text-lime-400 hover:text-zinc-950 border-lime-400/30'
              }`}
              title="Save current date log to DailyLogs/{date}_{user}.json"
            >
              {isSavedNotification ? <Check className="w-3.5 h-3.5 stroke-[3]" /> : <Save className="w-3.5 h-3.5" />}
              <span>{isSavedNotification ? 'Saved!' : 'Save Log'}</span>
            </button>

            {/* Reset day button */}
            <button
              onClick={onResetToday}
              className="p-2 text-zinc-400 hover:text-white bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 rounded-xl transition-colors"
              title={`Reset checks for ${selectedDate}`}
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>

            {/* Export data */}
            <button
              onClick={onExportData}
              className="p-2 text-zinc-400 hover:text-white bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 rounded-xl transition-colors"
              title="Download JSON backup"
            >
              <Download className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* View Switcher Tabs (Diet P1, Training P1, 15kg Roadmap, Video Tutorials) */}
        <div className="flex gap-2 sm:gap-3 mt-3 sm:mt-4 pt-3 border-t border-zinc-800/60 overflow-x-auto pb-1">
          {navTabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-3.5 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold shrink-0 transition-all ${
                  isActive
                    ? 'bg-lime-400 text-zinc-950 shadow-lg shadow-lime-400/20 ring-1 ring-lime-400 font-extrabold'
                    : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-zinc-950' : 'text-zinc-400'}`} />
                <span>{tab.label}</span>
                {tab.badge && (
                  <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded font-bold ${
                    isActive ? 'bg-zinc-950 text-lime-400' : 'bg-zinc-800 text-zinc-400'
                  }`}>
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

      </div>
    </header>
  );
}
