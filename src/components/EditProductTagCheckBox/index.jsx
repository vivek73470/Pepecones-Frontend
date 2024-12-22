/** @format */

import React, { useState, useEffect } from 'react';

const EditProductTagCheckBox = ({
  setProductTag,
  setFormData,
  formData,
  productEdit,
}) => {
  const [selectedTag, setSelectedTag] = useState(null);

  useEffect(() => {
    // Set the selected tag when the component mounts
    setSelectedTag(productEdit?.producttag || null);
  }, [productEdit]);

  const handleCheckboxChange = (tag) => {
    setSelectedTag((prevTag) => (prevTag === tag ? null : tag));
    setFormData({
      ...formData,
      producttag: selectedTag === tag ? null : tag,
    });
    // Update the parent component's state
    setProductTag(selectedTag === tag ? null : tag);
  };

  const renderCheckbox = (tag, label) => (
    <span key={tag}>
      <input
        type="checkbox"
        checked={selectedTag === tag}
        onChange={() => handleCheckboxChange(tag)}
      />
      &nbsp;&nbsp;
      <p style={{ marginBottom: '0px' }}>{label}</p>
    </span>
  );

  return (
    <>
      {renderCheckbox('Premium Product', 'Premium Product')}
      {renderCheckbox('Hot Selling', 'Hot Selling')}
      {renderCheckbox('Popular', 'Popular')}
    </>
  );
};

export default EditProductTagCheckBox;
