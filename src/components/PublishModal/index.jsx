/** @format */

import React from 'react';
// import './index.css';
import Check from '../../assets/check-green.svg';
import { MdOutlineClose } from 'react-icons/md';
import { publishBlogs } from '../../Api/adminApi';

const PublishModal = ({
  setShowPublish,
  publishId,
  setFetching,
  dispatch,
  fetchData,
  handleCloseModal,
}) => {
  console.log(publishId);
  const handlePublish = async (publishId) => {
    dispatch(setFetching(true));
    const token = localStorage.getItem('auth_token');
    try {
      let response = await publishBlogs(publishId, token);
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
            <h4 style={{ textAlign: 'start' }}>Want to Publish ?</h4>
            <p>
              Once published, this content will be visible to the public.
              Confirm publishing?
            </p>
          </div>
        </div>
        <div className="btn-content">
          <button
            onClick={() => handlePublish(publishId)}
            className="delete-it"
          >
            Publish It
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

export default PublishModal;
