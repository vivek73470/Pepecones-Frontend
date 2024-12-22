/** @format */

import React from 'react';
import Circle from '../../assets/pepecons/Icon_Outline.png';
import { useNavigate } from 'react-router-dom';
const TotalleadCard = ({ displayedLeads }) => {
  const navigate = useNavigate();

  const handleViewProduct = () => {
    navigate('/leads');
  };
  return (
    <>
      <div className=" content-position">
        <div id="circle"></div>
        <span>{displayedLeads || 88}</span>
      </div>
      <div className="content-position">
        <h3 className="card-heading">Total Leads</h3>
        <p>Discover our cards benefites, with one tap.</p>
      </div>
      <div className="add-product-button">
        <button className="control-button" onClick={() => handleViewProduct()}>
          View Leads
        </button>
      </div>
    </>
  );
};

export default TotalleadCard;
