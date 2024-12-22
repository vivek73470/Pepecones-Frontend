/** @format */

import React, { useState } from 'react';
import 'jodit/build/jodit.min.css';
import JoditEditor from 'jodit-react';
import { editorConfig } from '../../utils/CommonEditerConfig';
import { setFetching } from '../../redux/reducer/fetching';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

const SubCategoryDescEditer = ({
  subCategory,
  setSubCategory,
  editSubCategory,
  setSubcategoryDiscriptions,
  subcategoryDiscriptions,
  editSubCategories,
}) => {
  const [data, setData] = useState(subcategoryDiscriptions);

  const handleChange = (value) => {
    console.log(value);
    setSubCategory({
      ...subCategory,
      subcategoryDiscription: value,
    });
    // setSubcategoryDiscriptions(value);
  };

  return (
    <JoditEditor
      value={data || subCategory?.subcategoryDiscription}
      config={editorConfig}
      onChange={handleChange}
      onBlur={(value, event) => console.log(event)}
    />
  );
};

export default SubCategoryDescEditer;
