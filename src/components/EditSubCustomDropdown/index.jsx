/** @format */

import React, { useState } from 'react';
import { HiOutlineChevronDown } from 'react-icons/hi';

const EditSubCustomDropdown = ({
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
    setSelectedOption(option.subcategoriesname);
    setFormData((prevData) => ({
      ...prevData,
      productSubcategories: option.categoryName,
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
        {selectedOption ||
          productEdit?.productSubcategories ||
          'Select Sub-Category'}
        &nbsp; &nbsp;&nbsp;
        <HiOutlineChevronDown />
      </div>
      <ul className={`dropdown-list ${isOpen ? 'open' : ''}`}>
        {options?.map((option) => (
          <li key={option._id} onClick={() => handleOptionClick(option)}>
            {option.subcategoriesname}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EditSubCustomDropdown;
