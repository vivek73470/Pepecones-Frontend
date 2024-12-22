/** @format */

import React from 'react';
// import './index.css';
import Check from '../../assets/check-green.svg';
import { MdOutlineClose } from 'react-icons/md';
const FeatureBlogConfirmModal = ({ setToggle, toggle, setFeatureModal }) => {
  const handleFeature = () => {
    setToggle(!toggle);
    setFeatureModal(false);
  };
  return (
    <div className="modal">
      <div className="modal-content modal-confirms" style={{ height: '280px' }}>
        <span className="cancle-modal" onClick={() => setFeatureModal(false)}>
          <MdOutlineClose fontSize={40} />
        </span>
        <div className="confirm-modal">
          <div className="confirm-text" style={{ paddingLeft: '30px' }}>
            <h4>Feature Blog Confirmation</h4>
            <p>Are you sure you want to feature this blog?</p>
          </div>
        </div>
        <div className="btn-content">
          <button onClick={() => handleFeature()} className="delete-it">
            Feature It
          </button>
          <button onClick={() => setFeatureModal(false)} className="not-yet">
            Not Yet
          </button>
        </div>
      </div>
    </div>
  );
};

export default FeatureBlogConfirmModal;
