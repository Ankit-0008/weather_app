import { useState } from "react";
const Weather = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");

  const api_key = "e10e48cd5c1df35f6da8d75df73a8bb5";

  const handleData = async () => {
    try {
      setError("");
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}&units=metric`
      );
      if (!response.ok) throw new Error("City not found");
      const LiveData = await response.json();
      setWeather(LiveData);
    } catch (error) {
      setWeather(null);
      setError(error.message);
    }
  };

  return (
    <div 
      className="min-h-screen flex flex-col items-center justify-center bg-cover bg-center bg-no-repeat p-4"
      style={{
        backgroundImage: `url(${bgImage})`
      }}
    >
      <div className="w-full max-w-md bg-black bg-opacity-50 backdrop-blur-lg rounded-3xl shadow-2xl p-6 text-white">
        <h1 className="text-4xl font-extrabold text-center mb-6 tracking-wide">
          🌍 Weather Forecast
        </h1>

        <div className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Enter city name..."
            className="p-3 rounded-xl text-black focus:outline-none shadow-inner"
            value={city}
            onChange={(e) => {
              setCity(e.target.value);
            }}
            onKeyDown={(e) => e.key === "Enter" && handleData()}
          />
          <button
            className="bg-white text-indigo-600 font-semibold py-2 rounded-xl hover:bg-indigo-100"
            onClick={handleData}
          >
            🔍 Search Weather
          </button>
        </div>

        {error && <p className="text-red-400 mt-4 text-center">{error}</p>}

        {weather && (
          <div className="mt-6 text-center">
            <img
              src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
              alt="weather-icon"
              className="mx-auto h-32 w-32 object-contain mb-4"
            />
            <h2 className="text-3xl font-bold">
              {weather.name}/{weather.sys.country}
            </h2>
            <p className="text-xl capitalize">
              {weather.weather[0].description}
            </p>
            <p className="text-5xl font-extrabold mt-2">
              {weather.main.temp}°C
            </p>

            <div className="grid grid-cols-3 gap-2 mt-6 text-sm text-white">
              <div className="bg-white bg-opacity-20 rounded-xl p-2">
                <p className="font-semibold">Humidity</p>
                <p>{weather.main.humidity}%</p>
              </div>
              <div className="bg-white bg-opacity-20 rounded-xl p-2">
                <p className="font-semibold">Wind</p>
                <p>{weather.wind.speed} m/s</p>
              </div>
              <div className="bg-white bg-opacity-20 rounded-xl p-2">
                <p className="font-semibold">Clouds</p>
                <p>{weather.clouds.all}%</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Weather;
