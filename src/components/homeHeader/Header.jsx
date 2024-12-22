/** @format */

import React, { useCallback, useEffect, useState } from 'react';

import Mail from '../../assets/User/mail.svg';
import Phone from '../../assets/User/phone.svg';
import Logo from '../../assets/User/Lgo.png';
import ProdSearch from '../../assets/User/search.svg';
import Cart from '../../assets/User/cart.svg';
import Menu from '../../assets/User/menu.svg';
import Close from '../../assets/User/close.svg';
import MobileLogo from '../../assets/User/Frame 39.png';
import { Search } from 'lucide-react';
import './header.css';
import { Link, useNavigate } from 'react-router-dom';

function Homeheader() {
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
  const navigate = useNavigate();

  const openSideMenu = () => {
    setIsSideMenuOpen(true);
  };

  // Define closeSideMenu using useCallback
  const closeSideMenu = useCallback(() => {
    setIsSideMenuOpen(false);
  }, []);

  // Define handleWindowResize using useCallback
  const handleWindowResize = useCallback(() => {
    if (window.innerWidth > 768) {
      closeSideMenu();
    }
  }, [closeSideMenu]);

  // Attach the resize event listener when the component mounts
  useEffect(() => {
    window.addEventListener('resize', handleWindowResize);

    // Remove the event listener when the component unmounts
    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, [handleWindowResize]);

  return (
    <>
      <header className="header-container w-screen h-42">
        <div className="header-top h-16 flex justify-between items-center px-8">
          <p className="header-info headingFeels">Feels Good Man</p>
          <div className="info-data flex gap-10">
            <p className="header-info flex items-center gap-3 header-mail">
              <img src={Mail} alt="mail SVG" />
              <a href="mailto:outrightmanufacturing@gmail.com">outrightmanufacturing@gmail.com</a>
            </p>
            <p className="header-info flex items-center gap-3 header-contact">
              <img src={Phone} alt="phone SVG" />
              <a href="tel:+91-9953876008">+91 9953876008</a>
            </p>
          </div>
        </div>
        <div className="header-bottom flex justify-between items-center px-8 h-24">
          <ul className="nav-items-left flex gap-10">
            <Link to="/">
              <li>HOME</li>
            </Link>
            <Link to="/aboutus">
              <li>ABOUT US</li>
            </Link>
            <Link to="/women-empowerment">
              <li>WOMEN EMPOWERMENT</li>
            </Link>
          </ul>

          <img
            src={Logo}
            alt="Logo"
            className="main-logo z-10 mx-auto mt-[-3rem] h-[120px] w-[120px]"
            onClick={() => navigate('/')}
            style={{ cursor: 'pointer' }}
          />

          <img
            src={MobileLogo}
            // src={Logo}
            alt="Mobile Logo"
            className="mobile-text-logo z-10 h-[99px] w-[99px] mx-auto"
            onClick={() => navigate('/')}
            style={{ cursor: 'pointer' }}
          />
          <ul className="nav-items-right flex gap-10 mr-4 ">
            <Link to="/productlisting">
              <li>PEPE PRODUCTS</li>
            </Link>
            <Link to="/b2b">
              <li>PEPE FOR BUSINESS</li>
            </Link>
            <Link to="/contact">
              <li>CONTACT US</li>
            </Link>
          </ul>
          <div className="img-wrapper flex gap-5">
            {/* <img src={ProdSearch} alt="search SVG" className='prod-search'  onClick={()=>navigate("/productlisting#productListingContainer")} */}
            {/* style={{ cursor: "pointer" }}/> */}
            {/* <img src={Cart} alt="cart SVG" className='cart'/> */}
            <img
              src={Menu}
              alt="menu SVG"
              className="menu-toggle"
              onClick={openSideMenu}
            />
          </div>
        </div>
      </header>

      {isSideMenuOpen && (
        <aside className="side-menu px-8 pt-6">
          <div className="menu-toggle-close flex justify-end">
            <img src={Close} alt="close svg" onClick={closeSideMenu} />
          </div>
          <div className="img-wrapper flex flex-col items-center ">
            <img
              src={Logo}
              alt="mob-logo"
              className="mobile-logo h-[99px] w-[99px]"
            />
          </div>
          <ul className="mobile-nav flex flex-col  gap-6 my-8">
            <Link to="/">
              <li>HOME</li>
            </Link>

            <Link to="/contact">
              <li>CONTACT US</li>
            </Link>
            <Link to="/aboutus">
              <li>ABOUT US</li>
            </Link>
            <Link to="/productlisting">
              <li>PEPE PRODUCTS</li>
            </Link>
            <Link to="/b2b">
              <li>PEPE FOR BUSINESS</li>
            </Link>
            <Link to="/women-empowerment">
              <li>WOMEN EMPOWERMENT</li>
            </Link>
          </ul>
          {/* <div className="search-wrapper w-full flex items-center">
            <input type="text" id="search" placeholder="Search Products" />
            <Search strokeWidth={1.5} />
          </div> */}
          {/* <div className="btn-wrapper">
            <div className="btn-sign-in">
              <input
                onClick={() => navigate('/login')}
                type="submit"
                className="sign-in__button"
                value="LogIn"
              />
            </div>
            <div className="btn-sign-up">
              <input
                type="submit"
                className="sign-up__button"
                value="Sign Up"
              />
            </div>
          </div> */}
        </aside>
      )}
    </>
  );
}

export default Homeheader;
