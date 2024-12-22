/** @format */

import React, { useState } from 'react';
import './index.css';
import imag from '../../assets/User/Lgo footer1.png';
import { CgMail } from 'react-icons/cg';
import { BsPhone } from 'react-icons/bs';
import { AiOutlineMail } from 'react-icons/ai';
import { FiFacebook } from 'react-icons/fi';
import { BsInstagram } from 'react-icons/bs';
import { BiLogoTiktok } from 'react-icons/bi';
import { NavLink, useNavigate } from 'react-router-dom';
import { AiOutlineAmazon } from 'react-icons/ai';
import { setFetching } from '../../redux/reducer/fetching';
import { postEmailNewsLetter } from '../../Api/userApi';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

const Footer = () => {
  const [email, setEmail] = useState('');
  const arr = [
    { title: 'Home', route: '' },
    { title: 'About Us', route: 'aboutus' },
    { title: 'Blog', route: 'bloghome' },
    { title: 'Products', route: 'productlisting' },
    { title: 'Contact Us', route: 'contact' },
  ];

  const [isPrivacyPolicyDisabled, setPrivacyPolicyDisabled] = useState(false);
  const [isFAQDisabled, setFAQDisabled] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const arr1 = [
    { title: 'Pepe For Business', route: 'b2b' },
    { title: 'Women Empowerment', route: 'women-empowerment' },
    { title: 'Privacy & Policy', route: 'comingsoon' },
    { title: 'FAQ', route: 'comingsoon' },
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePrivacyPolicyClick = () => {
    setPrivacyPolicyDisabled(true);
  };

  const handleFAQClick = () => {
    setFAQDisabled(true);
  };

  const subscribeNewsLetter = async (email) => {
    dispatch(setFetching(true));
    try {
      let response = await postEmailNewsLetter(email);
      console.log("responsse responsesponse",response);

      if (response.status === 200) {
        setEmail('');
        toast.success('"You already subscribe to the Pepecones Family!"'); // Ensure toast is triggered
        dispatch(setFetching(false));
      } else if (response.status === 201) {
        setEmail('');
        toast.success('Successfully subscribed!'); // Ensure toast is triggered
        dispatch(setFetching(false));
      }
    } catch (error) {
      toast.success(error.response.data.message);
      // if (error.response.data.status === 400) {
      //   toast.success(error.response.data.message);
      // }
      console.error('Subscription error:', error.response.data.message); // Check for any errors here
      dispatch(setFetching(false));
      // toast.error(error.response.data.message); // Display error toast if there's an issue
    }
  };

  return (
    <section className="section">
      <footer className="top">
        <div className="footer-imge">
          <div className="footer-imge11">
            <img src={imag} alt="Logo" />
          </div>
          <p className="pepe-footer-text">
            Dive into our journey, where every pre-rolled cone reflects our
            dedication to quality, sustainability, and the community.
          </p>
        </div>

        <div className="links-fter">
          <div className="links-footer21">
            <ul>
              <h2 className="Footer-quick-links">Quick links</h2>
              {arr.map((nav, index) => (
                <li className="list-ul-footer" key={index}>
                  <NavLink to={`/${nav.route}`} onClick={scrollToTop}>
                    {nav.title}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
          <div className="links-footer112">
            <div className="links-footer21">
              <ul>
                <h2 className="Footer-quick-links">Profile</h2>
                {arr1.map((nav, index) => (
                  <li className="list-ul-footer" key={index}>
                    <NavLink
                      to={`/${nav.route}`}
                      onClick={() => {
                        if (
                          (nav.title === 'Privacy & Policy' &&
                            isPrivacyPolicyDisabled) ||
                          (nav.title === 'FAQ' && isFAQDisabled)
                        ) {
                          return false;
                        }
                        if (nav.title === 'Privacy & Policy') {
                          // handlePrivacyPolicyClick();
                          navigate('/comingsoon');
                        }
                        if (nav.title === 'FAQ') {
                          // handleFAQClick();
                          navigate('/comingsoon');
                        }
                        scrollToTop();
                      }}
                      // aria-disabled={isPrivacyPolicyDisabled || isFAQDisabled}
                    >
                      {nav.title}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="links-column-last">
          <div className="links-column socials-last-colms11">
            <h4 id="socials-last-colms11">Subscribe to our newsletter</h4>
            <p id="miis-footer">Don’t miss any relevant update!</p>
            <div className="below-mailicon">
              <div className="footer-mail-icon">
                <AiOutlineMail />
              </div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                id="email"
                placeholder="Your Email"
              />
              <div
                onClick={() => subscribeNewsLetter(email)}
                className="footer-subscribe"
              >
                <p id="footer-subscribe-id1">Subscribe</p>
              </div>
            </div>
            <div className="cg-mail-footer">
              <div className="mail-ftrr">
                <CgMail />
              </div>
              <div className="examplegmail-footer">
                <a href="mailto:outrightmanufacturing@gmail.com">
                  outrightmanufacturing@gmail.com
                </a>
              </div>
            </div>
            <div className="footer-nbr">
              <div className="phn-nmbr-logo">
                <BsPhone />
              </div>
              <div className="phone-numberblow">
                <a href="tel:9953876008">9953876008</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
      <div className="footer-bottom">
        <div className="footr-btm1">
          <div className="cpy-btm12">
            <p>Copyright © Pepecones| All rights reserved</p>
          </div>
          <div className="cpy-btm123">
            <p
              id="updte-footer0"
              onClick={() => window.open('https://www.techglide.in', '_blank')}
            >
              Design and Developed by <span>TECHGLIDE</span>
            </p>
          </div>
          <div className="footr-logo-botm">
            <div className="facebook-logo-bootm-fotr1">
              <span
                onClick={() =>
                  window.open('https://www.facebook.com/pepecones1', '_blank')
                }
              >
                <FiFacebook />
              </span>
            </div>
            <div className="facebook-logo-bootm-fotr1">
              <span
                onClick={() =>
                  window.open('https://www.instagram.com/pepecones/', '_blank')
                }
              >
                <BsInstagram />
              </span>
            </div>
            <div className="facebook-logo-bootm-fotr1">
              <span
                onClick={() =>
                  window.open('https://www.tiktok.com/@pepecones', '_blank')
                }
              >
                <BiLogoTiktok />
              </span>
            </div>
            <div className="facebook-logo-bootm-fotr1">
              <span
                onClick={() =>
                  window.open(
                    'https://www.amazon.com/s?me=A1Z5DUE96041NA&marketplaceID=ATVPDKIKX0DER',
                    '_blank',
                  )
                }
              >
                <AiOutlineAmazon />
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Footer;
