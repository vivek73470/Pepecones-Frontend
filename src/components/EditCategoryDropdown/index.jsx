/** @format */

import React, { useState } from 'react';
import { HiOutlineChevronDown } from 'react-icons/hi';

const EditCategoryDropdown = ({
  customDropdownBorder,
  customDropdown,
  customDropdownBtn,
  options,
  onSelect,
  defaultText = 'Select Category',
  sub,
  displayedBlogs,
  setFormData,
  setSelectedAction,
  productEdit,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option) => {
    console.log(option.productcategoryName);
    setSelectedOption(option.productcategoryName);
    setFormData((prevData) => ({
      ...prevData,
      productCategories: option.productcategoryName,
    }));
    onSelect(option);
    setIsOpen(false);
  };

  return (
    <div className="custom-dropdown" style={customDropdown || {}}>
      <div
        className={`dropdown-button dropdown-help ${isOpen ? 'open' : ''} `}
        style={customDropdownBtn || {}}
        onClick={toggleDropdown}
      >
        {selectedOption || productEdit?.productCategories || 'Select Category'}
        &nbsp; &nbsp;&nbsp; <HiOutlineChevronDown />
      </div>
      <ul
        className={`dropdown-list ${isOpen ? 'open' : ''}`}
        style={customDropdownBorder || {}}
      >
        {options?.map((option, index) => (
          <li key={index} onClick={() => handleOptionClick(option)}>
            {option.productcategoryName || option.blogcategoryName}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EditCategoryDropdown;
