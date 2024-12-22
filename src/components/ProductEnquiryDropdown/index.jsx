/** @format */

import './index.css';
import React, { useState } from 'react';
import { HiOutlineChevronDown } from 'react-icons/hi';

const ProductEnquiryDropdown = ({
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
    setSelectedOption(option);
    setFormData((prevData) => ({
      ...prevData,
      productenquiry: option,
    }));
    onSelect(option);
    setIsOpen(false);
  };

  // Truncate the selected option to 20 characters
  const truncatedOption = selectedOption
    ? selectedOption.slice(0, 30)
    : 'Select-Product';

  // console.warn(truncatedOption);

  return (
    <div className="custom-dropdown-cnt" style={customDropdown || {}}>
      <div
        className={`dropdown-button-cnt ${isOpen ? 'open' : ''} `}
        style={customDropdownBtn || {}}
        onClick={toggleDropdown}
      >
        {truncatedOption}
        &nbsp; &nbsp;&nbsp; <HiOutlineChevronDown />
      </div>
      <ul
        className={`dropdown-list-cnt ${isOpen ? 'open' : ''}`}
        style={customDropdownBorder || {}}
      >
        {options?.map((option, index) => (
          <li key={index} onClick={() => handleOptionClick(option)}>
            {option || option.blogcategoryName}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductEnquiryDropdown;
