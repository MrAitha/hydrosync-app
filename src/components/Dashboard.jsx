import React from 'react';
import { getWateringSuggestion } from '../utils/wateringLogic';

const Dashboard = ({ plants, weather, onWater }) => {
  const totalPlants = plants.length;
  
  const today = new Date().toLocaleDateString();
  const wateredToday = plants.filter(p => 
    p.lastWatered && new Date(p.lastWatered).toLocaleDateString() === today
  ).length;

  const needsWaterCount = plants.filter(p => 
    getWateringSuggestion(p, weather).type === 'water'
  ).length;

  // Sort plants by lastWatered descending for the timeline
  const recentWaterings = [...plants]
    .filter(p => p.lastWatered)
    .sort((a, b) => new Date(b.lastWatered) - new Date(a.lastWatered))
    .slice(0, 5); // Show top 5

  return (
    <div className="dashboard">
      <div className="metrics-grid">
        <div className="metric-card glass-panel">
          <div className="metric-icon">🪴</div>
          <div className="metric-content">
            <h3>Total Plants</h3>
            <p className="metric-value">{totalPlants}</p>
          </div>
        </div>
        
        <div className="metric-card glass-panel">
          <div className="metric-icon">💧</div>
          <div className="metric-content">
            <h3>Watered Today</h3>
            <p className="metric-value">{wateredToday}</p>
          </div>
        </div>
        
        <div className="metric-card glass-panel needs-water">
          <div className="metric-icon">⚠️</div>
          <div className="metric-content">
            <h3>Needs Water</h3>
            <p className="metric-value">{needsWaterCount}</p>
          </div>
        </div>
      </div>

      <div className="recent-activity glass-panel">
        <h3>Recent Watering Activity</h3>
        {recentWaterings.length === 0 ? (
          <p className="empty-activity">No recent watering activity recorded.</p>
        ) : (
          <ul className="activity-list">
            {recentWaterings.map(plant => (
              <li key={plant.id} className="activity-item">
                <span className="activity-plant-name">{plant.name}</span>
                <span className="activity-time">
                  {new Date(plant.lastWatered).toLocaleString()}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
