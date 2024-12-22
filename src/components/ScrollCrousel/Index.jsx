/** @format */

import React, { useEffect, useState } from 'react';
import './Index.css'; // Import your CSS file
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { allProduct, viewProducts } from '../../Api/userApi';
import { setFetching } from '../../redux/reducer/fetching';
import { setProductdata } from '../../redux/reducer/productData';

const ScrollCrousel = () => {
  const [productData, setProductData] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const fetchAllProduct = async () => {
    try {
      let response = await allProduct();
      console.log('dataaaaaaaaa', response.data.products);
      setProductData(response.data.products);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchProduct = async (id, url) => {
    console.log(id);
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

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  useEffect(() => {
    fetchAllProduct();
  }, []);
  return (
    <div className="container-css">
      {/* {[...Array(10)].map((_, index) => (
        <div className="box-css" key={index}></div>
      ))} */}

      {productData.length > 0 &&
        productData.map((product, index) => (
          <div
            className="box-css product-box"
            style={{ scrollSnapAlign: 'start', scrollPadding: '0 24' }}
            key={index}
          >
            <div className="product-container-component">
              <div className="product-img-home">
                <img
                  src={product.imageUrls[0].imageUrl}
                  alt={product.imageUrls[0].altTag}
                />
                <div className="product-text-box">
                  <div className="product-text">
                    <h3 title={product.name}>{product.name}</h3>

                    <p>
                      {product.productCategories} | &nbsp;
                      {product.paperSize}
                    </p>
                  </div>
                  <div className="view-detail">
                    <button
                      onClick={() => {
                        fetchProduct(product._id, product.customURL);
                        scrollToTop();
                      }}
                      className="deatil-btn"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default ScrollCrousel;
