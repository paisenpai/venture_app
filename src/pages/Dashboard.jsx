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
    <div style={{ padding: "20px" }}>
      <h1>Dashboard</h1>
      <div style={{ display: "flex", gap: "20px", marginTop: "20px" }}>
        <div style={{ flex: 1, padding: "20px", border: "1px solid #ccc", borderRadius: "8px" }}>
          <h2>Summary</h2>
          <p>Total Users: 120</p>
          <p>Total Sales: $15,000</p>
          <p>Active Sessions: 45</p>
        </div>
        <div style={{ flex: 1, padding: "20px", border: "1px solid #ccc", borderRadius: "8px" }}>
          <h2>Stats</h2>
          <p>Daily Visitors: 1,200</p>
          <p>Monthly Revenue: $45,000</p>
          <p>Conversion Rate: 5%</p>
        </div>
      </div>

      <div style={{ marginTop: "40px" }}>
        <h2>User Progress</h2>
        <div style={{ display: "flex", gap: "20px", marginTop: "20px" }}>
          <div style={{ flex: 1, padding: "20px", border: "1px solid #ccc", borderRadius: "8px" }}>
            <h3>XP Level</h3>
            <XPLevelMeter level={level} xp={xp} nextLevelXP={nextLevelXP} />
          </div>
          <div style={{ flex: 1, padding: "20px", border: "1px solid #ccc", borderRadius: "8px" }}>
            <h3>Streak</h3>
            <StreakDisplay streak={streak} />
          </div>
          <div style={{ flex: 1, padding: "20px", border: "1px solid #ccc", borderRadius: "8px" }}>
            <h3>Goals</h3>
            <GoalTracker user={user} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
