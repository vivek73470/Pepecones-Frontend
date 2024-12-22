/** @format */

import React, { useState } from 'react';
import { HiOutlineChevronDown } from 'react-icons/hi';

const EditCategoryDropdownPopoup = ({
  customDropdownBorder,
  customDropdown,
  customDropdownBtn,
  category,
  onSelect,
  defaultText = 'Select Category',
  sub,
  formData,
  setFormData,
  setSelectedAction,
  subCategory,
  editSubCategory,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option) => {
    console.warn(option);
    setSelectedOption(option.productcategoryName);
    setFormData((prevData) => ({
      ...prevData,
      categoryName: option.productcategoryName,
    }));
    onSelect(option);
    setIsOpen(false);
  };
  // console.warn(subCategory);
  return (
    <div className="custom-dropdown" style={customDropdown || {}}>
      <div
        className={`dropdown-button ${isOpen ? 'open' : ''} `}
        style={customDropdownBtn || {}}
        onClick={toggleDropdown}
      >
        {selectedOption || subCategory?.categoryName}
        &nbsp; &nbsp;&nbsp; <HiOutlineChevronDown />
      </div>
      <ul
        className={`dropdown-list ${isOpen ? 'open' : ''}`}
        style={customDropdownBorder || {}}
      >
        {category?.map((option, index) => (
          <li key={index} onClick={() => handleOptionClick(option)}>
            {option.productcategoryName || option.blogcategoryName}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EditCategoryDropdownPopoup;
