interface Props {
  gravityStrength: number;
  setGravityStrength: (v: number) => void;
  trailLength: number;
  setTrailLength: (v: number) => void;
  showTrails: boolean;
  setShowTrails: (v: boolean) => void;
  running: boolean;
  setRunning: (v: boolean) => void;
  particleCount: number;
  onReset: () => void;
  isOpen: boolean;
  setIsOpen: (v: boolean) => void;
  isDark: boolean;
  toggleDarkMode: () => void;
}

export default function Controls({
  gravityStrength,
  setGravityStrength,
  trailLength,
  setTrailLength,
  showTrails,
  setShowTrails,
  running,
  setRunning,
  particleCount,
  onReset,
  isOpen,
  setIsOpen,
  isDark,
  toggleDarkMode,
}: Props) {
  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed top-6 right-6 z-50 w-12 h-12 rounded-full backdrop-blur-md flex items-center justify-center transition-all duration-300 hover:scale-110 ${
          isDark
            ? 'bg-white/10 border border-white/20 text-white hover:bg-white/20'
            : 'bg-black/5 border border-black/10 text-gray-700 hover:bg-black/10'
        }`}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isOpen ? "M6 18L18 6M6 6l12 12" : "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z"} />
        </svg>
      </button>

      {/* Panel */}
      <div
        className={`fixed top-20 right-6 z-40 w-72 transition-all duration-500 ${
          isOpen ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8 pointer-events-none'
        }`}
      >
        <div className={`backdrop-blur-xl rounded-2xl p-6 shadow-2xl ${
          isDark
            ? 'bg-black/40 border border-white/10'
            : 'bg-white/80 border border-gray-200/50'
        }`}>
          <h3 className={`font-semibold text-sm uppercase tracking-wider mb-5 ${
            isDark ? 'text-white/90' : 'text-gray-800'
          }`}>Controls</h3>

          {/* Particle Count */}
          <div className="mb-5 flex items-center justify-between">
            <span className={`text-sm ${isDark ? 'text-white/60' : 'text-gray-600'}`}>Particles</span>
            <span className={`font-mono text-sm px-2 py-0.5 rounded ${
              isDark ? 'text-white bg-white/10' : 'text-gray-800 bg-gray-200/50'
            }`}>{particleCount}</span>
          </div>

          {/* Gravity Strength */}
          <div className="mb-5">
            <div className="flex items-center justify-between mb-2">
              <label className={`text-sm ${isDark ? 'text-white/60' : 'text-gray-600'}`}>Gravity</label>
              <span className={`font-mono text-xs ${isDark ? 'text-white/80' : 'text-gray-700'}`}>{gravityStrength.toFixed(1)}</span>
            </div>
            <input
              type="range"
              min="0.1"
              max="5"
              step="0.1"
              value={gravityStrength}
              onChange={(e) => setGravityStrength(parseFloat(e.target.value))}
              className="w-full h-1.5 rounded-full appearance-none cursor-pointer"
            />
          </div>

          {/* Trail Length */}
          <div className="mb-5">
            <div className="flex items-center justify-between mb-2">
              <label className={`text-sm ${isDark ? 'text-white/60' : 'text-gray-600'}`}>Trail Length</label>
              <span className={`font-mono text-xs ${isDark ? 'text-white/80' : 'text-gray-700'}`}>{trailLength}</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              step="5"
              value={trailLength}
              onChange={(e) => setTrailLength(parseInt(e.target.value))}
              className="w-full h-1.5 rounded-full appearance-none cursor-pointer"
            />
          </div>

          {/* Show Trails Toggle */}
          <div className="mb-5 flex items-center justify-between">
            <span className={`text-sm ${isDark ? 'text-white/60' : 'text-gray-600'}`}>Show Trails</span>
            <button
              onClick={() => setShowTrails(!showTrails)}
              className={`w-11 h-6 rounded-full transition-all duration-300 ${
                showTrails ? 'bg-indigo-500' : isDark ? 'bg-white/20' : 'bg-gray-300'
              }`}
            >
              <div
                className={`w-4 h-4 rounded-full bg-white shadow-md transform transition-transform duration-300 ${
                  showTrails ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          {/* Dark Mode Toggle */}
          <div className="mb-5 flex items-center justify-between">
            <span className={`text-sm ${isDark ? 'text-white/60' : 'text-gray-600'}`}>Dark Mode</span>
            <button
              onClick={toggleDarkMode}
              className={`w-11 h-6 rounded-full transition-all duration-300 ${
                isDark ? 'bg-indigo-500' : 'bg-gray-300'
              }`}
            >
              <div
                className={`w-4 h-4 rounded-full bg-white shadow-md transform transition-transform duration-300 ${
                  isDark ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          {/* Play/Pause */}
          <div className="flex gap-2 mb-3">
            <button
              onClick={() => setRunning(!running)}
              className={`flex-1 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ${
                running
                  ? isDark
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30 hover:bg-amber-500/30'
                    : 'bg-amber-100 text-amber-700 border border-amber-200 hover:bg-amber-200'
                  : isDark
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 hover:bg-emerald-500/30'
                    : 'bg-emerald-100 text-emerald-700 border border-emerald-200 hover:bg-emerald-200'
              }`}
            >
              {running ? '⏸ Pause' : '▶ Play'}
            </button>
            <button
              onClick={onReset}
              className={`flex-1 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ${
                isDark
                  ? 'bg-white/10 text-white/80 border border-white/10 hover:bg-white/20'
                  : 'bg-gray-100 text-gray-700 border border-gray-200 hover:bg-gray-200'
              }`}
            >
              ↻ Reset
            </button>
          </div>

          {/* Instructions */}
          <div className={`mt-4 pt-4 ${isDark ? 'border-white/10' : 'border-gray-200'}`} style={{borderTopWidth: '1px'}}>
            <p className={`text-xs leading-relaxed ${isDark ? 'text-white/40' : 'text-gray-500'}`}>
              <span className={isDark ? 'text-white/60' : 'text-gray-600'}>Click</span> anywhere to add particles. <span className={isDark ? 'text-white/60' : 'text-gray-600'}>Hold</span> to attract particles toward your cursor.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
