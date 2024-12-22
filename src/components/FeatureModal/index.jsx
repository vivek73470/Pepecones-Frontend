/** @format */

import React from 'react';
// import './index.css';
import Check from '../../assets/check-green.svg';
import { MdOutlineClose } from 'react-icons/md';
import { featureBlogs } from '../../Api/adminApi';

const FeatureModal = ({
  setShowPublish,
  publishId,
  setFetching,
  dispatch,
  fetchData,
  handleCloseModal,
  setShowAlert,
}) => {
  const handleUnFeature = async (publishId) => {
    dispatch(setFetching(true));
    const token = localStorage.getItem('auth_token');
    try {
      let response = await featureBlogs(publishId, token);
      if (response.status === 200) {
        fetchData();
        dispatch(setFetching(false));
        handleCloseModal();
        setShowPublish(false);
      }
    } catch (error) {
      handleCloseModal();
      dispatch(setFetching(false));
      setShowAlert(true);
    }
  };

  return (
    <div className="modal">
      <div
        className="modal-content modal-confirm"
        style={{ height: '255px', justifyContent: 'space-evenly' }}
      >
        <span className="cancle-modal" onClick={() => handleCloseModal()}>
          <MdOutlineClose fontSize={40} />
        </span>
        <div className="confirm-modal" style={{ paddingInline: '30px' }}>
          {/* <div className="check-logo">
            <img src={Check} />
          </div> */}
          <div className="confirm-text">
            <h4 style={{ textAlign: 'start' }}>Want to Feature ?</h4>
            <p>
              Once feature, this content will be visible to the public. Confirm
              feature?
            </p>
          </div>
        </div>
        <div className="btn-content">
          <button
            onClick={() => handleUnFeature(publishId)}
            className="delete-it"
          >
            Feature It
          </button>
          <button
            style={{ padding: '2px 10px' }}
            onClick={() => handleCloseModal()}
            className="not-yet"
          >
            Not Yet
          </button>
        </div>
      </div>
    </div>
  );
};

export default FeatureModal;
