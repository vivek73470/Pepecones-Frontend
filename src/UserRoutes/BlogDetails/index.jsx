/** @format */

import React from 'react';
import Content from '../../components/BlogDetails';
import BlogComponent from '../../components/BlogProduct';
import Footer from '../../components/Footer/Index';
import HomeHeader from '../../components/homeHeader/Header';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { SINGLE_BLOG_KEY } from '../../constant';
import { viewBlogs } from '../../Api/userApi';
import { useState } from 'react';
import { setFetching } from '../../redux/reducer/fetching';

const BlogDetailsPage = () => {
  const blogDetails = useSelector((state) => state.blogData.data);
  const [blogDetail, setBlogDetail] = useState({});

  console.log(blogDetail);

  const dispatch = useDispatch();
  useEffect(() => {
    const storedData = localStorage.getItem(SINGLE_BLOG_KEY);
    const parsedData = storedData ? JSON.parse(storedData) : null;

    if (parsedData) {
      fetchBlog(parsedData);
    }
  }, []);

  const fetchBlog = async (id) => {
    dispatch(setFetching(true));
    try {
      let response = await viewBlogs(id);
      if (response.status === 200) {
        console.log(response);
        setBlogDetail(response.data);
        dispatch(setFetching(false));
      }
    } catch (error) {
      dispatch(setFetching(false));
    }
  };
  return (
    <>
      <HomeHeader />
      <Content blogDetails={blogDetails} blogDetail={blogDetail} />
      <BlogComponent />
      <Footer />
    </>
  );
};

export default BlogDetailsPage;