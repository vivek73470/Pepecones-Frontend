/** @format */

import React, { useEffect, useState, useRef } from "react";
import MediaQuery from "react-responsive";
import Carousal from "../../components/Text Carousal/Carousal";
import FWE from "../../assets/User/Frog without Eye 1.png";
import Ball from "../../assets/User/ball.png";
import Img711 from "../../assets/User/711.png";
import frogwoe from "../../assets/User/frog-image-without-eye.png";
import Smoke from "../../assets/User/smoke frog 1.png";
import ImgGif from "../../assets/User/gif-1.gif";
import ImgFeelGood from "../../assets/User/m1.png";
import ImgTuxedo from "../../assets/User/Smoke Tuxedo 1.png";
import ImgCertified from "../../assets/User/Group.png";
import Reimagined from "../../assets/User/Reimagined.png";
import Smoke1 from "../../assets/User/smoke1.png";
import goodman from "../../assets/User/goodman.png";
import last from "../../assets/User/last.png";
import ImgFirstCorner from "../../assets/User/firstcorner.png";
import BlogComponent from '../../components/BlogProduct';
import ImgPlayLogo from "../../assets/User/playlogo.png";
import imgz1 from "../../assets/User/img-zome1.png";
import imgz2 from "../../assets/User/img-zome2.png";
import imgz3 from "../../assets/User/img-zome3.png";
import imgz4 from "../../assets/User/img-zome4.png";
import imgz5 from "../../assets/User/img-zome5.png";
import imgz6 from "../../assets/User/img-zome6.png";
import ImgOutlined from "../../assets/User/Outlined_Logo.png";
import ImgGif1 from "../../assets/User/gif-1.gif";
import VectorLeaf from "../../assets/User/Vector-leaf.svg";
import VectorLeafFirst from "../../assets/User/Vector-leaf-firstcorner.png";
import ImgGroup from "../../assets/User/Group_1000002516.png";
import ImgUntitled from "../../assets/User/Untitled.png";
import ImgWeed from "../../assets/User/mdi_weed.svg";
import ImgWeedDark from "../../assets/User/mdi_weed_dark.svg";
import ImgIcon1 from "../../assets/User/Icon 1.png";
import ImgIcon2 from "../../assets/User/Icon 2.png";
import ImgIcon3 from "../../assets/User/Icon.png";
import ImgConnect from "../../assets/User/Vector 3.jpg";
import ImgConnect2 from "../../assets/User/Vector_4.png";
import ImgRoll1 from "../../assets/User/Frame_172.png";
import ImgRoll2 from "../../assets/User/Frame_173.png";
import Img1 from "../../assets/User/image-1.png";
import Img2 from "../../assets/User/image-2.png";
import Img3 from "../../assets/User/image-3.png";
import Img4 from "../../assets/User/image-4.png";
import Img5 from "../../assets/User/image-5.png";
import ImgRoll3 from "../../assets/User/Frame_174.png";
import CornerPic from "../../assets/User/corner-pic.png";
import ImgConeStick from "../../assets/User/pepe cones stick img.png";
import Test from "./test";
import { Link, useNavigate } from "react-router-dom";
import Zoom from "react-reveal/Zoom";
import ProductCarousel from "../../components/Product Carousel/ProductCarousel";
import pepe from "../../assets/User/pepe.png";
import cones from "../../assets/User/cones.png";
import Fade from "react-reveal/Fade";
import "./home.css";
import Footer from "../../components/Footer/Index";
import Homeheader from "../../components/homeHeader/Header";
import ScrollCrousel from "../../components/ScrollCrousel/Index";
import { useDispatch } from "react-redux";
import { setFetching } from "../../redux/reducer/fetching";

