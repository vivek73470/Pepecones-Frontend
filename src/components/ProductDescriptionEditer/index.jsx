/** @format */

import React, { useState } from 'react';
import 'jodit/build/jodit.min.css';
import JoditEditor from 'jodit-react';
import { editorConfig } from '../../utils/CommonEditerConfig';
import { setFetching } from '../../redux/reducer/fetching';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

const ProductDescriptionEditer = ({
  setProductDescription,
  productDescription,
  setFormData,
  formData,
  productEdit,
}) => {
  const [data, setData] = useState(productDescription);

  const handleChange = (value) => {
    setFormData({
      ...formData,
      productDescription: value,
    });
    setProductDescription(value);
  };

  return (
    <JoditEditor
      value={data || productEdit?.productDescription}
      config={editorConfig}
      onChange={handleChange}
      onBlur={(value, event) => console.log(event)}
    />
  );
};

export default ProductDescriptionEditer;
