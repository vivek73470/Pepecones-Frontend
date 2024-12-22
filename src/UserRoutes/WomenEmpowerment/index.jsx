/** @format */

import React from 'react';
import './index.css';
import Women11 from '../../assets/User/woman-in-orange-coat-with-black-and-brown-scarf-5418305.png';
import shape1 from '../../assets/User/Shape 1 women.png';
import shape2 from '../../assets/User/shape 2 women.png';
import shape3 from '../../assets/User/shape 3 women.png';
import womensmoke from '../../assets/User/women 1.png';
import womensmoke1 from '../../assets/User/women 2.png';
import womensmoke2 from '../../assets/User/women 3.png';
import womenfrthone from '../../assets/User/women 4th 1.png';
import womenfrthtwo from '../../assets/User/women 4th 2.png';
import womenfrththree from '../../assets/User/wpmen 4th 3.png';
import womenfrthfour from '../../assets/User/women 4th 4.png';
import womenthbackground from '../../assets/User/women 5th back.png';
import womenfifthinside from '../../assets/User/women 5th 1.png';
import BlogComponent from '../../components/BlogProduct';
import Footer from '../../components/Footer/Index';
import Homeheader from '../../components/homeHeader/Header';
import WomenThrd from '../../components/Women-3rdPage';
import { useNavigate } from 'react-router-dom';