const Home = () => {
  const appRef = useRef(null);
  const imgGroupRef = useRef(null);
  const detailRef = useRef(null);

  const [rotation, setRotation] = useState(0);
  const penRef = useRef(null);
  const navigate = useNavigate();
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

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.pageYOffset;
      const penPos = penRef?.current?.offsetTop;

      let newRotation = (penPos - scrollPos) / 28;

      if (scrollPos >= penPos) {
        newRotation = 0;
      }

      setRotation(newRotation);
    };

    window.addEventListener("scroll", handleScroll);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const [text, setText] = useState("");
  const [index, setIndex] = useState(0);
  const fullTextRef = useRef("Pre Rolled");

  useEffect(() => {
    const interval = setInterval(() => {
      if (index < fullTextRef.current.length) {
        setText((prevText) => {
          const newText = prevText + fullTextRef.current.charAt(index);

          return newText;
        });

        setIndex((prevIndex) => prevIndex + 1);
      } else {
        clearInterval(interval);
      }
    }, 100);

    return () => {
      clearInterval(interval);
    };
  }, [index, text]);

  // Moveing EyeBall according to cursor

  const frogEyeRef = useRef(null);
  const eyeballRef = useRef(null);

  const updateEyeballPosition = (event) => {
    const frogEye = frogEyeRef.current;
    const eyeball = eyeballRef.current;

    if (!frogEye || !eyeball) return;

    const frogEyeRect = frogEye.getBoundingClientRect();
    const eyeCenterX = frogEyeRect.left + frogEyeRect.width / 2;
    const eyeCenterY = frogEyeRect.top + frogEyeRect.height / 2;

    const mouseX = event.clientX;
    const mouseY = event.clientY;

    const angle = Math.atan2(mouseY - eyeCenterY, mouseX - eyeCenterX);
    const distance = Math.min(frogEyeRect.width / 65, frogEyeRect.height * 80); // Adjust the distance as needed

    const offsetX = Math.cos(angle) * distance;
    const offsetY = Math.sin(angle) * distance;

    eyeball.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
  };

  useEffect(() => {
    document.addEventListener("mousemove", updateEyeballPosition);

    // Cleanup: remove the event listener when the component unmounts
    return () => {
      document.removeEventListener("mousemove", updateEyeballPosition);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return (
    <>
      <Homeheader />
      <div className="home-component-react">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-6-1">
              <div className="p-5">
                <h4 className="text-secondary">
                  <span className="typing-subtitle">{text}</span>
                </h4>
                <h1 className="display-4">CONES</h1>
                <p className="lead">
                  Experience luxury with our Ultra-Thin, Premium Pre Rolled
                  Cones - Wood Pulp, Natural Shade, Lab-Approved, Eco-Friendly
                  papers.
                </p>
                {/* <a href="#" className="btn  btn-lg">Discover Now</a> */}
                <button
                  onClick={() => navigate("/productlisting")}
                  className="btn"
                >
                  Explore Now
                </button>
              </div>
            </div>
            <div className="col-lg-6-2">
              <div className="bg-neo">
                <div className="bg-prime">
                  <div className="bg-flr">
                    <div className="bg-frg mt-[200px]  pt-[180px]">
                      <img
                        src={frogwoe}
                        alt="PePe Pre-rolled cones"
                        id="frog-eye"
                        className="frog-eye"
                        ref={frogEyeRef}
                      />
                      <div className="ball">
                        <img
                          src={Ball}
                          id="eyeball"
                          className="frog-eye-image"
                          alt="eyeball"
                          ref={eyeballRef}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-grass"></div>
        <div className="tab-img">
          <img src={Img711} alt="img711" />
        </div>
        <div className="testing">
          {/* <div className="img-test">
            <div className="lft-test-img">
              <img src={pepe} alt="pepe" className="text-img" />
            </div>
            <div className="center-test-img">
              {' '}
              <img src={Img711} alt="" className="pepe-logo" />
            </div>
            <div className="righ-test-img">
              {' '}
              <img src={cones} alt="cones" className="text-img-2" />
            </div>
          </div> */}
          <Test />
        </div>
        <div className="main-cont">
          <div className="cont">
            <div className="cont-left ml-[155px]">
              <div className="feels-good mt-20">
                <img src={ImgFeelGood} alt="Feels Good" />
              </div>
              <h4 className="text-secondary mt-20">
                <span className="typing-subtitle-3">Trusted by</span>
              </h4>
              <div className="icon-6 mt-8">
                <img src={ImgCertified} alt="cerified" />
              </div>
            </div>
            <div className="cont-right">
              <div className="smoke-picture">
                <img className="cg-smoke z-10" src={Smoke} alt="smoke" />
                <img
                  className="tuxedo-image mt-[-460px] ml-[155px]"
                  src={ImgTuxedo}
                  alt="Tuxedo"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="section-4 flex justify-center  w-screen bg-white">
          <div className="sec-4-cont flex flex-col items-center section-4-gifs">
            <div className="img">
              <img src={ImgGif} alt="PePe Cones Rolling Paper" />
            </div>
            <div className="sec-4-text">
              <h4 className="text-secondary-6 flex justify-center">
                <span className="typing-subtitle-4 " id="typing-subtitle">
                  Premium
                </span>
              </h4>
              <h1 className="sec-display-4">Rolled Paper</h1>
              <p className="lead-2">
                Discover our top-quality pre-rolled paper cones, created for
                those who appreciate the best in puffing.
              </p>
            </div>
            <div className="sec-4-img flex justify-center">
              <div className="cone-wrapper h-3/4 w-3/4">
                <img
                  src={ImgConeStick}
                  ref={penRef}
                  style={{
                    transform: ` rotate(${rotation}deg)`,
                    transition: "transform 0.3s",
                  }}
                  alt="PePe preroll cones"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="container-h w-screen">
          <div className="animated-fog-top"></div>
          <div className="box-content-bottom flex h-full">
            <div className="box-content">
              <h4 className="text-secondary9">
                <span className="typing-subtitle-2 home-sec3">
                  Prime Pre-Rolls
                </span>
              </h4>
              <h1>Pure Perfection</h1>
              <p>
                Enjoy high-quality crafted king size cones for a great
                experience.
              </p>
            </div>
            <div className="box-content-right">
              {/* <img src={ImgSectionBg} alt="Parallax Bg" className='parallax-image h-full' /> */}
            </div>
          </div>
        </div>
        <div className="section-4a w-screen">
          <div className="scroll">
            <div className="slider custom-slider">
              <div className="slide-track">
                <div className="slide">
                  <div className="oai-box">
                    <li>Thin Glue</li>
                  </div>
                </div>
                <div className="slide">
                  <div className="oai-box">
                    <li>Food Ink</li>
                  </div>
                </div>
                <div className="slide">
                  <div className="oai-box">
                    <li>Natural</li>
                  </div>
                </div>
                <div className="slide">
                  <div className="oai-box">
                    <li>Thin Roll</li>
                  </div>
                </div>
                <div className="slide">
                  <div className="oai-box">
                    <li>Wood Pulp</li>
                  </div>
                </div>
                <div className="slide">
                  <div className="oai-box">
                    <li>Lab Filter</li>
                  </div>
                </div>
                <div className="slide">
                  <div className="oai-box">
                    <li>Translucent</li>
                  </div>
                </div>
                <div className="slide">
                  <div className="oai-box">
                    <li>EU Paper</li>
                  </div>
                </div>
                <div className="slide">
                  <div className="oai-box">
                    <li>Thin Roll</li>
                  </div>
                </div>
                <div className="slide">
                  <div className="oai-box">
                    <li>Thin Glue</li>
                  </div>
                </div>
                <div className="slide">
                  <div className="oai-box">
                    <li>Food Ink</li>
                  </div>
                </div>
                <div className="slide">
                  <div className="oai-box">
                    <li>Natural</li>
                  </div>
                </div>
                <div className="slide">
                  <div className="oai-box">
                    <li>Thin Roll</li>
                  </div>
                </div>
                <div className="slide">
                  <div className="oai-box">
                    <li>Wood Pulp</li>
                  </div>
                </div>
                <div className="slide">
                  <div className="oai-box">
                    <li>Lab Filter</li>
                  </div>
                </div>
                <div className="slide">
                  <div className="oai-box">
                    <li>Translucent</li>
                  </div>
                </div>
                <div className="slide">
                  <div className="oai-box">
                    <li>EU Paper</li>
                  </div>
                </div>
                <div className="slide">
                  <div className="oai-box">
                    <li>Thin Roll</li>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="backg-container relative h-screen w-screen">
          <Zoom>
            <div className="first-sec-wrapper">
              <div className="first-sec flex flex-col">
                <div className="first-corner flex justify-start">
                  {/* <img src={VectorLeafFirst} alt="Vector-leaf" /> */}
                </div>
                <div className="first-content-wrapper flex flex-col gap-14 ml-60 justify-center">
                  <div className="first-content-box">
                    <div className="first-sec2">
                      <div className="first-content">
                        <h4>Wood Pulp</h4>
                        <p>
                          Made with natural wooden pulp for consistent burning.
                        </p>
                      </div>
                      <div className="play-img">
                        <img src={imgz1} alt="play-logo2" />
                      </div>
                    </div>
                  </div>
                  <div className="first-content-box">
                    <div className="first-sec2">
                      <div className="first-content">
                        <h4>Ultra-Thin Rolls</h4>
                        <p>
                          Sheer quality ultra-thin rolls for a smoother
                          experience.
                        </p>
                      </div>
                      <div className="play-img">
                        <img src={imgz2} alt="play-logo2" />
                      </div>
                    </div>
                  </div>
                  <div className="first-content-box">
                    <div className="first-sec2">
                      <div className="first-content">
                        <h4>Natural Shade</h4>
                        <p>
                          Natural shade cones, light and 13.5 GSM paper weight.
                        </p>
                      </div>
                      <div className="play-img">
                        <img src={imgz3} alt="play-logo2" />
                      </div>
                    </div>
                  </div>
                </div>
                {/* <div className="firstbox-lastcorner flex justify-start">
                  <img src={ImgOutlined} alt="outlined img" />
                </div> */}
              </div>
            </div>
          </Zoom>
          <Fade>
            <div className="second-sec-wrapper flex items-center justify-center">
              <div className="second-sec flex flex-col gap-20">
                <div className="second-corner flex justify-center">
                  <img src={ImgGif} alt="frog_gif" className="img-gif" />
                </div>
                <h4 className="text-secondary text-secondary flex justify-center">
                  <span className="typing-subtitle-5" id="typing-subtitle">
                    Top Rolls
                  </span>
                </h4>
                <div className="second-end">
                  <img
                    src={ImgGroup}
                    alt="Group-Image1"
                    className="group_image_1 mt-[-100px]"
                  />
                </div>
              </div>
            </div>
          </Fade>
          <Zoom>
            <div className="third-sec-wrapper">
              <div className="third-sec flex flex-col">
                <div className="third-corner">
                  <img src={VectorLeaf} alt="Vector-leaf" />
                </div>
                <div className="third-content-wrapper flex flex-col gap-14">
                  <div className="third-content-box">
                    <div className="third-sec2">
                      <div className="play-img">
                        <img src={imgz4} alt="play-logo2" />
                      </div>
                      <div className="third-content">
                        <h4>Lab Approved Filter</h4>
                        <p> Filter paper meeting lab standards for quality.</p>
                      </div>
                    </div>
                  </div>
                  <div className="third-content-box">
                    <div className="third-sec2">
                      <div className="play-img">
                        <img src={imgz5} alt="play-logo2" />
                      </div>
                      <div className="third-content">
                        <h4>Ultra-Thin Glue Line</h4>
                        <p>
                          Keeps cones intact for a smooth, reliable experience.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="third-content-box-third-oneee">
                    <div className="third-sec2">
                      <div className="play-img">
                        <img src={imgz6} alt="play-logo2" />
                      </div>
                      <div className="third-content">
                        <h4>European Sourced Paper</h4>
                        <p>
                          European sourced paper for best quality assurance.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                {/* <div className="thirdbox-lastcorner">
                  <img
                    src={ImgUntitled}
                    alt="untitled"
                    className="img-untitled  absolute bottom-0 right-0"
                  />
                </div> */}
              </div>
            </div>
          </Zoom>
        </div>
        {/* <div className="sec-scroller">
          <div className="list-container">
            <ul className="custom-ul">
              <li className="custom-li">STAY HIGH</li>

              <li className="custom-li">
                <img src={ImgWeed} alt="weed" />
              </li>
              <li className="custom-li">DABBING</li>
              <li className="custom-li"> CANNABID</li>
              <li className="custom-li">STAY HIGH</li>

              <li className="custom-li">
                <img src={ImgWeed} alt="weed" />
              </li>
              <li className="custom-li">DABBING</li>
              <li className="custom-li"> CANNABID</li>
              <li className="custom-li">
                <img src={ImgWeedDark} alt="weed dark" />
              </li>
              <li className="custom-li">VIBE</li>
              <li className="custom-li">STAY HIGH</li>

              <li className="custom-li">
                <img src={ImgWeed} alt="weed" />
              </li>
              <li className="custom-li">DABBING</li>
              <li className="custom-li"> CANNABID</li>
              <li className="custom-li">
                <img src={ImgWeedDark} alt="weed dark" />
              </li>
              <li className="custom-li">VIBE</li>
              <li className="custom-li">STAY HIGH</li>

              {/*   <li className="custom-li">
                            <img src={ImgWeed} alt="weed" />
                        </li>
                        <li className="custom-li">DABBING</li>
                        <li className="custom-li"> CANNABID</li>
                        <li className="custom-li">
                            <img src={ImgWeedDark} alt="weed dark" />
                        </li>
                        <li className="custom-li">VIBE</li>
                        <li className="custom-li">STAY HIGH</li>

                        <li className="custom-li">
                            <img src={ImgWeed} alt="weed" />
                        </li>
                        <li className="custom-li">DABBING</li>
                        <li className="custom-li"> CANNABID</li>
                        <li className="custom-li">
                            <img src={ImgWeedDark} alt="weed dark" />
                        </li>
                        <li className="custom-li">VIBE</li>
                        <li className="custom-li">STAY HIGH</li>

                        <li className="custom-li">
                            <img src={ImgWeed} alt="weed" />
                        </li>
                        <li className="custom-li">DABBING</li>
                        <li className="custom-li"> CANNABID</li>
                        <li className="custom-li">
                            <img src={ImgWeedDark} alt="weed dark" />
                        </li>
                        <li className="custom-li">VIBE</li>
                        <li className="custom-li">STAY HIGH</li>

                        <li className="custom-li">
                            <img src={ImgWeed} alt="weed" />
                        </li>
                        <li className="custom-li">DABBING</li>
                        <li className="custom-li"> CANNABID</li>
                        <li className="custom-li">
                            <img src={ImgWeedDark} alt="weed dark" />
                        </li>
                        <li className="custom-li">VIBE</li>
                        <li className="custom-li">STAY HIGH</li>

                        <li className="custom-li">
                            <img src={ImgWeed} alt="weed" />
                        </li>
                        <li className="custom-li">DABBING</li>
                        <li className="custom-li"> CANNABID</li>
                        <li className="custom-li">
                            <img src={ImgWeedDark} alt="weed dark" />
                        </li>
                        <li className="custom-li">VIBE</li>
                        <li className="custom-li">STAY HIGH</li>

                        <li className="custom-li">
                            <img src={ImgWeed} alt="weed" />
                        </li>
                        <li className="custom-li">DABBING</li>
                        <li className="custom-li"> CANNABID</li>
                        <li className="custom-li">
                            <img src={ImgWeedDark} alt="weed dark" />
                        </li>
                        <li className="custom-li">VIBE</li> 
            </ul>
          </div>
          <div className="list-container-2">
            <ul className="custom-ul-2">
              <li className="custom-li-2">STAY HIGH</li>
              <li className="custom-li-2">DABBING</li>
              <li className="custom-li-2">
                <img src={ImgWeed} alt="weed" />
              </li>
              <li className="custom-li-2">VIBE</li>
              <li className="custom-li-2"> CANNABID</li>
              <li className="custom-li-2">
                <img src={ImgWeedDark} alt="weed dark" />
              </li>
              <li className="custom-li-2">STAY HIGH</li>
              <li className="custom-li-2">DABBING</li>
              <li className="custom-li-2">
                <img src={ImgWeed} alt="weed" />
              </li>
              <li className="custom-li-2">VIBE</li>
              <li className="custom-li-2"> CANNABID</li>
              <li className="custom-li-2">
                <img src={ImgWeedDark} alt="weed dark" />
              </li>
              <li className="custom-li-2">DABBING</li>
              <li className="custom-li-2">
                <img src={ImgWeed} alt="weed" />
              </li>
              <li className="custom-li-2">VIBE</li>
              <li className="custom-li-2"> CANNABID</li>
              <li className="custom-li-2">VIBE</li>
              <li className="custom-li-2">DABBING</li>
            </ul>
          </div>
        </div> */}
        <div className="learn-container bg-white">
          <div className="check-23">
            <div className="learn-head">
              <h1>Learn</h1>
              <h2>About Our Process</h2>
              <p>
                Was a delightfull solicitude discovered collecting man day
                Resolving neglacted sir tolerably.
              </p>
            </div>
          </div>
          <div className="learn-center flex gap-[20px]">
            <div className="learn-center-img">
              <h1>01</h1>
              <div className="img-wrapper-1 flex justify-center">
                <img src={ImgRoll1} alt="Roll1" />
              </div>
              <div className="learn-end1">
                <h2>Preparing the Cone</h2>
                <p>
                  Begin with the basics. Learn the initial step of setting up
                  your pre-rolled cone for filling
                </p>
              </div>
            </div>
            <div className="learn-center-img2">
              <img src={ImgConnect} alt="Connetor" />
            </div>
            <div className="learn-center-img8">
              <h1>02</h1>
              <div className="img-wrapper-1 flex justify-center">
                <img src={ImgRoll2} alt="Roll1" />
              </div>
              <div className="learn-end1">
                <h2>Filling the Cone</h2>
                <p>
                  Step-by-step guidance on how to evenly fill your cone for a
                  consistent experience.
                </p>
              </div>
            </div>
            <div className="learn-center-img5">
              <img src={ImgConnect2} alt="Connector2" />
            </div>
            <div className="learn-center-img9">
              <h1>03</h1>
              <div className="img-wrapper-1 flex justify-center">
                <img src={ImgRoll3} alt="Roll 2" />
              </div>
              <div className="learn-end1">
                <h2>The Final Touch</h2>
                <p>
                  Seal the deal. Perfect the art of closing up and ensuring your
                  cone is ready to go.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="contain">
          <div className="contain-wrapper">
            <div className="left-carousal">
              <Carousal />
            </div>
            <div className="middle"></div>
            <div className="right flex flex-col justify-center">
              <div className="inner-right">
                <div className="first">
                  <div className="img-1">
                    <img src={ImgIcon1} alt="icon-1" />
                  </div>
                  <div className="stat-first-content">
                    <h4 className="first-content-h4">10+</h4>
                    <p className="first-content-p">Year</p>
                  </div>
                </div>
                <div className="first">
                  <div className="img-1">
                    <img src={ImgIcon2} alt="icon-2" />
                  </div>
                  <div className="stat-first-content">
                    <h4 className="first-content-h4">20+</h4>
                    <p className="first-content-p">Achievements</p>
                  </div>
                </div>
                <div className="first">
                  <div className="img-1 h-[71px] w-[67px]">
                    <img src={ImgIcon3} alt="icon-3" />
                  </div>
                  <div className="stat-first-content">
                    <h4 className="first-content-h4">India</h4>
                    <p className="first-content-p">Origin</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="home-sec4-container bg-white">
          <div class="home-sec4-first">
            <div class="sec4-head">
              <h1>Smoke Smart</h1>
              <h2>Premier Pre-Rolled Paper</h2>
              <p>
                Discover our range of premium pre-rolled paper cones, crafted
                for a seamless puffing experience. PepeCones promises quality,
                consistency, and the best in class.
              </p>
            </div>
            <div class="sec4-first-corner">
              <img src={CornerPic} alt="" />
            </div>
          </div>
          <MediaQuery minWidth={1000} maxWidth={2500}>
            <ProductCarousel />
          </MediaQuery>
          <MediaQuery minWidth={320} maxWidth={999}>
            <ScrollCrousel />
          </MediaQuery>
          {/* <ProductCarousel /> */}
        </div>
        {/* <div className="main-container">
          <div className="layers"></div>
          <div className="containers-wrapper">
            <div className="left-child">
              <div className="upper-child">
                <div className="upper-subtitle">
                  Redefining the puffing Experience
                </div>
                <div className="upper-title">
                  PepeCones: The Pinnacle of Perfection
                </div>
                <div className="upper-description">
                  <strong>Discover PepeCones</strong> - hand-rolled perfection
                  from India. More than just a puffing accessory, they represent
                  our commitment to quality and excellence. Simply the best for
                  those who expect the best.
                </div>
              </div>
              <div className="down-child"></div>
            </div>
            <div className="right-child">
              <div className="first-box">
                <img src={Reimagined} alt="Pepe Cones' with a frog mascot" />
              </div>
              <div className="second-box">
                <img
                  src={Smoke1}
                  alt="Person lighting a hand-rolled joint with a lighter"
                />
              </div>
              <div className="third-box">
                <img src={goodman} alt="Packaging of 'Pepe Cones with Text" />
              </div>
              <div className="fourth-box">
                <img src={last} alt="Packaging of 'Pepe Cones" />
              </div>
            </div>
          </div>
          <div className="fool"></div>
        </div> */}

        <div className="section-holder">
          <div className="wrapper-upper-lower">
            <div className="upper-text-place flex-row flex">
              <div className="lft-text-place">
                <div className="upper-subtitle">
                  Redefining the puffing Experience
                </div>
                <div className="upper-title">
                  PepeCones: The Pinnacle of Perfection
                </div>
              </div>
              <div className="rgt-text-place">
                <div className="upper-description">
                  <strong>Discover PepeCones</strong> - hand-rolled perfection
                  from India. More than just a puffing accessory, they represent
                  our commitment to quality and excellence. Simply the best for
                  those who expect the best.
                </div>
              </div>
            </div>
            <div className="lower-image-place flex-row flex">
              <div className="section-image-left">
                <div className="upper-image-left">
                  <img src={Img1} alt="image1" />
                </div>
                <div className="lower-image-left">
                  <img src={Img2} alt="image1" />

                </div>
              </div>
              <div className="section-image-center">
              <img src={Img3} alt="image1" />
              </div>
              <div className="section-image-right">
                <div className="upper-image-right">
                <img src={Img4} alt="image1" />
                </div>
                <div className="lower-image-right">
                <img src={Img5} alt="image1" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <BlogComponent />
      <Footer />
    </>
  );
};

export default Home;
