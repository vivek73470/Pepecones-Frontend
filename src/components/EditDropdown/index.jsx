/** @format */

import React, { useState } from 'react';
import { HiOutlineChevronDown } from 'react-icons/hi';

const EditDropdown = ({
  customDropdownBorder,
  customDropdown,
  customDropdownBtn,
  options,
  onSelect,
  defaultText = 'Select Category',
  sub,
  displayedBlogs,
  setDisplayedBlogs,
  setSelectedAction,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option) => {
    console.log(option);
    setSelectedOption(option);
    setDisplayedBlogs((prevData) => ({
      ...prevData,
      productCategories: option,
    }));
    setSelectedAction('category');
    onSelect(option);
    setIsOpen(false);
  };

  return (
    <div className="custom-dropdown" style={customDropdown || {}}>
      <div
        className={`dropdown-button ${isOpen ? 'open' : ''} `}
        style={customDropdownBtn || {}}
        onClick={toggleDropdown}
      >
        {selectedOption
          ? selectedOption.productcategoryName ||
            selectedOption.blogcategoryName
          : sub
          ? sub
          : defaultText}
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

export default EditDropdown;
