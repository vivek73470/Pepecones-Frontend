/** @format */

import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './index.css';
import CornerBigImage from '../../assets/pepecons/pngwing.com--59-.png.png';
import CornerLittleImage from '../../assets/pepecons/pngwing.com--little.png';

const TotalblogCard = ({ displayedBlogs }) => {
  const [showBlog, setShowBlog] = useState(false);

  const navigate = useNavigate();

  const handleViewBlog = () => {
    navigate('/blogs');
  };

  return (
    <>
      <div className="card-image">
        <img src={CornerBigImage} id="first-image" />
        <img src={CornerLittleImage} id="second-image" />
      </div>
      <h3 className="card-heading">Total Blogs</h3>
      <div className="mid-content">
        <span>{displayedBlogs || 0}</span>
        <p>Update your payout method in Setting</p>
      </div>
      <div className="add-product-button" style={{ zIndex: '1000' }}>
        <button className="control-button" onClick={() => handleViewBlog()}>
          View All Blogs
        </button>
      </div>
    </>
  );
};

export default TotalblogCard;
