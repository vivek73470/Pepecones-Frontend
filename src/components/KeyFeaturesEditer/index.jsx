/** @format */

import React, { useState } from 'react';
import 'jodit/build/jodit.min.css';
import JoditEditor from 'jodit-react';
import { editorConfig } from '../../utils/CommonEditerConfig';
import { setFetching } from '../../redux/reducer/fetching';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

const KeyFeaturesEditer = ({
  setKeyFetures,
  keyFetures,
  setFormData,
  formData,
  productEdit,
}) => {
  const [data, setData] = useState(keyFetures);

  const handleChange = (value) => {
    setFormData({
      ...formData,
      keyFetures: value,
    });
    setKeyFetures(value);
  };

  return (
    <JoditEditor
      value={data || productEdit?.keyFetures}
      config={editorConfig}
      onChange={handleChange}
      onBlur={(value, event) => console.log(event)}
    />
  );
};

export default KeyFeaturesEditer;
