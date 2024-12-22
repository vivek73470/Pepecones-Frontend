/** @format */

import React from 'react';
import Circle from '../../assets/pepecons/Icon_Outline.png';
const ProductcategoryCard = ({ displayedCategories }) => {
  return (
    <>
      <div className=" content-position">
        <div id="circle"></div>
        <span>{displayedCategories || 88}</span>
      </div>
      <div className="content-position">
        <h3 className="card-heading">Total Product Categories</h3>
        <p>Discover our cards benefits, with one tap.</p>
      </div>
      <div className="add-product-button">
        <button className="control-button">Cards</button>
      </div>
    </>
  );
};

export default ProductcategoryCard;
