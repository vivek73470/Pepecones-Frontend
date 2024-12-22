/** @format */

import React, { useState } from 'react';
import { MdOutlineClose } from 'react-icons/md';
import './index.css';
import SubCategoryDescEditer from '../SubCategoryDescEditer';
import CategoryDropdownPopoup from '../CategoryDropdownPopoup';
import { TOKEN } from '../../constant';

const SubCategoryPoupop = ({
  subCategory,
  setSubCategory,
  setShowSubCategory,
  handleChange,
  handleSubCategorySubmit,
  setSubcategoryDiscriptions,
  subcategoryDiscriptions,
  category,
}) => {
  const [options, setOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };
  console.log(category);
  return (
    <div className="modal">
      <div
        className="modal-content modal-confirm"
        style={{
          height: '620px',
          justifyContent: 'space-evenly',
          maxWidth: '1050px',
        }}
      >
        <span
          onClick={() => setShowSubCategory(false)}
          className="cancle-modal"
        >
          <MdOutlineClose fontSize={40} />
        </span>
        <div className="category-modal" style={{ paddingInline: '30px' }}>
          <span>Sub-Category</span>
          <br />
          <div className="category-field">
            {/* <input
              value={subCategory.categoryName}
              onChange={(e) => handleChange('categoryName', e.target.value)}
              placeholder="Category Name"
            /> */}
            <CategoryDropdownPopoup
              category={category}
              onSelect={handleOptionSelect}
              sub={'Select-Category'}
              formData={subCategory}
              setFormData={setSubCategory}
            />
            <input
              value={subCategory?.subcategoriesname}
              onChange={(e) =>
                handleChange('subcategoriesname', e.target.value)
              }
              placeholder="Sub-category name"
            />
          </div>
          <br />
          <SubCategoryDescEditer
            subCategory={subCategory}
            setSubCategory={setSubCategory}
            setSubcategoryDiscriptions={setSubcategoryDiscriptions}
            subcategoryDiscriptions={subcategoryDiscriptions}
            handleChange={handleChange}
          />
        </div>
        <button
          className=""
          onClick={() => handleSubCategorySubmit(subCategory, TOKEN)}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default SubCategoryPoupop;
