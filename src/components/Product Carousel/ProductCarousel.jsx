/** @format */

import React, { useState, useRef, useEffect } from 'react';
import { MoveRight, MoveLeft } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { allProduct, viewProducts } from '../../Api/userApi';
import { setProductdata } from '../../redux/reducer/productData';
import { useDispatch } from 'react-redux';
import { setFetching } from '../../redux/reducer/fetching';
function ProductCarousel() {
  const [productData, setProductData] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    fetchAllProduct();
  }, []);

  const fetchAllProduct = async () => {
    try {
      let response = await allProduct();
      console.log('data', response.data.products);
      setProductData(response.data.products);
    } catch (error) {
      console.log(error);
    }
  };

  const sliderRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const slider = sliderRef.current;
    const slideWidth = slider.clientWidth / 16; // 4 images displayed at a time

    function updateSlider() {
      const offset = -currentIndex * slideWidth;
      slider.style.transform = `translateX(${offset}px)`;
    }

    updateSlider();
  }, [currentIndex]);

  const slideNext = () => {
    const slider = sliderRef.current;
    if (currentIndex < slider.children.length - 1.8) {
      // Adjust the number of visible items as needed
      setCurrentIndex((prevIndex) => prevIndex + 1.34);
    } else {
      setCurrentIndex(0); // Loop back to the first item
    }
  };

  const slidePrev = () => {
    const slider = sliderRef.current;
    if (currentIndex > 0) {
      setCurrentIndex((prevIndex) => prevIndex - 2);
    } else {
      setCurrentIndex(slider.children.length - 4); // Loop to the last group
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

  return (
    <>
      <div>
        <div className="sec4-center">
          <div className="sec4-center-text">
            <h2>Recently Added</h2>
            <p>Latest Drops from PEPE CONES - Elevate Your Experience</p>
          </div>
          <div className="buttons">
            <button className="previous-btn" onClick={slidePrev}>
              <MoveLeft strokeWidth={1.5} />
            </button>
            <button className="next-btn" onClick={slideNext}>
              <MoveRight strokeWidth={1.5} color="#ffff" />
            </button>
          </div>
        </div>
        <div className="sec4-container">
          <div className="sec4-end">
            <div className="carousel" ref={sliderRef}>
              {productData.length > 0 &&
                productData.map((product, index) => (
                  <div className="product-box" key={index}>
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
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductCarousel;
