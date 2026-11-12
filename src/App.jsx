import React, { useState, useEffect, useCallback } from 'react';
import Navbar from './components/Navbar';
import DietView from './components/DietView';
import TrainingView from './components/TrainingView';
import WeightLossRoadmap from './components/WeightLossRoadmap';
import WorkoutTutorials from './components/WorkoutTutorials';
import { usersData } from './data/dietData';

export default function App() {
  const [currentUserId, setCurrentUserId] = useState(() => {
    return localStorage.getItem('fit_active_user') || 'manivasagam';
  });

  // Selected date state for date-wise logging
  const [selectedDate, setSelectedDate] = useState(() => {
    return new Date().toISOString().slice(0, 10);
  });

  const [activeTab, setActiveTab] = useState('diet'); // 'diet' | 'training' | 'roadmap' | 'tutorials'
  const [isSavedNotification, setIsSavedNotification] = useState(false);

  // Master date-wise store: { [date]: { [userId]: { diet: {}, workouts: {}, stepCompleted: false, weight: '82.8' } } }
  const [dailyLogsStore, setDailyLogsStore] = useState(() => {
    try {
      const saved = localStorage.getItem('fit_master_daily_logs');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  // Active user's current day state
  const currentDayUserLog = dailyLogsStore[selectedDate]?.[currentUserId] || {
    diet: {},
    workouts: {},
    stepCompleted: false,
    weight: usersData[currentUserId].startWeight
  };

  const loggedDiet = currentDayUserLog.diet || {};
  const loggedWorkoutSets = currentDayUserLog.workouts || {};
  const stepCompleted = !!currentDayUserLog.stepCompleted;

  // Track weight per user
  const [userWeights, setUserWeights] = useState(() => {
    try {
      const saved = localStorage.getItem('fit_user_weights');
      return saved ? JSON.parse(saved) : { 
        manivasagam: usersData.manivasagam.startWeight, 
        vijayalakshmi: usersData.vijayalakshmi.startWeight 
      };
    } catch {
      return { 
        manivasagam: usersData.manivasagam.startWeight, 
        vijayalakshmi: usersData.vijayalakshmi.startWeight 
      };
    }
  });

  // Auto-sync active user to localStorage
  useEffect(() => {
    localStorage.setItem('fit_active_user', currentUserId);
  }, [currentUserId]);

  // Persist master daily logs
  useEffect(() => {
    localStorage.setItem('fit_master_daily_logs', JSON.stringify(dailyLogsStore));
  }, [dailyLogsStore]);

  // Persist user weights
  useEffect(() => {
    localStorage.setItem('fit_user_weights', JSON.stringify(userWeights));
  }, [userWeights]);

  // Helper to update current day's user log
  const updateCurrentDayLog = useCallback((updater) => {
    setDailyLogsStore(prev => {
      const dayData = prev[selectedDate] || {};
      const userData = dayData[currentUserId] || {
        diet: {},
        workouts: {},
        stepCompleted: false,
        weight: userWeights[currentUserId] || usersData[currentUserId].startWeight
      };

      const updatedUserData = typeof updater === 'function' ? updater(userData) : { ...userData, ...updater };

      return {
        ...prev,
        [selectedDate]: {
          ...dayData,
          [currentUserId]: updatedUserData
        }
      };
    });
  }, [selectedDate, currentUserId, userWeights]);

  // Try loading log file from server / DailyLogs API if exists
  useEffect(() => {
    fetch(`/api/logs?date=${selectedDate}&user=${currentUserId}`)
      .then(res => {
        if (res.ok) return res.json();
        return null;
      })
      .then(serverLog => {
        if (serverLog) {
          setDailyLogsStore(prev => ({
            ...prev,
            [selectedDate]: {
              ...(prev[selectedDate] || {}),
              [currentUserId]: serverLog
            }
          }));
        }
      })
      .catch(() => {
        // standalone mode fallback, silent
      });
  }, [selectedDate, currentUserId]);

  const handleToggleDietItem = (itemId) => {
    updateCurrentDayLog(prev => ({
      ...prev,
      diet: {
        ...prev.diet,
        [itemId]: !prev.diet?.[itemId]
      }
    }));
  };

  const handleToggleWorkoutSet = (setKey) => {
    updateCurrentDayLog(prev => ({
      ...prev,
      workouts: {
        ...prev.workouts,
        [setKey]: !prev.workouts?.[setKey]
      }
    }));
  };

  const handleUpdateCustomNote = (key, text) => {
    updateCurrentDayLog(prev => ({
      ...prev,
      workouts: {
        ...prev.workouts,
        [key]: text
      }
    }));
  };

  const handleToggleStepGoal = () => {
    updateCurrentDayLog(prev => ({
      ...prev,
      stepCompleted: !prev.stepCompleted
    }));
  };

  const handleUpdateWeight = (userId, weightVal) => {
    setUserWeights(prev => ({ ...prev, [userId]: weightVal }));
    updateCurrentDayLog(prev => ({ ...prev, weight: weightVal }));
  };

  // Save current date log to DailyLogs/{date}_{user}.json via server API & download fallback
  const handleSaveDayLog = async () => {
    const logPayload = {
      date: selectedDate,
      user: currentUserId,
      userName: usersData[currentUserId].name,
      savedAt: new Date().toISOString(),
      weight: userWeights[currentUserId] || usersData[currentUserId].startWeight,
      data: {
        date: selectedDate,
        user: currentUserId,
        userName: usersData[currentUserId].name,
        weight: userWeights[currentUserId] || usersData[currentUserId].startWeight,
        diet: loggedDiet,
        workouts: loggedWorkoutSets,
        stepCompleted
      }
    };

    let serverSaved = false;
    try {
      const res = await fetch('/api/logs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(logPayload)
      });
      if (res.ok) {
        serverSaved = true;
      }
    } catch {
      serverSaved = false;
    }

    // Also download as DailyLogs/{date}_{user}.json if server endpoint isn't running or as local backup
    if (!serverSaved) {
      const blob = new Blob([JSON.stringify(logPayload.data, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${selectedDate}_${currentUserId}.json`;
      a.click();
      URL.revokeObjectURL(url);
    }

    setIsSavedNotification(true);
    setTimeout(() => setIsSavedNotification(false), 2500);
  };

  const handleResetToday = () => {
    const userName = usersData[currentUserId].name;
    if (window.confirm(`Reset logged items for ${userName} on ${selectedDate}?`)) {
      updateCurrentDayLog({
        diet: {},
        workouts: {},
        stepCompleted: false,
        weight: userWeights[currentUserId] || usersData[currentUserId].startWeight
      });
    }
  };

  const handleExportData = () => {
    const data = {
      exportDate: new Date().toISOString(),
      activeUser: currentUserId,
      masterDailyLogs: dailyLogsStore,
      weights: userWeights
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `fitness_tracker_complete_backup_${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const currentUser = usersData[currentUserId] || usersData.manivasagam;
  const currentWeightVal = userWeights[currentUserId] || currentUser.startWeight;

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col font-sans selection:bg-lime-400 selection:text-zinc-950">
      <Navbar
        currentUserId={currentUserId}
        onSelectUser={setCurrentUserId}
        selectedDate={selectedDate}
        onChangeDate={setSelectedDate}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        stepCompleted={stepCompleted}
        onToggleStepGoal={handleToggleStepGoal}
        userWeights={userWeights}
        onUpdateWeight={handleUpdateWeight}
        onSaveDayLog={handleSaveDayLog}
        isSavedNotification={isSavedNotification}
        onResetToday={handleResetToday}
        onExportData={handleExportData}
      />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {activeTab === 'diet' && (
          <DietView 
            user={currentUser}
            loggedDiet={loggedDiet}
            onToggleDietItem={handleToggleDietItem}
          />
        )}

        {activeTab === 'training' && (
          <TrainingView 
            currentUserId={currentUserId}
            user={currentUser}
            loggedWorkoutSets={loggedWorkoutSets}
            onToggleWorkoutSet={handleToggleWorkoutSet}
            onUpdateCustomNote={handleUpdateCustomNote}
          />
        )}

        {activeTab === 'roadmap' && (
          <WeightLossRoadmap 
            user={currentUser}
            currentWeightVal={currentWeightVal}
          />
        )}

        {activeTab === 'tutorials' && (
          <WorkoutTutorials />
        )}
      </main>

      <footer className="border-t border-zinc-900 py-6 text-center text-xs sm:text-sm text-zinc-500">
        Personal Fitness & Diet Tracker • Phase 1 Protocol • {usersData.manivasagam.name} & {usersData.vijayalakshmi.name}
      </footer>
    </div>
  );
}
