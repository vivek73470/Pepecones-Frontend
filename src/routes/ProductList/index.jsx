/** @format */

import React, { useState, useEffect, useReducer } from 'react';
import { useNavigate } from 'react-router-dom';
import './index.css';
import { AiOutlineDelete, AiOutlineEye } from 'react-icons/ai';
import { HiPencil, HiOutlineSearch } from 'react-icons/hi';
import { TbEdit } from 'react-icons/tb';
import { BsFileArrowDown, BsSend } from 'react-icons/bs';
import {
  getAllProducts,
  addProducts,
  editProducts,
  deleteProducts,
  getDraftProduct,
  getPublishProduct,
  totalProduct,
  totalProductPublished,
  totalProductDraft,
} from '../../Api/adminApi';
import { setFetching } from '../../redux/reducer/fetching';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import Dot from '../../assets/dot.svg';
import Pagination from '../../components/Pagination';
import { setEditProducts } from '../../redux/reducer/editProduct';
import PublisProducthModal from '../../components/PublishProductModal';
import UnPublishProductModal from '../../components/UnPublishProductModal';
import {
  SINGLE_PRODUCT_KEY,
  TOKEN,
  customNowrap,
  customNowraph4,
} from '../../constant';
import { viewProducts } from '../../Api/userApi';
import { setProductdata } from '../../redux/reducer/productData';
const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [countLength, setCountLength] = useState(null);
  const [showPublish, setShowPublish] = useState(null);
  const [publishId, setPublishId] = useState(null);
  const [modalType, setModalType] = useState(null);
  const [select, setSelect] = useState(false);
  const [routes, setRoutes] = useState(false);
  const [editProductId, setEditProductId] = useState('');
  const [product, setProduct] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [imageUrl, setImageUrl] = useState('');
  const [imageResponse, setImageResponse] = useState('');
  const [userId, setUserId] = useState(null);
  const [selectedAction, setSelectedAction] = useState('publish');
  const [displayedProduct, setDisplayedProduct] = useState([]);
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
  const itemsPerPage = 9;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    document.title = 'Product List';
    fetchData(currentPage, TOKEN);
  }, [currentPage, selectedAction]);

  const fetchData = async (currentPage, TOKEN) => {
    dispatch(setFetching(true));
    try {
      let response, countResponse, countPublished, countDraft;
      const token = localStorage.getItem('auth_token');
      if (selectedAction === 'publish') {
        response = await getPublishProduct(currentPage, token);
        countPublished = await totalProductPublished(token);
      } else if (selectedAction === 'draft') {
        response = await getDraftProduct(currentPage, token);
        countDraft = await totalProductDraft(token);
      } else if (selectedAction === 'all') {
        response = await getAllProducts(currentPage, token);
        countResponse = await totalProduct(token);
      } else {
        response = await getAllProducts(currentPage, token);
        response = await totalProduct(token);
      }

      if (response.status === 200) {
        console.log(response);
        setDisplayedProduct(response.data.product);
        setTotalPages(response?.data.totalPages);
      } else {
        setDisplayedProduct([]);
        setTotalPages(1); // Reset totalPages to 1 if there's an issue
      }
      if (countResponse?.status === 200) {
        console.log(countResponse?.data.count);
        setCountLength(countResponse?.data.count);
      }
      if (countPublished?.status === 200) {
        console.log(countPublished);
        setCountLength(countPublished?.data.count);
      }
      if (countDraft?.status === 200) {
        console.log(countDraft);
        setCountLength(countDraft?.data.count);
      }
    } catch (error) {
      console.error(error);
    } finally {
      dispatch(setFetching(false));
    }
  };

  // Pagination
  const lastIndex = currentPage * itemsPerPage;
  const firstIndex = lastIndex - itemsPerPage;
  const currentData = products?.slice(firstIndex, lastIndex) || [];

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleEdit = async (id, TOKEN) => {
    dispatch(setFetching(true));
    const token = localStorage.getItem('auth_token');
    try {
      let response = await editProducts(id, token);
      if (response.status === 200) {
        console.warn(response);
        dispatch(setEditProducts(response.data));
        navigate('/edit-product');
        dispatch(setFetching(false));
      }
    } catch (error) {
      dispatch(setFetching(false));
    }
  };

  const handleDelete = async (id, TOKEN) => {
    dispatch(setFetching(true));
    const token = localStorage.getItem('auth_token');
    try {
      let response = await deleteProducts(id, token);
      if (response.status === 200) {
        fetchData(TOKEN);
        dispatch(setFetching(false));
      }
    } catch (error) {
      dispatch(setFetching(false));
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
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
          <PublisProducthModal
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
          <UnPublishProductModal
            setShowPublish={setShowPublish}
            publishId={publishId}
            setFetching={setFetching}
            dispatch={dispatch}
            fetchData={fetchData}
            handleCloseModal={handleCloseModal}
          />
        );
      default:
        return null;
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
  console.warn(imageUrl);
  const maintoken = localStorage.getItem('auth_token');
  const role = maintoken.charAt(maintoken.length - 1);
  const token = maintoken.slice(0, -1);

  const handleViewDetails = async (id, url) => {
    console.log(id);
    dispatch(setFetching(true));
    try {
      let response = await viewProducts(id);
      if (response.status === 200) {
        console.warn(response);
        dispatch(setProductdata(response.data._id));
        localStorage.setItem(
          SINGLE_PRODUCT_KEY,
          JSON.stringify(response.data._id),
        );
        const newTab = window.open(`/singleProduct/${url}`, '_blank');

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

  console.warn(countLength);
  return (
    <>
      <div className="justifyBetween">
        <h5 className="customHeading">Product List</h5>
      </div>
      <div className="product-list-container margin_top">
        <div className="main-heading">
          <div className="tab-navigate">
            <span
              className={`${selectedAction === 'all' ? 'btn-active' : ''}`}
              onClick={() => setSelectedAction('all')}
            >
              All
              {selectedAction === 'all' ? `(${countLength || 0})` : ''}
            </span>
            <span
              className={`${selectedAction === 'publish' ? 'btn-active' : ''}`}
              onClick={() => setSelectedAction('publish')}
            >
              Published
              {selectedAction === 'publish' ? `(${countLength || 0})` : ''}
            </span>
            <span
              className={`${selectedAction === 'draft' ? 'btn-active' : ''}`}
              onClick={() => setSelectedAction('draft')}
            >
              Draft
              {selectedAction === 'draft' ? `(${countLength || 0})` : ''}
            </span>
          </div>

          <div className="add-product-button">
            <button onClick={() => navigate('/add-product')}>
              + Add Products
            </button>
          </div>
        </div>
        <div className="break-line"></div>
        <div className="blog-grid-wrapper">
          {displayedProduct?.length > 0
            ? displayedProduct?.map((product, index) => (
                <div
                  className="blog-grid-col"
                  key={index}
                  style={{ marginRight: '0px' }}
                >
                  <div className="product-card">
                    <img
                      src={
                        product && product.imageUrls && product.imageUrls[0]
                          ? product.imageUrls[0].imageUrl
                          : null
                      }
                    />
                    <span
                      type="button"
                      id="dropdownMenuButton1"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <div className="o-shape-product"></div>
                      <img className="o-dot-product" src={Dot} />
                    </span>
                    <div className="dropdown action-dropdown">
                      <ul
                        className={`${'dropdown-menu drop-body'}`}
                        aria-labelledby="dropdownMenuButton1"
                      >
                        <li>
                          <span
                            onClick={() =>
                              handleViewDetails(product._id, product.customURL)
                            }
                            className="dropdown-item  drop-item"
                            style={{ fontSize: '20px' }}
                          >
                            <AiOutlineEye fontSize={22} />
                            &nbsp; &nbsp;View
                          </span>
                        </li>
                        <li>
                          <span
                            onClick={() => handleEdit(product._id, TOKEN)}
                            className="dropdown-item drop-item"
                            style={{ fontSize: '20px' }}
                          >
                            <TbEdit fontSize={22} />
                            &nbsp; &nbsp;Edit
                          </span>
                        </li>
                        {selectedAction === 'draft' ? (
                          <li>
                            <span
                              onClick={() => showModal('publish', product._id)}
                              className="dropdown-item drop-item"
                              style={{ fontSize: '20px' }}
                            >
                              <BsSend fontSize={22} />
                              &nbsp; &nbsp;Publish
                            </span>
                          </li>
                        ) : null}
                        {selectedAction === 'publish' ? (
                          <li>
                            <span
                              onClick={() =>
                                showModal('unpublish', product._id)
                              }
                              className="dropdown-item drop-item"
                              style={{ fontSize: '20px' }}
                            >
                              <BsFileArrowDown fontSize={22} />
                              &nbsp; &nbsp;UnPublish
                            </span>
                          </li>
                        ) : null}
                        <li>
                          <span
                            onClick={() => handleDelete(product._id, TOKEN)}
                            className="dropdown-item drop-item"
                            style={{ fontSize: '20px' }}
                          >
                            <AiOutlineDelete fontSize={22} />
                            &nbsp; &nbsp;Delete
                          </span>
                        </li>
                      </ul>
                    </div>
                    <div className="product-price">
                      <div className="prod-description">
                        <div className="prod-h1">
                          <p style={customNowraph4}>
                            {product?.name || 'Product Name'}
                          </p>
                          {/* <div
                          className="product-description"
                          style={customNowrap}
                        > */}
                          {/* {product?.name || 'Product Name'}&nbsp; */}
                          {/* <span>See More...</span> */}
                          <p className="tooltiptext">
                            {product?.name
                              ? product?.name
                              : 'Lorem ipsum dolor sit amet consectetur. Vestibulumenim metus nunc sagittis ut.'}
                          </p>
                        </div>
                        {/* </div> */}
                        <p>
                          <span>{product?.productCategories}</span>
                          &nbsp;|&nbsp;
                          <span>
                            {`${product?.sizetype.split(' ')[0]} ${
                              product?.sizetype.split(' ')[1]
                            }` || 'Size'}
                          </span>
                        </p>
                      </div>
                      <button
                        onClick={() =>
                          handleViewDetails(product._id, product.customURL)
                        }
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              ))
            : null}
        </div>
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
      {renderModals()}
    </>
  );
};

export default ProductList;
