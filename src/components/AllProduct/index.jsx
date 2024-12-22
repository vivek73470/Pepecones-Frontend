/** @format */

import React, { useEffect, useState } from 'react';
import './index.css';
import sideimge from '../../assets/User/sideimg.jpg';
import {
  getAllProductPublished,
  viewProducts,
  getAdds,
  getPublishedProductCount,
  searchProducts,
  filterProducts,
  reverseProducts,
} from '../../Api/userApi';
import Pagination from '../../components/Pagination';
import { Link } from 'react-router-dom';
import HomeHeader from '../../components/homeHeader/Header';
import { Footer } from '../../components/Footer/Index';
import { setFetching } from '../../redux/reducer/fetching';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setProductdata } from '../../redux/reducer/productData';
import UserPagination from '../UserPagination';
import { SINGLE_PRODUCT_KEY } from '../../constant';
function AllProducts() {
  const [data, setData] = useState([]);
  const [count, setCount] = useState(null);
  const [adds, setAdds] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [add, setAdd] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [productName, setProductName] = useState('');
  const [selectedValue, setSelectedValue] = useState('Newest');
  const itemsPerPage = 8;

  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    fetchData(currentPage);
    fetchAdds();
    fetchPublishProductCount();
  }, [currentPage]);

  const fetchData = async (currentPage) => {
    try {
      const response = await getAllProductPublished(currentPage);
      if (response.status === 200) {
        console.log(response);
        setData(response.data.product);
        setTotalPages(response.data.totalPages);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const fetchPublishProductCount = async () => {
    try {
      const response = await getPublishedProductCount();
      if (response.status === 200) {
        console.log(response.data.count);
        setCount(response.data.count || {});
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const fetchAdds = async () => {
    try {
      const response = await getAdds();
      if (response.status === 200) {
        console.log(response);
        setAdds(response.data);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const fetchProduct = async (id, url) => {
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
        setTimeout(() => {
          navigate(`/singleProduct/${url}`);
          dispatch(setFetching(false));
        }, 0); // Delay the navigation to ensure loading overlay is still visible
      }
    } catch (error) {
      dispatch(setFetching(false));
    }
  };

  const searchProduct = async (productName) => {
    console.log(productName);
    dispatch(setFetching(true));
    try {
      let response = await searchProducts(productName);
      if (response.status === 200) {
        console.warn(response);
        setData(response.data.product);
        // dispatch(setProductdata(response.data.product));
        // navigate(/singleProduct/${url});
        dispatch(setFetching(false));
      }
    } catch (error) {
      dispatch(setFetching(false));
    }
  };

  const handleChange = (e) => {
    const newValue = e.target.value;
    setSelectedValue(newValue);
    filterProduct(newValue);
  };
  const filterProduct = async (productName) => {
    console.log(productName);
    // if (productName === 'Newest') {
    //   console.log(productName);
    // }
    dispatch(setFetching(true));
    try {
      if (productName === 'Newest') {
        let response = await reverseProducts();
        if (response.status === 200) {
          console.warn(response);
          setData(response.data.product);
          dispatch(setFetching(false));
        }
      } else {
        let response = await filterProducts(productName);
        if (response.status === 200) {
          console.warn(response);
          setData(response.data.product);
          dispatch(setFetching(false));
        }
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

  const customStyleForPagination = {
    position: 'relative',
    marginLeft: '45px',
  };

  const customNowrap = {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    width: '230px',
    maxWidth: 'fit-content',
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  return (
    <>
      <div className="p2-productp2-container">
        <div className="p2-p2-section2">
          <div className="p2-p2-section2-content">
            <div className="p2-p2-serachbar">
              <input
                type="text"
                Name="Search"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                placeholder="Pepe Cones"
                id="p2-search"
              />
              <button id="search-bt" onClick={() => searchProduct(productName)}>
                Search
              </button>
            </div>
          </div>
        </div>
        <div className="p2-line">
          <hr id="line"></hr>
        </div>
        <div className="p2-p2-border">
          <div className="p2-border">
            <div className="p2-p2-section3">
              <div className="p2-p2-center">
                <div className="p2-p2-section3-row2">
                  <h2>PePe Cones</h2>
                  <p>We've found {count || 0} result of PePe Cones</p>
                </div>

                <div className="p2-sort">
                  <h5>Sort by</h5>
                  <select value={selectedValue} onChange={handleChange}>
                    <option value="Newest">Newest</option>
                    <option value="Premium Product">Premium Product</option>
                    <option value="Hot Selling">Hot Selling</option>
                    <option value="Popular">Popular</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="p2-p2-section4">
              <div className="p2-p2-section4-row1">
                {data.length > 0
                  ? data.map((product, index) => (
                      <div
                        onClick={() => {
                          fetchProduct(product._id, product.customURL);
                          scrollToTop();
                        }}
                        className="box-p2"
                      >
                        <div className="p2-p2-product-box" key={index}>
                          <div className="p2-product-img">
                            <img
                              src={product.imageUrls[0].imageUrl}
                              alt={product.AltTag}
                            />
                            <div className="p2-product-text-box">
                              <div className="p2-product-text">
                                <h3 title={product.name}>{product.name}</h3>
                                <p>
                                  {product.productCategories} |{' '}
                                  {product.paperSize}
                                </p>
                              </div>
                              <div className="p2-view-detail">
                                <button>View Detail</button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  : null}
              </div>
              <div className="p2-p2-side-main">
                <div className="p2-p2-sideimg-container">
                  {adds.length > 0 &&
                    adds.map((product, index) => (
                      <div className="p2-p2-section4-row2" key={index}>
                        <img src={product.Image} alt={product.alttag} />
                        <div className="p2-text-container">
                          <h3>{product.adTitle}</h3>
                          <h5>{product.Discription}</h5>
                          <button
                            onClick={() =>
                              window.open(product?.redirectionalURL, '_blank')
                            }
                          >
                            {' '}
                            {product.adCTA}
                          </button>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
              <UserPagination
                customStyleForPagination={customStyleForPagination}
                currentPage={currentPage}
                totalPages={totalPages}
                handlePrevPage={handlePrevPage}
                handleNextPage={handleNextPage}
                handlePageClick={handlePageClick}
                pageNumbers={pageNumbers}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AllProducts;
