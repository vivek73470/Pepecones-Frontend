/** @format */

import React, { useState } from 'react';
import 'jodit/build/jodit.min.css';
import JoditEditor from 'jodit-react';
import { editorConfig } from '../../utils/CommonEditerConfig';
import { setFetching } from '../../redux/reducer/fetching';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

const EditMetaDescriptionEditer = ({
  setMetaDescription,
  metaDescription,
  setFormData,
  formData,
  productEdit,
}) => {
  const [data, setData] = useState(metaDescription);

  const handleChange = (value) => {
    setFormData({
      ...formData,
      metaDescription: value,
    });
    setMetaDescription(value);
  };

  return (
    <JoditEditor
      value={data || productEdit?.metaDescription}
      config={editorConfig}
      onChange={handleChange}
      onBlur={(value, event) => console.log(event)}
    />
  );
};

export default EditMetaDescriptionEditer;
