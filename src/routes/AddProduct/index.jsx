/** @format */

import React, { useState, useEffect } from 'react';
import './index.css';
import Camera from '../../assets/camera.svg';
import { MdOutlineClose } from 'react-icons/md';
import { HiOutlineChevronDown } from 'react-icons/hi';
import { TbEdit } from 'react-icons/tb';
import {
  getProductSelectCategory,
  getProductSubCategory,
  getPaperSize,
  getColor,
  getAllSize,
  getAllFlavour,
  addProduct,
  saveProduct,
} from '../../Api/adminApi';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { setFetching } from '../../redux/reducer/fetching';
import { setName } from '../../redux/reducer/name';
import { upload_Image } from '../../Api/cloudImage';
import BlogEditor from '../../components/BlogEditor';
import ToggleSwitch from '../../components/ToggleSwitch';
import CategoriesModal from '../../components/CategoriesModal';
import CustomDropdown from '../../components/CustomDropdown';
import CategoryDropdown from '../../components/CategoryDropdown';
import ProductGallery from '../../components/ProductGallery';
import Caraousal from '../../components/Carousel';
import SubCustomDropdown from '../../components/SubCategoryDropdown';
import ProductTagCheckBox from '../../components/ProductTagCheckBox';
import SizeTypeDropdown from '../../components/SizeTypeDropdown';
import FlavourDropdown from '../../components/FlavourDropdown';
import ColorDropdown from '../../components/ColorDropdown';
import PaperSizeDropdown from '../../components/PaperSizeDropdown';
import WhyChooseEditer from '../../components/WhyChooseEditer';
import ProductDescriptionEditer from '../../components/ProductDescriptionEditer';
import KeyFeaturesEditer from '../../components/KeyFeaturesEditer';
import ProductCategoryDropdown from '../../components/ProductCategoryDropdown';
import MetaDescriptionEditer from '../../components/MetaDescriptionEditer';
import { TOKEN } from '../../constant';

