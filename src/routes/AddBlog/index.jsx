/** @format */

import React, { useState, useEffect } from 'react';
import './index.css';
import Camera from '../../assets/camera.svg';
import { AiFillCloseCircle } from 'react-icons/ai';
import { HiOutlineChevronDown } from 'react-icons/hi';
import { TbEdit } from 'react-icons/tb';
import { MdOutlineClose } from 'react-icons/md';
import {
  addBlogs,
  saveBlog,
  getCategory,
  featureCount,
} from '../../Api/adminApi';
import { userUpdate, getUserInfo } from '../../Api/userApi';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { setProfileImage } from '../../redux/reducer/profileImage';
import { setFetching } from '../../redux/reducer/fetching';
import { setName } from '../../redux/reducer/name';
import { upload_Image } from '../../Api/cloudImage';
import BlogEditor from '../../components/BlogEditor';
import ToggleSwitch from '../../components/ToggleSwitch';
import CategoriesModal from '../../components/CategoriesModal';
import ReactEditer from '../../components/ReactEditer';
import { initialContent, editorConfig } from '../../utils/EditorConfig';
import CustomDropdown from '../../components/CustomDropdown';
import CategoryDropdown from '../../components/CategoryDropdown';
import ConfirmModal from '../../components/ConfirmModal';
import FeatureBlogConfirmModal from '../../components/FeatureBlogConfirmModal';
import BlogPublicModal from '../../components/BlogPublicModal';
import SaveDraftModal from '../../components/SaveDraftModal';
import AddCategoryDropdown from '../../components/AddBlogDropdown';
import { TOKEN } from '../../constant';

