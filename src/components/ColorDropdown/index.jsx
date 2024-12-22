/** @format */

// ColorDropdown.js
import React, { useState } from 'react';
import { HiOutlineChevronDown } from 'react-icons/hi';
const ColorDropdown = ({
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
    setFormData((prevData) => ({
      ...prevData,
      color: option,
    }));
    onSelect(option);
    setIsOpen(false);
  };
  // console.warn(formData);
  let textColor = selectedOption?.match(/#[A-Fa-f0-9]{6}/) || null;
  // let textColor = productEdit?.color || null;
  // console.log(textColor[0]);
  return (
    <div className="custom-dropdown">
      <div
        className={`dropdown-button dropdown-help ${isOpen ? 'open' : ''}`}
        onClick={toggleDropdown}
      >
        <input
          type="color"
          value={textColor ? textColor[0] : '#F9C07D'}
          style={{ height: '25px', width: '28px' }}
        />
        &nbsp;&nbsp;
        {selectedOption?.split(' ')[0] ||
          productEdit?.color.split(' ')[0] ||
          'Color'}
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

export default ColorDropdown;
