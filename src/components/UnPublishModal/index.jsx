/** @format */

import React from 'react';
// import './index.css';
import Check from '../../assets/check-green.svg';
import { MdOutlineClose } from 'react-icons/md';
import { unPublishBlogs } from '../../Api/adminApi';

const UnPublishModal = ({
  setShowPublish,
  publishId,
  setFetching,
  dispatch,
  fetchData,
  handleCloseModal,
}) => {
  const handleUnPublish = async (publishId) => {
    dispatch(setFetching(true));
    const token = localStorage.getItem('auth_token');
    try {
      let response = await unPublishBlogs(publishId, token);
      if (response.status === 200) {
        fetchData();
        dispatch(setFetching(false));
        handleCloseModal();
        setShowPublish(false);
      }
    } catch (error) {
      handleCloseModal();
      dispatch(setFetching(false));
      setShowPublish(false);
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
            <h4 style={{ textAlign: 'start' }}>Want to Unpublish ?</h4>
            <p>
              Once unpublished, this content will no longer be visible to the
              public. Confirm unpublishing?
            </p>
          </div>
        </div>
        <div className="btn-content">
          <button
            onClick={() => handleUnPublish(publishId)}
            className="delete-it"
          >
            Unpublish It
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

export default UnPublishModal;
