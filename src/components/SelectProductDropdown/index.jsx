/** @format */

// SelectProductDropdown.js
import React, { useState } from 'react';
import './index.css';
import { HiOutlineChevronDown } from 'react-icons/hi';
const SelectProductDropdown = ({ options, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    onSelect(option);
    setIsOpen(false);
  };

  return (
    <div className="custom-dropdown">
      <div
        className={`dropdown-button ${isOpen ? 'open' : ''}`}
        onClick={toggleDropdown}
      >
        {selectedOption || 'Select Product'}&nbsp; &nbsp;&nbsp;{' '}
        <HiOutlineChevronDown />
      </div>
      <ul className={`dropdown-list ${isOpen ? 'open' : ''}`}>
        {options.length > 0
          ? options?.map((option) => (
              <li key={option._id} onClick={() => handleOptionClick(option)}>
                {/* {option?.productcategoryName ? option?.productcategoryName : option} */}
                {option.name ? option.name : null}
              </li>
            ))
          : null}
      </ul>
    </div>
  );
};

export default SelectProductDropdown;
