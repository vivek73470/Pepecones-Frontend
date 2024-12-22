/** @format */

import React from 'react';
import './index.css';
import Check from '../../assets/pepecons/Icon.svg';
import { AiOutlineClose } from 'react-icons/ai';
const ConfirmModal = ({ setShowAlert }) => {
  return (
    <div className="modal">
      <div
        className="modal-content modal-confirm"
        style={{
          padding: '35px 25px',
          maxWidth: '550px',
          height: '225px',
          justifyContent: 'space-around',
        }}
      >
        <span
          className="cancle-modal-custom"
          onClick={() => setShowAlert(false)}
        >
          <AiOutlineClose fontSize={22} fontWeight={700} />
        </span>
        <div className="confirm-modal">
          <div className="check-logo" style={{ width: '90px' }}>
            <img src={Check} />
          </div>
          <div className="confirm-text" style={{ paddingLeft: '30px' }}>
            <h4 style={{ fontSize: '22px' }}>Featured Blog Limit Exceeded</h4>
            <p style={{ fontSize: '16px' }}>
              There are 4 featured blogs, require removal of one before adding a
              new one to the list.
            </p>
          </div>
        </div>
        <button
          onClick={() => setShowAlert(false)}
          className="save-button"
          style={{ height: '55px', maxWidth: '500px' }}
        >
          Sure
        </button>
      </div>
    </div>
  );
};

export default ConfirmModal;
