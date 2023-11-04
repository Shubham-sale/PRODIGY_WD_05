import React from 'react';
import Weather from './weather';
import TimeAndDate from './TimeAndDate';
import './App.css';

const App = () => {
  return (
    <div className="container">
      <h1>Weather App</h1>
      <div className="input-container">
        <Weather />
      </div>
      <div className="weather-container">
        <TimeAndDate />
      </div>
    </div>
  );
};

export default App;
