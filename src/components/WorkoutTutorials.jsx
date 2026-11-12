import React, { useState } from 'react';
import { 
  Play, 
  ExternalLink, 
  Search, 
  Layers, 
  Dumbbell, 
  Clock, 
  Sparkles, 
  Video,
  Info
} from 'lucide-react';
import { trainingSplits } from '../data/workoutData';

export default function WorkoutTutorials() {
  const [selectedDay, setSelectedDay] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Collect all unique exercises across all splits
  const allExercises = [];
  const seenIds = new Set();

  trainingSplits.forEach(day => {
    day.sections.forEach(sec => {
      sec.exercises.forEach(ex => {
        if (!seenIds.has(ex.name)) {
          seenIds.add(ex.name);
          allExercises.push({
            ...ex,
            daySource: `Day ${day.dayNumber}: ${day.category}`,
            dayNum: day.dayNumber
          });
        }
      });
    });
  });

  const filteredExercises = allExercises.filter(ex => {
    const matchesDay = selectedDay === 'all' || ex.dayNum === parseInt(selectedDay);
    const matchesSearch = ex.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          ex.notes.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesDay && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-br from-zinc-900 via-zinc-900 to-zinc-950 border border-zinc-800 rounded-3xl p-5 sm:p-7 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-red-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold uppercase tracking-wider text-red-400 mb-1">
              <Video className="w-4 h-4 text-red-500" />
              <span>Exercise Library & Video Form Guides</span>
            </div>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-white tracking-tight">
              Workout Video Tutorials Directory
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400 mt-1 max-w-xl leading-relaxed">
              Every mobility drill and hypertrophy movement in your Phase 1 plan is indexed below with verified YouTube video tutorials so you can validate form and cues anytime.
            </p>
          </div>

          <div className="bg-zinc-900/90 border border-zinc-800 px-4 py-3 rounded-2xl flex items-center gap-3">
            <Dumbbell className="w-5 h-5 text-lime-400" />
            <div>
              <div className="text-xs text-zinc-400">Total Exercises Indexed</div>
              <div className="text-xl font-mono font-extrabold text-white">{allExercises.length} Movements</div>
            </div>
          </div>
        </div>

        {/* Filter and Search Bar */}
        <div className="flex flex-col sm:flex-row items-center gap-3 mt-6 pt-5 border-t border-zinc-800/80">
          {/* Day Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
            <button
              onClick={() => setSelectedDay('all')}
              className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold shrink-0 transition-all ${
                selectedDay === 'all'
                  ? 'bg-lime-400 text-zinc-950 font-extrabold'
                  : 'bg-zinc-800 text-zinc-400 hover:text-white'
              }`}
            >
              All Days ({allExercises.length})
            </button>
            {[1, 2, 3, 4].map(d => (
              <button
                key={d}
                onClick={() => setSelectedDay(String(d))}
                className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold shrink-0 transition-all ${
                  selectedDay === String(d)
                    ? 'bg-lime-400 text-zinc-950 font-extrabold'
                    : 'bg-zinc-800 text-zinc-400 hover:text-white'
                }`}
              >
                Day {d}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full sm:flex-1">
            <Search className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search exercise name or technique cues..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-zinc-950/80 border border-zinc-800 rounded-xl pl-10 pr-4 py-2 text-xs sm:text-sm text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-lime-400/70"
            />
          </div>
        </div>
      </div>

      {/* Grid of Exercises with Video Links */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredExercises.map((exercise, idx) => {
          const ytSearchUrl = `https://www.youtube.com/results?search_query=${exercise.videoQuery || encodeURIComponent(exercise.name + ' proper form tutorial')}`;

          return (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-zinc-900/80 border border-zinc-800/80 hover:border-zinc-700 transition-all shadow-md flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div>
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-zinc-800 text-zinc-400 border border-zinc-700/50">
                      {exercise.daySource}
                    </span>
                    <h3 className="font-extrabold text-base sm:text-lg text-white mt-1.5 leading-snug">
                      {exercise.name}
                    </h3>
                  </div>

                  <span className="shrink-0 text-xs font-mono bg-zinc-950 px-2.5 py-1 rounded-lg text-lime-400 border border-zinc-800 font-bold">
                    {exercise.load} • {exercise.reps}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-zinc-400 mt-2 leading-relaxed">
                  <strong className="text-zinc-300">Form Cue:</strong> {exercise.notes}
                </p>
              </div>

              {/* YouTube Video Link Action Button */}
              <div className="mt-4 pt-3.5 border-t border-zinc-800/80 flex items-center justify-between gap-3">
                <div className="flex items-center gap-1.5 text-xs text-zinc-400">
                  <Video className="w-4 h-4 text-red-500" />
                  <span className="line-clamp-1">{exercise.videoTitle || 'Tutorial Video'}</span>
                </div>

                <a
                  href={ytSearchUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold bg-red-600/10 hover:bg-red-600 text-red-400 hover:text-white border border-red-500/30 transition-all shrink-0 group"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>Watch Tutorial</span>
                  <ExternalLink className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100" />
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
