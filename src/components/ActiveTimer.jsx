import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Timer, Volume2 } from 'lucide-react';

export default function ActiveTimer({ defaultSeconds = 60 }) {
  const [seconds, setSeconds] = useState(defaultSeconds);
  const [initialSeconds, setInitialSeconds] = useState(defaultSeconds);
  const [isRunning, setIsRunning] = useState(false);
  const [mode, setMode] = useState('countdown'); // 'countdown' or 'stopwatch'
  const [stopwatchTime, setStopwatchTime] = useState(0);

  useEffect(() => {
    let interval = null;
    if (isRunning) {
      if (mode === 'countdown') {
        interval = setInterval(() => {
          setSeconds((prev) => {
            if (prev <= 1) {
              clearInterval(interval);
              setIsRunning(false);
              return 0;
            }
            return prev - 1;
          });
        }, 1000);
      } else {
        interval = setInterval(() => {
          setStopwatchTime((prev) => prev + 1);
        }, 1000);
      }
    }
    return () => clearInterval(interval);
  }, [isRunning, mode]);

  const toggleTimer = () => setIsRunning(!isRunning);

  const resetTimer = () => {
    setIsRunning(false);
    if (mode === 'countdown') {
      setSeconds(initialSeconds);
    } else {
      setStopwatchTime(0);
    }
  };

  const setPreset = (sec) => {
    setIsRunning(false);
    setMode('countdown');
    setInitialSeconds(sec);
    setSeconds(sec);
  };

  const formatTime = (totalSec) => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="bg-zinc-900/90 border border-zinc-800 rounded-2xl p-4 shadow-xl backdrop-blur-xl">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-lime-400/10 text-lime-400">
            <Timer className="w-4 h-4" />
          </div>
          <span className="text-xs font-semibold tracking-wider uppercase text-zinc-300">
            {mode === 'countdown' ? 'Rest / Hold Timer' : 'Stopwatch (Hold Time)'}
          </span>
        </div>

        <div className="flex bg-zinc-800 p-0.5 rounded-lg text-xs font-medium">
          <button
            onClick={() => { setMode('countdown'); setIsRunning(false); }}
            className={`px-2 py-1 rounded-md transition-colors ${mode === 'countdown' ? 'bg-zinc-700 text-white' : 'text-zinc-400 hover:text-zinc-200'}`}
          >
            Timer
          </button>
          <button
            onClick={() => { setMode('stopwatch'); setIsRunning(false); }}
            className={`px-2 py-1 rounded-md transition-colors ${mode === 'stopwatch' ? 'bg-zinc-700 text-white' : 'text-zinc-400 hover:text-zinc-200'}`}
          >
            Hold Stopwatch
          </button>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-zinc-950/60 p-3.5 rounded-xl border border-zinc-800/60">
        <div>
          <div className="text-3xl font-mono font-bold tracking-tight text-white flex items-center gap-2">
            <span>{formatTime(mode === 'countdown' ? seconds : stopwatchTime)}</span>
            {seconds === 0 && mode === 'countdown' && (
              <span className="text-xs bg-lime-400 text-zinc-950 px-2 py-0.5 rounded-full font-sans font-bold animate-pulse">
                Done!
              </span>
            )}
          </div>
          <span className="text-[11px] text-zinc-500">
            {mode === 'countdown' ? 'Optimal rest: 45-75s between sets' : 'Log duration for planks & dead bugs'}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={toggleTimer}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-md ${
              isRunning
                ? 'bg-amber-400 hover:bg-amber-300 text-zinc-950'
                : 'bg-lime-400 hover:bg-lime-300 text-zinc-950'
            }`}
          >
            {isRunning ? <Pause className="w-3.5 h-3.5 fill-current" /> : <Play className="w-3.5 h-3.5 fill-current" />}
            {isRunning ? 'Pause' : 'Start'}
          </button>

          <button
            onClick={resetTimer}
            className="p-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded-xl transition-colors border border-zinc-700/50"
            title="Reset"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {mode === 'countdown' && (
        <div className="flex items-center gap-1.5 mt-3 pt-2 border-t border-zinc-800/80">
          <span className="text-[11px] text-zinc-500 mr-1">Presets:</span>
          {[30, 45, 60, 90, 120].map((s) => (
            <button
              key={s}
              onClick={() => setPreset(s)}
              className={`text-[11px] px-2 py-1 rounded-lg border transition-all ${
                initialSeconds === s
                  ? 'border-lime-400/60 bg-lime-400/10 text-lime-300 font-semibold'
                  : 'border-zinc-800 bg-zinc-800/50 text-zinc-400 hover:text-white'
              }`}
            >
              {s}s
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

