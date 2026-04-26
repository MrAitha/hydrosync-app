import React, { useState } from 'react';
import PlantCard from './PlantCard';

const PlantList = ({ plants, weather, onDelete, onWater, onWaterAll }) => {
  const [filter, setFilter] = useState('all');

  const filteredPlants = filter === 'all' 
    ? plants 
    : plants.filter(p => p.location === filter);

  return (
    <main className="plants-section">
      <div className="section-header" style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', alignItems: 'center' }}>
        <h2 style={{ flex: 1 }}>Your Plants</h2>
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', alignItems: 'center' }}>
          {filteredPlants.length > 0 && (
            <button 
              onClick={() => onWaterAll(filter)} 
              className="btn btn-small"
              style={{ background: 'rgba(59, 130, 246, 0.2)', color: 'var(--info)', border: '1px solid var(--info)' }}
            >
              💦 Water All {filter === 'all' ? '' : filter.charAt(0).toUpperCase() + filter.slice(1)}
            </button>
          )}
          <div className="filter-controls">
          <button 
            className={`filter-btn ${filter === 'all' ? 'active' : ''}`} 
            onClick={() => setFilter('all')}
          >All</button>
          <button 
            className={`filter-btn ${filter === 'indoor' ? 'active' : ''}`} 
            onClick={() => setFilter('indoor')}
          >Indoor</button>
          <button 
            className={`filter-btn ${filter === 'outdoor' ? 'active' : ''}`} 
            onClick={() => setFilter('outdoor')}
          >Outdoor</button>
          </div>
        </div>
      </div>
      
      {filteredPlants.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">🪴</div>
          <h3>No plants yet</h3>
          <p>Add your first plant to get smart watering suggestions!</p>
        </div>
      ) : (
        <div className="plants-grid">
          {filteredPlants.map(plant => (
            <PlantCard 
              key={plant.id} 
              plant={plant} 
              weather={weather} 
              onDelete={onDelete} 
              onWater={onWater} 
            />
          ))}
        </div>
      )}
    </main>
  );
};

export default PlantList;
