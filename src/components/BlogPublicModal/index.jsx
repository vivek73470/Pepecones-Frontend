/** @format */

import React from 'react';
// import './index.css';
import Check from '../../assets/check-green.svg';
import { MdOutlineClose } from 'react-icons/md';
import { TOKEN } from '../../constant';
const BlogPublicModal = ({ handlePublish, content, setPublish }) => {
  const handleFeature = () => {};
  return (
    <div className="modal">
      <div className="modal-content modal-confirms" style={{ height: '280px' }}>
        <span className="cancle-modal" onClick={() => setPublish(false)}>
          <MdOutlineClose fontSize={40} />
        </span>
        <div className="confirm-modal">
          {/* <div className="check-logo">
            <img src={Check} />
          </div> */}
          <div className="confirm-text" style={{ paddingLeft: '30px' }}>
            <h4>Make Blog Public?</h4>
            <p>
              Publishing will make your blog visible to the public. Are you sure
              you want to proceed?
            </p>
          </div>
        </div>
        <div className="btn-content">
          <button
            onClick={() => handlePublish(content, TOKEN)}
            className="delete-it"
          >
            Publish It
          </button>
          <button onClick={() => setPublish(false)} className="not-yet">
            Not Yet
          </button>
        </div>
      </div>
    </div>
  );
};

export default BlogPublicModal;
