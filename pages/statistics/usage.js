import { useState, useEffect } from 'react';
import useUsageTracker from '../../utils/useUsageTracker';

export default function UsageStatistics() {
  // Track that the user is viewing usage stats
  useUsageTracker('usage_statistics');

  const [stats, setStats] = useState([]);

  useEffect(() => {
    async function fetchStats() {
      const res = await fetch('/api/usage');
      const data = await res.json();
      setStats(data);
    }
    fetchStats();
  }, []);

  return (
    <div style={{ maxWidth: '600px', margin: '20px auto', fontFamily: 'sans-serif' }}>
      <h2>Usage Statistics</h2>
      <ul>
        {stats.map((stat) => (
          <li key={stat.page}>
            <strong>{stat.page}</strong>: {stat._count.id} views
          </li>
        ))}
      </ul>
    </div>
  );
}