const WomenEmpowerment = () => {
  const navigate = useNavigate();
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  return (
    <>
      <Homeheader />
      <div className="WomenEmpower-rapper">
        <div className="WomenEmpower1">
          <img src={Women11} />

          <div className="womenempower-page1-abs">
            <div className="women-sub2">
              <h3>Strength in Unity</h3>
            </div>

            <div className="women-title1">
              <span>
                <h1>Become a part of our community</h1>
              </span>
            </div>
            <div className="women-bitton1">
              <button
                onClick={() => {
                  navigate('/productlisting');
                  scrollToTop();
                }}
              >
                Discover Now
              </button>
            </div>
            <div className="women-1st-flx">
              <div class="divider-text">
                <p></p>
              </div>
              <div className="women-loremipsum">
                <span>
                  PepeCones celebrates the powerful role of women, fostering a
                  space for growth, leadership, and collaboration in our
                  industry.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="Womenempower-2ndpage">
        <div className="Womenempower-2pagerapper">
          <div className="Womenempower-title">
            <div className="women-2subtitle">
              <h3 id="women-2subtitle-subb">Become a Changemaker</h3>
            </div>
            <div className="women-2ndheading">
              <h1>Empowering Woman</h1>
            </div>
            <div className="women-pag2paragraph">
              <p>
                Join us in shaping a world where gender equality is the norm,
                and every woman's potential is fully embraced.
              </p>
            </div>
          </div>
          <div className="womenempower-2nd-colmns">
            <div className="womenempower-2nd-colmns1">
              <div className="women-2nd-shape1">
                <img src={shape1} id="women-shap1 page2" />
              </div>
              <div className="women-2nd-inside1">
                <div className="women-2nd-aboutus">
                  <h1>OUR MISSION</h1>
                </div>
                <div className="women-2nd-lorem-parg1">
                  <p>
                    Dedicated to empowering women through education, employment,
                    and entrepreneurship, we strive to create an inclusive
                    community where every woman's potential is recognized and
                    nurtured.
                  </p>
                </div>
              </div>
            </div>
            <div className="womenempower-2nd-colmns1">
              <div className="women-2nd-shape1">
                <img src={shape2} />
              </div>
              <div className="women-2nd-inside1">
                <div className="women-2nd-aboutus">
                  <h1>JOIN US</h1>
                </div>
                <div className="women-2nd-lorem-parg1">
                  <p>
                    Be a part of a movement that uplifts and supports women's
                    rights. Volunteer, participate in events, or become a
                    mentor. Your involvement can make a real difference.
                  </p>
                </div>
              </div>
            </div>
            <div className="womenempower-2nd-colmns1">
              <div className="women-2nd-shape1">
                <img src={shape3} />
              </div>
              <div className="women-2nd-inside1">
                <div className="women-2nd-aboutus">
                  <h1>Follow us </h1>
                </div>
                <div className="women-2nd-lorem-parg1">
                  <p>
                    Follow our journey on Instagram! Engage with a community
                    passionate about entrepreneurship, skill development, and
                    equal opportunities for all. Your support matters.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <div className="womenempower-3rdpage">
        <div className="womenempower-3rdpage-rapper">
          <div className="Womenempower-title-3rdpage">
            <div className="women-2subtitle">
              <h3 id="women-2subtitle-subb">Sub</h3>
            </div>
            <div className="women-2ndheading">
              <h1>Add Your Title </h1>
            </div>
            <div className="women-pag2paragraph">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
                odio in et, lectus sit lorem id integer.
              </p>
            </div>
            <div className="womenempower-3rdbutton">
              <button id="women-3rd-butn-disc">Discover</button>
            </div>
          </div>
          <div className="women-3rdpage-belowtitle">
            <div className="women-3rdpage-belowtitle1">
              <img src={womensmoke} alt="picture1" />
            </div>
            <div className="women-3rdpage-belowtitle2">
              <img src={womensmoke1} alt="picture2" />
            </div>
            <div className="women-3rdpage-belowtitle3">
              <img src={womensmoke2} alt="picture3" />
            </div>
          </div>
          <div className="women-3rdpagebelow-pictre">
            <div className="women-3rdpage-picture-parg">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
            </div>
          </div>
        </div>
      </div> */}
      <WomenThrd />
      <div className="women-4th-page">
        <div className="women-4thpage-rapper">
          <div className="women-4thpage-title">
            <div className="women-2subtitle">
              <h3 id="women-2subtitle-subb">Green Horizons</h3>
            </div>
            <div className="women-2ndheading">
              <h1>Cultivating Wellness</h1>
            </div>
          </div>
          <div className="women-4thpage-clm-pict">
            <div className="women-4thpage-clm-pict0">
              <img src="https://res.cloudinary.com/dmmul5cqy/image/upload/v1699265795/DSC00435_blbxmk.jpg" />
            </div>
            <div className="women-4th-clm1-abs">
              {/* <h1>NATURAL ESSENCE</h1> */}
              {/* <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut.
              </p> */}
            </div>
            <div className="women-4thpage-clm-pict1">
              <img src="https://res.cloudinary.com/dmmul5cqy/image/upload/v1699264883/DSC00339_lutjlh.jpg" />
            </div>
            <div className="women-4th-clm1-abs1">
              {/* <h1>WATCH AND LISTEN TO OUR SERMONS</h1> */}
            </div>
            <div className="women-4thpage-clm-pict1">
              <img src="https://res.cloudinary.com/dmmul5cqy/image/upload/v1699357379/DSC00444_1_mfpugx.jpg" />
            </div>
            <div className="women-4th-clm1-abs12">
              {/* <h1>SERENITY INDOORS</h1> */}
            </div>
            <div className="women-4thpage-clm-pict1">
              <img src="https://res.cloudinary.com/dmmul5cqy/image/upload/v1699265072/DSC00328_oqs9na.jpg" />
            </div>
            <div className="women-4th-clm1-abs13">
              {/* <h1>BOTANICAL GROWTH</h1> */}
            </div>
          </div>
        </div>
      </div>
      <div className="women-5th-page">
        <img src={womenthbackground} alt="backgroundimage" />
        <div className="women-5th-pagerapper">
          <div className="women-5th-pageinside">
            <div className="women-5th-wewant">
              <h1>We want to serve the world around us</h1>
            </div>
            <div className="women-5th-lorem">
              <p>
                Dedicated to uplifting communities through women's skill
                development.
              </p>
            </div>
            <div className="women-5th-btn">
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
          <div className="women-5th-inside-rht">
            <img src={womenfifthinside} alt="sound" />
          </div>
        </div>
      </div>
      <BlogComponent />
      <Footer />
    </>
  );
};

export default WomenEmpowerment;
