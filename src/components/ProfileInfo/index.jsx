/** @format */

import React, { useState, useEffect } from 'react';
import './index.css';
import Camera from '../../assets/camera.svg';
import { MdOutlineClose } from 'react-icons/md';
import { TbEdit } from 'react-icons/tb';
import { updateAdminInfo, getAdminInfo } from '../../Api/adminApi';
import { userUpdate, getUserInfo } from '../../Api/userApi';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { setProfileImage } from '../../redux/reducer/profileImage';
import { setFetching } from '../../redux/reducer/fetching';
import { setName } from '../../redux/reducer/name';
import { upload_Image } from '../../Api/cloudImage';
import jwtDecode from 'jwt-decode';
import { TOKEN } from '../../constant';
// ({ formData, setFormData, handleChangeProfile })
const ProfileInfo = ({}) => {
  const [adminInfo, setAdminInfo] = useState({});
  const [showInput, setShowInput] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageUrl, setImageUrl] = useState('');
  const [userId, setUserId] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    gender: '',
    DOB: '',
    email: '',
    phoneNumber: '',
    password: '',
    address: '',
    profileImage: '',
  });
  const [editableFields, setEditableFields] = useState({
    name: false,
    gender: false,
    email: false,
    phoneNumber: false,
    DOB: false,
    address: false,
    presentageValue: false,
  });

  const dispatch = useDispatch();

  useEffect(() => {
    getPersonalInfo();
  }, []);
  const handleChangeProfile = (field, value) => {
    // console.warn(field, value);
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };
  const getPersonalInfo = async () => {
    const token = localStorage.getItem('auth_token');
    const decodedToken = jwtDecode(token);
    const { userId } = decodedToken;
    setUserId(userId);
    console.warn(userId);
    dispatch(setFetching(true));

    try {
      const response = await getAdminInfo(token);
      if (response.status === 200) {
        let data = response.data || [];
        console.log(data);

        // Filter the data to find the item with a matching _id
        const matchingItem = data.find((item) => item._id === userId);

        if (matchingItem) {
          // If a matching item is found, store it in state
          setAdminInfo(matchingItem);
          setFormData();
          // setSelectedImage(matchingItem.profileImage?.url || null);
          // setName(matchingItem.name || null);
        }

        dispatch(setFetching(false));
      }
    } catch (error) {
      console.log(error);
      dispatch(setFetching(false));
    }
  };

  const toggleEditableField = (field) => {
    setEditableFields((prevFields) => ({
      ...prevFields,
      [field]: !prevFields[field],
    }));
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

  const handleFormSubmit = async (e, id, imageUrl) => {
    e.preventDefault();
    console.warn(id);
    // if (imageUrl) {
    const updatedFormData = {
      ...formData,
      profileImage: imageUrl,
    };
    console.log(updatedFormData);
    const token = localStorage.getItem('auth_token');
    dispatch(setFetching(true));
    try {
      const response = await updateAdminInfo(id, updatedFormData, token);
      if (response.status === 200) {
        toast.success('Profile Update Successfully');
        dispatch(setFetching(false));
      }
      dispatch(setFetching(true));
      getPersonalInfo();
      dispatch(setFetching(false));
      setEditableFields({
        name: false,
        gender: false,
        DOB: false,
        address: false,
        presentageValue: false,
      });
    } catch (error) {
      toast.error('Profile Update failed');
    }
    // }
  };

  dispatch(setProfileImage(imageUrl));
  dispatch(setName(adminInfo?.name));
  console.warn(imageUrl);
  console.warn(userId);
  return (
    <div className="profile-box">
      <div className="profile-content-container">
        <form onSubmit={(e) => handleFormSubmit(e, adminInfo?._id, imageUrl)}>
          <div className="content-container">
            <span>Personal Info</span>
            <button type="submit" className="profile-submit">
              Update
            </button>
          </div>
          <div className="content-padding-top">
            <div className="profile-content">
              <div className="profile-accordian">
                <div className="full-name">
                  <div className="name-container">
                    <span className="full-name-size">Full Name</span>
                    {editableFields.name ? (
                      <input
                        defaultValue={formData?.name || adminInfo?.name}
                        onChange={(e) =>
                          handleChangeProfile('name', e.target.value)
                        }
                      />
                    ) : (
                      <span className="text-uppercase">{adminInfo?.name}</span>
                    )}
                  </div>
                  <span onClick={() => toggleEditableField('name')}>
                    {editableFields.name ? (
                      <MdOutlineClose fontSize={25} />
                    ) : (
                      <TbEdit fontSize={25} />
                    )}
                  </span>
                </div>
                <div className="break-line"></div>
                <div className="full-name">
                  <div className="name-container">
                    <span className="full-name-size">Gender</span>
                    {editableFields.gender ? (
                      <input
                        defaultValue={formData?.gender || adminInfo?.gender}
                        onChange={(e) =>
                          handleChangeProfile('gender', e.target.value)
                        }
                      />
                    ) : (
                      <span className="text-uppercase">
                        {adminInfo?.gender}
                      </span>
                    )}
                  </div>
                  <span>
                    <span onClick={() => toggleEditableField('gender')}>
                      {editableFields.gender ? (
                        <MdOutlineClose fontSize={25} />
                      ) : (
                        <TbEdit fontSize={25} />
                      )}
                    </span>
                  </span>
                </div>
                <div className="break-line"></div>
                <div className="full-name">
                  <div className="name-container">
                    <span className="full-name-size">Date of Birth</span>
                    {editableFields.DOB ? '' : <span>{adminInfo?.DOB}</span>}
                  </div>
                  <span onClick={() => toggleEditableField('DOB')}>
                    {editableFields.DOB ? (
                      <MdOutlineClose fontSize={25} />
                    ) : (
                      <TbEdit fontSize={25} />
                    )}
                  </span>
                </div>
                <div className="date-of-birth">
                  {editableFields.DOB ? (
                    <>
                      <input
                        type="date"
                        placeholder="Date"
                        style={{ height: '45px' }}
                        defaultValue={formData?.DOB || adminInfo?.DOB}
                        onChange={(e) =>
                          handleChangeProfile('DOB', e.target.value)
                        }
                      />
                    </>
                  ) : (
                    <></>
                  )}
                </div>
                <div className="break-line"></div>
                <div className="full-name">
                  <div className="name-container">
                    <span className="full-name-size">Email</span>
                    {editableFields.email ? (
                      ''
                    ) : (
                      <span>{adminInfo?.email}</span>
                    )}
                  </div>
                  <span onClick={() => toggleEditableField('email')}>
                    {editableFields.email ? (
                      <MdOutlineClose fontSize={25} />
                    ) : (
                      <TbEdit fontSize={25} />
                    )}
                  </span>
                </div>
                <div className="name-container">
                  {editableFields.email ? (
                    <>
                      <input
                        placeholder="email"
                        style={{ height: '45px' }}
                        defaultValue={formData?.email || adminInfo?.email}
                        onChange={(e) =>
                          handleChangeProfile('email', e.target.value)
                        }
                      />
                    </>
                  ) : (
                    <></>
                  )}
                </div>
                <div className="break-line"></div>
                <div className="full-name">
                  <div className="name-container">
                    <span className="full-name-size">Phone Number</span>
                    {editableFields.phoneNumber ? (
                      ''
                    ) : (
                      <span>
                        {adminInfo?.phoneNumber
                          ? adminInfo?.phoneNumber
                          : adminInfo?.mobile}
                      </span>
                    )}
                  </div>
                  <span onClick={() => toggleEditableField('phoneNumber')}>
                    {editableFields.phoneNumber ? (
                      <MdOutlineClose fontSize={25} />
                    ) : (
                      <TbEdit fontSize={25} />
                    )}
                  </span>
                </div>
                <div className="name-container">
                  {editableFields.phoneNumber ? (
                    <>
                      <input
                        placeholder="phoneNumber"
                        style={{ height: '45px' }}
                        defaultValue={
                          formData?.phoneNumber || adminInfo?.phoneNumber
                        }
                        onChange={(e) =>
                          handleChangeProfile('phoneNumber', e.target.value)
                        }
                      />
                    </>
                  ) : (
                    <></>
                  )}
                </div>
                <div className="break-line"></div>
                <div className="full-name">
                  <div className="name-container">
                    <span className="full-name-size">Address</span>
                    {editableFields.address ? (
                      <input
                        defaultValue={formData?.address || adminInfo?.address}
                        onChange={(e) =>
                          handleChangeProfile('address', e.target.value)
                        }
                      />
                    ) : (
                      <span className="text-uppercase">
                        {adminInfo?.address}
                      </span>
                    )}
                  </div>
                  <span onClick={() => toggleEditableField('address')}>
                    {editableFields.address ? (
                      <MdOutlineClose fontSize={25} />
                    ) : (
                      <TbEdit fontSize={25} />
                    )}
                  </span>
                </div>
              </div>
              <div className="change-pic">
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
                            adminInfo?.profileImage ? 'profile-image' : 'camera'
                          }`}
                          src={`${
                            adminInfo?.profileImage
                              ? adminInfo?.profileImage
                              : Camera
                          }`}
                        />
                        {adminInfo?.profileImage ? null : (
                          <h5>Change picture</h5>
                        )}
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
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileInfo;
