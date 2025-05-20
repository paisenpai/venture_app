import React from 'react';
import useLevelSystem from '../features/leveling/useLevelSystem';

const Dashboard = () => {
  // For demonstration, you can set a default XP value here
  const { level, xp, xpForNextLevel, addXP } = useLevelSystem(0);

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <div className="flex gap-5 mt-5">
        <div className="flex-1 p-5 border border-gray-300 rounded-lg">
          <h2 className="text-xl font-semibold">Summary</h2>
          <p>Total Users: 120</p>
          <p>Total Sales: $15,000</p>
          <p>Active Sessions: 45</p>
        </div>
        <div className="flex-1 p-5 border border-gray-300 rounded-lg">
          <h2 className="text-xl font-semibold">Stats</h2>
          <p>Daily Visitors: 1,200</p>
          <p>Monthly Revenue: $45,000</p>
          <p>Conversion Rate: 5%</p>
        </div>
      </div>

      <div className="mt-10">
        <h2 className="text-xl font-semibold">User Progress</h2>
        <div className="flex gap-5 mt-5">
          <div className="flex-1 p-5 border border-gray-300 rounded-lg">
            <h3 className="text-lg font-medium">Level</h3>
            <p>Level: {level}</p>
            <p>XP: {xp}</p>
            <p>XP for next level: {xpForNextLevel ?? 'Max level reached'}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
