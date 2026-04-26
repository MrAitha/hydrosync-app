import React from 'react';

const WeatherWidget = ({ weather, loading, error, onRetry }) => {
  if (loading) {
    return (
      <section className="weather-widget glass-panel">
        <div className="weather-loading">
          <div className="spinner"></div>
          <p>Fetching local weather...</p>
        </div>
      </section>
    );
  }

  if (error || !weather) {
    return (
      <section className="weather-widget glass-panel">
        <div className="weather-error">
          <p>Unable to fetch weather data. Please enable location services.</p>
          <button onClick={onRetry} className="btn btn-small">Retry</button>
        </div>
      </section>
    );
  }

  const getWeatherDetails = (code, isDay) => {
    if (code === 0) return { icon: isDay ? '☀️' : '🌙', description: 'Clear sky' };
    if (code <= 3) return { icon: isDay ? '⛅' : '☁️', description: 'Partly cloudy' };
    if (code <= 48) return { icon: '🌫️', description: 'Fog' };
    if (code <= 57) return { icon: '🌧️', description: 'Drizzle' };
    if (code <= 67) return { icon: '🌧️', description: 'Rain' };
    if (code <= 77) return { icon: '❄️', description: 'Snow' };
    if (code <= 82) return { icon: '🌦️', description: 'Showers' };
    if (code <= 86) return { icon: '🌨️', description: 'Snow showers' };
    if (code >= 95) return { icon: '⛈️', description: 'Thunderstorm' };
    return { icon: '🌡️', description: 'Unknown' };
  };

  const { icon, description } = getWeatherDetails(weather.weatherCode, weather.isDay);

  return (
    <section className="weather-widget glass-panel">
      <div className="weather-content">
        <div className="weather-main">
          <div className="weather-icon">{icon}</div>
          <div className="weather-temp">{Math.round(weather.temp)}°C</div>
        </div>
        <div className="weather-details">
          <h2>{description}</h2>
          <p>Your Location</p>
          <div className="weather-stats">
            <span>💧 {weather.rainChance}% Rain</span>
            <span>🌫️ {weather.humidity}% Hum</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WeatherWidget;
