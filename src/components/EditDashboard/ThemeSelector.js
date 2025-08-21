// ThemeSelector.js
import React from 'react';
import { dashboardThemes } from './themes';

const ThemeSelector = ({ onThemeChange }) => {
  return (
    <div style={{ position: 'fixed', top: 16, right: 16, zIndex: 1500 }}>
      <select
        onChange={(e) => onThemeChange(e.target.value)}
        style={{ padding: '8px', fontSize: '14px' }}
      >
        <option value="">Select Theme</option>
        {Object.entries(dashboardThemes).map(([key, theme]) => (
          <option key={key} value={key}>
            {theme.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ThemeSelector;
