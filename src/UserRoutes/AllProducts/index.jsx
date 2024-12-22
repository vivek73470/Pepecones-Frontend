/** @format */

import React, { useEffect, useState } from 'react';
import './index.css';
import sideimge from '../../assets/User/sideimg.jpg';
import {
  getAllProductPublished,
  viewProducts,
  getAdds,
} from '../../Api/userApi';
import Pagination from '../../components/Pagination';
import { Link } from 'react-router-dom';
import HomeHeader from '../../components/homeHeader/Header';
import Footer from '../../components/Footer/Index';
import { setFetching } from '../../redux/reducer/fetching';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setProductdata } from '../../redux/reducer/productData';

function AllProducts() {
  const [data, setData] = useState([]);
  const [adds, setAdds] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [add, setAdd] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 8;
  // const adds = [
  //   {
  //     image: sideimge,
  //     title: 'Special Offer for Today',
  //     description: '10% Off for New Tesla Model S',
  //     alt: 'sidei',
  //   },
  //   {
  //     image: sideimge,
  //     title: 'Special Offer for Today',
  //     description: '10% Off for New Tesla Model S',
  //     alt: 'sidei',
  //   },
  // ];

  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    fetchData(currentPage);
    fetchAdds();
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

  const fetchProduct = async (id, url = 'hn') => {
    console.log(id);
    console.log('url', url);
    dispatch(setFetching(true));
    try {
      let response = await viewProducts(id);
      if (response.status === 200) {
        console.warn(response);
        dispatch(setProductdata(response.data));
        navigate(`/singleProduct/${url}`);
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
  const customNowrap = {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    width: '230px',
    maxWidth: 'fit-content',
  };
  const customStyleForPagination = {
    position: 'relative',
  };
  console.log(currentPage);
  console.log(totalPages);
  console.log(handlePrevPage);
  console.log(handleNextPage);
  console.log(handlePageClick);
  console.log(pageNumbers);
  return (
    <>
      <HomeHeader />
      <div className="p2-productp2-container">
        <div className="p2-p2-head">
          <div className="p2-p2-head-text">
            <h4>Sub title</h4>
            <h1>Explore More</h1>
          </div>
        </div>
        <div className="p2-p2-section2">
          <div className="p2-p2-section2-content">
            <div className="p2-p2-serachbar">
              <input
                type="text"
                Name="Search"
                placeholder="Pepe Cones"
                id="p2-search"
              />
              <button id="search-bt">Search</button>
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
                  <p>We've found 20 result of PePe Cones</p>
                </div>

                <div className="p2-sort">
                  <h5>Sort by</h5>
                  <select>
                    <option>Newest</option>
                    <option>Premium Product</option>
                    <option>Hot Selling</option>
                    <option>Popular</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="p2-p2-section4">
              <div className="p2-p2-section4-row1">
                {data.length > 0
                  ? data.map((product, index) => (
                      <div
                        onClick={() =>
                          fetchProduct(product._id, product.customURL)
                        }
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
                                <h3 style={customNowrap} title={product.name}>
                                  {product.name}
                                </h3>
                                <p>
                                  {product.customURL}
                                  {product.productCategories} |
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
                          <h3>{product.adTittle}</h3>
                          <h5>{product.Discription}</h5>
                          <button> Details</button>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Pagination
        customStyleForPagination={customStyleForPagination}
        currentPage={currentPage}
        totalPages={totalPages}
        handlePrevPage={handlePrevPage}
        handleNextPage={handleNextPage}
        handlePageClick={handlePageClick}
        pageNumbers={pageNumbers}
      />
      <Footer />
    </>
  );
}

export default AllProducts;
