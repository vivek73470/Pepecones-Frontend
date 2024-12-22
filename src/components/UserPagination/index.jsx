/** @format */

import React from 'react';
import {
  MdOutlineKeyboardArrowRight,
  MdOutlineKeyboardArrowLeft,
} from 'react-icons/md';
import './index.css';

// const scrollToTop = () => {
//   window.scrollTo({ top: 0, behavior: 'smooth' });
//   console.log("scrooling is happening")
// };

const scrollToElementById = (elementId) => {
  const element = document.getElementById(elementId);

  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
};

// Usage:
scrollToElementById('yourElementId'); // Replace 'yourElementId' with the actual element's id

const UserPagination = ({
  currentPage,
  totalPages,
  handlePrevPage,
  handleNextPage,
  handlePageClick,
  pageNumbers,
  routes,
  customStyleForPagination,
}) => {
  // console.warn( pageNumbers)
  return totalPages > 1 ? (
    <div
      className={`${
        routes
          ? 'pagination-container-routes'
          : 'pagination-container pagination-for-poupop'
      }`}
      style={customStyleForPagination ? customStyleForPagination : null}
    >
      {currentPage > 1 && (
        <span
          className="span-btn"
          style={{ display: 'flex' }}
          onClick={() => {
            handlePrevPage();
            scrollToElementById('pagi');
          }}
        >
          <MdOutlineKeyboardArrowLeft fontSize={25} />
        </span>
      )}
      {pageNumbers?.map((page, index) => {
        if (
          page === 1 ||
          page === totalPages ||
          (index + 1 <= currentPage + 1 && index + 1 >= currentPage - 1)
        ) {
          return (
            <span
              className={`${
                currentPage === page ? 'active-btn' : 'non-active-btn span-btn'
              }`}
              key={page}
              onClick={() => {
                handlePageClick(page);
                scrollToElementById('pagi');
              }}
            >
              {page}
            </span>
          );
        } else if (
          (index + 1 === currentPage + 2 && index + 2 < totalPages) ||
          (index + 1 === currentPage - 2 && index > 1)
        ) {
          return (
            <span style={{ fontSize: '25px' }} key={page}>
              ...
            </span>
          );
        }
        return null;
      })}
      {currentPage < totalPages && (
        <span
          className="span-btn"
          style={{ display: 'flex' }}
          onClick={handleNextPage}
        >
          <MdOutlineKeyboardArrowRight fontSize={25} />
        </span>
      )}
    </div>
  ) : null;
};

export default UserPagination;
