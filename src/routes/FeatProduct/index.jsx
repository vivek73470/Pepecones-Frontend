/** @format */

import React, { useState, useEffect, useReducer } from 'react';
import { useNavigate } from 'react-router-dom';
import { AiOutlineDelete, AiOutlineEye } from 'react-icons/ai';
import { HiPencil, HiOutlineSearch } from 'react-icons/hi';
import { TbEdit } from 'react-icons/tb';
import { BsFileArrowDown, BsSend } from 'react-icons/bs';
import {
  getFeatures,
  getFeaturesEdit,
  deleteFeatureProduct,
} from '../../Api/adminApi';
import { setFetching } from '../../redux/reducer/fetching';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import Dot from '../../assets/dot.svg';
import Pagination from '../../components/Pagination';
import { setEditFeature } from '../../redux/reducer/editFeature';
import PublisProducthModal from '../../components/PublishProductModal';
import UnPublishProductModal from '../../components/UnPublishProductModal';
import CategoryDropdown from '../../components/CategoryDropdown';
import { TOKEN, customNowrap, customWrap } from '../../constant';

const FeatProduct = () => {
  const [products, setProducts] = useState([]);
  const [countLength, setCountLength] = useState(null);
  const [showPublish, setShowPublish] = useState(null);
  const [publishId, setPublishId] = useState(null);
  const [modalType, setModalType] = useState(null);
  const [limit, setLimit] = useState(null);
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
  // const [editFeature, setEditFeature] = useState({});
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
    fetchData(TOKEN);
  }, []);

  const fetchData = async () => {
    const token = localStorage.getItem('auth_token');
    dispatch(setFetching(true));
    try {
      let response = await getFeatures(token);
      if (response.status === 200) {
        // console.log(response.data?.length);
        setLimit(response.data?.length);
        setDisplayedProduct(response.data);
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
      let response = await getFeaturesEdit(id, token);
      if (response.status === 200) {
        console.warn(response);
        dispatch(setEditFeature(response.data));
        navigate('/edit-add');
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
      let response = await deleteFeatureProduct(id, token);
      if (response.status === 204) {
        toast.success('Feature Delete Successfully!');
        fetchData();
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

  console.warn(limit);
  const AddNew = (limit) => {
    if (limit < 2) {
      navigate('/new-add');
    } else {
      toast.warn('Limit Exceed Pls Delete any Ad!');
    }
  };
  return (
    <>
      <div className="justifyBetween">
        <h5 className="customHeading">Product List</h5>
      </div>
      <div className="product-list-container margin_top">
        <div className="main-heading main-head">
          <div className="tab-navigate displayNone"></div>
          <div className="add-product-button">
            <button onClick={() => AddNew(limit)}>+ Add New AD</button>
          </div>
        </div>
        <div className="break-line"></div>
        <div className="blog-grid-wrapper">
          {displayedProduct?.length > 0
            ? displayedProduct?.slice(0, 2).map((product, index) => (
                <div
                  className="blog-grid-col"
                  key={index}
                  style={{ marginRight: '0px' }}
                >
                  <div className="product-card">
                    <img
                      src={product?.Image}
                      alt={product?.alttag || 'Product Image'}
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
                            onClick={() => handleEdit(product._id, TOKEN)}
                            className="dropdown-item drop-item"
                            style={{ fontSize: '20px' }}
                          >
                            <TbEdit fontSize={22} />
                            &nbsp; &nbsp;Edit
                          </span>
                        </li>
                        {/* <li>
                          <span
                            onClick={() => handleDelete(product._id)}
                            className="dropdown-item drop-item"
                            style={{ fontSize: '20px' }}
                          >
                            <AiOutlineDelete fontSize={22} />
                            &nbsp; &nbsp;Make First
                          </span>
                        </li> */}
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
                    <div
                      className="product-price"
                      style={{ height: 'fit-content' }}
                    >
                      <div
                        className="prod-description"
                        style={{ maxWidth: 'fit-content' }}
                      >
                        <h4 style={customWrap}>
                          {product?.adTitle || 'Product Name'}
                        </h4>

                        <div className="product-description">
                          {product?.Discription || 'Product Name'}&nbsp;
                          <span>See More...</span>
                          <p className="tooltiptext">
                            {product?.Discription
                              ? product?.Discription
                              : 'Lorem ipsum dolor sit amet consectetur. Vestibulumenim metus nunc sagittis ut.'}
                          </p>
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() =>
                        window.open(product?.redirectionalURL, '_blank')
                      }
                    >
                      {product?.adCTA || 'AD CTA'}
                    </button>
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

export default FeatProduct;
