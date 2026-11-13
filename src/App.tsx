import { useState, useCallback } from 'react';
import GravityCanvas from './components/GravityCanvas';
import Controls from './components/Controls';

export default function App() {
  const [gravityStrength, setGravityStrength] = useState(1.5);
  const [trailLength, setTrailLength] = useState(50);
  const [showTrails, setShowTrails] = useState(true);
  const [running, setRunning] = useState(true);
  const [particleCount, setParticleCount] = useState(0);
  const [controlsOpen, setControlsOpen] = useState(false);
  const [resetKey, setResetKey] = useState(0);

  const handleReset = useCallback(() => {
    setResetKey((k) => k + 1);
  }, []);

  const handleParticleCount = useCallback((count: number) => {
    setParticleCount(count);
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-[#030712]">
      {/* Stars background */}
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

      {/* Canvas Simulation */}
      <div className="fixed inset-0 z-10">
        <GravityCanvas
          key={resetKey}
          gravityStrength={gravityStrength}
          trailLength={trailLength}
          showTrails={showTrails}
          running={running}
          onParticleCount={handleParticleCount}
        />
      </div>

      {/* Title overlay */}
      <div className="fixed top-6 left-6 z-30">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-300 via-purple-300 to-pink-300 bg-clip-text text-transparent">
          Gravity
        </h1>
        <p className="text-white/40 text-sm mt-1 font-light">Interactive N-body simulation</p>
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
      />

      {/* Bottom info */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-30">
        <div className="bg-black/30 backdrop-blur-md rounded-full px-5 py-2 border border-white/10">
          <p className="text-white/50 text-xs text-center">
            Click to add mass • Hold to attract • Watch the orbits
          </p>
        </div>
      </div>
    </div>
  );
}
