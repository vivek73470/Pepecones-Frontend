/** @format */

import React, { useState, useEffect } from 'react';
import { MdOutlineClose } from 'react-icons/md';
import Camera from '../../assets/pepecons/clarity_image-gallery-line.svg';
import Solar from '../../assets/pepecons/solar_gallery-minimalistic-linear.svg';
import { upload_Image } from '../../Api/cloudImage';
import { toast } from 'react-toastify';
import { setFetching } from '../../redux/reducer/fetching';
import { useDispatch, useSelector } from 'react-redux';
import { RiDeleteBinLine } from 'react-icons/ri';

const EditProductGallery = ({
  formData,
  newProduct,
  setNewProduct,
  handleAddProduct,
  setShowGallery,
  setImageUrl,
  imageUrl,
  setFormData,
  // handleChange,
}) => {
  const [showInput, setShowInput] = useState(false);
  const [viewGallery, setViewGallery] = useState(false);
  const [altTag, setAltTag] = useState(''); // State to store the Alt Tag
  const [imageObjects, setImageObjects] = useState([]);
  const dispatch = useDispatch();
  const editGallery = useSelector((state) => state?.editGallery.gallery);

  useEffect(() => {
    if (editGallery) {
      setSelectedImage(editGallery);
    }
  }, [editGallery]);

  const [selectedImage, setSelectedImage] = useState(editGallery || null);

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
      const imageUrl = response?.data?.secure_url;

      const filteredImageObjects = imageObjects.filter(
        (item) => item.imageUrl !== null && item.altTag !== null,
      );

      filteredImageObjects.push({ imageUrl, altTag });

      setImageObjects(filteredImageObjects);

      setImageUrl(imageUrl);

      dispatch(setFetching(false));
    } catch (error) {
      dispatch(setFetching(false));
      toast.error('Profile Image Upload failed');
    }
  };

  const addImagesToFormData = (e) => {
    e.preventDefault();
    setSelectedImage({
      altTag: altTag,
    });
    const filteredImageObjects = imageObjects.filter(
      (item) => item.imageUrl.trim() !== '' || item.altTag.trim() !== '',
    );

    if (filteredImageObjects.length > 0) {
      const updatedImageUrls = [...formData.imageUrls, ...filteredImageObjects];

      setFormData({
        ...formData,
        imageUrls: updatedImageUrls,
      });

      setImageObjects([]);
      setSelectedImage(null);
      setShowInput(false);

      toast.success('Images added to gallery.');
    } else {
      toast.error('Please upload an image and enter alt tag for each image.');
    }
  };

  const handleChange = (e) => {
    console.log(e.target.value);
    setAltTag(e.target.value);
  };
  // console.log(imageObjects);
  console.log(selectedImage);
  console.log(imageObjects);
  // console.log(formData?.imageUrls);
  return (
    <>
      <div className="modal">
        <div className="modal-content" style={{ maxWidth: '500px' }}>
          <span className="cancle-modal" onClick={() => setShowGallery(false)}>
            <MdOutlineClose fontSize={40} />
          </span>
          <h4 className="welcome justifyCenter" style={{ color: '#1F1B2D' }}>
            Product Gallery
          </h4>
          <form
            className="change-pic"
            style={{
              width: '100%',
              paddingInline: '12px',
              overflow: 'overlay',
            }}
            onSubmit={addImagesToFormData}
          >
            <div className="Picture" style={{ maxWidth: '420px' }}>
              <div className="icon-box" style={{ padding: '95px 10px' }}>
                {selectedImage ? (
                  <img
                    className="profile-image"
                    src={
                      selectedImage ? selectedImage : selectedImage?.imageUrl
                    }
                    alt={selectedImage.altTag}
                  />
                ) : (
                  <>
                    <img className="camera" src={Camera} />
                  </>
                )}
                <input
                  type="file"
                  onChange={handleImageChange}
                  style={{
                    display: showInput || selectedImage ? 'block' : '',
                  }}
                />
              </div>
            </div>
            <br />
            {viewGallery ? (
              <div
                className="change-pic"
                style={{ width: '100%', padding: '0px', overflow: 'overlay' }}
              >
                <div className="gallery-section">
                  {imageObjects?.imageUrls?.map((imageObject, index) => (
                    <div className="gallery-picture " key={index}>
                      <div
                        className="gallery-box-icon"
                        style={{ width: 'inherit' }}
                      >
                        {imageObject?.imageUrl ? (
                          <img
                            className="profile-image"
                            src={imageObject?.imageUrl}
                            alt={imageObject?.altTag}
                          />
                        ) : (
                          <>
                            <img
                              className="camera"
                              style={{ width: '60px' }}
                              src={Solar}
                            />
                          </>
                        )}
                      </div>
                      <span>
                        <RiDeleteBinLine fontSize={25} />
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <>
                <input
                  name="altTag"
                  placeholder="Alt Tag"
                  defaultValue={altTag || selectedImage?.altTag}
                  onChange={(e) => handleChange(e)}
                />
                <div
                  className="btn-content"
                  style={{
                    width: '100%',
                    paddingInline: '0px',
                    paddingTop: '30px',
                  }}
                >
                  {/* <button
                    onClick={() => setViewGallery(true)}
                    className="delete-it"
                  >
                    View Gallery
                  </button> */}
                  <button
                    style={{ width: '100%' }}
                    type="submit"
                    className="not-yet"
                  >
                    Add Images
                  </button>
                </div>
              </>
            )}
          </form>
        </div>
      </div>
    </>
  );
};

export default EditProductGallery;
