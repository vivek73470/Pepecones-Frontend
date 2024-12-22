/** @format */

import React, { useState } from 'react';
import './index.css';
import { MdOutlineDashboard, MdBarChart, MdOutlineClose } from 'react-icons/md';
import {
  AiOutlineShoppingCart,
  AiOutlineHome,
  AiOutlineProfile,
  AiOutlineSetting,
  AiOutlineSend,
  AiFillCloseCircle,
  AiOutlinePauseCircle,
} from 'react-icons/ai';
import { LiaDotCircleSolid } from 'react-icons/lia';
import { FaUser } from 'react-icons/fa';
import { HiOutlineUsers } from 'react-icons/hi';
import { TbCategory } from 'react-icons/tb';
import { CiViewList } from 'react-icons/ci';
import { useSelector } from 'react-redux';
import NavLinks from '../NavLinks';
import LogoDark from '../../assets/header/rd 1 (1).png';
import Logout from '../../assets/header/logout-icon.svg';
import LogoNazoxLight from '../../assets/pepecons/pepe cones 1.png';
import { NavLink, useNavigate } from 'react-router-dom';
import Active from '../../assets/pepecons/Active.svg';
import NavLinkSmall from '../NavLinkSmall';
import { toast } from 'react-toastify';
import { customFontStyle } from '../../constant';

