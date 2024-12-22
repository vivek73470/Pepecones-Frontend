/** @format */

import React from 'react';
import './index.css';
import Himalya from '../../assets/pepecons/himalyan.png';
import { customFontStyle } from '../../constant';
const FeaturedblogCard = () => {
  return (
    <div className="himalyan">
      <img src={Himalya} style={{ width: '100%' }} />
      <div className="feature-btn">
        <button>Featured Blog</button>
      </div>
      <h4>Richird Norton photorealistic rendering as real photos</h4>
      <p>
        Progressively incentivize cooperative systems through technically sound
        functionalities. The credibly productivate seamless data.
      </p>
      <div id="date">
        <h5 style={customFontStyle}>08.08.2021</h5>
      </div>
    </div>
  );
};

export default FeaturedblogCard;
