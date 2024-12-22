/** @format */

import React, { useEffect, useState } from 'react';
import './index.css'; // Import your CSS file
import banner from '../../assets/User/header_img1.png';
import { Link } from 'react-router-dom';
import Footer from '../../components/Footer/Index';
import HomeHeader from '../../components/homeHeader/Header';
import {
  BsFillArrowRightCircleFill,
  BsFillArrowLeftCircleFill,
} from 'react-icons/bs';
import {
  getBlogPublished,
  viewBlogs,
  getBlogCategory,
  getSpecificBlogCategory,
  getBlogs,
} from '../../Api/userApi';
import { setFetching } from '../../redux/reducer/fetching';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setBlogdata } from '../../redux/reducer/blogData';
import Pagination from '../../components/Pagination';
import send from '../../assets/User/Send.png';
import { toast } from 'react-toastify';
import moment from 'moment';
function BlogPage() {
  const [blog, setBlog] = useState([]);
  const [blogData, setBlogData] = useState([]);

  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [specificCategory, setSpecificCategory] = useState({});
  const [blogs, setBlogs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const itemsPerPage = 8;
  useEffect(() => {
    updateCategories();
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    dispatch(setFetching(true));

    try {
      let response = await getBlogs();
      if (response.status === 200) {
        console.log(response);
        setBlogData(response.data);
        dispatch(setFetching(false));
      }
    } catch (error) {
      toast.error(error.message);
      dispatch(setFetching(false));
    }
  };

  const updateCategories = async () => {
    dispatch(setFetching(true));

    try {
      let response = await getBlogCategory();
      if (response.status === 200) {
        setCategories(response.data);
        dispatch(setFetching(false));
      }
    } catch (error) {
      toast.error(error.message);
      dispatch(setFetching(false));
    }
  };

  const fetchSpecificCategory = async (category, currentPage) => {
    console.log(category);
    dispatch(setFetching(true));
    try {
      let response = await getSpecificBlogCategory(category, currentPage);
      if (response.status === 200) {
        setBlog(response.data.blog);
        dispatch(setFetching(false));
      }
    } catch (error) {
      dispatch(setFetching(false));
      toast.error(error.message);
    }
  };

  const handleCategoryClick = (category, currentPage) => {
    setSelectedCategory(category);
    fetchSpecificCategory(category, currentPage);
  };

  function extractDateFromDatestring(dateString) {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0];
  }

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
    fetchBlogData(currentPage);
  }, [currentPage]);

  const fetchBlogData = async (currentPage) => {
    dispatch(setFetching(true));
    try {
      let response = await getBlogPublished(currentPage);
      if (response.status === 200) {
        console.warn(response);
        setBlog(response.data.blog);
        setTotalPages(response?.data.totalPages);
        dispatch(setFetching(false));
      }
    } catch (error) {
      dispatch(setFetching(false));
    }
  };

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
  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePageClick = (page) => {
    setCurrentPage(page);
  };

  const pageNumbers = Array.from(
    { length: totalPages },
    (_, index) => index + 1,
  );

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const divStyle = {
    backgroundImage: `url(${blogData[0]?.featuredImage})`,
  };
  return (
    <>
      <HomeHeader />
      <div className="container">
        <div className="wrapper">
          {/* <div className="banner">
            <div className="spc"></div>
            <div className="lft-banner">
              <div className="subtitle">
                <p>Featured Post</p>
              </div>
              <div className="title-blg">
                <span>
                  Step-by-step guide to <br /> choosing great font pairs
                </span>
              </div>
              <div className="whom">
                <p>
                  By <span> John Doe </span> | May 23, 2022
                </p>
              </div>
              <div className="description">
                Duis aute irure dolor in reprehenderit in voluptate velit esse
                cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                cupidatat non proident.
              </div>
              <div className="btn1">
                <input type="button" className="button" value="Read More" />
              </div>
            </div>
            <div className="rgt-banner">
              <div className="img">
                <img src={banner} alt="" />
              </div>
            </div>
          </div> */}

          <div className="blog">
            <div className="blg-title-2">
              <h1 className="p">Popular Topic </h1>
            </div>
            <div className="ctg">
              <div className="lft-blog">
                <ul className="ul">
                  <li>
                    <a href="#" onClick={fetchBlogData}>
                      All
                    </a>
                  </li>
                  {/* <li>
                    <a href="#">Adventure</a>
                  </li>
                  <li>
                    <a href="#">Travel</a>
                  </li>
                  <li>
                    <a href="#">Fashion</a>
                  </li>
                  <li>
                    <a href="#">Technology</a>
                  </li>
                  <li>
                    <a href="#">Branding</a>
                  </li> */}
                  {categories.map((category) => (
                    <li key={category.blogcategoryName}>
                      <a
                        href={`#${category.blogcategoryName}`}
                        onClick={() =>
                          handleCategoryClick(
                            category.blogcategoryName,
                            currentPage,
                          )
                        }
                      >
                        {category.blogcategoryName}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="recent-blogs">
              <div className="blg">
                {blog.length > 0 &&
                  blog.map((blg, index) => (
                    <>
                      <div
                        className="semi-blog"
                        key={index}
                        onClick={() => {
                          handleBlogView(blg._id, blg.customUrl);
                          scrollToTop();
                        }}
                      >
                        <div
                          className="blg-img"
                          style={{
                            backgroundImage: `url(${blg.featuredImage})`,
                          }}
                        >
                          <div className="category">
                            <p>{blg.category}</p>
                          </div>
                        </div>
                        <div className="dt">
                          <p>{extractDateFromDatestring(blg.updatedAt)}</p>
                        </div>
                        <div className="blg-title">
                          <h2>{blg.title}</h2>
                        </div>
                        <div className="blg-text">
                          {extractTextFromHtml(blg.content)}
                        </div>
                      </div>
                    </>
                  ))}
              </div>
            </div>
            {/* <div className="recent-blogs">
            <div className='blg'>
            {blog.length>0 && blog&&blog.map((blg)=>{
                <div class="semi-blog">
                    <div class="blg-img" style="background-image: url(&quot;https://res.cloudinary.com/dlrgh9gam/image/upload/v1695448197/ridedost/fe6hn1uvczhefguzk9hx.jpg&quot;);">
                        <div class="category">
                            <p>{blg.category}</p>
                        </div>
                    </div>
                    <div class="dt">
                        <p>{blg.updatedAt}</p>
                    </div>
                    <div class="blg-title">{blg.title}</div>
                    <div class="blg-text">Get valuable insights into the business world.</div>
                </div>
            })}
            </div>
          </div> */}
          </div>
          <div className="btn-page">
            {
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  width: '150px',
                }}
              >
                <div className="pre-button" onClick={() => handlePrevPage()}>
                  <BsFillArrowLeftCircleFill />
                </div>
                {pageNumbers?.map((page, index) => {
                  if (
                    page === 1 ||
                    page === totalPages ||
                    (index + 1 <= currentPage + 1 &&
                      index + 1 >= currentPage - 1)
                  ) {
                    return (
                      <span
                        key={page}
                        onClick={() => handlePageClick(page)}
                      ></span>
                    );
                  } else if (
                    (index + 1 === currentPage + 2 && index + 2 < totalPages) ||
                    (index + 1 === currentPage - 2 && index > 1)
                  ) {
                    return <span key={page}>...</span>;
                  }
                  return null;
                })}
                <div className="next-button" onClick={() => handleNextPage()}>
                  <BsFillArrowRightCircleFill />
                </div>
              </div>
            }
            {/* <div className="pre-button" onClick={() => handlePrevPage()}>
              <BsFillArrowLeftCircleFill />
            </div>
            <div className="next-button" onClick={() => handlePageClick()}>
              <BsFillArrowRightCircleFill />
            </div> */}
          </div>
          {/* <Pagination /> */}
          <div className="fet-blog">
            <div className="blg-img-ft" style={divStyle}>
              <div className="ft-content">
                <div className="ft-category">
                  <p>{blogData[0]?.category || 'Herbal Smokes'}</p>
                </div>
                <div className="ft-title">
                  <span>
                    {blogData[0]?.title ||
                      "India's Rise in Pre-Rolled Cone Popularity"}
                  </span>
                </div>
                <div className="ft-description">
                  <p>
                {extractTextFromHtml(blogData[0]?.content)||"o"}
                  </p>
                </div>
                <div className="ft-date">
                 
                    <p>
                      {new Date(blogData[0]?.createdAt).toLocaleDateString(
                        'en-GB',
                        {
                          day: '2-digit',
                          month: '2-digit',
                          year: 'numeric',
                        },
                      )}
                    </p>
                  
                </div>
              </div>
            </div>
          </div>

          {/* <div className="news-letter">
            <div className="bg">
              <div className="lft-nl">
                <div className="lft-title">
                  <div className="nl-title">
                    <h1>Subscribe our newsletter</h1>
                  </div>
                  <div className="nl-desc">
                    <p>
                      Receive latest news, updates, and many other things every
                      week.
                    </p>
                  </div>
                  <div className="nl-mail">
                    <input
                      type="email"
                      name="email"
                      id="email"
                      placeholder="Enter your email"
                    />
                    <div class="icon-2">
                      <img src={send} alt="Send" className="send" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="nl-rgt">
                {/* Add content for the right side of the newsletter
              </div>
            </div>
          </div>  */}

          
        </div>
      </div>
      <Footer />
    </>
  );
}

export default BlogPage;