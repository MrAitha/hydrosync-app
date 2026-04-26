import React, { useState, useEffect } from 'react';
import WeatherWidget from './components/WeatherWidget';
import PlantList from './components/PlantList';
import AddPlantModal from './components/AddPlantModal';

function App() {
  const [plants, setPlants] = useState(() => {
    const saved = localStorage.getItem('plants');
    return saved ? JSON.parse(saved) : [];
  });
  
  const [weather, setWeather] = useState(null);
  const [weatherLoading, setWeatherLoading] = useState(true);
  const [weatherError, setWeatherError] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('plants', JSON.stringify(plants));
  }, [plants]);

  useEffect(() => {
    fetchWeather();
  }, []);

  const fetchWeather = () => {
    setWeatherLoading(true);
    setWeatherError(false);

    const getWeatherForCoords = (latitude, longitude) => {
      const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&hourly=precipitation_probability,relativehumidity_2m&daily=precipitation_sum&timezone=auto`;
      
      fetch(url)
        .then(res => res.json())
        .then(data => {
          if (!data || !data.current_weather) {
            setWeatherError(true);
          } else {
            const current = data.current_weather;
            const rainChance = data.hourly?.precipitation_probability?.[0] || 0;
            const humidity = data.hourly?.relativehumidity_2m?.[0] || 50;
            
            setWeather({
              temp: current.temperature,
              windspeed: current.windspeed,
              isDay: current.is_day,
              weatherCode: current.weathercode,
              rainChance,
              humidity
            });
          }
          setWeatherLoading(false);
        })
        .catch(err => {
          console.error("Error fetching weather:", err);
          setWeatherError(true);
          setWeatherLoading(false);
        });
    };

    const fetchWeatherByIP = () => {
      fetch('https://get.geojs.io/v1/ip/geo.json')
        .then(res => res.json())
        .then(data => {
          getWeatherForCoords(data.latitude, data.longitude);
        })
        .catch(err => {
          console.error("IP Geolocation failed:", err);
          setWeatherError(true);
          setWeatherLoading(false);
        });
    };

    // If browser geolocation is available and we are in a secure context, try it.
    // Otherwise (or if it fails/times out), fallback to IP-based location.
    if (navigator.geolocation && window.isSecureContext) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          getWeatherForCoords(position.coords.latitude, position.coords.longitude);
        },
        (error) => {
          console.warn("Browser geolocation failed, falling back to IP:", error);
          fetchWeatherByIP();
        },
        { timeout: 5000 }
      );
    } else {
      console.warn("Insecure context or geolocation unavailable, using IP geolocation.");
      fetchWeatherByIP();
    }
  };

  const handleAddPlant = (newPlant) => {
    setPlants([...plants, newPlant]);
  };

  const handleDeletePlant = (id) => {
    setPlants(plants.filter(p => p.id !== id));
  };

  const handleWaterPlant = (id) => {
    setPlants(plants.map(p => 
      p.id === id ? { ...p, lastWatered: new Date().toISOString() } : p
    ));
  };

  const handleWaterAll = (locationFilter) => {
    setPlants(plants.map(p => {
      if (locationFilter === 'all' || p.location === locationFilter) {
        return { ...p, lastWatered: new Date().toISOString() };
      }
      return p;
    }));
  };

  const currentDate = new Date().toLocaleDateString('en-US', { 
    weekday: 'long', 
    month: 'short', 
    day: 'numeric' 
  });

  return (
    <>
      <div className="background-elements">
        <div className="blob blob-1"></div>
        <div className="blob blob-2"></div>
      </div>

      <div className="app-container">
        <header className="app-header glass-panel">
          <div className="logo">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"></path>
            </svg>
            <h1>HydroSync</h1>
          </div>
          <div className="date-display">{currentDate}</div>
        </header>

        <WeatherWidget 
          weather={weather} 
          loading={weatherLoading} 
          error={weatherError} 
          onRetry={fetchWeather} 
        />

        <PlantList 
          plants={plants} 
          weather={weather}
          onDelete={handleDeletePlant}
          onWater={handleWaterPlant}
          onWaterAll={handleWaterAll}
        />

        <button 
          className="fab" 
          title="Add new plant"
          onClick={() => setIsModalOpen(true)}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
        </button>
      </div>

      <AddPlantModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onAdd={handleAddPlant} 
      />
    </>
  );
}

export default App;
