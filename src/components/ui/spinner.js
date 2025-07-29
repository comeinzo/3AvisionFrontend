// Spinner.js
import React from 'react';
import './Spinner.css'; // Import the Spinner CSS

const Spinner = () => {
  return (
    <div className="spinner-overlay">
      <div className="loader" />
    </div>
  );
};

export default Spinner;