/** @format */

import React, { useState } from 'react';

const EditToggleSwitch = ({
  featureModal,
  setFeatureModal,
  toggle,
  handleToggle,
  blogEdit,
  formData,
}) => {
  console.log(toggle);
  return (
    <label className={`switch ${toggle ? 'checked' : ''}`}>
      <input
        type="checkbox"
        // checked={toggle || blogEdit?.isFeatured}
        checked={toggle}
        onChange={handleToggle}
      />
      <span className="sliders round"></span>
    </label>
  );
};

export default EditToggleSwitch;
