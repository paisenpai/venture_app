import { useContext } from 'react';
import { UserContext } from '../contexts/UserContext';

import XPLevelMeter from '../components/XPLevelMeter';
import StreakDisplay from '../components/StreakDisplay';
import GoalTracker from '../components/GoalTracker';

import useLevelSystem from '../features/leveling/useLevelSystem';
import useStreakTracker from '../features/streaks/useStreakTracker';

const Dashboard = () => {
  const { user } = useContext(UserContext);
  const { level, xp, nextLevelXP } = useLevelSystem(user?.xp || 0);
  const { streak } = useStreakTracker(user?.streak || 0);

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
            <h3 className="text-lg font-medium">XP Level</h3>
            <XPLevelMeter level={level} xp={xp} nextLevelXP={nextLevelXP} />
          </div>
          <div className="flex-1 p-5 border border-gray-300 rounded-lg">
            <h3 className="text-lg font-medium">Streak</h3>
            <StreakDisplay streak={streak} />
          </div>
          <div className="flex-1 p-5 border border-gray-300 rounded-lg">
            <h3 className="text-lg font-medium">Goals</h3>
            <GoalTracker user={user} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
