export interface SimulationState {
  mode: 'autonomous';
  isRunning: boolean;
  fieldSize: { width: number; length: number };
  coverage: number;
  timeElapsed: number;
  overlaps: number;
  carPosition: { x: number; z: number; rotation: number };
  coveredAreas: Set<string>;
  visitedCells: Map<string, number>;
  cellSize: number;
}

export interface Store {
  simulation: SimulationState;
  toggleSimulation: () => void;
  resetSimulation: () => void;
  updateCarPosition: (x: number, z: number, rotation: number) => void;
  updateCoverage: () => void;
}