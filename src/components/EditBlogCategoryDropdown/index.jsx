/** @format */

import React, { useState } from 'react';
import { HiOutlineChevronDown } from 'react-icons/hi';
import { fullWidth } from '../../constant';

const EditBlogCategoryDropdown = ({
  customDropdownBorder,
  customDropdown,
  customDropdownBtn,
  options,
  onSelect,
  defaultText = 'Select Category',
  setFormData,
  blogEdit,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option) => {
    console.log(option.blogcategoryName);
    setSelectedOption(option.blogcategoryName);
    setFormData((prevData) => ({
      ...prevData,
      category: option.blogcategoryName, // consider renaming this property
    }));
    onSelect(option);
    setIsOpen(false);
  };
  console.log(blogEdit);
  return (
    <div className="custom-dropdown" style={customDropdown || {}}>
      <div
        className={`dropdown-button ${isOpen ? 'open' : ''} `}
        style={fullWidth || {}}
        onClick={toggleDropdown}
      >
        {selectedOption || blogEdit?.category}
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

export default EditBlogCategoryDropdown;
