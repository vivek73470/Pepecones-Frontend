/** @format */

import React from 'react';
import Circle from '../../assets/pepecons/Icon_Outline.png';
import { useNavigate } from 'react-router-dom';

const TotalproductCard = ({ displayedProduct }) => {
  const navigate = useNavigate();

  const handleViewProduct = () => {
    navigate('/productlist');
  };
  return (
    <>
      <div className="content-position">
        <div id="circle"></div>
        <span>{displayedProduct || 0}</span>
      </div>
      <div className="content-position">
        <h3 className="card-heading">Total Products</h3>
        <p>Update your security password keep your account safe!</p>
      </div>
      <div className="add-product-button">
        <button className="control-button" onClick={() => handleViewProduct()}>
          View Products
        </button>
      </div>
    </>
  );
};

export default TotalproductCard;
