/** @format */

import React, { useState } from 'react';
import './index.css'; // Import your CSS file

const ToggleSwitch = ({
  featureModal,
  setFeatureModal,
  toggle,
  handleToggle,
}) => {
  return (
    <label className={`switch ${toggle ? 'checked' : ''}`}>
      <input type="checkbox" checked={toggle} onChange={handleToggle} />
      <span className="sliders round"></span>
    </label>
  );
};

export default ToggleSwitch;
