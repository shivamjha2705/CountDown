import React, { useState, useEffect } from 'react';
import './count.css';

const Count = () => {
  const [Hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval;

    if (isActive) {
      interval = setInterval(() => {
        if (Hours === 0 && minutes === 0 && seconds === 0) {
          clearInterval(interval);
          setIsActive(false);
        } else {
          if (minutes === 0) {
            setHours((prevHours) => prevHours - 1);
            setMinutes(59);
          }
          else if (seconds === 0) {
            setMinutes((prevMinutes) => prevMinutes - 1);
            setSeconds(59);
          } else {
            setSeconds((prevSeconds) => prevSeconds - 1);
          }
        }
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isActive, Hours, minutes, seconds]);

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const handleInputClick = () => {
    const totalMinutes = parseInt(minutes) + Hours * 60;
    const newMinutes = totalMinutes % 60;
    const newHours = Math.floor(totalMinutes / 60);
  
    setMinutes(newMinutes);
    setHours(newHours);
    setSeconds(0);
  
    if (isActive) {
      setIsActive(false);
    }
  };

  return (
    <div className='main-container'>
      <div className='first-container'>
        <label htmlFor="minutes_Input">Enter minutes:</label>
        <input
          type="number"
          id="minutes_Input"
          min="1"
          step="1"
          value={minutes}
          onChange={(e) => setMinutes(parseInt(e.target.value))}
          onClick={handleInputClick}
          disabled={isActive}
        />
      </div>
      <div className='second-container'>
        <div className='btn' onClick={toggleTimer}>
          {isActive ? (
            <i className="fa-solid fa-circle-pause" style={{ color: "#05abcd", fontSize: "4rem" }}></i>
          ) : (
            <i className="fa-solid fa-circle-play" style={{ color: "#05abcd", fontSize: "4rem" }}></i>
          )}
        </div>
        <p>
        {String(Hours).padStart(2, '0')}:{String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
        </p>
      </div>
    </div>
  );
};

export default Count;
