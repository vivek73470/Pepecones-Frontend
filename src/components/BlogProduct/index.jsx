/** @format */

import React, { useState, useEffect } from 'react';
import './index.css'; // Import your CSS file
import { getBlog, viewBlogs } from '../../Api/userApi';
import { useDispatch } from 'react-redux';
import { setFetching } from '../../redux/reducer/fetching';
import { toast } from 'react-toastify';
import { setBlogdata } from '../../redux/reducer/blogData';
import { useNavigate } from 'react-router-dom';
function BlogComponent() {
  const [blogData, setBlogData] = useState([]);
  const navigate = useNavigate();


  function extractTextFromHtml(htmlString, maxWords) {
    if (!htmlString) {
      return ''; // Return an empty string or handle it based on your requirements
    }
  
    const cleanedText = htmlString
      .replace(/<[^>]*>/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
    const words = cleanedText.split(' ');
    const firstTwoLines = words.slice(0, maxWords).join(' ');
    const limitedText = firstTwoLines.slice(0, 100);
    return limitedText;
  }
  
  useEffect(() => {
    
    fetchBlog();
  }, []);
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  const dispatch = useDispatch();
  const fetchBlog = async () => {
    dispatch(setFetching(true));
    try {
      let response = await getBlog();
      if (response.status === 200) {
        console.log(response.data);
        const lastFourItems = response.data?.product.slice(-4);
        setBlogData(lastFourItems);

        dispatch(setFetching(false));
      }
    } catch (error) {
      dispatch(setFetching(false));
      toast.error(error.message);
    }
  };

  console.log(blogData);
  const handleBlogView = async (id, customUrl) => {
    console.log(id, customUrl);
    dispatch(setFetching(true));
    try {
      let response = await viewBlogs(id);
      if (response.status === 200) {
        console.warn(response);
        dispatch(setBlogdata(response.data));
        navigate(`/blogdetails/${customUrl}`);
        dispatch(setFetching(false));
      }
    } catch (error) {
      dispatch(setFetching(false));
    }
  };
  return (
    <div>
      <div className="container-blg-down">
        <div class="title-3">
          <h1>You May Like this too</h1>
        </div>
        <div className="centered-grid-container">
          <div className="blog-grid-wrapper">
            {blogData.length > 0
              ? blogData.map((blog, index) => (
                  <div
                    className="blog-grid-col"
                    key={index}
                    onClick={() => {
                      handleBlogView(blog._id, blog.customUrl);
                      scrollToTop();
                    }}
                  >
                    <div className="blog-card">
                      <img src={blog.featuredImage} alt={blog.alttag} />
                      <div id="adventure">
                        {blog.category ? blog.category : 'Technical'}
                      </div>
                      <h5>{new Date(blog?.createdAt).toLocaleDateString(
                        'en-GB',
                        {
                          day: '2-digit',
                          month: '2-digit',
                          year: 'numeric',
                        },
                      )}</h5>
                      <h4>{blog.title}</h4>
                      <p>
                      {extractTextFromHtml(blog.content)}
                      </p>
                    </div>
                  </div>
                ))
              : null}
          </div>
        </div>
      </div>
    </div>
  );
}

export default BlogComponent;