const AddProduct = () => {
  const [vendorInfo, setVendorInfo] = useState({});
  const [showInput, setShowInput] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageUrl, setImageUrl] = useState('');
  const [showGallery, setShowGallery] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [publish, setPublish] = useState(false);
  const [saveDraft, setSaveDraft] = useState(false);
  const [toggle, setToggle] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [options, setOptions] = useState([]);
  const [optionsSub, setOptionsSub] = useState([]);
  const [optionsSizeType, setOptionsSizeType] = useState([]);
  const [optionsFlavour, setOptionsFlavour] = useState([]);
  const [optionsColor, setOptionsColor] = useState([]);
  const [optionsPaper, setOptionsPaper] = useState([]);
  const [content, setContent] = useState('');
  const [productTag, setProductTag] = useState('');
  const [whyChooseus, setWhyChooseus] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [keyFetures, setKeyFetures] = useState('');
  const [metaDescription, setMetaDescription] = useState('');
  const [selectedValue, setSelectedValue] = useState('');
  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  const [formData, setFormData] = useState({
    name: '',
    sizetype: '',
    flavour: '',
    color: '',
    paperSize: '',
    producturl: '',
    whyChooseus: '',
    productDescription: '',
    keyFetures: '',
    imageUrls: [],
    producttag: '',
    productCategories: '',
    productSubcategories: '',
    metaKeywords: '',
    metaTitle: '',
    metaDescription: '',
    status: '',
    customURL: '',
  });

  const [editableFields, setEditableFields] = useState({
    name: false,
    specification: false,
    producturl: false,
    whyChooseus: false,
    productDescription: false,
    keyFetures: false,
  });
  const dispatch = useDispatch();

  useEffect(() => {
    document.title = 'Add product';
    fetchOptions(TOKEN);
    fetchSubOptions(TOKEN);
    fetchSizeTypeOptions(TOKEN);
    fetchFlavourOptions(TOKEN);
    fetchColorOptions(TOKEN);
    fetchPaperSizeOptions(TOKEN);
  }, []);

  const handleChange = (name, value) => {
    if (name === 'altTag') {
      setFormData({
        ...formData,
        imageUrls: [{ ...formData.imageUrls[0], altTag: value }],
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const fetchOptions = async (TOKEN) => {
    dispatch(setFetching(true));
    const token = localStorage.getItem('auth_token');
    try {
      let response = await getProductSelectCategory(token);
      if (response.status === 200) {
        console.warn(response.data);
        setOptions(response?.data ? response.data : null);
        dispatch(setFetching(false));
      }
    } catch (error) {
      dispatch(setFetching(false));
    }
  };

  const fetchSubOptions = async (TOKEN) => {
    dispatch(setFetching(true));
    const token = localStorage.getItem('auth_token');
    try {
      let response = await getProductSubCategory(token);
      if (response.status === 200) {
        console.warn(response);
        setOptionsSub(response?.data ? response.data : null);
        dispatch(setFetching(false));
      }
    } catch (error) {
      dispatch(setFetching(false));
    }
  };

  const fetchSizeTypeOptions = async (TOKEN) => {
    dispatch(setFetching(true));
    const token = localStorage.getItem('auth_token');
    try {
      let response = await getAllSize(token);
      if (response.status === 200) {
        console.warn(response);
        setOptionsSizeType(
          response?.data.paperInfoArray ? response.data.paperInfoArray : null,
        );
        dispatch(setFetching(false));
      }
    } catch (error) {
      dispatch(setFetching(false));
    }
  };

  const fetchFlavourOptions = async (TOKEN) => {
    dispatch(setFetching(true));
    const token = localStorage.getItem('auth_token');
    try {
      let response = await getAllFlavour(token);
      if (response.status === 200) {
        console.warn(response);
        setOptionsFlavour(
          response?.data.flavour ? response.data.flavour : null,
        );
        dispatch(setFetching(false));
      }
    } catch (error) {
      dispatch(setFetching(false));
    }
  };

  const fetchColorOptions = async (TOKEN) => {
    dispatch(setFetching(true));
    const token = localStorage.getItem('auth_token');
    try {
      let response = await getColor(token);
      if (response.status === 200) {
        console.warn(response);
        setOptionsColor(
          response?.data.paperInfoArray ? response.data.paperInfoArray : null,
        );
        dispatch(setFetching(false));
      }
    } catch (error) {
      dispatch(setFetching(false));
    }
  };

  const fetchPaperSizeOptions = async (TOKEN) => {
    dispatch(setFetching(true));
    const token = localStorage.getItem('auth_token');
    try {
      let response = await getPaperSize(token);
      if (response.status === 200) {
        console.warn(response);
        setOptionsPaper(
          response?.data.paperInfoArray ? response.data.paperInfoArray : null,
        );
        dispatch(setFetching(false));
      }
    } catch (error) {
      dispatch(setFetching(false));
    }
  };

  const toggleEditableField = (field) => {
    setEditableFields((prevFields) => ({
      ...prevFields,
      [field]: !prevFields[field],
    }));
  };

  const handlePublish = async (formData, TOKEN) => {
    const token = localStorage.getItem('auth_token');
    dispatch(setFetching(true));

    // Define an array of required field names
    const requiredFields = [
      'name',
      'sizetype',
      'flavour',
      'color',
      'paperSize',
      'producturl',
    ];

    // Check if any required field is empty
    const hasEmptyField = requiredFields.some(
      (fieldName) => !formData[fieldName],
    );

    try {
      if (!hasEmptyField) {
        const response = await addProduct(formData, token);
        console.log(response);
        if (response.status === 201) {
          toast.success('Add Blog Update Successfully');
          setPublish(false);
        }
      } else {
        toast.warn('Please fill in all required fields');
      }

      dispatch(setFetching(false));
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

  const handleSaveDraft = async (formData, TOKEN) => {
    const token = localStorage.getItem('auth_token');
    dispatch(setFetching(true));

    // Define an array of required field names
    const requiredFields = [
      'name',
      'sizetype',
      'flavour',
      'color',
      'paperSize',
      'producturl',
    ];

    // Check if any required field is empty
    const hasEmptyField = requiredFields.some(
      (fieldName) => !formData[fieldName],
    );

    try {
      if (!hasEmptyField) {
        const response = await saveProduct(formData, token);
        if (response.status === 201) {
          toast.success('Save as draft Successfully');
          setSaveDraft(false);
        }
      } else {
        toast.warn('Please fill in all required fields');
      }

      dispatch(setFetching(false));
    } catch (error) {
      setSaveDraft(false);
      dispatch(setFetching(false));
      toast.error('Save draft failed');
    }
  };

  console.warn(formData);
  console.warn(imageUrl);
  return (
    <div className="profile-box">
      <div className="profile-content-container">
        <form>
          <div className="content-container">
            {editableFields.name ? (
              <input
                name="name"
                value={formData?.name}
                onChange={(e) => handleChange('name', e.target.value)}
              />
            ) : (
              <span>Add Product Title &nbsp;</span>
            )}
            <span onClick={() => toggleEditableField('name')}>
              {editableFields.name ? (
                <MdOutlineClose fontSize={30} />
              ) : (
                <TbEdit fontSize={30} />
              )}
            </span>
            <div className="btn-align-center">
              <span onClick={() => handleSaveDraft(formData, TOKEN)}>
                Save as Draft
              </span>
              <div className="dropdown " style={{ width: '0px' }}>
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
                  <li onClick={() => handlePublish(formData, TOKEN)}>
                    Publish Now
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="content-padding-top">
            <div className="blog-product-grid-wrapper">
              <div id="blog-product-col-1">
                <div className="border-blog-product">
                  {/* <BlogEditor /> */}
                  <span id="green">Product Specification</span>
                  <span
                    style={{ float: 'right' }}
                    onClick={() => toggleEditableField('specification')}
                  >
                    {editableFields.specification ? (
                      <MdOutlineClose fontSize={24} />
                    ) : (
                      <TbEdit fontSize={24} />
                    )}
                  </span>
                  {editableFields.specification ? (
                    <>
                      <div
                        className="break-line"
                        style={{ margin: '15px 0px' }}
                      ></div>
                      <div className="dropdown-section">
                        <SizeTypeDropdown
                          options={optionsSizeType}
                          onSelect={handleOptionSelect}
                          formData={formData}
                          setFormData={setFormData}
                        />
                        <FlavourDropdown
                          options={optionsFlavour}
                          onSelect={handleOptionSelect}
                          formData={formData}
                          setFormData={setFormData}
                        />
                        <ColorDropdown
                          options={optionsColor}
                          onSelect={handleOptionSelect}
                          formData={formData}
                          setFormData={setFormData}
                        />
                        <PaperSizeDropdown
                          options={optionsPaper}
                          onSelect={handleOptionSelect}
                          formData={formData}
                          setFormData={setFormData}
                        />
                      </div>
                    </>
                  ) : null}
                  <div
                    className="break-line"
                    style={{ margin: '15px 0px' }}
                  ></div>
                  <div className="product-url">
                    <div>
                      <h5>Product URL</h5>
                      {editableFields.producturl ? (
                        <input
                          id="product-url"
                          value={formData.producturl}
                          onChange={(e) =>
                            handleChange('producturl', e.target.value)
                          }
                        />
                      ) : (
                        <h6>https://</h6>
                      )}
                    </div>
                    <span
                      style={{ float: 'right' }}
                      onClick={() => toggleEditableField('producturl')}
                    >
                      {editableFields.producturl ? (
                        <MdOutlineClose fontSize={24} />
                      ) : (
                        <TbEdit fontSize={24} />
                      )}
                    </span>
                  </div>
                  <div
                    className="break-line"
                    style={{ margin: '15px 0px' }}
                  ></div>
                  <div className="product-url">
                    <div>
                      <h5>Why Choose Us?</h5>
                    </div>
                    <span
                      style={{ float: 'right' }}
                      onClick={() => toggleEditableField('whyChooseus')}
                    >
                      {editableFields.whyChooseus ? (
                        <MdOutlineClose fontSize={24} />
                      ) : (
                        <TbEdit fontSize={24} />
                      )}
                    </span>
                  </div>
                  {editableFields.whyChooseus ? (
                    <WhyChooseEditer
                      whyChooseus={whyChooseus}
                      setWhyChooseus={setWhyChooseus}
                      setFormData={setFormData}
                      formData={formData}
                    />
                  ) : (
                    ''
                  )}
                  <div
                    className="break-line"
                    style={{ margin: '15px 0px' }}
                  ></div>
                  <div className="product-url">
                    <div>
                      <h5>Product Description</h5>
                    </div>
                    <span
                      style={{ float: 'right' }}
                      onClick={() => toggleEditableField('productDescription')}
                    >
                      {editableFields.productDescription ? (
                        <MdOutlineClose fontSize={24} />
                      ) : (
                        <TbEdit fontSize={24} />
                      )}
                    </span>
                  </div>
                  {editableFields.productDescription ? (
                    <ProductDescriptionEditer
                      setProductDescription={setProductDescription}
                      productDescription={productDescription}
                      setFormData={setFormData}
                      formData={formData}
                    />
                  ) : (
                    ''
                  )}
                  <div
                    className="break-line"
                    style={{ margin: '15px 0px' }}
                  ></div>
                  <div className="product-url">
                    <div>
                      <h5>Key Features</h5>
                    </div>
                    <span
                      style={{ float: 'right' }}
                      onClick={() => toggleEditableField('keyFetures')}
                    >
                      {editableFields.keyFetures ? (
                        <MdOutlineClose fontSize={24} />
                      ) : (
                        <TbEdit fontSize={24} />
                      )}
                    </span>
                  </div>
                  {editableFields.keyFetures ? (
                    <KeyFeaturesEditer
                      setKeyFetures={setKeyFetures}
                      keyFetures={keyFetures}
                      setFormData={setFormData}
                      formData={formData}
                    />
                  ) : (
                    ''
                  )}
                  <div
                    className="break-line"
                    style={{ margin: '15px 0px' }}
                  ></div>
                  <div className="product-url">
                    <div>
                      <h5>Meta Description</h5>
                    </div>
                    <span
                      style={{ float: 'right' }}
                      onClick={() => toggleEditableField('metaDescription')}
                    >
                      {editableFields.metaDescription ? (
                        <MdOutlineClose fontSize={24} />
                      ) : (
                        <TbEdit fontSize={24} />
                      )}
                    </span>
                  </div>
                  {editableFields.metaDescription ? (
                    <MetaDescriptionEditer
                      formData={formData}
                      setFormData={setFormData}
                      setMetaDescription={setMetaDescription}
                      metaDescription={metaDescription}
                    />
                  ) : (
                    ''
                  )}
                  <div
                    className="break-line"
                    style={{ margin: '15px 0px' }}
                  ></div>
                </div>
                <h5>SEO Customization</h5>
                <input
                  placeholder="Meta Title"
                  value={formData.metaTitle}
                  onChange={(e) => handleChange('metaTitle', e.target.value)}
                />
                {/* <textarea
                  style={{ height: '100px', marginTop: '30px' }}
                  placeholder="Meta Description"
                  value={formData.metaDescription}
                  onChange={(e) =>
                    handleChange('metaDescription', e.target.value)
                  }
                /> */}
                <br />
                <br />
                <h6>Custom URL</h6>
                <input
                  placeholder="URL Slug"
                  value={formData.customURL}
                  onChange={(e) => handleChange('customURL', e.target.value)}
                />
                {/* text editer */}
              </div>
              <div id="blog-product-col-2">
                <div className="change-pic" style={{ width: '100%' }}>
                  <div
                    style={{ maxWidth: '310px', width: '100%' }}
                    className="Picture"
                    onClick={() => setShowGallery(true)}
                  >
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
                            <h5
                              style={{
                                maxWidth: '180px',
                                textAlign: 'center',
                              }}
                            >
                              Add Product Images
                            </h5>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                  <br />
                  <br />
                  <div className="choose-category">
                    <h4>Product Tags</h4>
                    <div className="product-tag">
                      <ProductTagCheckBox
                        setFormData={setFormData}
                        formData={formData}
                        setProductTag={setProductTag}
                      />
                    </div>
                    <h6>Product Categories</h6>
                    <ProductCategoryDropdown
                      options={options}
                      onSelect={handleOptionSelect}
                      sub={'Select-Category'}
                      formData={formData}
                      setFormData={setFormData}
                    />
                    &nbsp;&nbsp;
                    <SubCustomDropdown
                      options={optionsSub}
                      onSelect={handleOptionSelect}
                      sub={'Select-Sub-Category'}
                      formData={formData}
                      setFormData={setFormData}
                    />
                    <h6>Meta Keywords</h6>
                    <input
                      placeholder="Meta Keywords"
                      style={{ height: '100px' }}
                      value={formData.metaKeywords}
                      onChange={(e) =>
                        handleChange('metaKeywords', e.target.value)
                      }
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
      {showGallery ? (
        <ProductGallery
          handleChange={handleChange}
          formData={formData}
          setShowGallery={setShowGallery}
          imageUrl={imageUrl}
          setImageUrl={setImageUrl}
          setFormData={setFormData}
        />
      ) : null}
      {showModal ? <CategoriesModal setShowModal={setShowModal} /> : null}
    </div>
  );
};

export default AddProduct;
