/** @format */

import React, { useEffect, useState } from 'react';
import Cards from '../../components/Cards';
import { useSelector } from 'react-redux';
import { AiOutlineUser } from 'react-icons/ai';
import { BsFillHeartFill } from 'react-icons/bs';
import { FiCalendar } from 'react-icons/fi';
import {
  getAdminInfo,
  getAllBlogsLength,
  totalProduct,
  totalLeads,
  totalCategories,
} from '../../Api/adminApi';
import { setFetching } from '../../redux/reducer/fetching';
import { useDispatch } from 'react-redux';
import './index.css';
import ViewAllVendorsPoupop from '../../components/ViewAllVendorsPoupop';
import ViewAllCouponPoupop from '../../components/ViewAllCouponPoupop';
import LogoPepeCones from '../../assets/pepecons/Logo.png';
import Leaf from '../../assets/pepecons/leaf.png';
import TotalblogCard from '../../components/TotalblogsCard';
import TotalproductCard from '../../components/TotalproductCard';
import TotalleadCard from '../../components/TotalleadCard';
import ProductnameCard from '../../components/ProductnameCard';
import ProductcategoryCard from '../../components/ProductcategoryCard';
import Himalya from '../../assets/pepecons/himalyan.png';
import FeaturedblogCard from '../../components/FeaturedblogCard';
import { TOKEN, customFontStyle } from '../../constant';
import { Link } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import { setProfileImage } from '../../redux/reducer/profileImage';
const Dashboard = () => {
  const data = [
    {
      title: 'Card 1',
      icon: <AiOutlineUser />,
      value: '123',
    },
    {
      title: 'Card 2',
      icon: <BsFillHeartFill />,
      value: '456',
    },
    {
      title: 'Card 3',
      icon: <FiCalendar />,
      value: '789',
    },
    {
      title: 'Card 4',
      icon: <FiCalendar />,
      value: '789',
    },
  ];
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [displayedBlogs, setDisplayedBlogs] = useState('');
  const [displayedProduct, setDisplayedProduct] = useState('');
  const [displayedLeads, setDisplayedLeads] = useState('');
  const [displayedCategories, setDisplayedCategories] = useState('');
  const [adminInfo, setAdminInfo] = useState([]);
  const [userId, setUserId] = useState(null);
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.authToken);
  useEffect(() => {
    document.title = 'Dashboard';
    fetchAllBlogs();
    fetchAllProduct();
    getPersonalInfo();
    fetchTotalLeads();
    fetchTotalCategories();
  }, []);

  const fetchAllBlogs = async () => {
    const token = localStorage.getItem('auth_token');
    dispatch(setFetching(true));
    try {
      const response = await getAllBlogsLength(token);
      if (response.status === 200) {
        console.warn(response);
        setDisplayedBlogs(response.data.count);
        dispatch(setFetching(false));
      } else {
        setDisplayedBlogs('');
      }
      dispatch(setFetching(false));
    } catch (error) {
      dispatch(setFetching(false));
      console.log(error);
    }
  };

  const fetchAllProduct = async () => {
    const token = localStorage.getItem('auth_token');
    dispatch(setFetching(true));
    try {
      const response = await totalProduct(token);
      if (response.status === 200) {
        setDisplayedProduct(response.data.count);
        dispatch(setFetching(false));
      } else {
        dispatch(setFetching(false));
        setDisplayedProduct('');
      }
      dispatch(setFetching(false));
    } catch (error) {
      dispatch(setFetching(false));
      console.log(error);
    }
  };

  const fetchTotalLeads = async () => {
    const token = localStorage.getItem('auth_token');
    dispatch(setFetching(true));
    try {
      const response = await totalLeads(token);
      if (response.status === 200) {
        setDisplayedLeads(response.data.count);
        dispatch(setFetching(false));
      } else {
        dispatch(setFetching(false));
        setDisplayedLeads('');
      }
      dispatch(setFetching(false));
    } catch (error) {
      dispatch(setFetching(false));
      console.log(error);
    }
  };

  const fetchTotalCategories = async () => {
    const token = localStorage.getItem('auth_token');
    dispatch(setFetching(true));
    try {
      const response = await totalCategories(token);
      if (response.status === 200) {
        console.log(response);
        setDisplayedCategories(response.data.categories.length);
        dispatch(setFetching(false));
      } else {
        dispatch(setFetching(false));
        setDisplayedCategories('');
      }
      dispatch(setFetching(false));
    } catch (error) {
      dispatch(setFetching(false));
      console.log(error);
    }
  };

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
  console.log(adminInfo?.profileImage);
  dispatch(setProfileImage(adminInfo?.profileImage));
  return (
    <div className="">
      <div className="pepe-cones-dashboard">
        <div className="main-section">
          <img src={LogoPepeCones} id="logo" />
          <div>
            <h5 className="hello-text">Hi {adminInfo?.name || 'Anderi'},</h5>
            <h3 className="welcome-text" style={customFontStyle}>
              Welcome to Pepe Cones!
            </h3>
          </div>
          <div className="leaf">
            <img src={Leaf} />
          </div>
        </div>
      </div>
      <div className="grid-container">
        <div id="div3" className="grid-col">
          <div className="cards_2">
            <TotalblogCard displayedBlogs={displayedBlogs} />
          </div>
        </div>
        <div id="div4" className="grid-col">
          <div className="cards_2">
            <TotalproductCard displayedProduct={displayedProduct} />
          </div>
        </div>
        <div id="div5" className="grid-col">
          <div className="cards_2">
            <TotalleadCard displayedLeads={displayedLeads} />
          </div>
        </div>

        <div id="div2" className="grid-col">
          <div className="cards_2 ">
            <ProductcategoryCard displayedCategories={displayedCategories} />
          </div>
        </div>
        <div id="div1" className="grid-col">
          <div className="cards_1">
            <ProductnameCard />
          </div>
        </div>
      </div>
      <FeaturedblogCard />
    </div>
  );
};
export default Dashboard;
