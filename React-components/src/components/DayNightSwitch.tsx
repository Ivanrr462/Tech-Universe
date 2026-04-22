import React from 'react';
import './DayNightSwitch.css';

export default function DayNightSwitch() {
  return (
    <label className="switch-wrapper switch-day-night">
      <input type="checkbox" />
      <span className="slider"></span>
    </label>
  );
}
