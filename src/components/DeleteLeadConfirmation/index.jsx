/** @format */

import React from 'react';
import './index.css';
import Check from '../../assets/check-green.svg';
import { MdOutlineClose } from 'react-icons/md';
import { setFetching } from '../../redux/reducer/fetching';
import { toast } from 'react-toastify';
import { leadDelete } from '../../Api/adminApi';
const DeleteLeadConfimation = ({
  handleDelete,
  setShowEditVendor,
  userId,
  dispatch,
  fetchAllLeads,
}) => {
  const handleDeleteLead = async (id) => {
    console.warn(id);
    const token = localStorage.getItem('auth_token');
    dispatch(setFetching(true));

    try {
      const response = await leadDelete(id, token);
      console.log(response);
      if (response.status === 200) {
        toast.success('Delete Leads Successfully!');
        fetchAllLeads();
        setShowEditVendor(false);
        dispatch(setFetching(false));
      }
    } catch (error) {
      dispatch(setFetching(false));
      setShowEditVendor(false);
      toast.error('Leads not found!');
    }
  };
  return (
    <div className="modal">
      <div
        className="modal-content modal-confirm"
        // style={{ height: '255px', maxWidth: '450px' }}
      >
        <span className="cancle-modal" onClick={() => setShowEditVendor(false)}>
          <MdOutlineClose fontSize={40} />
        </span>
        <div className="confirm-modal">
          {/* <div className="check-logo">
            <img src={Check} />
          </div> */}
          <div className="confirm-text" style={{ paddingLeft: '30px' }}>
            <h4>Delete Lead Confirmation</h4>
            <p>
              Are you sure you want to delete this lead? This action cannot be
              undone. Confirm deletion?
            </p>
          </div>
        </div>
        <div className="btn-content">
          <button
            onClick={() => handleDeleteLead(userId)}
            className="delete-it"
          >
            Delete It
          </button>
          <button onClick={() => setShowEditVendor(false)} className="not-yet">
            Not Yet
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteLeadConfimation;
