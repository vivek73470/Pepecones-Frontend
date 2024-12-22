/** @format */

import React, { useState } from 'react';
import { HiOutlineChevronDown } from 'react-icons/hi';

const UnitDropdown = ({ options, productEdit, paperSize, setPaperSize }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option) => {
    // console.warn(option);
    setSelectedOption(option.unit);
    setPaperSize((paperSize) => ({
      ...paperSize,
      Unit: option.unit,
    }));
    setIsOpen(false);
  };
  // console.log(paperSize);
  return (
    <div className="custom-dropdown" style={{ minWidth: '0px' }}>
      <div
        className={`dropdown-button ${isOpen ? 'open' : ''}`}
        onClick={toggleDropdown}
        style={{ padding: '10px 1.8vw', width: '145px' }}
      >
        {selectedOption || 'Unit'}
        &nbsp; &nbsp;&nbsp;
        <HiOutlineChevronDown />
      </div>
      <ul className={`dropdown-list ${isOpen ? 'open' : ''}`}>
        {options?.map((option) => (
          <li key={option._id} onClick={() => handleOptionClick(option)}>
            {option.unit}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UnitDropdown;
