import React from 'react';
import './DayNightSwitch.css';

interface Props {
  theme?: 'light' | 'dark';
}

export default function DayNightSwitch(props: Props) {
  const isDark = props.theme === 'dark';

  return (
    <label className="switch-wrapper switch-day-night">
      <input type="checkbox" checked={isDark} readOnly />
      <span className="slider"></span>
    </label>
  );
}
