import { useRef, useEffect, useCallback, useState } from 'react';
import type { Particle } from '../types';

interface Props {
  gravityStrength: number;
  trailLength: number;
  showTrails: boolean;
  running: boolean;
  onParticleCount: (count: number) => void;
}

const COLORS = [
  '#6366f1', '#8b5cf6', '#a78bfa', '#c084fc',
  '#e879f9', '#f472b6', '#fb7185', '#f87171',
  '#60a5fa', '#38bdf8', '#22d3ee', '#2dd4bf',
  '#34d399', '#4ade80', '#a3e635', '#facc15',
];

function randomColor(): string {
  return COLORS[Math.floor(Math.random() * COLORS.length)];
}

function createParticle(x: number, y: number, mass: number, fixed = false): Particle {
  const angle = Math.random() * Math.PI * 2;
  const speed = fixed ? 0 : Math.random() * 2;
  return {
    id: Date.now() + Math.random(),
    x,
    y,
    vx: Math.cos(angle) * speed,
    vy: Math.sin(angle) * speed,
    mass,
    radius: Math.max(3, Math.sqrt(mass) * 2),
    color: randomColor(),
    trail: [],
    fixed,
  };
}

export default function GravityCanvas({ gravityStrength, trailLength, showTrails, running, onParticleCount }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animFrameRef = useRef<number>(0);
  const mouseRef = useRef<{ x: number; y: number; down: boolean }>({ x: 0, y: 0, down: false });
  const [dimensions, setDimensions] = useState({ width: window.innerWidth, height: window.innerHeight });

  // Initialize with some particles
  useEffect(() => {
    const cx = dimensions.width / 2;
    const cy = dimensions.height / 2;

    // Central massive body
    const center = createParticle(cx, cy, 500, true);
    center.color = '#fbbf24';
    center.radius = 20;

    const particles: Particle[] = [center];

    // Orbiting particles
    for (let i = 0; i < 40; i++) {
      const angle = Math.random() * Math.PI * 2;
      const dist = 100 + Math.random() * 250;
      const px = cx + Math.cos(angle) * dist;
      const py = cy + Math.sin(angle) * dist;
      const p = createParticle(px, py, 1 + Math.random() * 5);

      // Give orbital velocity
      const speed = Math.sqrt((gravityStrength * center.mass) / dist) * 0.01;
      p.vx = -Math.sin(angle) * speed;
      p.vy = Math.cos(angle) * speed;
      particles.push(p);
    }

    particlesRef.current = particles;
    onParticleCount(particles.length);
  }, []);

  // Handle resize
  useEffect(() => {
    const handleResize = () => {
      setDimensions({ width: window.innerWidth, height: window.innerHeight });
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Mouse handlers
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    mouseRef.current = { x, y, down: true };

    // Add particle on click
    const p = createParticle(x, y, 5 + Math.random() * 15);
    // Give it some velocity toward center for interesting orbits
    const cx = dimensions.width / 2;
    const cy = dimensions.height / 2;
    const angle = Math.atan2(cy - y, cx - x);
    const dist = Math.sqrt((cx - x) ** 2 + (cy - y) ** 2);
    const speed = Math.sqrt((gravityStrength * 500) / Math.max(dist, 50)) * 0.015;
    p.vx = -Math.sin(angle + Math.PI / 4) * speed;
    p.vy = Math.cos(angle + Math.PI / 4) * speed;
    particlesRef.current.push(p);
    onParticleCount(particlesRef.current.length);
  }, [dimensions, gravityStrength, onParticleCount]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseRef.current.x = e.clientX - rect.left;
    mouseRef.current.y = e.clientY - rect.top;
  }, []);

  const handleMouseUp = useCallback(() => {
    mouseRef.current.down = false;
  }, []);

  // Animation loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const G = gravityStrength;

    const animate = () => {
      const { width, height } = dimensions;
      canvas.width = width;
      canvas.height = height;

      // Background
      ctx.fillStyle = 'rgba(3, 7, 18, 0.15)';
      ctx.fillRect(0, 0, width, height);

      const particles = particlesRef.current;

      if (running) {
        // Physics update
        for (let i = 0; i < particles.length; i++) {
          const p = particles[i];
          if (p.fixed) continue;

          // Gravity from all other particles
          for (let j = 0; j < particles.length; j++) {
            if (i === j) continue;
            const other = particles[j];
            const dx = other.x - p.x;
            const dy = other.y - p.y;
            const distSq = dx * dx + dy * dy;
            const dist = Math.sqrt(distSq);

            if (dist < 5) continue;

            const force = (G * other.mass) / (distSq + 100);
            p.vx += (dx / dist) * force;
            p.vy += (dy / dist) * force;
          }

          // Mouse attraction when held down
          if (mouseRef.current.down) {
            const dx = mouseRef.current.x - p.x;
            const dy = mouseRef.current.y - p.y;
            const distSq = dx * dx + dy * dy;
            const dist = Math.sqrt(distSq);
            if (dist > 5) {
              const force = (G * 200) / (distSq + 100);
              p.vx += (dx / dist) * force;
              p.vy += (dy / dist) * force;
            }
          }

          // Update position
          p.x += p.vx;
          p.y += p.vy;

          // Damping
          p.vx *= 0.999;
          p.vy *= 0.999;

          // Boundary bounce (soft)
          if (p.x < 0) { p.x = 0; p.vx *= -0.5; }
          if (p.x > width) { p.x = width; p.vx *= -0.5; }
          if (p.y < 0) { p.y = 0; p.vy *= -0.5; }
          if (p.y > height) { p.y = height; p.vy *= -0.5; }

          // Trail
          p.trail.push({ x: p.x, y: p.y });
          if (p.trail.length > trailLength) {
            p.trail.shift();
          }
        }

        // Collision detection and merging
        for (let i = particles.length - 1; i >= 0; i--) {
          for (let j = i - 1; j >= 0; j--) {
            const a = particles[i];
            const b = particles[j];
            const dx = a.x - b.x;
            const dy = a.y - b.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < a.radius + b.radius) {
              // Merge smaller into larger
              const [big, small] = a.mass >= b.mass ? [a, b] : [b, a];
              const totalMass = big.mass + small.mass;
              big.vx = (big.vx * big.mass + small.vx * small.mass) / totalMass;
              big.vy = (big.vy * big.mass + small.vy * small.mass) / totalMass;
              big.mass = totalMass;
              big.radius = Math.max(3, Math.sqrt(big.mass) * 2);
              particles.splice(particles.indexOf(small), 1);
              onParticleCount(particles.length);
            }
          }
        }
      }

      // Draw trails
      if (showTrails) {
        for (const p of particles) {
          if (p.trail.length < 2) continue;
          ctx.beginPath();
          ctx.moveTo(p.trail[0].x, p.trail[0].y);
          for (let i = 1; i < p.trail.length; i++) {
            ctx.lineTo(p.trail[i].x, p.trail[i].y);
          }
          ctx.strokeStyle = p.color + '40';
          ctx.lineWidth = p.radius * 0.5;
          ctx.stroke();
        }
      }

      // Draw particles
      for (const p of particles) {
        // Glow effect
        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius * 3);
        gradient.addColorStop(0, p.color + 'cc');
        gradient.addColorStop(0.5, p.color + '44');
        gradient.addColorStop(1, 'transparent');
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius * 3, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();

        // Core
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();

        // Highlight
        ctx.beginPath();
        ctx.arc(p.x - p.radius * 0.3, p.y - p.radius * 0.3, p.radius * 0.4, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255,255,255,0.3)';
        ctx.fill();
      }

      // Draw mouse gravity well indicator
      if (mouseRef.current.down) {
        const mx = mouseRef.current.x;
        const my = mouseRef.current.y;
        const gradient = ctx.createRadialGradient(mx, my, 0, mx, my, 60);
        gradient.addColorStop(0, 'rgba(255,255,255,0.2)');
        gradient.addColorStop(1, 'transparent');
        ctx.beginPath();
        ctx.arc(mx, my, 60, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
      }

      animFrameRef.current = requestAnimationFrame(animate);
    };

    animFrameRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animFrameRef.current);
  }, [dimensions, running, gravityStrength, trailLength, showTrails, onParticleCount]);

  return (
    <canvas
      ref={canvasRef}
      width={dimensions.width}
      height={dimensions.height}
      className="fixed inset-0 w-full h-full cursor-crosshair"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    />
  );
}
