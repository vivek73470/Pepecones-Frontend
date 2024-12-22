/** @format */

import React, { useState } from 'react';
import 'jodit/build/jodit.min.css';
import JoditEditor from 'jodit-react';
import { editorConfig } from '../../utils/CommonEditerConfig';
import { setFetching } from '../../redux/reducer/fetching';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const EditSubCategoryDescEditer = ({
  subCategory,
  setSubCategory,
  editSubCategory,
  setSubcategoryDiscriptions,
  subcategoryDiscriptions,
}) => {
  const [data, setData] = useState(subCategory?.subcategoryDiscription);

  const handleChange = (value) => {
    console.log(value);
    setSubCategory({
      ...subCategory,
      subcategoryDiscription: value,
    });
    // setSubcategoryDiscriptions(value);
  };
  // console.log(data);
  return (
    <JoditEditor
      value={data}
      config={editorConfig}
      onChange={handleChange}
      onBlur={(value, event) => console.log(event)}
    />
  );
};

export default EditSubCategoryDescEditer;
