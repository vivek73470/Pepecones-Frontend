/** @format */

import React, { useState } from 'react';
import { HiOutlineChevronDown } from 'react-icons/hi';

const SizeTypeDropdown = ({
  options,
  onSelect,
  formData,
  setFormData,
  productEdit,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [getUrl, setGetUrl] = useState([]);
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option) => {
    console.log(option);
    const firstWord = option.split(' ')[0];
    const secondWord = option.split(' ')[1];
    const thirdWord = option.split(' ')[2];
    console.log(firstWord);
    console.log(secondWord);
    const sizename = `${firstWord} ${secondWord} `;
    console.log(sizename);
    // Extract the URL from the selected option
    const url = option.split(' ')[2];
    console.log(2);
    setGetUrl(url);
    setSelectedOption(sizename);
    const sizenames = `${firstWord} ${secondWord} ${thirdWord}`;
    // Update the sizetype in the formData state
    setFormData((prevData) => ({
      ...prevData,
      sizetype: sizenames,
    }));

    onSelect(option);
    setIsOpen(false);

    console.log('Selected URL:', url); // Log the URL to the console
  };
  console.log(getUrl);

  // const ImageUrl =
  //   getUrl?.filter((item) => {
  //     return (
  //       item.startsWith('Small') ||
  //       item.startsWith('Medium') ||
  //       item.startsWith('Large')
  //     );
  //   }) || null;
  // console.warn(ImageUrl[0]);
  console.log(productEdit);
  return (
    <div className="custom-dropdown">
      <div
        className={`dropdown-button dropdown-help ${isOpen ? 'open' : ''}`}
        onClick={toggleDropdown}
      >
        <img src={getUrl} style={{ height: '25px' }} />
        {selectedOption || 'Size Type'}
        &nbsp; &nbsp;&nbsp; <HiOutlineChevronDown />
      </div>
      <ul className={`dropdown-list ${isOpen ? 'open' : ''}`}>
        {options.length > 0
          ? options?.map((option, index) => (
              <li key={index} onClick={() => handleOptionClick(option)}>
                {`${option?.split(' ')[0]} ${option?.split(' ')[1]} `}
                {/* <div
                  className="break-line"
                  style={{ margin: '15px 0px' }}
                ></div> */}
              </li>
            ))
          : null}
      </ul>
    </div>
  );
};

export default SizeTypeDropdown;
