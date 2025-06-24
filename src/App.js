import React, { useState } from 'react';
import axios from 'axios';

const WeatherApp = () => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);

  const getWeather = async () => {
    if (!city) return;

    const api_key = "e10e48cd5c1df35f6da8d75df73a8bb5"; 
    try {
      const response = await axios.get(
     `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}&units=metric`
      );

      setWeather({
        temp: response.data.main.temp,
        humidity: response.data.main.humidity,
        wind: response.data.wind.speed,
        clouds: response.data.clouds.all,
        description: response.data.weather[0].description,
        city: response.data.name,
        country: response.data.sys.country,
      });
    } catch (error) {
      alert('City not found or API error');
      setWeather(null);
    }
  };
  return (
     <div className='bg-imagel'>
     <div className="flex flex-col items-center justify-center min-h-screen  border-e-indigo-500-900">
       <div className="border-e-indigo-500-900 bg-black/70 text-white p-8 rounded-2xl shadow-xl w-full max-w-sm text-center">
        <h1 className="text-2xl font-bold mb-4">🌍 Weather: clouds</h1>
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city"
          className="w-full p-2 rounded text-black mb-4"
        />
        <button
          onClick={getWeather}
          className="bg-white text-blue-900 px-4 py-2 rounded font-semibold mb-4"
        >
          🔍 Search
        </button>
        {weather && (
            <div><div className="text-xl font-semibold mb-2">
              {weather.city}, {weather.country}
            </div>
            <div className="capitalize mb-2">{weather.description}</div>
            <div className="text-3xl font-bold mb-2">{weather.temp}°C</div>
            <div className="text-sm text-left">
              <div> Humidity: {weather.humidity}%</div>
              <div> Wind: {weather.wind} km/h</div>
              <div> Clouds: {weather.clouds}%</div>
            </div>
          </div>
        )}
      </div>
    </div>

    </div>
  );
};
export default WeatherApp;