const Sidebar = ({ onLogout, showSidebar, setShowSidebar }) => {
  const [active, setActive] = useState('');
  const [isShow, setIsShow] = useState(false);
  const [isShowProduct, setIsShowProduct] = useState(false);

  const isOpen = useSelector((state) => state.sidebar.isOpen);
  const navigate = useNavigate();

  const handleClick = (menuItem, dropdown) => {
    setActive(menuItem);
    setShowSidebar(false);
  };

  const handleLogout = () => {
    logout();
  };

  const logout = () => {
    toast.success('Logout Successfully!');
    localStorage.removeItem('auth_token');
    onLogout();
    navigate('/login');
  };

  const navData = [
    {
      title: 'Dashboard',
      route: 'dashboard',
      Icon: MdOutlineDashboard,
    },
    {
      title: 'Leads',
      route: 'productlist',
      Icon: HiOutlineUsers,
    },

    {
      title: 'Blogs',
      route: 'blogs',
      Icon: CiViewList,
      dropdown: [
        {
          title: 'All Blogs',
          route: 'all-blogs',
          Icon: null,
        },
        {
          title: 'Blog Category',
          route: 'blog-category',
          Icon: null,
        },
      ],
    },
    {
      title: 'Category',
      route: 'category',
      Icon: TbCategory,
    },
  ];

  return (
    <>
      <div className={`${isOpen ? 'vertical-menu' : 'vertical-menu-hide'}`}>
        <div className="sidebar-height">
          <div
            className={`${
              isOpen ? 'navbar-brand-box' : 'navbar-brand-box-hide'
            }`}
          >
            <a className="logo logo-dark">
              {isOpen ? (
                <h1 style={customFontStyle}>
                  <span className="logo-pepe">PePe</span>&nbsp;
                  <span className="logo-cones">Cones</span>
                </h1>
              ) : (
                <span className="logo-sm">
                  <img src={LogoNazoxLight} alt="" style={{ width: '55px' }} />
                </span>
              )}
            </a>
          </div>
          <div className="mm-active">
            <ul
              className={`${
                isOpen
                  ? 'metismenu list-unstyled mm-show'
                  : 'metismenu-hide list-unstyled mm-show'
              }`}
            >
              <li className="nav-links-container">
                <NavLink
                  to={'dashboard'}
                  onClick={() => handleClick('dashboard')}
                  className={`${
                    active === 'dashboard'
                      ? 'sidebar-route-active '
                      : 'sidebar-route'
                  }`}
                >
                  <span
                    className={`sidebar-icon ${
                      active === 'dashboard'
                        ? 'sidebar-icon-active'
                        : 'sidebar-icon-inactive'
                    }`}
                  >
                    {React.createElement(AiOutlineHome, { fontSize: 25 })}
                  </span>
                  <span className="badge rounded-pill bg-success float-end"></span>
                  <span
                    style={{ marginLeft: '1.5rem' }}
                    className={`${
                      active === 'dashboard'
                        ? 'isActive ms-3'
                        : 'isInactive ms-3'
                    } ${isOpen ? '' : 'display-none'}`}
                  >
                    Dashboard
                  </span>
                  <div
                    className={`${
                      active === 'dashboard'
                        ? 'isActive ms-3'
                        : 'isInactive ms-3'
                    } ${isOpen ? 'active-state' : 'display-none'}`}
                  >
                    <img src={active === 'dashboard' ? Active : ''} />
                  </div>
                </NavLink>
                <NavLink
                  to={'leads'}
                  onClick={() => handleClick('leads')}
                  className={`${
                    active === 'leads'
                      ? 'sidebar-route-active '
                      : 'sidebar-route'
                  }`}
                >
                  <span
                    className={`sidebar-icon ${
                      active === 'leads'
                        ? 'sidebar-icon-active'
                        : 'sidebar-icon-inactive'
                    }`}
                  >
                    {React.createElement(MdBarChart, { fontSize: 25 })}
                  </span>
                  <span className="badge rounded-pill bg-success float-end"></span>
                  <span
                    style={{ marginLeft: '1.5rem' }}
                    className={`${
                      active === 'leads' ? 'isActive ms-3' : 'isInactive ms-3'
                    } ${isOpen ? '' : 'display-none'}`}
                  >
                    Leads
                  </span>
                  <div
                    className={`${
                      active === 'leads' ? 'isActive ms-3' : 'isInactive ms-3'
                    } ${isOpen ? 'active-state' : 'display-none'}`}
                  >
                    <img src={active === 'leads' ? Active : ''} />
                  </div>
                </NavLink>{' '}
                <NavLink
                  onClick={() => setIsShowProduct(!isShowProduct)}
                  className={`${
                    active === 'product'
                      ? 'sidebar-route-active '
                      : 'sidebar-route'
                  }`}
                >
                  <span
                    className={`sidebar-icon ${
                      active === 'product'
                        ? 'sidebar-icon-active'
                        : 'sidebar-icon-inactive'
                    }`}
                  >
                    {React.createElement(AiOutlineShoppingCart, {
                      fontSize: 25,
                    })}
                  </span>
                  <span className="badge rounded-pill bg-success float-end"></span>
                  <span
                    style={{ marginLeft: '1.5rem' }}
                    className={`${
                      active === 'product' ? 'isActive ms-3' : 'isInactive ms-3'
                    } ${isOpen ? '' : 'display-none'}`}
                  >
                    Product
                  </span>
                  <div
                    className={`${
                      active === 'product' ? 'isActive ms-3' : 'isInactive ms-3'
                    } ${isOpen ? 'active-state' : 'display-none'}`}
                  >
                    <img src={active === 'product' ? Active : ''} />
                  </div>
                </NavLink>
                {isShowProduct && (
                  <>
                    {' '}
                    <NavLink
                      to={'productlist'}
                      onClick={() => handleClick('productlist')}
                      className={`${
                        active === 'productlist'
                          ? 'sidebar-route-active '
                          : 'sidebar-route'
                      }`}
                    >
                      <span
                        className={`sidebar-icon ${
                          active === 'productlist'
                            ? 'sidebar-icon-active'
                            : 'sidebar-icon-inactive'
                        }`}
                      >
                        {' '}
                        {React.createElement(LiaDotCircleSolid, {
                          fontSize: 25,
                        })}
                      </span>
                      <span className="badge rounded-pill bg-success float-end"></span>
                      <span
                        style={{ marginLeft: '1.5rem' }}
                        className={`${
                          active === 'productlist'
                            ? 'isActive ms-3'
                            : 'isInactive ms-3'
                        } ${isOpen ? '' : 'display-none'}`}
                      >
                        All Product
                      </span>
                      <div
                        className={`${
                          active === 'productlist'
                            ? 'isActive ms-3'
                            : 'isInactive ms-3'
                        } ${isOpen ? 'active-state' : 'display-none'}`}
                      >
                        <img src={active === 'productlist' ? Active : ''} />
                      </div>
                    </NavLink>
                    <NavLink
                      to={'featProduct'}
                      onClick={() => handleClick('featProduct')}
                      className={`${
                        active === 'featProduct'
                          ? 'sidebar-route-active '
                          : 'sidebar-route'
                      }`}
                    >
                      <span
                        className={`sidebar-icon ${
                          active === 'featProduct'
                            ? 'sidebar-icon-active'
                            : 'sidebar-icon-inactive'
                        }`}
                      >
                        {' '}
                        {React.createElement(LiaDotCircleSolid, {
                          fontSize: 25,
                        })}
                      </span>
                      <span className="badge rounded-pill bg-success float-end"></span>
                      <span
                        style={{ marginLeft: '1.5rem' }}
                        className={`${
                          active === 'featProduct'
                            ? 'isActive ms-3'
                            : 'isInactive ms-3'
                        } ${isOpen ? '' : 'display-none'}`}
                      >
                        Feat. Product
                      </span>
                      <div
                        className={`${
                          active === 'featProduct'
                            ? 'isActive ms-3'
                            : 'isInactive ms-3'
                        } ${isOpen ? 'active-state' : 'display-none'}`}
                      >
                        <img src={active === 'featProduct' ? Active : ''} />
                      </div>
                    </NavLink>
                  </>
                )}
                <NavLink
                  to={'blogs'}
                  onClick={() => handleClick('blogs')}
                  className={`${
                    active === 'blogs'
                      ? 'sidebar-route-active '
                      : 'sidebar-route'
                  }`}
                >
                  <span
                    className={`sidebar-icon ${
                      active === 'blogs'
                        ? 'sidebar-icon-active'
                        : 'sidebar-icon-inactive'
                    }`}
                  >
                    {' '}
                    {React.createElement(MdOutlineDashboard, { fontSize: 25 })}
                  </span>
                  <span className="badge rounded-pill bg-success float-end"></span>
                  <span
                    style={{ marginLeft: '1.5rem' }}
                    className={`${
                      active === 'blogs' ? 'isActive ms-3' : 'isInactive ms-3'
                    } ${isOpen ? '' : 'display-none'}`}
                  >
                    Blogs
                  </span>
                  <div
                    className={`${
                      active === 'blogs' ? 'isActive ms-3' : 'isInactive ms-3'
                    } ${isOpen ? 'active-state' : 'display-none'}`}
                  >
                    <img src={active === 'blogs' ? Active : ''} />
                  </div>
                </NavLink>
                {/* <NavLink
                  to={'profile'}
                  onClick={() => handleClick('profile')}
                  className={`${
                    active === 'profile'
                      ? 'sidebar-route-active '
                      : 'sidebar-route'
                  }`}
                >
                  <span
                    className={`sidebar-icon ${
                      active === 'profile'
                        ? 'sidebar-icon-active'
                        : 'sidebar-icon-inactive'
                    }`}
                  >
                    {React.createElement(FaUser, { fontSize: 25 })}
                  </span>
                  <span className="badge rounded-pill bg-success float-end"></span>
                  <span
                    style={{ marginLeft: '1.5rem' }}
                    className={`${
                      active === 'profile' ? 'isActive ms-3' : 'isInactive ms-3'
                    } ${isOpen ? '' : 'display-none'}`}
                  >
                    Profile
                  </span>
                  <div
                    className={`${
                      active === 'profile' ? 'isActive ms-3' : 'isInactive ms-3'
                    } ${isOpen ? 'active-state' : 'display-none'}`}
                  >
                    <img src={active === 'profile' ? Active : ''} />
                  </div>
                </NavLink> */}
                <NavLink
                  to={'setting'}
                  onClick={() => handleClick('setting')}
                  className={`${
                    active === 'setting'
                      ? 'sidebar-route-active '
                      : 'sidebar-route'
                  }`}
                >
                  <span
                    className={`sidebar-icon ${
                      active === 'setting'
                        ? 'sidebar-icon-active'
                        : 'sidebar-icon-inactive'
                    }`}
                  >
                    {React.createElement(AiOutlineSetting, { fontSize: 25 })}
                  </span>
                  <span className="badge rounded-pill bg-success float-end"></span>
                  <span
                    style={{ marginLeft: '1.5rem' }}
                    className={`${
                      active === 'setting' ? 'isActive ms-3' : 'isInactive ms-3'
                    } ${isOpen ? '' : 'display-none'}`}
                  >
                    Setting
                  </span>
                  <div
                    className={`${
                      active === 'setting' ? 'isActive ms-3' : 'isInactive ms-3'
                    } ${isOpen ? 'active-state' : 'display-none'}`}
                  >
                    <img src={active === 'setting' ? Active : ''} />
                  </div>
                </NavLink>
              </li>
            </ul>
          </div>
          <div
            className={`${isOpen ? 'logout-section' : 'logout-section-hide'}`}
          >
            <div
              className={`${
                isOpen ? 'logout-alignment' : 'logout-alignment-hide'
              }`}
            >
              <span
                className="d-flex"
                style={{ cursor: 'pointer' }}
                onClick={handleLogout}
              >
                <span className={`${isOpen ? 'logout-text' : 'display-none'}`}>
                  Logout
                </span>
                <img src={Logout} alt="Logout" />
              </span>
            </div>
          </div>
        </div>
      </div>
      {showSidebar ? (
        <div className="small-device-sidebar sidebar-height">
          <div className="mm-active">
            <div className="hide-content">
              <h1 style={customFontStyle}>
                <span className="logo-pepe">PePe</span>&nbsp;
                <span className="logo-cones">Cones</span>
              </h1>
              <span
                className="cancle-sidebar"
                onClick={() => setShowSidebar(false)}
              >
                <MdOutlineClose fontSize={45} />
              </span>
            </div>
            <div className="small-mm-active">
              <ul
                className={`${'small-metismenu  list-unstyled mm-show mm-active'}`}
                style={{ width: '290px' }}
              >
                <li className="small-nav-links-container">
                  <NavLink
                    to={'dashboard'}
                    onClick={() => handleClick('dashboard')}
                    className={`${
                      active === 'dashboard'
                        ? 'sidebar-route-active '
                        : 'sidebar-route'
                    }`}
                  >
                    <span
                      className={`sidebar-icon ${
                        active === 'dashboard'
                          ? 'sidebar-icon-active'
                          : 'sidebar-icon-inactive'
                      }`}
                    >
                      {React.createElement(AiOutlineHome, { fontSize: 25 })}
                    </span>
                    <span className="badge rounded-pill bg-success float-end"></span>
                    <span
                      style={{ marginLeft: '1.5rem' }}
                      className={`${
                        active === 'dashboard'
                          ? 'isActive ms-3'
                          : 'isInactive ms-3'
                      } ${isOpen ? '' : 'display-none'}`}
                    >
                      Dashboard
                    </span>
                    <div
                      className={`${
                        active === 'dashboard'
                          ? 'isActive ms-3'
                          : 'isInactive ms-3'
                      } ${isOpen ? 'active-state' : 'display-none'}`}
                    >
                      <img src={active === 'dashboard' ? Active : ''} />
                    </div>
                  </NavLink>
                  <NavLink
                    to={'leads'}
                    onClick={() => handleClick('leads')}
                    className={`${
                      active === 'leads'
                        ? 'sidebar-route-active '
                        : 'sidebar-route'
                    }`}
                  >
                    <span
                      className={`sidebar-icon ${
                        active === 'leads'
                          ? 'sidebar-icon-active'
                          : 'sidebar-icon-inactive'
                      }`}
                    >
                      {React.createElement(MdBarChart, { fontSize: 25 })}
                    </span>
                    <span className="badge rounded-pill bg-success float-end"></span>
                    <span
                      style={{ marginLeft: '1.5rem' }}
                      className={`${
                        active === 'leads' ? 'isActive ms-3' : 'isInactive ms-3'
                      } ${isOpen ? '' : 'display-none'}`}
                    >
                      Leads
                    </span>
                    <div
                      className={`${
                        active === 'leads' ? 'isActive ms-3' : 'isInactive ms-3'
                      } ${isOpen ? 'active-state' : 'display-none'}`}
                    >
                      <img src={active === 'leads' ? Active : ''} />
                    </div>
                  </NavLink>{' '}
                  <NavLink
                    onClick={() => setIsShowProduct(!isShowProduct)}
                    className={`${
                      active === 'product'
                        ? 'sidebar-route-active '
                        : 'sidebar-route'
                    }`}
                  >
                    <span
                      className={`sidebar-icon ${
                        active === 'product'
                          ? 'sidebar-icon-active'
                          : 'sidebar-icon-inactive'
                      }`}
                    >
                      {React.createElement(AiOutlineShoppingCart, {
                        fontSize: 25,
                      })}
                    </span>
                    <span className="badge rounded-pill bg-success float-end"></span>
                    <span
                      style={{ marginLeft: '1.5rem' }}
                      className={`${
                        active === 'product'
                          ? 'isActive ms-3'
                          : 'isInactive ms-3'
                      } ${isOpen ? '' : 'display-none'}`}
                    >
                      Product
                    </span>
                    <div
                      className={`${
                        active === 'product'
                          ? 'isActive ms-3'
                          : 'isInactive ms-3'
                      } ${isOpen ? 'active-state' : 'display-none'}`}
                    >
                      <img src={active === 'product' ? Active : ''} />
                    </div>
                  </NavLink>
                  {isShowProduct && (
                    <>
                      {' '}
                      <NavLink
                        to={'productlist'}
                        onClick={() => handleClick('productlist')}
                        className={`${
                          active === 'productlist'
                            ? 'sidebar-route-active '
                            : 'sidebar-route'
                        }`}
                      >
                        <span
                          className={`sidebar-icon ${
                            active === 'productlist'
                              ? 'sidebar-icon-active'
                              : 'sidebar-icon-inactive'
                          }`}
                        >
                          {' '}
                          {React.createElement(LiaDotCircleSolid, {
                            fontSize: 25,
                          })}
                        </span>
                        <span className="badge rounded-pill bg-success float-end"></span>
                        <span
                          style={{ marginLeft: '1.5rem' }}
                          className={`${
                            active === 'productlist'
                              ? 'isActive ms-3'
                              : 'isInactive ms-3'
                          } ${isOpen ? '' : 'display-none'}`}
                        >
                          All Product
                        </span>
                        <div
                          className={`${
                            active === 'productlist'
                              ? 'isActive ms-3'
                              : 'isInactive ms-3'
                          } ${isOpen ? 'active-state' : 'display-none'}`}
                        >
                          <img src={active === 'productlist' ? Active : ''} />
                        </div>
                      </NavLink>
                      <NavLink
                        to={'featProduct'}
                        onClick={() => handleClick('featProduct')}
                        className={`${
                          active === 'featProduct'
                            ? 'sidebar-route-active '
                            : 'sidebar-route'
                        }`}
                      >
                        <span
                          className={`sidebar-icon ${
                            active === 'featProduct'
                              ? 'sidebar-icon-active'
                              : 'sidebar-icon-inactive'
                          }`}
                        >
                          {' '}
                          {React.createElement(LiaDotCircleSolid, {
                            fontSize: 25,
                          })}
                        </span>
                        <span className="badge rounded-pill bg-success float-end"></span>
                        <span
                          style={{ marginLeft: '1.5rem' }}
                          className={`${
                            active === 'featProduct'
                              ? 'isActive ms-3'
                              : 'isInactive ms-3'
                          } ${isOpen ? '' : 'display-none'}`}
                        >
                          Feat. Product
                        </span>
                        <div
                          className={`${
                            active === 'featProduct'
                              ? 'isActive ms-3'
                              : 'isInactive ms-3'
                          } ${isOpen ? 'active-state' : 'display-none'}`}
                        >
                          <img src={active === 'featProduct' ? Active : ''} />
                        </div>
                      </NavLink>
                    </>
                  )}
                  <NavLink
                    to={'blogs'}
                    onClick={() => handleClick('blogs')}
                    className={`${
                      active === 'blogs'
                        ? 'sidebar-route-active '
                        : 'sidebar-route'
                    }`}
                  >
                    <span
                      className={`sidebar-icon ${
                        active === 'blogs'
                          ? 'sidebar-icon-active'
                          : 'sidebar-icon-inactive'
                      }`}
                    >
                      {' '}
                      {React.createElement(MdOutlineDashboard, {
                        fontSize: 25,
                      })}
                    </span>
                    <span className="badge rounded-pill bg-success float-end"></span>
                    <span
                      style={{ marginLeft: '1.5rem' }}
                      className={`${
                        active === 'blogs' ? 'isActive ms-3' : 'isInactive ms-3'
                      } ${isOpen ? '' : 'display-none'}`}
                    >
                      Blogs
                    </span>
                    <div
                      className={`${
                        active === 'blogs' ? 'isActive ms-3' : 'isInactive ms-3'
                      } ${isOpen ? 'active-state' : 'display-none'}`}
                    >
                      <img src={active === 'blogs' ? Active : ''} />
                    </div>
                  </NavLink>
                  {/* <NavLink
                    to={'profile'}
                    onClick={() => handleClick('profile')}
                    className={`${
                      active === 'profile'
                        ? 'sidebar-route-active '
                        : 'sidebar-route'
                    }`}
                  >
                    <span
                      className={`sidebar-icon ${
                        active === 'profile'
                          ? 'sidebar-icon-active'
                          : 'sidebar-icon-inactive'
                      }`}
                    >
                      {React.createElement(FaUser, { fontSize: 25 })}
                    </span>
                    <span className="badge rounded-pill bg-success float-end"></span>
                    <span
                      style={{ marginLeft: '1.5rem' }}
                      className={`${
                        active === 'profile'
                          ? 'isActive ms-3'
                          : 'isInactive ms-3'
                      } ${isOpen ? '' : 'display-none'}`}
                    >
                      Profile
                    </span>
                    <div
                      className={`${
                        active === 'profile'
                          ? 'isActive ms-3'
                          : 'isInactive ms-3'
                      } ${isOpen ? 'active-state' : 'display-none'}`}
                    >
                      <img src={active === 'profile' ? Active : ''} />
                    </div>
                  </NavLink> */}
                  <NavLink
                    to={'setting'}
                    onClick={() => handleClick('setting')}
                    className={`${
                      active === 'setting'
                        ? 'sidebar-route-active '
                        : 'sidebar-route'
                    }`}
                  >
                    <span
                      className={`sidebar-icon ${
                        active === 'setting'
                          ? 'sidebar-icon-active'
                          : 'sidebar-icon-inactive'
                      }`}
                    >
                      {React.createElement(AiOutlineSetting, { fontSize: 25 })}
                    </span>
                    <span className="badge rounded-pill bg-success float-end"></span>
                    <span
                      style={{ marginLeft: '1.5rem' }}
                      className={`${
                        active === 'setting'
                          ? 'isActive ms-3'
                          : 'isInactive ms-3'
                      } ${isOpen ? '' : 'display-none'}`}
                    >
                      Setting
                    </span>
                    <div
                      className={`${
                        active === 'setting'
                          ? 'isActive ms-3'
                          : 'isInactive ms-3'
                      } ${isOpen ? 'active-state' : 'display-none'}`}
                    >
                      <img src={active === 'setting' ? Active : ''} />
                    </div>
                  </NavLink>
                </li>
              </ul>
            </div>
            <div className="small-logout-section">
              <div className="logout-alignment">
                <span
                  className="d-flex"
                  style={{ cursor: 'pointer' }}
                  onClick={handleLogout}
                >
                  <span className="logout-text">Logout</span>
                  <img src={Logout} alt="Logout" />
                </span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        ''
      )}
    </>
  );
};

export default Sidebar;
