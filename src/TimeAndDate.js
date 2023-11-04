import React, { useState, useEffect } from 'react';
import styles from './TimeAndDate.module.css'; // Import the TimeAndDate component styles


const TimeAndDate = () => {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    timeZoneName: 'short',
  };

  const formattedDateTime = currentDateTime.toLocaleDateString(undefined, options);
    return (
        <div className={styles['time-container']}>
          <h2>Current Time and Date</h2>
          <p>{formattedDateTime}</p>
        </div>
      );
};



export default TimeAndDate;
