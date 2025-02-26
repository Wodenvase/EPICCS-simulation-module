import { create } from 'zustand';
import { SimulationState, Store } from '../types/simulation';

const createInitialState = (): SimulationState => ({
  mode: 'autonomous',
  isRunning: false,
  fieldSize: { width: 50, length: 50 },
  coverage: 0,
  timeElapsed: 0,
  overlaps: 0,
  carPosition: { x: -23, z: -23, rotation: 0 },
  coveredAreas: new Set(),
  visitedCells: new Map(),
  cellSize: 2,
});

export const useStore = create<Store>((set, get) => ({
  simulation: createInitialState(),
  
  updateCarPosition: (x, z, rotation) => {
    set((state) => {
      const cellSize = state.simulation.cellSize;
      const cellKey = `${Math.floor(x/cellSize)},${Math.floor(z/cellSize)}`;
      const visitCount = state.simulation.visitedCells.get(cellKey) || 0;
      const updatedVisitedCells = new Map(state.simulation.visitedCells);
      updatedVisitedCells.set(cellKey, visitCount + 1);

      return {
        simulation: {
          ...state.simulation,
          carPosition: { x, z, rotation },
          coveredAreas: state.simulation.coveredAreas.add(cellKey),
          visitedCells: updatedVisitedCells,
          overlaps: Array.from(updatedVisitedCells.values()).filter(count => count > 1).length,
          timeElapsed: state.simulation.timeElapsed + 0.016,
        },
      };
    });
    get().updateCoverage();
  },
    
  updateCoverage: () => {
    set((state) => {
      const { fieldSize, cellSize } = state.simulation;
      const totalCells = Math.floor((fieldSize.width / cellSize) * (fieldSize.length / cellSize));
      const coverage = state.simulation.coveredAreas.size / totalCells;
      
      return {
        simulation: {
          ...state.simulation,
          coverage: Math.min(coverage, 1),
        },
      };
    });
  },
    
  toggleSimulation: () =>
    set((state) => ({
      simulation: {
        ...state.simulation,
        isRunning: !state.simulation.isRunning,
      },
    })),
    
  resetSimulation: () =>
    set(() => ({
      simulation: createInitialState(),
    })),
}));