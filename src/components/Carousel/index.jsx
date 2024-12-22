/** @format */

import React, { useState } from 'react';
import './index.css';
import { MdKeyboardArrowRight, MdKeyboardArrowLeft } from 'react-icons/md';
import { RiDeleteBinLine } from 'react-icons/ri';
import { TbEdit } from 'react-icons/tb';
import { useDispatch } from 'react-redux';
import { setEditGallery } from '../../redux/reducer/editGallery';

const Carousel = ({
  formData,
  setShowGallery,
  setImageArray,
  imageArray,
  setFormData,
}) => {
  const itemsPerPage = 3;
  const [currentIndex, setCurrentIndex] = useState(0);
  const dispatch = useDispatch();

  const goToNextSlide = (e) => {
    e.preventDefault();
    setCurrentIndex((prevIndex) => prevIndex + itemsPerPage);
  };

  const goToPrevSlide = (e) => {
    e.preventDefault();
    setCurrentIndex((prevIndex) => Math.max(0, prevIndex - itemsPerPage));
  };

  const handleEditGalleryImage = (image, id) => {
    console.log(image);
    dispatch(setEditGallery(image));
    setShowGallery(true);
  };

  const handleDeleteImage = (index) => {
    const updatedImageUrls = [...formData.imageUrls];
    updatedImageUrls.splice(index, 1);
    console.log(updatedImageUrls);
    setFormData({
      ...formData,
      imageUrls: updatedImageUrls,
    });
  };

  const visibleImages = formData.imageUrls.slice(
    currentIndex,
    currentIndex + itemsPerPage,
  );

  const isNextButtonDisabled =
    currentIndex + itemsPerPage >= formData.imageUrls.length;
  console.log(formData.imageUrls);
  return (
    <div className="carousel-container">
      <span
        className="prev"
        onClick={(e) => goToPrevSlide(e)}
        style={{ visibility: currentIndex === 0 ? 'hidden' : 'visible' }}
      >
        <MdKeyboardArrowLeft fontSize={25} />
      </span>
      <div className="carousels">
        {formData.imageUrls?.length > 0
          ? formData.imageUrls.map((image, index) => (
              <div key={index} className="carousel-slide">
                <div
                  className="gallery-box-icon"
                  style={{ height: '90px', width: '90px' }}
                >
                  <img
                    style={{
                      width: 'inherit',
                      height: 'inherit',
                      borderRadius: '13px',
                    }}
                    src={image.imageUrl}
                    alt={`Slide ${index + 1}`}
                  />
                </div>
                {/* <span
                  id="edit"
                  onClick={() => handleEditGalleryImage(image, image._id)}
                >
                  <TbEdit fontSize={20} />
                </span> */}
                <span id="delete" onClick={() => handleDeleteImage(index)}>
                  <RiDeleteBinLine fontSize={20} />
                </span>
              </div>
            ))
          : null}
      </div>
      <span
        className="next"
        onClick={(e) => goToNextSlide(e)}
        style={{ visibility: isNextButtonDisabled ? 'hidden' : 'visible' }}
      >
        <MdKeyboardArrowRight fontSize={25} />
      </span>
    </div>
  );
};

export default Carousel;
