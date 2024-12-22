/** @format */

import React, { useState, useEffect, useReducer } from 'react';
import Camera from '../../assets/camera.svg';
import { AiFillCloseCircle } from 'react-icons/ai';
import { HiOutlineChevronDown } from 'react-icons/hi';
import { TbEdit } from 'react-icons/tb';
import { MdOutlineClose } from 'react-icons/md';
import {
  addBlogs,
  saveBlog,
  getCategory,
  updateBlogs,
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
import EditBlogCategoryDropdown from '../../components/EditBlogCategoryDropdown';
import EditTextEditor from '../../components/EditTextEditer';
import EditToggleSwitch from '../../components/EditToggleSwitch';
import { TOKEN } from '../../constant';

const EditBlog = () => {
  const [vendorInfo, setVendorInfo] = useState({});
  const [showInput, setShowInput] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [featureModal, setFeatureModal] = useState(false);
  const [publish, setPublish] = useState(false);
  const [saveDraft, setSaveDraft] = useState(false);
  const [formDataChanged, setFormDataChanged] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedImages, setSelectedImages] = useState([]);
  const [imageTags, setImageTags] = useState({});
  const [imageUrl, setImageUrl] = useState('');
  const [content, setContent] = useState('');
  const [parsedContent, setParsedContent] = useState('');
  const [selectedValue, setSelectedValue] = useState('');
  const [countFeature, setCountFeature] = useState('');
  const [options, setOptions] = useState([]);
  const blogEdit = useSelector((state) => state.editBlog.blog);
  const [toggle, setToggle] = useState(blogEdit?.isFeatured || false);
  const [formData, setFormData] = useState(blogEdit);
  const [editableFields, setEditableFields] = useState({
    title: false,
    content: false,
  });

  const [selectedOption, setSelectedOption] = useState(null);

  const [featuredImage, setFeaturedImage] = useState(
    blogEdit?.featuredImage || null,
  );

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  const dispatch = useDispatch();

  const handleChange = (field, value) => {
    console.log('handleChange called');
    console.log('Field:', field);
    console.log('Value:', value);

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

    if (!file) {
      return;
    }

    const fileName = file.name.toLowerCase();
    if (!fileName.endsWith('.jpg') && !fileName.endsWith('.png')) {
      toast.error('Please select a valid JPG or PNG image.');
      event.target.value = null;
      setFeaturedImage(null);
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setFeaturedImage(reader.result);
    };
    reader.readAsDataURL(file);

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

  dispatch(setProfileImage(imageUrl));

  useEffect(() => {
    fetchOptions();
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
    console.log('Updated parsedContent:', parsedContent);
  }, [selectedImages]);

  useEffect(() => {
    const blogId = blogEdit?._id;
    const saveBlogData = async () => {
      try {
        dispatch(setFetching(true));
        const token = localStorage.getItem('auth_token');
        const response = await saveBlog(blogId, formData, token);
        if (response.status === 200) {
          toast.success('Blog saved successfully!');
          dispatch(setFetching(false));
          // Reset the formDataChanged state after successful save
          setFormDataChanged(false);
        }
      } catch (error) {
        dispatch(setFetching(false));
        toast.error('Failed to save the blog.');
      }
    };

    // Check if formData has changed and trigger the API call
    if (formDataChanged) {
      saveBlogData();
    }
  }, [formDataChanged, formData, blogEdit]);

  const fetchOptions = async () => {
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

  const handleUpdate = async (e, blogEdit) => {
    e.preventDefault();
    const token = localStorage.getItem('auth_token');
    const blogId = blogEdit._id;
    console.log('Save Blog Data:', formData);
    dispatch(setFetching(true));
    const data = { ...formData, featuredImage: imageUrl };
    console.log(data);
    try {
      const response = await updateBlogs(blogId, data, token);
      if (response.status === 200) {
        toast.success('Blog Update Successfully');
        dispatch(setFetching(false));
      }
    } catch (error) {
      dispatch(setFetching(false));
      toast.error('Blog update failed');
    }
  };

  const handleToggle = () => {
    getMaxFeatureBlog();

    // Toggle isFeatured
    setFormData((prevData) => ({
      ...prevData,
      isFeatured: !prevData.isFeatured,
    }));

    // Toggle featureModal if countFeature is less than or equal to 3
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

  // console.log(blogEdit);
  console.log(formData);
  return (
    <div className="profile-box">
      <div className="profile-content-container">
        <form>
          <div className="content-container">
            {editableFields.title ? (
              <input
                name="title"
                placeholder="Title"
                defaultValue={formData?.title || blogEdit?.title}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    title: e.target.value,
                  })
                }
              />
            ) : (
              <span id="edit-product">{`${blogEdit?.title
                .toString()
                .slice(0, 30)}...`}</span>
            )}

            <span onClick={() => toggleEditableField('title')}>
              {editableFields.title ? (
                <MdOutlineClose fontSize={30} />
              ) : (
                <TbEdit fontSize={30} />
              )}
            </span>

            <div className="content-container">
              <button
                onClick={(e) => handleUpdate(e, blogEdit)}
                className="profile-submit"
              >
                Update
              </button>
            </div>
          </div>
          <div className="content-padding-top">
            <div className="blog-product-grid-wrapper">
              <div id="blog-product-col-1">
                <div className="border-blog-product">
                  <div className="blog-editor">
                    {/* {editableFields.title ? (
                      <input
                        defaultValue={formData?.author || blogEdit?.author}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            author: e.target.value,
                          })
                        }
                      />
                    ) : (
                      <h5>{blogEdit?.author}</h5>
                    )} */}
                    <h5>Blog Content</h5>
                  </div>
                  <EditTextEditor
                    editorConfig={editorConfig}
                    setContent={setContent}
                    content={content}
                    setFormData={setFormData}
                    formData={formData}
                    blogEdit={blogEdit}
                  />
                </div>
                <h5>SEO Customization</h5>
                <input
                  placeholder="Meta Title"
                  defaultValue={formData?.metatitle || blogEdit?.metatitle}
                  onChange={(e) =>
                    setFormData({ ...formData, metatitle: e.target.value })
                  }
                />

                <input
                  style={{ height: '100px', marginTop: '30px' }}
                  placeholder="Meta Description"
                  defaultValue={
                    formData?.metaDescription || blogEdit?.metaDescription
                  }
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      metaDescription: e.target.value,
                    })
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
                          src={featuredImage || imageUrl}
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
                            src={`${featuredImage || imageUrl}`}
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
                      defaultValue={formData?.alttag || blogEdit?.alttag}
                      onChange={(e) =>
                        setFormData({ ...formData, alttag: e.target.value })
                      }
                    />
                    <div className="toggle-btn">
                      <EditToggleSwitch
                        featureModal={featureModal}
                        setFeatureModal={setFeatureModal}
                        toggle={toggle}
                        blogEdit={blogEdit}
                        formData={formData}
                        handleToggle={handleToggle}
                      />
                      &nbsp;&nbsp;&nbsp;&nbsp;
                      <span>Mark This as Featured</span>
                    </div>
                    <h6>Product Categories</h6>
                    <EditBlogCategoryDropdown
                      options={options}
                      onSelect={handleOptionSelect}
                      setFormData={setFormData}
                      blogEdit={blogEdit}
                    />
                    <h6>Meta Keywords</h6>
                    <input
                      placeholder="Meta Keywords"
                      style={{ height: '100px' }}
                      defaultValue={
                        formData?.metakeywords || blogEdit?.metakeywords
                      }
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          metakeywords: e.target.value,
                        })
                      }
                    />
                    <h6>Custom URL</h6>
                    <input
                      placeholder="URL Slug"
                      defaultValue={formData?.customUrl || blogEdit?.customUrl}
                      onChange={(e) =>
                        setFormData({ ...formData, customUrl: e.target.value })
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
      {showAlert && countFeature === 4 ? (
        <ConfirmModal setShowAlert={setShowAlert} />
      ) : null}
    </div>
  );
};

export default EditBlog;
