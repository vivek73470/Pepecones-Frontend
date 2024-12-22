/** @format */

// CustomDropdown.js
import React, { useState } from 'react';
import { HiOutlineChevronDown } from 'react-icons/hi';
const SizeDropdown = ({ options, onSelect }) => {
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
        {selectedOption || 'Select'}&nbsp; &nbsp;&nbsp; <HiOutlineChevronDown />
      </div>
      <ul className={`dropdown-list ${isOpen ? 'open' : ''}`}>
        {options?.map((option) => (
          <li key={option._id} onClick={() => handleOptionClick(option)}>
            {/* {option?.productcategoryName ? option?.productcategoryName : option} */}
            {option?.productcategoryName || option}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SizeDropdown;
