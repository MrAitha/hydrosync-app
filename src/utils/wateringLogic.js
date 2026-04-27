const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

export const getWateringSuggestion = (plant, weather) => {
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
