/** @format */

import React, { useState } from 'react';
import './index.css';

const ProductTagCheckBox = ({
  setProductTag,
  setFormData,
  formData,
  productEdit,
}) => {
  const [selectedTag, setSelectedTag] = useState(null);

  const handleCheckboxChange = (tag) => {
    setSelectedTag(tag);
    setFormData({
      ...formData,
      producttag: tag,
    });
    // Update the parent component's state
    setProductTag(tag);
  };

  return (
    <>
      <span>
        <input
          id="product-check"
          type="checkbox"
          checked={
            selectedTag === 'Premium Product' ||
            productEdit?.producttag === 'Premium Product'
          }
          onChange={() => handleCheckboxChange('Premium Product')}
          style={{ color: 'red' }}
        />
        &nbsp;&nbsp;
        <p style={{ marginBottom: '0px' }}>Premium Product</p>
      </span>
      <span>
        <input
          id="product-check"
          type="checkbox"
          checked={
            selectedTag === 'Hot Selling' ||
            productEdit?.producttag === 'Hot Selling'
          }
          onChange={() => handleCheckboxChange('Hot Selling')}
        />
        &nbsp;&nbsp;
        <p style={{ marginBottom: '0px' }}>Hot Selling</p>
      </span>
      <span>
        <input
          id="product-check"
          type="checkbox"
          checked={
            selectedTag === 'Popular' || productEdit?.producttag === 'Popular'
          }
          onChange={() => handleCheckboxChange('Popular')}
        />
        &nbsp;&nbsp;
        <p style={{ marginBottom: '0px' }}>Popular</p>
      </span>
    </>
  );
};

export default ProductTagCheckBox;
