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
}: Props) {
  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-6 right-6 z-50 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300 hover:scale-110"
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
        <div className="bg-black/40 backdrop-blur-xl rounded-2xl border border-white/10 p-6 shadow-2xl">
          <h3 className="text-white/90 font-semibold text-sm uppercase tracking-wider mb-5">Controls</h3>

          {/* Particle Count */}
          <div className="mb-5 flex items-center justify-between">
            <span className="text-white/60 text-sm">Particles</span>
            <span className="text-white font-mono text-sm bg-white/10 px-2 py-0.5 rounded">{particleCount}</span>
          </div>

          {/* Gravity Strength */}
          <div className="mb-5">
            <div className="flex items-center justify-between mb-2">
              <label className="text-white/60 text-sm">Gravity</label>
              <span className="text-white/80 font-mono text-xs">{gravityStrength.toFixed(1)}</span>
            </div>
            <input
              type="range"
              min="0.1"
              max="5"
              step="0.1"
              value={gravityStrength}
              onChange={(e) => setGravityStrength(parseFloat(e.target.value))}
              className="w-full h-1.5 bg-white/10 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-indigo-400 [&::-webkit-slider-thumb]:shadow-lg [&::-webkit-slider-thumb]:shadow-indigo-500/50"
            />
          </div>

          {/* Trail Length */}
          <div className="mb-5">
            <div className="flex items-center justify-between mb-2">
              <label className="text-white/60 text-sm">Trail Length</label>
              <span className="text-white/80 font-mono text-xs">{trailLength}</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              step="5"
              value={trailLength}
              onChange={(e) => setTrailLength(parseInt(e.target.value))}
              className="w-full h-1.5 bg-white/10 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-purple-400 [&::-webkit-slider-thumb]:shadow-lg [&::-webkit-slider-thumb]:shadow-purple-500/50"
            />
          </div>

          {/* Show Trails Toggle */}
          <div className="mb-5 flex items-center justify-between">
            <span className="text-white/60 text-sm">Show Trails</span>
            <button
              onClick={() => setShowTrails(!showTrails)}
              className={`w-11 h-6 rounded-full transition-all duration-300 ${
                showTrails ? 'bg-indigo-500' : 'bg-white/20'
              }`}
            >
              <div
                className={`w-4 h-4 rounded-full bg-white shadow-md transform transition-transform duration-300 ${
                  showTrails ? 'translate-x-6' : 'translate-x-1'
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
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30 hover:bg-amber-500/30'
                  : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 hover:bg-emerald-500/30'
              }`}
            >
              {running ? '⏸ Pause' : '▶ Play'}
            </button>
            <button
              onClick={onReset}
              className="flex-1 py-2.5 rounded-xl text-sm font-medium bg-white/10 text-white/80 border border-white/10 hover:bg-white/20 transition-all duration-300"
            >
              ↻ Reset
            </button>
          </div>

          {/* Instructions */}
          <div className="mt-4 pt-4 border-t border-white/10">
            <p className="text-white/40 text-xs leading-relaxed">
              <span className="text-white/60">Click</span> anywhere to add particles. <span className="text-white/60">Hold</span> to attract particles toward your cursor.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
