/** @format */

import React, { useState, useEffect, useReducer } from 'react';
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
  updateProduct,
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
import EditCategoryDropdown from '../../components/EditCategoryDropdown';
import EditSubCustomDropdown from '../../components/EditSubCustomDropdown';
import EditProductTagCheckBox from '../../components/EditProductTagCheckBox';
import EditMetaDescriptionEditer from '../../components/EditMetaDescriptionEditer';
import EditSizeTypeDropdown from '../../components/EditSizeTypeDropdown';
import EditProductGallery from '../../components/EditProductGallery';
import { TOKEN } from '../../constant';

const EditProduct = () => {
  const productEdit = useSelector((state) => state.editProduct.product);

  const [vendorInfo, setVendorInfo] = useState({});
  const [showInput, setShowInput] = useState(false);
  const [showModal, setShowModal] = useState(false);

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
  const [selectedValue, setSelectedValue] = useState('');
  const [metaDescription, setMetaDescription] = useState('');
  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  const [formData, setFormData] = useState(productEdit || {});
  const [selectedImage, setSelectedImage] = useState(
    productEdit?.selectedImage || null,
  );

  const [editableFields, setEditableFields] = useState({
    name: false,
    specification: false,
    producturl: false,
    whyChooseus: false,
    productDescription: false,
    keyFetures: false,
  });
  const [imageArray, setImageArray] = useState(formData?.imageUrls || {});
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

  const handleUpdate = async (e, formData, TOKEN) => {
    e.preventDefault();
    const token = localStorage.getItem('auth_token');
    // console.warn(formData);
    const productId = productEdit._id;
    dispatch(setFetching(true));

    try {
      const response = await updateProduct(productId, formData, token);
      if (response.status === 200) {
        toast.success('Product Update Successfully');
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
  // console.warn(imageArray);
  // console.warn(formData?.imageUrls);
  // console.warn(productEdit);
  return (
    <div className="profile-box">
      <div className="profile-content-container">
        <form>
          <div className="content-container heightAdjust">
            {editableFields.name ? (
              <input
                name="name"
                defaultValue={formData?.name || productEdit?.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
            ) : (
              <span id="edit-product">{productEdit?.name} &nbsp;</span>
            )}
            <span onClick={() => toggleEditableField('name')}>
              {editableFields.name ? (
                <MdOutlineClose fontSize={30} />
              ) : (
                <TbEdit fontSize={30} />
              )}
            </span>
            <div className="content-container">
              <button
                onClick={(e) => handleUpdate(e, formData, TOKEN)}
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
                        <EditSizeTypeDropdown
                          options={optionsSizeType}
                          onSelect={handleOptionSelect}
                          formData={formData}
                          setFormData={setFormData}
                          productEdit={productEdit}
                        />
                        <FlavourDropdown
                          options={optionsFlavour}
                          onSelect={handleOptionSelect}
                          formData={formData}
                          setFormData={setFormData}
                          productEdit={productEdit}
                        />
                        <ColorDropdown
                          options={optionsColor}
                          onSelect={handleOptionSelect}
                          formData={formData}
                          setFormData={setFormData}
                          productEdit={productEdit}
                        />
                        <PaperSizeDropdown
                          options={optionsPaper}
                          onSelect={handleOptionSelect}
                          formData={formData}
                          setFormData={setFormData}
                          productEdit={productEdit}
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
                          defaultValue={
                            formData.producturl || productEdit?.producturl
                          }
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              producturl: e.target.value,
                            })
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
                      productEdit={productEdit}
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
                      productEdit={productEdit}
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
                      productEdit={productEdit}
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
                    <EditMetaDescriptionEditer
                      setMetaDescription={setMetaDescription}
                      metaDescription={metaDescription}
                      setFormData={setFormData}
                      formData={formData}
                      productEdit={productEdit}
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
                  defaultValue={
                    formData?.metaTitle || productEdit?.metaTitle || null
                  }
                  onChange={(e) =>
                    setFormData({ ...formData, metaTitle: e.target.value })
                  }
                />
                <br />
                <br />
                <h6>Meta Keywords</h6>
                <input
                  placeholder="Meta Keywords"
                  style={{ height: '100px' }}
                  defaultValue={
                    formData?.metaKeywords || productEdit?.metaKeywords
                  }
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      metaKeywords: e.target.value,
                    })
                  }
                />
                <br />
                <br />
                <h6>Custom URL</h6>
                <input
                  placeholder="URL Slug"
                  defaultValue={formData?.customURL || productEdit?.customURL}
                  onChange={(e) =>
                    setFormData({ ...formData, customURL: e.target.value })
                  }
                />
                {/* <input
                  style={{ height: '100px', marginTop: '30px' }}
                  placeholder="Meta Description"
                  defaultValue={
                    formData?.metaDescription || productEdit?.metaDescription
                  }
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      metaDescription: e.target.value,
                    })
                  }
                /> */}
              </div>
              <div id="blog-product-col-2">
                <div className="change-pic" style={{ width: '100%' }}>
                  <div
                    style={{ maxWidth: '310px' }}
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
                              formData[0]?.profileImage
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
                  <Caraousal
                    setShowGallery={setShowGallery}
                    productEdit={productEdit}
                    formData={formData}
                    setFormData={setFormData}
                    setImageArray={setImageArray}
                    imageArray={imageArray}
                  />
                  <br />
                  <div className="choose-category">
                    <h4>Product Tags</h4>
                    <div className="product-tag">
                      <EditProductTagCheckBox
                        setFormData={setFormData}
                        formData={formData}
                        setProductTag={setProductTag}
                        productEdit={productEdit}
                      />
                    </div>
                    <h6>Product Categories</h6>
                    <EditCategoryDropdown
                      options={options}
                      onSelect={handleOptionSelect}
                      sub={'Select-Category'}
                      formData={formData}
                      setFormData={setFormData}
                      productEdit={productEdit}
                    />
                    &nbsp;&nbsp;
                    <EditSubCustomDropdown
                      options={optionsSub}
                      onSelect={handleOptionSelect}
                      sub={'Select-Sub-Category'}
                      formData={formData}
                      setFormData={setFormData}
                      productEdit={productEdit}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
      {showGallery ? (
        <EditProductGallery
          handleChange={handleChange}
          formData={formData}
          setShowGallery={setShowGallery}
          imageUrl={imageUrl}
          setImageUrl={setImageUrl}
          setFormData={setFormData}
          setImageArray={setImageArray}
          imageArray={imageArray}
        />
      ) : null}
      {showModal ? <CategoriesModal setShowModal={setShowModal} /> : null}
    </div>
  );
};

export default EditProduct;
