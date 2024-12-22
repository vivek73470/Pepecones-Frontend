/** @format */

import React from 'react';

import './index.css';
// import Loader from '../../assets/pepecons/pepe cone.gif';
export default ({ show = true, key = Math.random() * 1000 }) => {
  return (
    <section
      style={{ display: show ? 'block' : 'none' }}
      className="loader-container"
    >
      {/* <img src={Loader} /> */}
      <div className="lds-roller">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </section>
  );
};
