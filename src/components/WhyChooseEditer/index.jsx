/** @format */

import React, { useState } from 'react';
import 'jodit/build/jodit.min.css';
import JoditEditor from 'jodit-react';
import { editorConfig } from '../../utils/CommonEditerConfig';

const WhyChooseEditer = ({
  setWhyChooseus,
  whyChooseus,
  setFormData,
  formData,
  productEdit,
}) => {
  const [data, setData] = useState(whyChooseus);

  const handleChange = (value) => {
    setFormData({
      ...formData,
      whyChooseus: value,
    });
    setWhyChooseus(value);
  };

  return (
    <JoditEditor
      value={data || productEdit?.whyChooseus}
      config={editorConfig}
      onChange={handleChange}
      onBlur={(value, event) => console.log(event)}
    />
  );
};

export default WhyChooseEditer;
