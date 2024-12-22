/** @format */

import React, { useEffect, useRef, useState } from 'react';
import './index.css';
import image from '../../assets/User/boxed_1-removebg-preview.png';
import image1 from '../../assets/User/Container.jpg';
import image2 from '../../assets/User/picture1.jpg';
import image33 from '../../assets/User/picture3.png';
import image4 from '../../assets/User/picture4.png';
import image5 from '../../assets/User/picture5.png';
import image11 from '../../assets/User/Container.png';
import image3 from '../../assets/User/Image Placeholder.png';
import imag23 from '../../assets/User/pepecone.png';
import product from '../../assets/User/01.png';
import { BiLogoWhatsappSquare } from 'react-icons/bi';
import { BsTelegram } from 'react-icons/bs';
import { AiOutlineArrowRight } from 'react-icons/ai';
import SelectProductDropdown from '../../components/SelectProductDropdown';
import {
  getProductSelectCategory,
  getPaperSizeCategory,
} from '../../Api/userApi';

import { ChevronRight, ChevronLeft } from 'lucide-react';
import SelectSizeDropdown from '../../components/SelectSizeDropdown';
import { useNavigate } from 'react-router-dom';
import Homeheader from '../../components/homeHeader/Header';
import Footer from '../../components/Footer/Index';

import AllProduct from '../../components/AllProduct';
import { useDispatch } from 'react-redux';
import { setFetching } from '../../redux/reducer/fetching';

