import React from 'react';

const PlantCard = ({ plant, weather, onDelete, onWater }) => {
  const getWateringSuggestion = () => {
    if (!weather) {
      return {
        type: 'water',
        icon: '💧',
        title: 'Check soil moisture',
        reason: 'No weather data available'
      };
    }

    if (plant.location === 'outdoor') {
      if (weather.rainChance > 50) {
        return {
          type: 'skip',
          icon: '🚫',
          title: 'Skip watering',
          reason: `High chance of rain (${weather.rainChance}%)`
        };
      }
      if (weather.temp > 30) {
        return {
          type: 'water',
          icon: '🚿',
          title: 'Water heavily',
          reason: `Hot weather (${Math.round(weather.temp)}°C) increases evaporation`
        };
      }
    }

    if (plant.location === 'indoor') {
      if (weather.humidity > 70 && plant.waterNeeds !== 'high') {
        return {
          type: 'skip',
          icon: '⏳',
          title: 'Delay watering',
          reason: 'High indoor humidity expected'
        };
      }
    }

    return {
      type: 'water',
      icon: '🪴',
      title: 'Water as normal',
      reason: `${capitalize(plant.waterNeeds)} water needs`
    };
  };

  const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);
  const suggestion = getWateringSuggestion();
  const lastWateredText = plant.lastWatered 
    ? `Last watered: ${new Date(plant.lastWatered).toLocaleDateString()}` 
    : 'Never watered';
    
  const sunIcon = plant.sunNeeds === 'full' ? '☀️' : plant.sunNeeds === 'partial' ? '⛅' : '☁️';

  return (
    <div className="plant-card">
      <div className="plant-header">
        <div className="plant-info">
          <h3>{plant.name}</h3>
          <div className="plant-tags" style={{ flexWrap: 'wrap' }}>
            <span className="tag">{plant.location === 'indoor' ? '🏠 Indoor' : '🌳 Outdoor'}</span>
            <span className="tag">💧 {capitalize(plant.waterNeeds)}</span>
            <span className="tag">{sunIcon} {capitalize(plant.sunNeeds || 'partial')} Sun</span>
          </div>
        </div>
        <div className="plant-actions">
          <button onClick={() => onDelete(plant.id)} className="icon-btn delete" title="Delete plant">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="3 6 5 6 21 6"></polyline>
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
            </svg>
          </button>
        </div>
      </div>
      
      <div className={`suggestion-box ${suggestion.type}`}>
        <div className="suggestion-icon">{suggestion.icon}</div>
        <div className="suggestion-text">
          <p>{suggestion.title}</p>
          <small>{suggestion.reason}</small>
        </div>
      </div>
      
      {plant.notes && (
        <div className="plant-notes" style={{
          background: 'rgba(0,0,0,0.2)',
          padding: '12px',
          borderRadius: '12px',
          borderLeft: '2px solid var(--text-muted)',
          fontSize: '0.85rem',
          color: 'var(--text-muted)'
        }}>
          <em>"{plant.notes}"</em>
        </div>
      )}
      
      <div>
        <button onClick={() => onWater(plant.id)} className="water-btn">Mark as Watered</button>
        <div style={{ textAlign: 'center', marginTop: '8px' }}>
          <small style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>{lastWateredText}</small>
        </div>
      </div>
    </div>
  );
};

export default PlantCard;
