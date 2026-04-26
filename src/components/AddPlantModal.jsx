import React, { useState, useEffect, useRef } from 'react';
import { suggestPlant } from '../utils/plantIntelligence';

const AddPlantModal = ({ isOpen, onClose, onAdd }) => {
  const [name, setName] = useState('');
  const [location, setLocation] = useState('indoor');
  const [waterNeeds, setWaterNeeds] = useState('medium');
  const [sunNeeds, setSunNeeds] = useState('partial');
  const [notes, setNotes] = useState('');
  
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const wrapperRef = useRef(null);

  // Close suggestions when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [wrapperRef]);

  const handleNameChange = (e) => {
    const value = e.target.value;
    setName(value);
    
    if (value.trim().length >= 2) {
      const results = suggestPlant(value);
      setSuggestions(results);
      setShowSuggestions(results.length > 0);
    } else {
      setShowSuggestions(false);
    }
  };

  const handleSelectSuggestion = (plant) => {
    setName(plant.name);
    setLocation(plant.location);
    setWaterNeeds(plant.waterNeeds);
    setSunNeeds(plant.sunNeeds);
    setShowSuggestions(false);
  };

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    
    onAdd({
      id: Date.now().toString(),
      name,
      location,
      waterNeeds,
      sunNeeds,
      notes,
      lastWatered: null
    });
    
    setName('');
    setLocation('indoor');
    setWaterNeeds('medium');
    setSunNeeds('partial');
    setNotes('');
    onClose();
  };

  const handleOverlayClick = (e) => {
    if (e.target.className.includes('modal-overlay')) {
      onClose();
    }
  };

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal-content glass-panel">
        <div className="modal-header">
          <h2>Add New Plant</h2>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group autocomplete-wrapper" ref={wrapperRef} style={{ position: 'relative' }}>
            <label htmlFor="plantName">Plant Name</label>
            <input 
              type="text" 
              id="plantName" 
              placeholder="e.g. Monstera, Basil (Try typing!)" 
              value={name}
              onChange={handleNameChange}
              onFocus={() => {
                if (suggestions.length > 0) setShowSuggestions(true);
              }}
              required 
              autoComplete="off"
            />
            
            {showSuggestions && (
              <ul className="suggestions-list" style={{
                position: 'absolute',
                top: '100%',
                left: 0,
                right: 0,
                background: 'var(--card-bg)',
                border: '1px solid var(--glass-border)',
                backdropFilter: 'blur(16px)',
                borderRadius: '12px',
                marginTop: '4px',
                maxHeight: '200px',
                overflowY: 'auto',
                zIndex: 10,
                listStyle: 'none',
                padding: '8px 0',
                boxShadow: 'var(--glass-shadow)'
              }}>
                {suggestions.map((plant, index) => (
                  <li 
                    key={index}
                    onClick={() => handleSelectSuggestion(plant)}
                    style={{
                      padding: '10px 16px',
                      cursor: 'pointer',
                      borderBottom: index < suggestions.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none',
                      transition: 'background 0.2s'
                    }}
                    onMouseEnter={(e) => e.target.style.background = 'rgba(255,255,255,0.1)'}
                    onMouseLeave={(e) => e.target.style.background = 'transparent'}
                  >
                    <div style={{ fontWeight: 600, color: 'var(--text-main)' }}>{plant.name}</div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                      {plant.location === 'indoor' ? '🏠 Indoor' : '🌳 Outdoor'} • 💧 {plant.waterNeeds} • ☀️ {plant.sunNeeds}
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
          
          <div className="form-group">
            <label>Location</label>
            <div className="radio-group">
              <label className="radio-card">
                <input 
                  type="radio" 
                  name="plantLocation" 
                  value="indoor" 
                  checked={location === 'indoor'}
                  onChange={(e) => setLocation(e.target.value)}
                />
                <span className="card-content">🏠 Indoor</span>
              </label>
              <label className="radio-card">
                <input 
                  type="radio" 
                  name="plantLocation" 
                  value="outdoor" 
                  checked={location === 'outdoor'}
                  onChange={(e) => setLocation(e.target.value)}
                />
                <span className="card-content">🌳 Outdoor</span>
              </label>
            </div>
          </div>

          <div className="form-group">
            <label>Water Needs</label>
            <div className="radio-group">
              <label className="radio-card">
                <input 
                  type="radio" 
                  name="waterNeeds" 
                  value="low" 
                  checked={waterNeeds === 'low'}
                  onChange={(e) => setWaterNeeds(e.target.value)}
                />
                <span className="card-content">🌵 Low</span>
              </label>
              <label className="radio-card">
                <input 
                  type="radio" 
                  name="waterNeeds" 
                  value="medium" 
                  checked={waterNeeds === 'medium'}
                  onChange={(e) => setWaterNeeds(e.target.value)}
                />
                <span className="card-content">🪴 Medium</span>
              </label>
              <label className="radio-card">
                <input 
                  type="radio" 
                  name="waterNeeds" 
                  value="high" 
                  checked={waterNeeds === 'high'}
                  onChange={(e) => setWaterNeeds(e.target.value)}
                />
                <span className="card-content">💧 High</span>
              </label>
            </div>
          </div>

          <div className="form-group">
            <label>Sunlight Needs</label>
            <div className="radio-group">
              <label className="radio-card">
                <input 
                  type="radio" 
                  name="sunNeeds" 
                  value="shade" 
                  checked={sunNeeds === 'shade'}
                  onChange={(e) => setSunNeeds(e.target.value)}
                />
                <span className="card-content">☁️ Shade</span>
              </label>
              <label className="radio-card">
                <input 
                  type="radio" 
                  name="sunNeeds" 
                  value="partial" 
                  checked={sunNeeds === 'partial'}
                  onChange={(e) => setSunNeeds(e.target.value)}
                />
                <span className="card-content">⛅ Partial</span>
              </label>
              <label className="radio-card">
                <input 
                  type="radio" 
                  name="sunNeeds" 
                  value="full" 
                  checked={sunNeeds === 'full'}
                  onChange={(e) => setSunNeeds(e.target.value)}
                />
                <span className="card-content">☀️ Full Sun</span>
              </label>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="plantNotes">Notes (Optional)</label>
            <textarea 
              id="plantNotes" 
              placeholder="e.g. Bought from Home Depot, needs fertilizer every month" 
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>

          <button type="submit" className="btn btn-primary btn-block">Add Plant</button>
        </form>
      </div>
    </div>
  );
};

export default AddPlantModal;
