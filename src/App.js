import "./App.css";
import { useState } from "react";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const API_KEY = "c14214eb4f88396888709bd83321607b";

  const getWeather = async () => {
  if (!city) return;

  setLoading(true);
  setError("");
  setWeather(null);

  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
    );

    const data = await response.json();

    if (data.cod === 200 || data.cod === "200") {
      setWeather(data);
    } else {
      setError("City not found");
    }
  } catch (error) {
    setError("Failed to fetch weather");
  }

  setLoading(false);
};

  return (
    <div className="App">
      <h1>Weather App</h1>

      <input
        type="text"
        placeholder="Enter city name"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />

      <button onClick={getWeather}>Search</button>

      {loading && <p>Loading...</p>}

      {error && <p>{error}</p>}

      {weather && (
        <div className="weather-card">
          <h2>{weather.name}</h2>
          <p>🌡 Temperature: {weather.main.temp}°C</p>
          <p>☁ Weather: {weather.weather[0].main}</p>
        </div>
      )}
    </div>
  );
}

export default App;