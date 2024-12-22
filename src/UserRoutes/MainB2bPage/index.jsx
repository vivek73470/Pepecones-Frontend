/** @format */

import React from 'react';
import img4 from '../../assets/User/about4.jpg';
import img5 from '../../assets/User/About1.png';
import rolled from '../../assets/User/rolled.png';
import custom from '../../assets/User/custom-cones.png';

import HomeHeader from '../../components/homeHeader/Header';
import Footer from '../../components/Footer/Index';
import womenthbackground from '../../assets/User/women 5th back.png';
import womenfifthinside from '../../assets/User/women 5th 1.png';
// import "../WomenEmpowerment/index.css"
import './index.css';
import Contactform from '../../components/Contact';
import { useNavigate } from 'react-router-dom';

const MainB2bPage = () => {
  const navigate = useNavigate();
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  return (
    <>
      <HomeHeader />
      <div className="b2b-content">
        <div className="banner-b2b-new">
          <div className="banner-bg-b2b-new">
            <div className="banner-text-container-new">
              <div className="banner-text-new">
                <div className="sub-title-b2b-new">Roll Together</div>
                <div className="title-b2b-new">
                  Become a part of
                  <br />
                  our community
                </div>
                <div className="button-b2b-new">
                  <p
                    onClick={() => {
                      navigate('/productlisting');
                      scrollToTop();
                    }}
                  >
                    Discover Now
                  </p>
                </div>
                <div className="content-b2b-new">
                  {/* Join PepeCones' circle, where every roll unites enthusiasts in
                  a shared passion for quality and sustainability.
                  <br />
                  Connect, inspire, and thrive. */}
                  If your requirements are Premium Pre-Rolled Cones, then we can
                  fulfill it. At Pepe Cones, we don't just sell pre-rolled
                  cones; we deliver an experience. Our commitment to excellence
                  is evident in every aspect of our product, and we're excited
                  to extend that commitment to your business.
                </div>
              </div>
            </div>
            <div className="try-new"></div>
          </div>
        </div>

        <div className="after-banner-section-new">
          <div className="after-banner-container-new">
            <div className="rolled-cones-new">
              <img src={rolled} alt="cones1-new" />
              <div className="text-new">
                <p className="upper-new">PRE-ROLLED</p>
                <p className="down-new">CONES</p>
              </div>
            </div>
            <div className="center-line-new"></div>
            <div className="customizes-cones-new">
              <img src={custom} alt="cones2-new" />
              <div className="text-new">
                <p className="upper-new">CUSTOMIZED</p>
                <p className="down-new">CONES</p>
              </div>
            </div>
          </div>
        </div>

        <div className="Container-b2b">
          <div className="about-one-b2b">
            <h1>Why Partner with Pepe Cones?</h1>
            <p>
              Unwavering Commitment: Our dedication to quality, sustainability,
              and community is unwavering. When you partner with us, you join a
              brand with values that align with yours.
            </p>
            <p>
              Premium Products: We don't compromise on quality. Your customers
              will recognize and appreciate the excellence of Pepe Cones.
            </p>
            <button
              onClick={() => {
                navigate('/productlisting');
                scrollToTop();
              }}
            >
              Discover Now
            </button>
          </div>
          <div className="about-img-b2b-wrapper">
            <div className="about-img-b2b">
              <img src="https://res.cloudinary.com/dmmul5cqy/image/upload/v1699358150/DSC00367_l8bonc.jpg" />
            </div>
          </div>
        </div>
        <div className="about-two-b2b">
          <div className="about-img2-b2b">
            <img
              src="https://res.cloudinary.com/dmmul5cqy/image/upload/v1698912858/DSC00373_vrut6q.jpg"
              alt="Woman with clipboard symbolizing Pepe Cones dedication to quality."
            />
          </div>
          <div className="about-row2-b2b">
            <h2>Global Distribution and Customized Cones for Your Brand</h2>
            <p>
              Global Reach: We offer B2B sales that cater to businesses
              worldwide. No matter where you are, we can supply you with our
              premium pre-rolled cones.
            </p>
            <p>
              Customization: Looking for something unique? We can work with you
              to create custom pre-rolled cones that reflect your brand's
              identity.
            </p>
            <button
              onClick={() => {
                navigate('/contact');
                scrollToTop();
              }}
            >
              Contact Us
            </button>
          </div>
        </div>

        <div className="about-four-b2b">
          <div className="about-row4-b2b">
            <h3>Pepe cones</h3>
            <h1>Quality Cones with a Personalized, Sustainable Touch</h1>
            <p>
              Shared Values: We stand for quality, sustainability, and
              community, just like you.
            </p>
            <p>
              Uncompromising Quality: Our pre-rolled cones are masterpieces
              crafted from natural wood pulp for a superior smoking experience.
            </p>
            <p>
              Your Brand, Your Way: Personalize your pre-rolled cones to leave a
              lasting brand impression.
            </p>
            <button
              onClick={() => {
                navigate('/productlisting');
                scrollToTop();
              }}
            >
              Discover Now
            </button>
          </div>

          <div className="about-img4-b2b">
            <img
              src="https://res.cloudinary.com/dmmul5cqy/image/upload/v1699263062/DSC00357_faebaa.jpg"
              alt="precones-roles-b2b"
            />
          </div>
        </div>
      </div>
      <div className="women-5th-page-b2b">
        <img src={womenthbackground} alt="backgroundimage" />
        <div className="women-5th-pagerapper-b2b">
          <div className="women-5th-pageinside-b2b">
            <div className="women-5th-wewant-b2b">
              <h1>We want to serve the world around us</h1>
            </div>
            <div className="women-5th-lorem-b2b">
              <p>
                Your Brand, Your Way: Personalize your pre-rolled cones to leave
                a lasting brand impression.
                <p>
                  Pepe Cones isn't just a supplier; we're your trusted ally in
                  delivering excellence to your customers. Contact us today to
                  start a partnership that guarantees success
                </p>
              </p>
            </div>
            <div className="women-5th-btn-b2b">
              <button
                onClick={() => {
                  navigate('/productlisting');
                  scrollToTop();
                }}
                id="women-5th-btn"
              >
                Discover
              </button>
            </div>
          </div>
          <div className="women-5th-inside-rht-b2b">
            <img src={womenfifthinside} alt="sound" />
          </div>
        </div>
      </div>
      <Contactform />
      <Footer />
    </>
  );
};

export default MainB2bPage;
