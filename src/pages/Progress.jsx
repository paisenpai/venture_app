import React from 'react';
import { useNavigate } from 'react-router-dom';
import ProgressBar from '../components/progress/ProgressBar';
import useProgressStats from '../features/Progress/useProgressStats';

// Example character stats (replace with real data if available)
const characterStats = [
  { name: 'Strength', value: 75, max: 100 },
  { name: 'Agility', value: 60, max: 100 },
  { name: 'Intelligence', value: 90, max: 100 },
  { name: 'Endurance', value: 50, max: 100 },
  { name: 'Charisma', value: 40, max: 100 },
];

const Progress = () => {
  const navigate = useNavigate();
  const { stats, loading, error } = useProgressStats();

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-2 text-indigo-900">Progress Page</h1>
      <p className="mb-8 text-gray-700">Welcome! Track your progress here.</p>

      {/* Tasks Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4 text-indigo-800">Your Tasks</h2>
        {loading && <p className="mb-4 text-gray-500">Loading...</p>}
        {error && <p className="mb-4 text-red-500">{error}</p>}
        <ul className="space-y-6">
          {stats?.tasks?.map((task) => (
            <li key={task.id} className="bg-white rounded-lg shadow p-4">
              <div className="flex items-center justify-between mb-2">
                <strong className="text-lg text-indigo-900">{task.name}</strong>
                <span className="text-sm text-gray-500">{task.progress}%</span>
              </div>
              <ProgressBar value={task.progress} maxValue={100} />
              <p className="mt-2 text-sm text-gray-600">{task.progress}% completed</p>
            </li>
          ))}
        </ul>
      </section>

      {/* Character Stats Progress Report */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6 text-indigo-800">Character Stats</h2>
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
          {characterStats.map((stat) => (
            <div
              key={stat.name}
              className="bg-stone-50 rounded-xl p-6 shadow flex flex-col items-center"
            >
              <div className="font-bold text-indigo-900 mb-2 text-lg">{stat.name}</div>
              <ProgressBar value={stat.value} maxValue={stat.max} />
              <div className="mt-2 text-indigo-600 font-semibold text-base">
                {stat.value} / {stat.max}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Navigation Buttons */}
      <div className="flex gap-4 justify-end">
        <button
          onClick={() => handleNavigation('/dashboard')}
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded transition"
        >
          Go to Dashboard
        </button>
        <button
          onClick={() => handleNavigation('/settings')}
          className="bg-gray-200 hover:bg-gray-300 text-indigo-900 font-semibold py-2 px-4 rounded transition"
        >
          Go to Settings
        </button>
      </div>
    </div>
  );
};

export default Progress;
