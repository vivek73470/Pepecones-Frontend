/** @format */

import React from 'react';
import './index.css';
import Hasiya from '../../assets/pepecons/hasiya.png';

const ProductnameCard = () => {
  return (
    <>
      <div className="product-card-container">
        <div className="product-card-sub-container">
          <h5>FEATURED PRODUCT</h5>
          <h4>Product Name</h4>
          <p>
            Use your Venus card around the world with no hidden fees. Hold,
            transfer and spend money.
          </p>
          <div className="add-product-button" style={{ maxWidth: '250px' }}>
            <button className="control-button">View Details</button>
          </div>
        </div>
        <div className="product-card-sub-container">
          <div className="image-shadow">
            <img src={Hasiya} />
          </div>
        </div>
      </div>
      <div className="product-card-container-mobile-screen">
        <div className="product-card-sub-container">
          <h5>FEATURED PRODUCT</h5>
          <h4>Product Name</h4>
          <div className="image-shadow">
            <img src={Hasiya} />
          </div>
          <div className="add-product-button" style={{ maxWidth: '250px' }}>
            <button className="control-button">View Details</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductnameCard;
