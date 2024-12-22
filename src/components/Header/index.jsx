/** @format */

import React, { useState, useEffect } from 'react';
import './index.css'; // Create a separate CSS file for header styles
import { RiMenu2Fill } from 'react-icons/ri';
import { FiSearch } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toggleSidebar } from '../../redux/reducer/sidebar';
import Notifi from '../../assets/header/Notifications.svg';
import User from '../../assets/header/user.svg';
import Alert from '../../assets/header/alert.svg';
import { NavLink } from 'react-router-dom';
import { getAdminInfo, getNum, getReset } from '../../Api/adminApi';
import { getUserInfo, userNotificationCount } from '../../Api/userApi';
import Avtar from '../../assets/pepecons/avtar.svg';
import { setFetching } from '../../redux/reducer/fetching';
import io from 'socket.io-client';

import jwtDecode from 'jwt-decode';
const Header = ({ onLogout, setShowSidebar, adminInfos }) => {
  const [show, setShow] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false); // New state to track scrolling
  const [vendorInfo, setVendorInfo] = useState({});
  const [count, setCount] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  // const [selectedImage, setSelectedImage] = useState(null);
  const [adminInfo, setAdminInfo] = useState([]);
  const [userId, setUserId] = useState(null);
  const [isNotificationVisible, setNotificationVisible] = useState(true);
  const [data, setData] = useState(0);

  const dispatch = useDispatch();
  const isOpen = useSelector((state) => state.sidebar.isOpen);
  const role = useSelector((state) => state.role);
  const profileImage = useSelector(
    (state) => state?.profileImage?.profileImage,
  );
  const name = useSelector((state) => state?.name?.name);
  const handleToggleSidebar = () => {
    dispatch(toggleSidebar());
    setShowSidebar(true);
  };

  // Function to handle scrolling
  const handleScroll = () => {
    if (window.scrollY > 0) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  };

  useEffect(() => {
    getPersonalInfo();
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [profileImage]);

  useEffect(() => {
    getPersonalInfo();
  }, []);

  useEffect(() => {
    getPersonalInfo();
  }, []);

  const getPersonalInfo = async () => {
    const token = localStorage.getItem('auth_token');
    const decodedToken = jwtDecode(token);
    const { userId } = decodedToken;
    setUserId(userId);
    console.warn(userId);
    dispatch(setFetching(true));
    try {
      const response = await getAdminInfo(token);
      if (response.status === 200) {
        let data = response?.data || [];
        console.log(data);
        const matchingItem = data?.find((item) => item?._id === userId);
        if (matchingItem) {
          setAdminInfo(matchingItem);
        }
        dispatch(setFetching(false));
      }
    } catch (error) {
      console.log(error);
      dispatch(setFetching(false));
    }
  };
  const maintoken1 = localStorage.getItem('auth_token');
  const role1 = maintoken1.charAt(maintoken1.length - 1);
  const token1 = maintoken1.slice(0, -1);
  let notifyNumber = 1;
  useEffect(() => {
    console.log('ihih');

    // Call the function to fetch the initial num value
    fetchNumValue();

    const socket = io('https://api.pepecones.com/', {
      transports: ['websocket'],
    });

    socket.on('newclientconnect', (msg) => {
      console.log(msg);
      // Set the state to indicate that the socket is connected
    });

    // Handle the 'customEvent' when received
    socket.on('customEvent', (data) => {
      fetchNumValue();
      setData(data.data);
      console.log('Received custom event:', data.data);
      // Set the state to indicate that the event was received
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const fetchNumValue = async () => {
    try {
      const response = await getNum();
      if (response.status === 200) {
        console.log('res', response);
        setData(response.data.data[0].num);
      }
    } catch (error) {
      console.error('Error retrieving num value:', error);
    }
  };
  const handleResetNum = async () => {
    console.log('hii');
    setNotificationVisible(false); // Hide the notification number
    try {
      const response = await getReset();
      if (response.status === 200) {
        console.log('Num value reset successfully');
        setData(0);
      }
    } catch (error) {
      console.error('Error resetting num value:', error);
    }
  };

  console.log(adminInfo);
  return (
    <header id={`${isOpen ? 'page-topbar' : 'page-topbar-hide'} `}>
      <div className="navbar-header">
        <div className="d-flex">
          <button onClick={handleToggleSidebar} className="header-item">
            <RiMenu2Fill fontSize={32} />
          </button>
        </div>
        <div className="search-section">
          <div className="searchBar">
            <input
              type="text"
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <span id="search">
              <FiSearch />
            </span>
            <span
              style={{ width: '30px', position: 'relative', cursor: 'pointer' }}
              onClick={() => handleResetNum()}
            >
              <img src={Notifi} className="notification" />
              {isNotificationVisible && (
                <span id="notification-number">{data}</span>
              )}
            </span>
            <img
              src={adminInfo?.profileImage || profileImage || Avtar}
              className="rounded-circle header-profile-user "
            />
          </div>
        </div>
        {/* <div className="d-flex header-right">
          {count ? (
            <span className="alert-icon" id="notification-text">
              <span>{count}</span>
            </span>
          ) : (
            ''
          )}
          {showNotification ? <Notification notifyNumber={count} /> : null}
        </div> */}
      </div>
    </header>
  );
};

export default Header;
