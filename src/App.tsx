import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';
import { Play, Pause, RotateCcw, Sprout, Leaf, Tractor, Timer } from 'lucide-react';
import { useStore } from './store/simulationStore';
import { Field } from './components/Simulation/Field';
import { Car } from './components/Simulation/Car';
import { Stats } from './components/Dashboard/Stats';

function SimulationView() {
  const { isRunning } = useStore((state) => state.simulation);
  const { toggleSimulation, resetSimulation } = useStore();

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="aspect-[16/9] relative">
        <Canvas shadows camera={{ position: [50, 50, 50], fov: 50 }}>
          <Suspense fallback={null}>
            <Environment preset="sunset" />
            <ambientLight intensity={0.5} />
            <directionalLight position={[10, 10, 10]} intensity={1} castShadow />
            <Field />
            <Car />
            <OrbitControls />
          </Suspense>
        </Canvas>
        
        <div className="absolute bottom-4 left-4 right-4 flex justify-center space-x-4">
          <button
            onClick={toggleSimulation}
            className="bg-green-500 text-white px-6 py-3 rounded-lg flex items-center space-x-2 hover:bg-green-600 transition-colors shadow-lg"
          >
            {isRunning ? (
              <>
                <Pause className="w-5 h-5" />
                <span>Pause Simulation</span>
              </>
            ) : (
              <>
                <Play className="w-5 h-5" />
                <span>Start Simulation</span>
              </>
            )}
          </button>
          <button
            onClick={resetSimulation}
            className="bg-gray-500 text-white px-6 py-3 rounded-lg flex items-center space-x-2 hover:bg-gray-600 transition-colors shadow-lg"
          >
            <RotateCcw className="w-5 h-5" />
            <span>Reset</span>
          </button>
        </div>
      </div>
      <div className="p-4">
        <Stats />
      </div>
    </div>
  );
}

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">EPICCS Simulation</h1>
              <p className="mt-1 text-gray-600">Arduino-powered Autonomous Bio Decomposer Distribution</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="px-4 py-2 rounded-lg bg-green-500 text-white shadow-md flex items-center space-x-2">
                <Sprout className="w-5 h-5" />
                <span>Live Simulation</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6">
        <div className="space-y-8">
          <section className="prose prose-lg max-w-none">
            <h2 className="flex items-center space-x-2 text-2xl font-bold text-gray-900">
              <Leaf className="w-6 h-6 text-green-500" />
              <span>About EPICCS</span>
            </h2>
            <p className="text-gray-700">
              The Enhanced Precision Intelligent Crop Care System (EPICCS) represents a breakthrough in sustainable agriculture. 
              This autonomous system utilizes advanced Arduino-based robotics to distribute bio decomposers across agricultural fields, 
              accelerating stubble decomposition and eliminating the need for crop burning.
            </p>
            
            <div className="grid md:grid-cols-2 gap-6 my-8">
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <h3 className="flex items-center space-x-2 text-xl font-semibold text-gray-900 mb-3">
                  <Tractor className="w-5 h-5 text-green-500" />
                  <span>Autonomous Operation</span>
                </h3>
                <p className="text-gray-600">
                  EPICCS employs sophisticated path-planning algorithms to ensure complete field coverage while minimizing overlaps. 
                  The system adapts to different field sizes and shapes, optimizing the distribution pattern for maximum efficiency.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <h3 className="flex items-center space-x-2 text-xl font-semibold text-gray-900 mb-3">
                  <Timer className="w-5 h-5 text-green-500" />
                  <span>Real-time Monitoring</span>
                </h3>
                <p className="text-gray-600">
                  The simulation provides real-time statistics on field coverage, time elapsed, and distribution efficiency. 
                  This data helps farmers optimize their operations and ensure complete decomposer application.
                </p>
              </div>
            </div>
          </section>

          <SimulationView />
          
          <section className="prose prose-lg max-w-none">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-gray-700">
              The simulation demonstrates EPICCS's autonomous navigation and bio decomposer distribution system. 
              The robot traverses the field in a systematic pattern, ensuring uniform coverage while avoiding redundant passes. 
              Real-time monitoring provides instant feedback on coverage efficiency and operation progress.
            </p>
            <p className="text-gray-700">
              The performance score is calculated based on field coverage and path efficiency, with penalties for overlapping passes. 
              This helps optimize the distribution pattern for maximum effectiveness while minimizing waste and operation time.
            </p>
          </section>
        </div>
      </main>
    </div>
  );
}

export default App