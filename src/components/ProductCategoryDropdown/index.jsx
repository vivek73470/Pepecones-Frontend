/** @format */

import React, { useState } from 'react';
import { HiOutlineChevronDown } from 'react-icons/hi';

const ProductCategoryDropdown = ({
  customDropdownBorder,
  customDropdown,
  customDropdownBtn,
  options,
  onSelect,
  defaultText = 'Select Category',
  sub,
  formData,
  setFormData,
  setSelectedAction,
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
      productCategories: option.productcategoryName,
    }));
    onSelect(option);
    setIsOpen(false);
  };
  console.warn(formData);
  return (
    <div className="custom-dropdown" style={customDropdown || {}}>
      <div
        className={`dropdown-button dropdown-help ${isOpen ? 'open' : ''} `}
        style={customDropdownBtn || {}}
        onClick={toggleDropdown}
      >
        {
          selectedOption || 'Select-Category'
          // selectedOption
          //   ? selectedOption.productcategoryName ||
          //     selectedOption.blogcategoryName
          //   : sub
          //   ? sub
          //   : defaultText
        }
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

export default ProductCategoryDropdown;
