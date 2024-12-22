/** @format */

// CustomDropdown.js
import React, { useState } from 'react';
import { HiOutlineChevronDown } from 'react-icons/hi';
const FlavourDropdown = ({
  options,
  onSelect,
  formData,
  setFormData,
  productEdit,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    // Update the sizetype in the formData state
    setFormData((prevData) => ({
      ...prevData,
      flavour: option,
    }));
    onSelect(option);
    setIsOpen(false);
  };

  return (
    <div className="custom-dropdown">
      <div
        className={`dropdown-button dropdown-help ${isOpen ? 'open' : ''}`}
        onClick={toggleDropdown}
      >
        {selectedOption || productEdit?.flavour.split(' ')[0] || 'Flavour'}
        &nbsp; &nbsp;&nbsp;
        <HiOutlineChevronDown />
      </div>
      <ul className={`dropdown-list ${isOpen ? 'open' : ''}`}>
        {options.length > 0
          ? options?.map((option, index) => (
              <li key={index} onClick={() => handleOptionClick(option)}>
                {/* {option?.productcategoryName ? option?.productcategoryName : option} */}
                {option}
              </li>
            ))
          : null}
      </ul>
    </div>
  );
};

export default FlavourDropdown;
