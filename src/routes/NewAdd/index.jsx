/** @format */

import React, { useState, useEffect } from 'react';
import './index.css';
import Camera from '../../assets/camera.svg';
import { MdOutlineClose } from 'react-icons/md';
import { HiOutlineChevronDown } from 'react-icons/hi';
import { TbEdit } from 'react-icons/tb';
import { addFeatureProduct } from '../../Api/adminApi';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { setFetching } from '../../redux/reducer/fetching';
import { setName } from '../../redux/reducer/name';
import { upload_Image } from '../../Api/cloudImage';
import BlogEditor from '../../components/BlogEditor';
import ToggleSwitch from '../../components/ToggleSwitch';
import CategoriesModal from '../../components/CategoriesModal';
import CustomDropdown from '../../components/CustomDropdown';
import Bottle from '../../assets/pepecons/Container.png';
import ProductGallery from '../../components/ProductGallery';
import { TOKEN } from '../../constant';

const NewAdd = () => {
  const [showInput, setShowInput] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageUrl, setImageUrl] = useState('');
  const [saveDraft, setSaveDraft] = useState(false);
  const [formData, setFormData] = useState({
    Image: '',
    alttag: '',
    adTittle: '',
    Discription: '',
    redirectionalURL: '',
  });

  const dispatch = useDispatch();

  useEffect(() => {
    document.title = 'Add product';
  }, []);

  const handleChange = (name, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // console.log(formData);

  const handleAddFeature = async (formData, imageUrl, TOKEN) => {
    const token = localStorage.getItem('auth_token');
    dispatch(setFetching(true));
    const data = {
      ...formData,
      Image: imageUrl,
    };
    console.warn(data);
    try {
      const response = await addFeatureProduct(data, token);
      if (response.status === 201) {
        toast.success('Add Blog Update Successfully');
        setSaveDraft(false);
        dispatch(setFetching(false));
      }
    } catch (error) {
      console.log(error.response.data.error);
      setSaveDraft(false);
      dispatch(setFetching(false));
      toast.error(error.response.data.error);
    }
  };
  const handleImageChange = async (event) => {
    const file = event.target.files[0];

    // Check if a file is selected
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

    // setError(''); // Clear any previous error messages

    // Read and display the selected image
    const reader = new FileReader();
    reader.onloadend = () => {
      setSelectedImage(reader.result);
    };
    reader.readAsDataURL(file);

    // Upload the image to a server or cloud service
    const data = new FormData();
    data.append('file', file);
    data.append('upload_preset', 'pepecones_images');
    data.append('cloud_name', 'dmmul5cqy');
    dispatch(setFetching(true));
    try {
      let response = await upload_Image(data);
      const imageUrl = response?.data?.secure_url;
      setImageUrl(imageUrl);
      dispatch(setFetching(false));
    } catch (error) {
      dispatch(setFetching(false));
      toast.error('Profile Image Upload failed');
    }
  };

  console.warn(formData);
  console.warn(imageUrl);
  return (
    <div className="profile-box">
      <div className="profile-content-container">
        <div className="add-new-container">
          <div className="add-new-field">
            <div
              className="change-pic"
              style={{ width: '100%', alignItems: 'flex-start' }}
            >
              <div className="Picture">
                <div className="icon-box">
                  {selectedImage ? (
                    <img
                      className="profile-image"
                      src={selectedImage}
                      alt="Profile Picture"
                    />
                  ) : (
                    <>
                      <img
                        className={`${
                          // adminInfo?.profileImage ? 'profile-image' : 'camera'
                          'camera'
                        }`}
                        src={`${
                          // adminInfo?.profileImage
                          //   ? adminInfo?.profileImage
                          // : Camera
                          Camera
                        }`}
                      />
                      {/* {adminInfo?.profileImage ? null : <h5>Change picture</h5>} */}
                      <h5 style={{ fontWeight: '700' }}>AD Image</h5>
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
            </div>
            <div className="ad-field">
              <label>Add Title</label>
              <input
                name="adTitle"
                value={formData.adTitle}
                onChange={(e) => handleChange('adTitle', e.target.value)}
                placeholder="Pepe Cones Large"
              />
            </div>
            <div className="ad-field">
              <label>Alt Tag</label>
              <input
                value={formData.alttag}
                onChange={(e) => handleChange('alttag', e.target.value)}
                placeholder="alt tag"
              />
            </div>
            <div className="ad-field">
              <label>Redirection URL</label>
              <input
                value={formData.redirectionalURL}
                onChange={(e) =>
                  handleChange('redirectionalURL', e.target.value)
                }
                placeholder="https://"
              />
            </div>
            <div className="ad-field">
              <label>AD CTA</label>
              <input
                value={formData.adCTA}
                onChange={(e) => handleChange('adCTA', e.target.value)}
                placeholder="ad cta"
              />
            </div>
            <div className="ad-field">
              <label>Description</label>
              <input
                value={formData.Discription}
                onChange={(e) => handleChange('Discription', e.target.value)}
                style={{ minHeight: '100px' }}
                placeholder="add your description"
              />
            </div>
            <div className="ad-field">
              <button
                onClick={() => handleAddFeature(formData, imageUrl, TOKEN)}
              >
                Publish
              </button>
            </div>
          </div>
          <div
            className="break-line"
            style={{
              marginInline: '50px',
              width: '0px',
              border: '1px solid #A6A6A6',
            }}
          ></div>
          <div className="add-new-title">
            <h4>AD TITLE</h4>
            <div className="image-container">
              <img src={Bottle} />
              <h5>Special Offer for Today</h5>
              <p>10% Off for New Tesla Model S</p> <button>Details</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewAdd;
