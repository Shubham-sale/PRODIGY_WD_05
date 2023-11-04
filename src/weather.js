import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./weather.module.css";

function Weather() {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const API_KEY = "4463115373bda94a5fe65801dec4aadd";

  const fetchData = async (query) => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${API_KEY}`
      );
      setWeatherData(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching weather data:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!city) {
      // If no city is entered, fetch real-time location weather
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const { latitude, longitude } = position.coords;
            try {
              const response = await axios.get(
                `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`
              );
              setWeatherData(response.data);
              setLoading(false);
            } catch (error) {
              console.error("Error fetching weather data:", error);
              setLoading(false);
            }
          },
          (error) => {
            console.error("Error getting geolocation:", error);
            setLoading(false);
          }
        );
      } else {
        console.error("Geolocation is not supported by this browser.");
        setLoading(false);
      }
    } else {
      // Fetch weather data for the entered city
      fetchData(city);
    }
  }, [city]);

  const kelvinToCelsius = (temp) => {
    return (temp - 273.15).toFixed(2);
  };

  return (
    <>
      <div className={styles.weatherContainer}>
        <input
          type="text"
          className={styles.input}
          placeholder="Enter city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button className={styles.button} onClick={() => fetchData(city)}>
          Get Weather
        </button>

        {loading && <p>Loading...</p>}

        {weatherData && (
          <div className={styles.weatherInfo}>
            <h2>
              {weatherData.name}, {weatherData.sys.country}
            </h2>
            <p>Temperature: {kelvinToCelsius(weatherData.main.temp)}°C</p>
            <p>Weather: {weatherData.weather[0].description}</p>
          </div>
        )}
      </div>
    </>
  );
}

export default Weather;
