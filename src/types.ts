export interface Particle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  mass: number;
  radius: number;
  color: string;
  trail: { x: number; y: number }[];
  fixed: boolean;
}

export interface SimulationState {
  particles: Particle[];
  running: boolean;
  gravityStrength: number;
  trailLength: number;
  showTrails: boolean;
}
