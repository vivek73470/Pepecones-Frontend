/** @format */

import React, { useState, useEffect, useReducer } from 'react';
import './index.css';
import { AiOutlineDelete, AiOutlineEye, AiOutlineStop } from 'react-icons/ai';
import { TbEdit } from 'react-icons/tb';
import { BsFileArrowDown, BsSend } from 'react-icons/bs';
import { MdOutlineFeaturedPlayList } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import {
  getAllBlogs,
  addBlogs,
  getDraftBlog,
  getPublishBlog,
  getCategory,
  getFeatureBlog,
  getSelectCategory,
  deleteBlogs,
  editBlogs,
  unPublishBlogs,
  categoryWiseBlogs,
} from '../../Api/adminApi';
import {
  getAllProductForUser,
  searchProduct,
  viewBlogs,
} from '../../Api/userApi';
import { setFetching } from '../../redux/reducer/fetching';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import BlogImg from '../../assets/pepecons/Blog Image.png';
import Dot from '../../assets/dot.svg';
import Pagination from '../../components/Pagination';
import jwtDecode from 'jwt-decode';
import { SINGLE_BLOG_KEY, TOKEN, customFontStyle } from '../../constant';
import BlogEditor from '../../components/BlogEditor';
import CategoryDropdown from '../../components/CategoryDropdown';
import UnPublishModal from '../../components/UnPublishModal';
import HtmlTagRemove from '../../components/HtmlTagRemove';
import { setEditBlog } from '../../redux/reducer/editBlog';
import PublishModal from '../../components/PublishModal';
import UnFeatureModal from '../../components/UnFeatureModal';
import FeatureModal from '../../components/FeatureModal';
import MaxFeatureModal from '../../components/MaxFeatureModal';
import { setBlogdata } from '../../redux/reducer/blogData';

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [publishId, setPublishId] = useState(null);
  const [selectAll, setSelectAll] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showPublish, setShowPublish] = useState(null);
  const [modalType, setModalType] = useState(null);
  const [routes, setRoutes] = useState(false);
  const [editProductId, setEditProductId] = useState('');
  const [product, setProduct] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [imageUrl, setImageUrl] = useState('');
  const [imageResponse, setImageResponse] = useState('');
  const [userId, setUserId] = useState(null);
  const [text, setText] = useState('');
  const [selectedAction, setSelectedAction] = useState('publish'); // default to show all blogs
  const [displayedBlogs, setDisplayedBlogs] = useState([]);

  const [options, setOptions] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: '',
    price: '',
    rating: '',
    productimage: '',
    description: '',
  });
  const [editProduct, setEditProduct] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      name: '',
      price: '',
      rating: '',
      productimage: '',
      description: '',
    },
  );
  const [selectedOption, setSelectedOption] = useState(null);
  // console.warn(selectedOption?.blogcategoryName);

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  const itemsPerPage = 8;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleEdit = async (id) => {
    dispatch(setFetching(true));
    const token = localStorage.getItem('auth_token');
    try {
      let response = await editBlogs(id, token);
      if (response.status === 200) {
        console.warn(response);
        dispatch(setEditBlog(response.data));
        navigate('/edit-blog');
        dispatch(setFetching(false));
      }
    } catch (error) {
      dispatch(setFetching(false));
    }
  };

  const handleDelete = async (id, currentPage) => {
    dispatch(setFetching(true));
    const token = localStorage.getItem('auth_token');
    try {
      let response = await deleteBlogs(id, token);
      if (response.status === 200) {
        toast.success('Blog Deleted Successfully!');
        fetchData(currentPage, token);
        dispatch(setFetching(false));
      }
    } catch (error) {
      console.log(error);
      toast.error('Blog Deleted Successfully!');
      dispatch(setFetching(false));
    }
  };

  useEffect(() => {
    document.title = 'Blogs';
    fetchData(currentPage, TOKEN);
    fetchOptions(TOKEN);
  }, [currentPage, selectedAction, selectedOption]);

  const fetchData = async (currentPage, TOKEN) => {
    dispatch(setFetching(true));
    try {
      let response;
      const token = localStorage.getItem('auth_token'); // Define token here
      if (selectedAction === 'publish') {
        response = await getPublishBlog(currentPage, TOKEN);
      } else if (selectedAction === 'draft') {
        response = await getDraftBlog(currentPage, TOKEN);
      } else if (selectedAction === 'feature') {
        response = await getFeatureBlog(currentPage, TOKEN);
      } else if (selectedAction === 'category') {
        response = await getSelectCategory(
          currentPage,
          selectedOption?.blogcategoryName,
          TOKEN,
        );
      } else {
        // Default case (e.g., fetch published blogs)
        response = await getPublishBlog(currentPage, token);
      }

      if (response.status === 200) {
        console.warn(response);
        setDisplayedBlogs(response?.data.blog || response.data);
        setTotalPages(response?.data.totalPages); // Update totalPages
      } else {
        setDisplayedBlogs([]);
        setTotalPages(1); // Reset totalPages to 1 if there's an issue
      }
    } catch (error) {
      console.error(error);
    } finally {
      dispatch(setFetching(false));
    }
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

  const showModal = (type, id) => {
    setPublishId(id); // Set the id for the modal if needed
    setModalType(type);
    setShowPublish(true);
  };

  const handleCloseModal = () => {
    setModalType(null); // Set it to null or any other appropriate value
    setShowPublish(false);
  };

  const renderModals = () => {
    switch (modalType) {
      case 'publish':
        return (
          <PublishModal
            setShowPublish={setShowPublish}
            publishId={publishId}
            setFetching={setFetching}
            dispatch={dispatch}
            fetchData={fetchData}
            handleCloseModal={handleCloseModal}
          />
        );
      case 'unpublish':
        return (
          <UnPublishModal
            setShowPublish={setShowPublish}
            publishId={publishId}
            setFetching={setFetching}
            dispatch={dispatch}
            fetchData={fetchData}
            handleCloseModal={handleCloseModal}
          />
        );
      case 'unfeature':
        return (
          <UnFeatureModal
            setShowPublish={setShowPublish}
            publishId={publishId}
            setFetching={setFetching}
            dispatch={dispatch}
            fetchData={fetchData}
            handleCloseModal={handleCloseModal}
          />
        );
      case 'feature':
        return (
          <FeatureModal
            setShowPublish={setShowPublish}
            publishId={publishId}
            setFetching={setFetching}
            dispatch={dispatch}
            fetchData={fetchData}
            handleCloseModal={handleCloseModal}
            setShowAlert={setShowAlert}
          />
        );
      default:
        return null;
    }
  };
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handlePageClick = (page) => {
    setCurrentPage(page);
  };

  const pageNumbers = Array.from(
    { length: totalPages },
    (_, index) => index + 1,
  );
  const customDropdown = {
    maxWidth: '260px',
  };
  const customDropdownBtn = {
    border: 'none',
  };
  const customDropdownBorder = {
    boxShadow: 'var(--box-shadow-color)',
  };

  const handleViewDetails = async (id, customUrl) => {
    console.log(id, customUrl);
    dispatch(setFetching(true));
    try {
      let response = await viewBlogs(id);
      if (response.status === 200) {
        console.warn(response);
        dispatch(setBlogdata(response.data._id));
        localStorage.setItem(
          SINGLE_BLOG_KEY,
          JSON.stringify(response.data._id),
        );
        const newTab = window.open(`/blogdetails/${customUrl}`, '_blank');
        if (newTab) {
          setTimeout(() => {
            dispatch(setFetching(false));
          }, 0); // Delay the closing of the loading overlay
        } else {
          console.log('Popup blocked by the browser');
          dispatch(setFetching(false));
        }
      }
    } catch (error) {
      dispatch(setFetching(false));
    }
  };

  return (
    <>
      <div className="justifyBetween">
        <h5 className="customHeading">Blogs</h5>
      </div>
      <div className="product-list-container margin_top">
        <div className="main-heading">
          <div className="tab-navigate">
            <span
              className={`${selectedAction === 'publish' ? 'btn-active' : ''}`}
              onClick={() => setSelectedAction('publish')}
            >
              Published
              {selectedAction === 'publish' ? `(${displayedBlogs.length})` : ''}
            </span>
            <span
              className={`${selectedAction === 'draft' ? 'btn-active' : ''}`}
              onClick={() => setSelectedAction('draft')}
            >
              Draft
              {selectedAction === 'draft' ? `(${displayedBlogs.length})` : ''}
            </span>
            <span
              className={`${selectedAction === 'feature' ? 'btn-active' : ''}`}
              onClick={() => setSelectedAction('feature')}
            >
              Featured
              {selectedAction === 'feature'
                ? `(${displayedBlogs?.length > 0 ? displayedBlogs.length : 0})`
                : ''}
            </span>
            <CategoryDropdown
              customDropdownBorder={customDropdownBorder}
              customDropdown={customDropdown}
              customDropdownBtn={customDropdownBtn}
              options={options}
              onSelect={handleOptionSelect}
              setDisplayedBlogs={setDisplayedBlogs}
              displayedBlogs={displayedBlogs}
              setSelectedAction={setSelectedAction}
            />
          </div>
          <div className="add-product-button">
            <button onClick={() => navigate('/add-blog')}>+ Add blogs</button>
          </div>
        </div>
        <div className="break-line"></div>
        <div className="blog-grid-wrapper">
          {displayedBlogs?.length > 0
            ? displayedBlogs?.map((blog, index) => (
                <div className="blog-grid-col" key={index}>
                  <div className="blog-card">
                    <img src={blog.featuredImage} />
                    <span id="adventure">{blog.category}</span>
                    <span
                      type="button"
                      id="dropdownMenuButton1"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <div className="o-shape"></div>
                      <img className="o-dot" src={Dot} />
                    </span>
                    <div className="dropdown action-dropdown">
                      <ul
                        className={`${'dropdown-menu drop-body'}`}
                        aria-labelledby="dropdownMenuButton1"
                      >
                        {selectedAction === 'feature' ? (
                          <li>
                            <span
                              onClick={() => showModal('unfeature', blog._id)}
                              className="dropdown-item drop-item"
                              style={{ fontSize: '19px' }}
                            >
                              <AiOutlineStop fontSize={22} />
                              &nbsp; &nbsp;UnFeature
                            </span>
                          </li>
                        ) : (
                          <>
                            <li>
                              <span
                                onClick={() =>
                                  handleViewDetails(blog._id, blog.customUrl)
                                }
                                className="dropdown-item  drop-item"
                                style={{ fontSize: '19px' }}
                              >
                                <AiOutlineEye fontSize={22} />
                                &nbsp; &nbsp;View
                              </span>
                            </li>
                            <li>
                              <span
                                onClick={() => handleEdit(blog._id)}
                                className="dropdown-item drop-item"
                                style={{ fontSize: '19px' }}
                              >
                                <TbEdit fontSize={22} />
                                &nbsp; &nbsp;Edit
                              </span>
                            </li>
                            {selectedAction === 'draft' ? (
                              <li>
                                <span
                                  onClick={() => showModal('publish', blog._id)}
                                  className="dropdown-item drop-item"
                                  style={{ fontSize: '19px' }}
                                >
                                  <BsSend fontSize={22} />
                                  &nbsp; &nbsp;Publish
                                </span>
                              </li>
                            ) : (
                              <li>
                                <span
                                  onClick={() =>
                                    showModal('unpublish', blog._id)
                                  }
                                  className="dropdown-item drop-item"
                                  style={{ fontSize: '19px' }}
                                >
                                  <BsFileArrowDown fontSize={22} />
                                  &nbsp; &nbsp;Unpublish
                                </span>
                              </li>
                            )}
                            <li>
                              <span
                                onClick={() =>
                                  handleDelete(blog._id, currentPage)
                                }
                                className="dropdown-item drop-item"
                                style={{ fontSize: '19px' }}
                              >
                                <AiOutlineDelete fontSize={22} />
                                &nbsp; &nbsp;Delete
                              </span>
                            </li>
                            <li>
                              <span
                                onClick={() => showModal('feature', blog._id)}
                                className="dropdown-item drop-item"
                                style={{ fontSize: '19px' }}
                              >
                                <MdOutlineFeaturedPlayList fontSize={22} />
                                &nbsp; &nbsp;Feature
                              </span>
                            </li>
                          </>
                        )}
                      </ul>
                    </div>
                    <h5 style={customFontStyle}>
                      {blog?.createdAt != null
                        ? blog.createdAt.toString().slice(0, 10)
                        : null}
                    </h5>
                    <h4 style={{ fontFamily: 'unset' }}>{blog.title}</h4>
                    <p style={{ fontFamily: 'unset' }}>
                      {blog?.content ? (
                        <HtmlTagRemove content={blog?.content} />
                      ) : (
                        `Progressively incentivize cooperative systems through
                      technically sound functionalities. Credibly seamless data
                      with flexible schemas.`
                      )}
                    </p>
                  </div>
                </div>
              ))
            : null}
          <Pagination
            routes={routes}
            currentPage={currentPage}
            totalPages={totalPages}
            handlePrevPage={handlePrevPage}
            handleNextPage={handleNextPage}
            handlePageClick={handlePageClick}
            pageNumbers={pageNumbers}
          />
        </div>
      </div>

      {showAlert ? <MaxFeatureModal setShowAlert={setShowAlert} /> : null}
      {/* {showPublish ? (
        <UnPublishModal
          setShowPublish={setShowPublish}
          publishId={publishId}
          setFetching={setFetching}
          dispatch={dispatch}
          fetchData={fetchData}
        />
      ) : null}
      {showPublish ? (
        <PublishModal
          setShowPublish={setShowPublish}
          publishId={publishId}
          setFetching={setFetching}
          dispatch={dispatch}
          fetchData={fetchData}
        />
      ) : null}
      {showPublish ? (
        <UnFeatureModal
          setShowPublish={setShowPublish}
          publishId={publishId}
          setFetching={setFetching}
          dispatch={dispatch}
          fetchData={fetchData}
        />
      ) : null}
      {showEditModal ? (
        <EditProductModal
          blogs={blogs}
          editProductId={editProductId}
          editProduct={editProduct}
          setEditProduct={setEditProduct}
          setShowEditModal={setShowEditModal}
          setImageUrl={setImageUrl}
          imageUrl={imageUrl}
          setImageResponse={setImageResponse}
          imageResponse={imageResponse}
          currentPage={currentPage}
        />
      ) : (
        ''
      )} */}
      {renderModals()}
    </>
  );
};

export default Blogs;
