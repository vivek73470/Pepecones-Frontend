/** @format */

import React from 'react';
// import './index.css';
import Check from '../../assets/check-green.svg';
import { MdOutlineClose } from 'react-icons/md';
import { TOKEN } from '../../constant';
const SaveDraftModal = ({ setSaveDraft, content, handleSaveDraft }) => {
  return (
    <div className="modal">
      <div
        className="modal-content modal-confirm"
        style={{ height: '255px', justifyContent: 'space-evenly' }}
      >
        <span className="cancle-modal" onClick={() => setSaveDraft(false)}>
          <MdOutlineClose fontSize={40} />
        </span>
        <div className="confirm-modal">
          {/* <div className="check-logo">
            <img src={Check} />
          </div> */}
          <div className="confirm-text">
            <h4 style={{ textAlign: 'center' }}>
              Save as Draft Confirmation: Confirm Saving?
            </h4>
            {/* <p>
              Publishing will make your blog visible to the public. Are you sure
              you want to proceed?
            </p> */}
          </div>
        </div>
        <div className="btn-content">
          <button
            onClick={() => handleSaveDraft(content, TOKEN)}
            className="delete-it"
          >
            Save
          </button>
          <button
            style={{ padding: '2px 10px' }}
            onClick={() => setSaveDraft(false)}
            className="not-yet"
          >
            Continue Editing
          </button>
        </div>
      </div>
    </div>
  );
};

export default SaveDraftModal;
