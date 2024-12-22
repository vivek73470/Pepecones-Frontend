/** @format */

import React, { useState } from 'react';
import './index.css';
import { MdOutlineClose } from 'react-icons/md';
import Camera from '../../assets/pepecons/clarity_image-gallery-line.svg';
import { upload_Image } from '../../Api/cloudImage';
import { toast } from 'react-toastify';
import { setFetching } from '../../redux/reducer/fetching';
import { useDispatch } from 'react-redux';
import Upload from '../../assets/upload-file.svg';

const AddUploadImageModal = ({
  newProduct,
  setNewProduct,
  handleAddProduct,
  setShowUpload,
  setImageUrl,
  imageUrl,
  currentPage,
  setSize,
  size,
  handleChangeSize,
}) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [showInput, setShowInput] = useState(false);

  const dispatch = useDispatch();

  const handleImageChange = async (event) => {
    const file = event.target.files[0];
    console.log(file);
    if (!file) {
      return;
    }

    // handleChangeSize('sizename', file.name);
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
      handleChangeSize('sizeicon', imageUrl);
      dispatch(setFetching(false)); // Set the state variable
    } catch (error) {
      dispatch(setFetching(false));
      toast.error('Profile Image Upload failed');
    }
  };
  // console.log(selectedImage.name);
  return (
    <>
      <div className="modal">
        <div className="modal-content" style={{ paddingInline: '40px' }}>
          <span className="cancle-modal" onClick={() => setShowUpload(false)}>
            <MdOutlineClose fontSize={40} />
          </span>
          <h4>Media Upload</h4>
          <div className="form-col-left">
            <input
              type="text"
              id="firstName"
              name="logo"
              placeholder={selectedImage ? selectedImage.name : 'icon.png'}
              required
            />
            <input
              type="file"
              id="firstName"
              name="logo"
              className="fileChange"
              onChange={handleImageChange}
              placeholder={selectedImage ? selectedImage.name : 'icon.png'}
            />
            <img src={Upload} />
            {/* <span>*</span> */}
          </div>
          {/* <div className="Picture" style={{ maxWidth: '420px' }}>
            <div className="icon-box" style={{ padding: '95px 10px' }}>
              <img
                className="camera"
                src={selectedImage ? selectedImage.size : Camera}
              />
            </div>
          </div> */}
          <div className="Picture" style={{ maxWidth: '420px' }}>
            <div className="icon-box" style={{ padding: '95px 10px' }}>
              {size ? (
                <img
                  className={`${size.sizeicon ? 'profile-image' : 'camera'}`}
                  src={size.sizeicon ? size.sizeicon : Camera}
                  alt="Profile Picture"
                />
              ) : (
                <>
                  <img className={`${'camera'}`} src={`${Camera}`} />
                  {selectedImage ? null : null}
                </>
              )}
            </div>
          </div>
          <div className="form-field">
            <p style={{ textAlign: 'center' }}>
              Size of the Icon should be 26px x 26px.Make sure the Icon should
              be Transparent
            </p>
            <h5 style={{ textAlign: 'center' }}>
              Recommendation: SVG for auto Scaling
            </h5>
            {/* {imageResponse === 200 ? (
              <button
                className="save-button"
                onClick={() => handleAddProduct(imageUrl)}
              >
                Submit
              </button>
            ) : null} */}
            <button
              className="save-button"
              onClick={() => setShowUpload(false)}
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddUploadImageModal;