const ProductListing = () => {
  const [optionsProduct, setOptionsProduct] = useState([]);
  const [optionsSelectSize, setOptionsSelectSize] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);

  const dispatch = useDispatch();
  useEffect(() => {
    // Dispatch setFetching(true) and set it to false after 3 seconds
    dispatch(setFetching(true));
    const timer = setTimeout(() => {
      dispatch(setFetching(false));
    }, 3000);

    // Clear the timer when the component unmounts to avoid memory leaks
    return () => clearTimeout(timer);
  }, [dispatch]);
  const arr = [
    'Privacy',
    'FAQ',
    'Shipping and payment',
    'Partners',
    'Blog',
    'Contact',
  ];
  const arr1 = ['Add title here', 'Add title here', 'Add title here'];
  const navigate = useNavigate();
  useEffect(() => {
    fetchProductOptions();
    fetchSelectSizeOptions();
  }, []);

  const fetchProductOptions = async () => {
    try {
      let response = await getProductSelectCategory();
      if (response.status === 200) {
        console.warn(response);
        setOptionsProduct(
          response?.data.product ? response.data.product : null,
        );
      }
    } catch (error) {
      console.warn(error);
    }
  };

  const fetchSelectSizeOptions = async () => {
    try {
      let response = await getPaperSizeCategory();
      if (response.status === 200) {
        console.warn(response);
        setOptionsSelectSize(
          response?.data.paperInfoArray ? response.data.paperInfoArray : null,
        );
      }
    } catch (error) {
      console.warn(error);
    }
  };

  console.warn(optionsSelectSize);
  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };
  const allProductsSectionRef = useRef(null);
  const scrollToAllProducts = () => {
    if (allProductsSectionRef.current) {
      allProductsSectionRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };
  return (
    <div>
      <Homeheader />
      <div className="container-test">
        <div className="product-head">
          <div className="product-container">
            <div className="product-part-text">
              <h2>Quality Rolled for You</h2>
              <h1>Finest Pre-Rolled Cones</h1>
              <div className="product-feature-box">
                <div className="product-feature">
                  <div className="feature-logo">
                    <svg
                      width="25"
                      height="30"
                      viewBox="0 0 25 30"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M24.0463 17.3998L21.7783 13.9123C21.6605 13.7036 21.6016 13.4651 21.5721 13.2267C21.1892 8.93432 17.8609 5.50639 13.6196 5.08908C13.7079 5.98332 13.3545 6.87757 12.677 7.47373L11.1749 8.75547L11.6461 10.693C11.8523 11.5276 11.6461 12.3921 11.116 13.0776C10.5858 13.7334 9.79054 14.1507 8.93637 14.1507C8.43566 14.1507 7.93494 14.0315 7.49313 13.7632L5.81425 12.7199L4.16483 13.7632C4.10592 13.8228 4.01756 13.8527 3.9292 13.8825C3.9292 13.9421 3.9292 13.9719 3.9292 14.0315C3.9292 16.9825 5.31354 19.8441 7.49313 21.722C7.75821 21.9605 7.90548 22.2585 7.90548 22.6162V28.399C7.90548 28.8163 8.22948 29.1442 8.61238 29.174H16.241C16.7122 29.2038 17.0951 28.8461 17.0951 28.399V24.7624C17.0951 24.5239 17.3013 24.3451 17.5075 24.3451H20.1583C20.983 24.3451 21.631 23.6595 21.631 22.8547V19.2181C21.631 19.0691 21.7488 18.92 21.9256 18.92H23.2215C24.0168 18.9498 24.4881 18.0556 24.0463 17.3998Z"
                        fill="#F5FFF7"
                      />
                      <path
                        d="M6.31526 10.6872L8.55375 12.0584C9.17228 12.4459 9.96753 11.8796 9.79081 11.1642L9.17228 8.60068C9.11337 8.3026 9.20173 7.97471 9.43736 7.76605L11.4402 6.03718C11.9998 5.56025 11.7053 4.6362 10.969 4.57659L8.34757 4.36793C8.05303 4.33812 7.75849 4.15927 7.64068 3.86119L6.63925 1.41693C6.34471 0.731344 5.40219 0.731344 5.10765 1.41693L4.10622 3.86119C3.9884 4.15927 3.72332 4.33812 3.39933 4.36793L0.777936 4.57659C0.0415898 4.60639 -0.252949 5.53045 0.306674 6.00737L2.30954 7.73624C2.54517 7.9449 2.63353 8.27279 2.57462 8.57087L1.95609 11.1642C1.77937 11.8796 2.57462 12.4459 3.19315 12.0584L5.43164 10.6872C5.72618 10.5382 6.05017 10.5382 6.31526 10.6872Z"
                        fill="#F5FFF7"
                      />
                    </svg>
                  </div>
                  <div className="feature-text">
                    <div className="feature-321">
                      <h4>10+</h4>
                      <p>Years</p>
                    </div>
                  </div>
                  <div className="product-feature1">
                    <div className="feature-logo">
                      <svg
                        width="25"
                        height="29"
                        viewBox="0 0 25 29"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M5.69245 0.903625H20.055C20.6499 0.903625 21.1599 1.41967 21.1599 2.02172V4.0859C26.429 4.94598 25.9191 14.1488 20.565 14.2348C19.3752 16.815 17.0805 18.3631 14.616 18.8792V23.4376H16.4856C16.8256 23.4376 17.0805 23.7816 17.1655 24.1257L18.0154 27.4799C18.1004 27.824 17.6754 28.168 17.3355 28.168H8.49698C8.07205 28.168 7.64713 27.824 7.73211 27.4799L8.58197 24.1257C8.75194 23.7816 8.92191 23.4376 9.34684 23.4376H11.1315V18.8792C8.66696 18.3631 6.37234 16.815 5.18254 14.2348C-0.171565 14.1488 -0.681479 4.94598 4.58764 4.0859V2.02172C4.58764 1.41967 5.09755 0.903625 5.69245 0.903625ZM13.2562 5.29001L14.106 7.78423H16.8256C17.7604 7.78423 17.7604 8.04225 16.9956 8.55829L14.8709 10.1064L15.7208 12.7727C15.9757 13.6327 15.7208 13.7187 15.0409 13.2027L12.9162 11.6546L10.7066 13.2027C9.94174 13.8048 9.85676 13.6327 10.1117 12.7727L10.9616 10.1924L8.75194 8.55829C7.98707 8.04225 8.15704 7.78423 9.0069 7.87023H11.6415L12.4913 5.204C12.7463 4.34393 13.0012 4.42993 13.2562 5.29001ZM21.1599 12.5146V5.72005C23.9644 6.58012 23.9644 11.6546 21.1599 12.5146ZM4.58764 12.5146V5.72005C1.78311 6.58012 1.78311 11.6546 4.58764 12.5146Z"
                          fill="#F5FFF7"
                        />
                      </svg>
                    </div>
                    <div className="feature-text">
                      <h4>20+</h4>
                      <p>Achievements</p>
                    </div>
                    <div className="product-feature2">
                      <div className="feature-logo">
                        <svg
                          width="31"
                          height="25"
                          viewBox="0 0 31 25"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M14.4632 18.5799L13.0243 18.5468C12.5665 18.5468 12.174 18.249 12.0105 17.8188C11.847 17.3885 11.9778 16.8921 12.3049 16.5942L15.6731 13.5164V1.00655C15.6731 0.477031 15.248 0.0137024 14.6921 0.0137024H1.57871C1.05548 0.0137024 0.597656 0.443936 0.597656 1.00655V23.0808C0.597656 23.6104 1.02278 24.0737 1.57871 24.0737H6.09154V19.5728C6.09154 19.3742 6.25504 19.1756 6.48396 19.1756H9.88493C10.0811 19.1756 10.2773 19.3411 10.2773 19.5728V24.0406H14.6594C14.5613 23.8089 14.5286 23.5773 14.5286 23.3456V18.5799H14.4632ZM3.24649 5.27579C3.24649 5.11032 3.3773 4.97794 3.54081 4.97794H6.58206C6.74557 4.97794 6.87638 5.11032 6.87638 5.27579V8.35362C6.87638 8.51909 6.74557 8.65147 6.58206 8.65147H3.54081C3.3773 8.65147 3.24649 8.51909 3.24649 8.35362V5.27579ZM6.94178 15.0057C6.94178 15.1712 6.81097 15.3035 6.64746 15.3035H3.60621C3.4427 15.3035 3.31189 15.1712 3.31189 15.0057V11.9279C3.31189 11.7624 3.4427 11.63 3.60621 11.63H6.64746C6.81097 11.63 6.94178 11.7624 6.94178 11.9279V15.0057ZM9.329 5.2427C9.329 5.07722 9.45981 4.94484 9.62332 4.94484H12.6973C12.8608 4.94484 12.9916 5.07722 12.9916 5.2427V8.32052C12.9916 8.486 12.8608 8.61837 12.6973 8.61837H9.65602C9.49251 8.61837 9.3617 8.486 9.3617 8.32052V5.2427H9.329ZM9.68872 15.3035C9.52521 15.3035 9.3944 15.1712 9.3944 15.0057V11.9279C9.3944 11.7624 9.52521 11.63 9.68872 11.63H12.73C12.8935 11.63 13.0243 11.7624 13.0243 11.9279V15.0057C13.0243 15.1712 12.8935 15.3035 12.73 15.3035H9.68872Z"
                            fill="#F5FFF7"
                          />
                          <path
                            d="M27.5689 15.215V10.7471H25.149V12.9645L21.9442 9.98596C21.8461 9.88667 21.7153 9.85358 21.5845 9.85358C21.4537 9.85358 21.3229 9.88667 21.2248 9.98596L13.0493 17.4323L15.5674 17.4985V23.3563C15.5674 23.7204 15.8617 24.0182 16.2214 24.0182H19.8186V20.6756C19.8186 20.2785 20.1456 19.9475 20.538 19.9475H22.6964C23.0888 19.9475 23.4158 20.2785 23.4158 20.6756V24.0182H26.9803C27.34 24.0182 27.6343 23.7204 27.6343 23.3563V17.6309L30.0216 17.4654L27.5689 15.215ZM23.1215 16.0754C23.1215 16.3733 22.8926 16.605 22.5982 16.605H20.6361C20.3418 16.605 20.1129 16.3733 20.1129 16.0754V15.5459C20.1129 15.2481 20.3418 15.0164 20.6361 15.0164H22.5982C22.8926 15.0164 23.1215 15.2481 23.1215 15.5459V16.0754Z"
                            fill="#F5FFF7"
                          />
                        </svg>
                      </div>
                      <div className="feature-text">
                        <div className="last-feat-text">
                          <h4>India</h4>
                          <p>Origin</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <button onClick={scrollToAllProducts} id="bt">
                {/* <button onClick={()=>navigate("/allProducts")}id="bt">*/}
                Buy Now
              </button>
            </div>
          </div>
          {/* <div className="dot-button-main">
            <div className="dot-button">
              <span className="dot" id="active"></span>
              <span className="dot"></span>
              <span className="dot"></span>
            </div>
          </div> */}
        </div>
      </div>

      <div ref={allProductsSectionRef} id="pagi">
        <AllProduct />
      </div>

      <div className="main-contain">
        <div className="contain-wrapper11">
          <div className="lft-prdct">
            <div className="fst-div">
              <h1 id="headingSection">Why Choose Us?</h1>
              <p id="paragraph">
                Experience the pinnacle of premium pre-rolled paper cones
                crafted to perfection.
              </p>
            </div>
            <div className="snd-div">
              <ul>
                <li>
                  <div className="boxes">
                    <h3>Eco-Friendly Materials</h3>
                  </div>
                </li>
              </ul>
              <div className="below-head">
                <p className="below-head-1stpar">
                  Handmade pre-rolled cones crafted from sustainable and natural
                  materials, ensuring a green and clean experience.
                </p>
              </div>
              <ul>
                <li>
                  <div className="boxes">
                    <h3>Trusted by Customers</h3>
                  </div>
                </li>
              </ul>
              <div className="below-head">
                <p>
                  A favorite among our loyal clientele, we prioritize quality
                  and consistency in every cone.
                </p>
              </div>
              <ul>
                <li>
                  <div className="boxes">
                    <h3>Diverse Selection for Every Palate</h3>
                  </div>
                </li>
              </ul>
              <div className="below-head">
                <p>
                  From ultra-thin to slow-burning, find the perfect cone to
                  match your preference and elevate your experience
                </p>
              </div>
            </div>
          </div>
          <div className="rht-frog">
            <div className="fng-frog">
              <div className="image">
                <img src={image3} />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="main-conts">
        <div className="conts-wrapper">
          <div className="lefts">
            <div className="productlisting-thrd">
              <div className="imag">
                <img src={product} />
              </div>
            </div>
          </div>
          <div className="rights">
            <div className="over">
              <h2 className="craft-h2">
                Crafting Quality:
                <br />A Decade with Pepe Cones
              </h2>
            </div>
            <div className="para">
              <p id="develop-parag">
                Over a decade perfecting handmade pre-rolled cones. At Pepe
                Cones, we prioritize quality and sustainability. Dive in and
                experience the dedicated difference{' '}
              </p>
            </div>
            <div className="last">
              <div className="st">
                <h2>500+</h2>
                <p id="car">Products Sold</p>
              </div>
              <div className="nd">
                <h2>235</h2>
                <p id="cust">Customers</p>
              </div>
              <div className="thrd">
                <h2>100</h2>
                <p id="deal">Dealer Reviews</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ProductListing;