const AddBlog = () => {
  const [vendorInfo, setVendorInfo] = useState({});
  const [showInput, setShowInput] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [featureModal, setFeatureModal] = useState(false);
  const [publish, setPublish] = useState(false);
  const [saveDraft, setSaveDraft] = useState(false);
  const [toggle, setToggle] = useState(false);
  const [featuredImage, setFeaturedImage] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedImages, setSelectedImages] = useState([]);
  const [imageTags, setImageTags] = useState({});
  const [imageUrl, setImageUrl] = useState('');
  const [content, setContent] = useState('');
  const [parsedContent, setParsedContent] = useState('');
  const [selectedValue, setSelectedValue] = useState('');
  const [countFeature, setCountFeature] = useState('');
  const [options, setOptions] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    featuredImage: '',
    category: '',
    author: '',
    content: '',
    imageUrls: [],
    status: '',
    isFeatured: null,
    tags: [],
    comments: [],
    metakeywords: '',
    metatitle: '',
    metaDescription: '',
    alttag: '',
    customUrl: '',
    createdAt: '',
    updatedAt: '',
  });

  const [editableFields, setEditableFields] = useState({
    title: false,
    content: false,
  });
  const [selectedOption, setSelectedOption] = useState(null);
  console.warn(selectedOption?.blogcategoryName);
  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    handleChange('category', option?.blogcategoryName); // Assuming 'blogcategoryName' is the field you want to set
  };

  const dispatch = useDispatch();

  const handleChange = (field, value) => {
    // console.warn(field, value);
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
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
      setFeaturedImage(null);
      return;
    }

    // setError(''); // Clear any previous error messages

    // Read and display the selected image
    const reader = new FileReader();
    reader.onloadend = () => {
      setFeaturedImage(reader.result);
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

  const handlePublish = async (content, TOKEN) => {
    const token = localStorage.getItem('auth_token');
    dispatch(setFetching(true));
    const data = {
      ...formData,
      content: content,
      featuredImage: imageUrl,
      category: selectedOption?.blogcategoryName,
      isFeatured: toggle,
    };
    console.warn(data);
    try {
      const response = await addBlogs(data, token);
      console.log(response);
      if (response.status === 201) {
        toast.success('Add Blog Update Successfully');
        setPublish(false);
        dispatch(setFetching(false));
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 400) {
          toast.error('Bad Request!');
        } else if (error.response.status === 409) {
          setShowAlert(true);
        } else if (error.response.status === 500) {
          toast.error('Internal Server Error!');
        }
      }
      dispatch(setFetching(false));
    }
  };

  const handleSaveDraft = async (content, TOKEN) => {
    const token = localStorage.getItem('auth_token');
    dispatch(setFetching(true));
    const data = {
      ...formData,
      content: content,
      featuredImage: imageUrl,
      alttag: formData.alttag,
      category: selectedValue,
      isFeatured: toggle,
    };
    // console.warn(data);
    try {
      const response = await saveBlog(data, token);
      console.log(response);
      if (response.status === 201) {
        toast.success('Blog Add Successfully');
        setSaveDraft(false);
        dispatch(setFetching(false));
      }
    } catch (error) {
      console.log(error.response.data.error);
      toast.error(error.response.data.error);
      setSaveDraft(false);
      dispatch(setFetching(false));
    }
  };

  dispatch(setProfileImage(imageUrl));
  dispatch(setName(vendorInfo[0]?.name));
  console.warn(imageUrl);
  const maintoken = localStorage.getItem('auth_token');
  const role = maintoken.charAt(maintoken.length - 1);
  const token = maintoken.slice(0, -1);

  useEffect(() => {
    fetchOptions(TOKEN);
    // Generate image tags from selectedImages and append to parsedContent
    const imageTags = selectedImages.map(
      (image, index) =>
        `<img key=${index} src="${image?.image}" alt="Selected ${
          index + 1
        }" />`,
    );
    const imagesString = imageTags.join('');
    setParsedContent(
      (prevParsedContent) => `${prevParsedContent}\n\n${imagesString}`,
    );

    // Log the updated parsedContent
    console.log('Updated parsedContent:', parsedContent);
  }, [selectedImages]);

  const handleSelectChange = (event) => {
    setSelectedValue(event.target.value);
  };

  const fetchOptions = async (TOKEN) => {
    dispatch(setFetching(true));
    const token = localStorage.getItem('auth_token');
    try {
      let response = await getCategory(token);
      if (response.status === 200) {
        console.warn(response);
        setOptions(response?.data);
        dispatch(setFetching(false));
      }
    } catch (error) {
      dispatch(setFetching(false));
    }
  };
  const handleToggle = () => {
    getMaxFeatureBlog();
    if (countFeature <= 3) {
      setFeatureModal(!featureModal);
    }
  };
  const getMaxFeatureBlog = async () => {
    dispatch(setFetching(true));
    const token = localStorage.getItem('auth_token');
    try {
      let response = await featureCount(token);
      if (response.status === 200) {
        console.warn(response);
        setCountFeature(response?.data.count || '');
        setShowAlert(true);
        dispatch(setFetching(false));
      }
    } catch (error) {
      dispatch(setFetching(false));
    }
  };
  console.warn(content);
  return (
    <div className="profile-box">
      <div className="profile-content-container">
        <form>
          <div className="content-container">
            {/* <h5>
              <span>
                <HiOutlineArrowLeft />
                &nbsp;Back
              </span>
            </h5> */}
            {editableFields.title ? (
              <input
                value={formData?.title}
                onChange={(e) => handleChange('title', e.target.value)}
              />
            ) : (
              <span>Add Your Blog Title</span>
            )}
            <span onClick={() => toggleEditableField('title')}>
              {editableFields.title ? (
                <MdOutlineClose fontSize={30} />
              ) : (
                <TbEdit fontSize={30} />
              )}
            </span>
            {/* <button type="submit" className="profile-submit">
              Update
            </button> */}
            <div className="btn-align-center">
              <span onClick={() => setSaveDraft(true)}>Save as Draft</span>
              <div className="dropdown save-draft-btn" style={{ width: '0px' }}>
                <button
                  className=" select-option"
                  type="button"
                  id="dropdownMenuButton1"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <HiOutlineChevronDown fontSize={22} />
                </button>
                <ul
                  className={`${'dropdown-menu drop-down  '}`}
                  aria-labelledby="dropdownMenuButton1"
                >
                  <li onClick={() => setPublish(true)}>Publish Now</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="content-padding-top">
            <div className="blog-product-grid-wrapper">
              <div id="blog-product-col-1">
                <div className="border-blog-product">
                  <div className="blog-editor">
                    <h5>Blog Content</h5>
                  </div>

                  <ReactEditer
                    editorConfig={editorConfig}
                    setContent={setContent}
                    content={content}
                  />
                </div>
                <h5>SEO Customization</h5>
                <input
                  placeholder="Meta Title"
                  value={formData.metatitle}
                  onChange={(e) => handleChange('metatitle', e.target.value)}
                />
                <input
                  style={{ height: '100px', marginTop: '30px' }}
                  placeholder="Meta Description"
                  value={formData.metaDescription}
                  onChange={(e) =>
                    handleChange('metaDescription', e.target.value)
                  }
                />
              </div>
              <div id="blog-product-col-2">
                <div className="change-pic" style={{ width: '100%' }}>
                  <div className="Picture">
                    <div className="icon-box">
                      {featuredImage ? (
                        <img
                          className="profile-image"
                          src={featuredImage}
                          alt="Profile Picture"
                        />
                      ) : (
                        <>
                          <img
                            className={`${
                              vendorInfo[0]?.profileImage
                                ? 'profile-image'
                                : 'camera'
                            }`}
                            src={`${
                              vendorInfo[0]?.profileImage
                                ? vendorInfo[0]?.profileImage
                                : Camera
                            }`}
                          />
                          {vendorInfo[0]?.profileImage ? null : (
                            <h5>Add Blog Cover</h5>
                          )}
                        </>
                      )}
                      <input
                        type="file"
                        onChange={handleImageChange}
                        style={{
                          display: showInput || featuredImage ? 'block' : '',
                        }}
                      />
                    </div>
                  </div>
                  <div className="choose-category">
                    <h6>Cover Image ALT Tag</h6>
                    <input
                      placeholder="Alt Tag"
                      value={formData.alttag}
                      onChange={(e) => handleChange('alttag', e.target.value)}
                    />
                    <div className="toggle-btn">
                      <ToggleSwitch
                        featureModal={featureModal}
                        setFeatureModal={setFeatureModal}
                        toggle={toggle}
                        handleToggle={handleToggle}
                      />
                      &nbsp;&nbsp;&nbsp;&nbsp;
                      <span>Mark This as Featured</span>
                    </div>
                    <h6>Product Categories</h6>
                    <AddCategoryDropdown
                      options={options}
                      onSelect={handleOptionSelect}
                      setFormData={setFormData}
                    />

                    <h6
                      className="underline"
                      onClick={() => setShowModal(true)}
                    >
                      Create New Category
                    </h6>
                    <h6>Meta Keywords</h6>
                    <input
                      placeholder="Meta Keywords"
                      style={{ height: '100px' }}
                      value={formData?.metakeywords}
                      onChange={(e) =>
                        handleChange('metakeywords', e.target.value)
                      }
                    />
                    <h6>Custom URL</h6>
                    <input
                      placeholder="URL Slug"
                      value={formData?.customUrl}
                      onChange={(e) =>
                        handleChange('customUrl', e.target.value)
                      }
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
      {featureModal ? (
        <FeatureBlogConfirmModal
          toggle={toggle}
          setToggle={setToggle}
          setFeatureModal={setFeatureModal}
        />
      ) : null}
      {publish ? (
        <BlogPublicModal
          setPublish={setPublish}
          handlePublish={handlePublish}
          content={content}
        />
      ) : null}
      {saveDraft ? (
        <SaveDraftModal
          handleSaveDraft={handleSaveDraft}
          setSaveDraft={setSaveDraft}
          content={content}
        />
      ) : null}
      {showAlert && countFeature === 4 ? (
        <ConfirmModal setShowAlert={setShowAlert} />
      ) : null}
      {showModal ? (
        <CategoriesModal
          fetchOptions={fetchOptions}
          setShowModal={setShowModal}
        />
      ) : null}
    </div>
  );
};

export default AddBlog;
