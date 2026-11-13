import { useState, useCallback } from 'react';
import GravityCanvas from './components/GravityCanvas';
import Controls from './components/Controls';
import { useDarkMode } from './hooks/useDarkMode';

export default function App() {
  const [gravityStrength, setGravityStrength] = useState(1.5);
  const [trailLength, setTrailLength] = useState(50);
  const [showTrails, setShowTrails] = useState(true);
  const [running, setRunning] = useState(true);
  const [particleCount, setParticleCount] = useState(0);
  const [controlsOpen, setControlsOpen] = useState(false);
  const [resetKey, setResetKey] = useState(0);
  const { isDark, toggleDarkMode } = useDarkMode();

  const handleReset = useCallback(() => {
    setResetKey((k) => k + 1);
  }, []);

  const handleParticleCount = useCallback((count: number) => {
    setParticleCount(count);
  }, []);

  return (
    <div className={`relative w-full h-screen overflow-hidden transition-colors duration-500 ${
      isDark ? 'bg-[#030712]' : 'bg-[#f0f4ff]'
    }`}>
      {/* Stars background (dark mode only) */}
      {isDark && (
        <div className="fixed inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-[#030712] via-[#0c0a20] to-[#030712]" />
          {Array.from({ length: 100 }).map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-white animate-pulse"
              style={{
                width: `${Math.random() * 2 + 1}px`,
                height: `${Math.random() * 2 + 1}px`,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                opacity: Math.random() * 0.5 + 0.1,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${Math.random() * 3 + 2}s`,
              }}
            />
          ))}
        </div>
      )}

      {/* Light mode gradient background */}
      {!isDark && (
        <div className="fixed inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50" />
          {/* Subtle dots pattern */}
          <div className="absolute inset-0 opacity-30" style={{
            backgroundImage: 'radial-gradient(circle, rgba(99,102,241,0.15) 1px, transparent 1px)',
            backgroundSize: '30px 30px',
          }} />
        </div>
      )}

      {/* Canvas Simulation */}
      <div className="fixed inset-0 z-10">
        <GravityCanvas
          key={resetKey}
          gravityStrength={gravityStrength}
          trailLength={trailLength}
          showTrails={showTrails}
          running={running}
          onParticleCount={handleParticleCount}
          isDark={isDark}
        />
      </div>

      {/* Title overlay */}
      <div className="fixed top-6 left-6 z-30">
        <h1 className={`text-4xl font-bold bg-clip-text text-transparent ${
          isDark
            ? 'bg-gradient-to-r from-indigo-300 via-purple-300 to-pink-300'
            : 'bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600'
        }`}>
          Gravity
        </h1>
        <p className={`text-sm mt-1 font-light ${isDark ? 'text-white/40' : 'text-gray-500'}`}>
          Interactive N-body simulation
        </p>
      </div>

      {/* Controls */}
      <Controls
        gravityStrength={gravityStrength}
        setGravityStrength={setGravityStrength}
        trailLength={trailLength}
        setTrailLength={setTrailLength}
        showTrails={showTrails}
        setShowTrails={setShowTrails}
        running={running}
        setRunning={setRunning}
        particleCount={particleCount}
        onReset={handleReset}
        isOpen={controlsOpen}
        setIsOpen={setControlsOpen}
        isDark={isDark}
        toggleDarkMode={toggleDarkMode}
      />

      {/* Bottom info */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-30">
        <div className={`backdrop-blur-md rounded-full px-5 py-2 ${
          isDark
            ? 'bg-black/30 border border-white/10'
            : 'bg-white/60 border border-gray-200/50'
        }`}>
          <p className={`text-xs text-center ${isDark ? 'text-white/50' : 'text-gray-600'}`}>
            Click to add mass • Hold to attract • Watch the orbits
          </p>
        </div>
      </div>
    </div>
  );
}
