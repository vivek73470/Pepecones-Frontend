/** @format */

import React, { useState } from 'react';
import './index.css';
import { MdOutlineClose } from 'react-icons/md';
import Camera from '../../assets/camera.svg';
import { upload_Image } from '../../Api/cloudImage';
import { toast } from 'react-toastify';
import { setFetching } from '../../redux/reducer/fetching';
import { useDispatch } from 'react-redux';

const LeadDetailsModal = ({ specificLeads, setShowLeadDetail }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [showInput, setShowInput] = useState(false);

  const dispatch = useDispatch();

  const handleImageChange = async (event) => {
    const file = event.target.files[0];

    if (!file) {
      return;
    }

    // Check the file type
    const fileName = file.name.toLowerCase();
    if (!fileName.endsWith('.jpg') && !fileName.endsWith('.png')) {
      toast.error('Please select a valid JPG or PNG image.');
      event.target.value = null; // Reset the input field
      setSelectedImage(null);
      return;
    }

    dispatch(setFetching(true));
    const reader = new FileReader();
    reader.onloadend = () => {
      setSelectedImage(reader.result);
      setShowInput(false);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
    const data = new FormData();
    data.append('file', file);
    data.append('upload_preset', 'pepecones_images');
    data.append('cloud_name', 'dmmul5cqy');
    try {
      let response = await upload_Image(data);
      // setImageResponse(response.status);
      const imageUrl = response?.data?.secure_url; // Capture imageUrl here
      dispatch(setFetching(false)); // Set the state variable
    } catch (error) {
      dispatch(setFetching(false));
      toast.error('Profile Image Upload failed');
    }
  };
  console.log(specificLeads);

  return (
    <>
      <div className="modal">
        <div className="modal-content" style={{ maxHeight: '600px' }}>
          <span
            className="cancle-modal"
            onClick={() => setShowLeadDetail(false)}
          >
            <MdOutlineClose fontSize={40} />
          </span>
          <h4 className="welcome">Lead Details</h4>
          <div
            className="change-pic"
            style={{ width: '100%', padding: '0px' }}
          ></div>
          <div className="form-field">
            <input
              type="text"
              style={{ marginBottom: '15px' }}
              value={specificLeads.fullname}
              placeholder="Lead Name"
              disabled={true}
            />
            <input
              type="text"
              style={{ marginBottom: '15px' }}
              value={specificLeads.createdAt}
              placeholder="Date"
              disabled={true}
            />
            <input
              type="text"
              style={{ marginBottom: '15px' }}
              value={specificLeads.email}
              placeholder="Lead Email"
              disabled={true}
            />
            <input
              type="text"
              style={{ height: '66px', marginBottom: '15px' }}
              value={specificLeads.phoneNumber}
              placeholder="Lead Phone Number "
              disabled={true}
            />
            <input
              type="text"
              style={{ height: '66px', marginBottom: '15px' }}
              value={specificLeads.productenquiry}
              placeholder="Product Enquiry"
              disabled={true}
            />
            <input
              type="text"
              style={{ height: '100px', marginBottom: '15px' }}
              value={specificLeads.Message}
              placeholder="Message "
              disabled={true}
            />
            {/* {imageResponse === 200 ? (
              <button
                className="save-button"
                onClick={() => handleAddProduct(imageUrl)}
              >
                Submit
              </button>
            ) : null} */}
            {/* <button
              className="save-button"
              // onClick={() => handleAddProduct(imageUrl, currentPage)}
            >
              Submit
            </button> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default LeadDetailsModal;
