import React from 'react';
import { useStore } from '../../store/simulationStore';
import { Timer, Maximize, Repeat, Award } from 'lucide-react';

export function Stats() {
  const { coverage, timeElapsed, overlaps } = useStore((state) => state.simulation);

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900">Simulation Statistics</h3>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4">
          <div className="flex items-center space-x-3">
            <Timer className="w-6 h-6 text-blue-500" />
            <div>
              <p className="text-sm text-blue-700">Time Elapsed</p>
              <p className="text-2xl font-bold text-blue-900">{timeElapsed.toFixed(1)}s</p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-4">
          <div className="flex items-center space-x-3">
            <Maximize className="w-6 h-6 text-green-500" />
            <div>
              <p className="text-sm text-green-700">Field Coverage</p>
              <p className="text-2xl font-bold text-green-900">{(coverage * 100).toFixed(1)}%</p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg p-4">
          <div className="flex items-center space-x-3">
            <Repeat className="w-6 h-6 text-orange-500" />
            <div>
              <p className="text-sm text-orange-700">Path Overlaps</p>
              <p className="text-2xl font-bold text-orange-900">{overlaps}</p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-4">
          <div className="flex items-center space-x-3">
            <Award className="w-6 h-6 text-purple-500" />
            <div>
              <p className="text-sm text-purple-700">Performance Score</p>
              <p className="text-2xl font-bold text-purple-900">
                {Math.max(0, coverage * 1000 - overlaps * 10).toFixed(0)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}