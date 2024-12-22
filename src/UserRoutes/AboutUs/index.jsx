/** @format */

import React from 'react';
import './index.css';
import img1 from '../../assets/User/About1.png';
import img2 from '../../assets/User/small.jpg';
import img3 from '../../assets/User/middle founder.png';
import img4 from '../../assets/User/about4.jpg';
import img5 from '../../assets/User/About3.png';
import HomeHeader from '../../components/homeHeader/Header';
import Footer from '../../components/Footer/Index';
import Founder from '../../components/Founder';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setFetching } from '../../redux/reducer/fetching';
import { useEffect } from 'react';
// import video from '../../assets/User/Urvi .MP4';

function About() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setFetching(true));
    const timer = setTimeout(() => {
      dispatch(setFetching(false));
    }, 3000);

    // Clear the timer when the component unmounts to avoid memory leaks
    return () => clearTimeout(timer);
  }, [dispatch]);
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  return (
    <>
      <HomeHeader />
      <div className="about-container">
        <div className="Container">
          <div className="about-one">
            <h1>The Essence of Pepe Cones</h1>
            <p>
              At Pepe Cones, we cherish the art behind our handmade pre-rolled
              cones. With a decade's dedication, our focus is quality,
              sustainability, and community. Discover our unique story and
              values.
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
          <div className="about-img">
            <img
              src="https://res.cloudinary.com/dmmul5cqy/image/upload/v1698911291/DSC00245_yj4gl3.jpg"
              alt="Woman with clipboard symbolizing Pepe Cones dedication to quality."
            />
          </div>
        </div>

        <div className="about-two-main">
          <div className="about-two">
            <div className="about-img2">
              <video width="320" height="240" controls>
                {/* <source src={video} type="video/mp4" /> */}
                Your browser does not support the video tag.
              </video>
            </div>
            <div className="about-row2">
              <h2>Pepe Cones: Crafting Excellence in Every Roll</h2>
              <p>
                Experience Pepe Cones in a whole new way. Dive into our journey,
                where every pre-rolled cone reflects our dedication to quality,
                sustainability, and the community. Watch this video to discover
                the essence and passion behind Pepe Cones.{' '}
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
        </div>

        {/* <div className="about-three">
          <div className="about-about-row3">
            <h1>Where Authenticity Meets Achievement</h1>
            <p>
              At Pepe Cones, our customers are at the heart of everything we do.
              Our dedication to delivering top-notch quality has not only earned
              us the loyalty of countless clients but also prestigious accolades
              in our industry. With over 1500 awards and having served more than
              500 clients, our commitment to authenticity shines in every
              relationship we foster.
            </p>
            <div className="award">
              <div className="rec">
                <h3>1500+</h3>
                <p>Award Recieved</p>
              </div>
              <div className="ser">
                <h3>500+</h3>
                <p>Client served</p>
              </div>
            </div>
          </div>
        </div> */}
        <div id="found">
          <Founder />
        </div>
        <div className="about-four">
          <div className="about-img4">
            <img src="https://res.cloudinary.com/dmmul5cqy/image/upload/v1699263181/DSC00323_izmybw.jpg" />
          </div>
          <div className="about-row4-main">
            <div className="about-row4">
              <h3>Why we Started</h3>
              <h1>Pepe Cones: From a Spark to a Blaze</h1>
              <p>
                At Pepe Cones, we transformed a simple idea into a beacon of
                innovation with our handmade pre-rolls. Dive in to discover our
                journey from passion to unparalleled excellence.
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
          </div>
        </div>

        <div className="about-five">
          <div className="about-about-row5">
            <h1>Crafting Excellence at Pepe Cones</h1>
            <p>
              From the heart of our founder: At Pepe Cones, every pre-roll is a
              testament to our dedication to quality and craftsmanship. Our
              journey began with a vision, we've turned that vision into a
              legacy. Dive into our story and see how commitment and passion can
              spark a revolution in the industry.
            </p>
            <div className="ceo">
              <div className="small-image">
                <img src={img3} alt="CEO Image" />
              </div>
              <div className="about-names">
                <h4>Shipra Jain</h4>
                <h6>Founder PEPE CONES</h6>
              </div>
            </div>
          </div>
          <div className="about-img8">
            <img src={img3} alt="image" />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default About;
