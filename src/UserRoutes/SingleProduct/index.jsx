/** @format */

import React, { useEffect, useState } from 'react';
import './index.css';
import largeproduct from '../../assets/User/Rectangle.jpg';
import Fram from '../../assets/User/Frame.jpg';
import amaz from '../../assets/User/amaz.jpg';
import check from '../../assets/User/Check.jpg';
import { Link, useNavigate } from 'react-router-dom';
import HomeHeader from '../../components/homeHeader/Header';
import Footer from '../../components/Footer/Index';
import { MdKeyboardArrowRight } from 'react-icons/md';
import { MdKeyboardArrowLeft } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { SINGLE_PRODUCT_KEY } from '../../constant';
import { setFetching } from '../../redux/reducer/fetching';
import { viewProducts } from '../../Api/userApi';

function SingleProduct() {
  const productDetails = useSelector((state) => state.productData.data);
  console.log(productDetails);
  const [productDetail, setProductDetail] = useState(productDetails || {});
  const [c, d] = productDetail?.color?.split(' ') || [];
  console.log(c, d);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // console.log(productDetail);
  const [a, b, f] = productDetail?.sizetype?.split(' ') || [];

  useEffect(() => {
    const storedData = localStorage.getItem(SINGLE_PRODUCT_KEY);
    const parsedData = storedData ? JSON.parse(storedData) : null;

    if (parsedData) {
      fetchProduct(parsedData);
    }
  }, []);

  const fetchProduct = async (id) => {
    dispatch(setFetching(true));
    try {
      let response = await viewProducts(id);
      if (response.status === 200) {
        setProductDetail(response.data);
        dispatch(setFetching(false));
      }
    } catch (error) {
      dispatch(setFetching(false));
    }
  };

  const storedData = localStorage.getItem(SINGLE_PRODUCT_KEY);
  const parsedData = storedData ? JSON.parse(storedData) : null;
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const handleSubImageClick = (index) => {
    setCurrentImageIndex(index);
  };

  return (
    <div>
      <HomeHeader />
      <div className="p3-productp3-container">
        <div className="p3-back-button">
          <button onClick={() => navigate('/productListing')}>
            <svg
              width="13"
              height="20px"
              viewBox="0 0 13 13"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10.2675 6.50012H2.70203"
                stroke="#6F768D"
                stroke-width="1.62117"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M6.48476 10.2828L2.70203 6.50002L6.48476 2.71729"
                stroke="#6F768D"
                stroke-width="1.62117"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            back to list
          </button>
        </div>
        <div className="p3-productp3-detail">
          <div className="p3-productp3-box">
            <div className="p3-product-box-wrapper">
              <div className="p3-product-box-main">
                <img
                  src={
                    productDetail &&
                    productDetail.imageUrls &&
                    productDetail.imageUrls[currentImageIndex]
                      ? productDetail.imageUrls[currentImageIndex].imageUrl
                      : null
                  }
                  alt={
                    productDetail?.imageUrls
                      ? productDetail?.imageUrls[currentImageIndex].alt
                      : null
                  }
                  id="p3-img-box"
                />
              </div>
            </div>
            <div className="p3-productp3-down-box">
              {productDetail &&
                productDetail?.imageUrls?.length > 0 &&
                productDetail?.imageUrls.map((img, index) => (
                  <div
                    className="p3-down-one"
                    key={index}
                    onClick={() => handleSubImageClick(index)}
                  >
                    <img src={img.imageUrl} alt={img.alt} />
                  </div>
                ))}
            </div>
          </div>
          <div className="p3-productp3-box-row2">
            <div className="p3-heading">
              <div className="sale-box">
                <p id="p3-sale">HOTSALE</p>
              </div>
              <h2>Natural Pre Rolled Cones - Slow, Even Burn - Easy-to-use</h2>
              <div className="p3-pre-rolled">
                <p>PRE ROLLED CONES |</p>
                {/* <img src={Fram} id="p3-roll-logo" /> */}
              </div>
            </div>
            <div className="main-why-choose">
              <div className="why-choose">
                <h2 id="p3-con">Why Choose pepe Cones ?</h2>
                <p id="p3-choose">
                  <div>
                    {productDetail?.whyChooseus && (
                      <div
                        dangerouslySetInnerHTML={{
                          __html: productDetail?.whyChooseus,
                        }}
                      />
                    )}
                  </div>
                </p>
                <div className="p3-upper-desc">
                  <h2 id="p3-descri">Description</h2>
                  <div>
                    {productDetail?.productDescription && (
                      <div
                        dangerouslySetInnerHTML={{
                          __html: productDetail?.productDescription,
                        }}
                      />
                    )}
                  </div>

                  <h2 id="our-u">Our Uniqueness</h2>
                  <div className="p3-product-size-color">
                    <button id="p3-size" style={{ cursor: 'inherit' }}>
                      <img src={f} />
                      {a}
                      {b}
                    </button>
                    <button id="p3-flavour" style={{ cursor: 'inherit' }}>
                      {productDetail?.flavour}
                    </button>
                    <button id="p3-col" style={{ cursor: 'inherit' }}>
                      <p
                        style={{
                          padding: '2px',
                          backgroundColor: ` ${d}`,
                          padding: '7px',
                          borderRadius: '10px',
                          margin: '0px',
                        }}
                      ></p>
                      {c}
                    </button>
                    <button id="p3-mm" style={{ cursor: 'inherit' }}>
                      {productDetail?.paperSize}
                    </button>
                  </div>
                  <div className="p3-amazon-box">
                    <div className="p3-amaz">
                      <div className="amaz">
                        <img src={amaz} alt="p3-amazon" />
                      </div>
                      <button
                        onClick={() =>
                          window.open(productDetail?.producturl, '_blank')
                        }
                      >
                        BUY NOW ON AMAZON
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="p3-seo-descrption">
          <h2 id="p3-des">Key Feature</h2>
          <hr />
          <p>
            {productDetail?.keyFetures && (
              <div
                dangerouslySetInnerHTML={{
                  __html: productDetail?.keyFetures,
                }}
              />
            )}
          </p>

          {/* <div className="p3-productp3-benefits">
            <h2>Benefits</h2>
            <div className="p3-check">
              <p>
                <img src={check} />
                Durable leather is easily cleanable so you can keep your look
                fresh
              </p>
              <p>
                <img src={check} />
                Water-repellent finish and internal membrane help keep your feet
                dry.
              </p>
              <p>
                <img src={check} />
                Toe piece with star pattern adds durability.
              </p>
              <p>
                <img src={check} />
                Synthetic insulation helps keep you warm.
              </p>
              <p>
                <img src={check} />
                Originally designed for performance hoops, the Air unit delivers
                lightweight cushioning.
              </p>
              <p>
                <img src={check} />
                Plush tongue wraps over the ankle to help keep out the moisture
                and cold.
              </p>
              <p>
                <img src={check} />
                Rubber outsole with aggressive traction pattern adds durable
                grip.
              </p>
              <p>
                <img src={check} />
                Durable leather is easily cleanable so you can keep your look
                fresh.
              </p>
            </div>
          </div> */}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default SingleProduct;
