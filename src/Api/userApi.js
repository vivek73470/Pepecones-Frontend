import axios from "axios";

const BASE_URL = process.env.REACT_APP_SERVER_URL;

// to login user
export const checkIfUserExists = async (number) => {
  try {
    const response = await axios.post(`${BASE_URL}/user/login/${number}`);
    return response;
  } catch (error) {
    throw error;
  }
};

// to register user
export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${BASE_URL}/user/register`, userData);
    return response;
  } catch (error) {
    throw error;
  }
};

// to get vendors list
export const vendorsList = async (page,token) => {
  console.warn(page,token)
  try {
    const response = await axios.get(`${BASE_URL}/user/vendor/list?page=${page}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
};

//profile update
export const userUpdate = async (token, userData) => {
  try {
    const response = await axios.patch(
      `${BASE_URL}/user/profile/update`,
      userData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response;
  } catch (error) {
    throw error;
  }
};

// to get wallet details
export const userWalletDetails = async (token) => {
  try {
    const response = await axios.get(`${BASE_URL}/user/user/wallet`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
};

//dashboard points
export const getDashboardUserPoint = async (token) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/user/points`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response;
  } catch (error) {
    throw error;
  }
};

//dashboard graph for user
export const getDashboardGraphUser = async (token) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/admin/payment/coupon/user/month-data`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response;
  } catch (error) {
    throw error;
  }
};

// to update user info
export const updateUserInfo = async (token, formData) => {
  try {
    const response = await axios.patch(
      `${BASE_URL}/user/personalInfo/update`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response;
  } catch (error) {
    throw error;
  }
};

// to get user info
export const getUserInfo = async (token) => {
  try {
    const response = await axios.get(`${BASE_URL}/user/personalInfo`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
};

// get all coupons for user
export const getAllCouponsForUser = async (page,token) => {
  try {
    const response = await axios.get(`${BASE_URL}/admin/coupons/usercoupon?page=${page}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
};

//to get all products user
export const getAllProductForUser = async (page,token) => {
  try {
    const response = await axios.get(`${BASE_URL}/admin/product/get/user?page=${page}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
};

//to get all products for perticular vendor
export const getAllProductForPerticularVendor = async (id,page,token) => {
  try {
    const response = await axios.get(`${BASE_URL}/admin/product/user/${id}?page=${page}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
};


//search product Name
export const searchProduct = async (name,page,token) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/admin/product/product/${name}?page=${page}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response;
  } catch (error) {
    throw error;
  }
};

//search vendor Name
export const searchPersonalVendorProduct = async (id,name,page,token) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/admin/product/product/${id}/${name}?page=${page}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response;
  } catch (error) {
    throw error;
  }
};

//notification Count
export const userNotificationCount = async (token) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/notification/unread-count/user`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response;
  } catch (error) {
    throw error;
  }
};

//notification read
export const userNotificationRead = async (token) => {
  try {
    const response = await axios.put(
      `${BASE_URL}/notification/mark-as-read/user`,null,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response;
  } catch (error) {
    throw error;
  }
};




// .................................//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////new   for   pepecones//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


//to get product  category  
export const getProductSelectCategory = async (token) => {
 try {
    const response = await axios.get(`${BASE_URL}/product/api/product/published`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
};

//to get Paper Size  category  
export const getPaperSizeCategory = async (token) => {
 try {
    const response = await axios.get(`${BASE_URL}/atribute/allpapers/size`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
};

//to get product  category  
export const getAllProduct = async (page) => {
 try {
    const response = await axios.get(`${BASE_URL}/product?page=${page}`, {
      // headers: {
      //   Authorization: `Bearer ${token}`,
      // },
    });
    return response;
  } catch (error) {
    throw error;
  }
};

//to get product  category  
export const getAllProductPublished = async (page) => {
 try {
    const response = await axios.get(`${BASE_URL}/product/api/product/published?page=${page}`, {
      // headers: {
      //   Authorization: `Bearer ${token}`,
      // },
    });
    return response;
  } catch (error) {
    throw error;
  }
};


//to get Blog  Published  
export const getBlogPublished = async (page) => {
 try {
    const response = await axios.get(`${BASE_URL}/blog/api/blogs/published?page=${page}`, {
      // headers: {
      //   Authorization: `Bearer ${token}`,
      // },
    });
    return response;
  } catch (error) {
    throw error;
  }
};

//to view blog
export const viewBlogs = async (blogId) => {
  try {
    const response = await axios.get(`${BASE_URL}/blog/${blogId}`, {
      // headers: {
      //   Authorization: `Bearer ${token}`,
      // },
    });
    return response;
  } catch (error) {
    throw error;
  }
};

//to view product
export const viewProducts = async (productId) => {
  try {
    const response = await axios.get(`${BASE_URL}/product/${productId}`, {
      // headers: {
      //   Authorization: `Bearer ${token}`,
      // },
    });
    return response;
  } catch (error) {
    throw error;
  }
};

//to get adds  
export const getAdds = async () => {
 try {
    const response = await axios.get(`${BASE_URL}/features/adds`, {
      // headers: {
      //   Authorization: `Bearer ${token}`,
      // },
    });
    return response;
  } catch (error) {
    throw error;
  }
};


export const productEnquiery= async (payload) => {
  try {
    const response = await axios.post(`${BASE_URL}/contact/add`,payload);
    return response.data; 
  } catch (error) {
    throw error;
  }
};

// fetch blog
export const getBlog= async () => {
  try {
    const response = await axios.get(`${BASE_URL}/blog`);
    return response 
  } catch (error) {
    throw error;
  }
};

//to  fetch blog category
export const getBlogCategory= async () => {
  try {
    const response = await axios.get(`${BASE_URL}/category/blogcategory`);
    return response 
  } catch (error) {
    throw error;
  }
};

//to  fetch blog data
export const getBlogs= async () => {
  try {
    const response = await axios.get(`${BASE_URL}/blog/api/blogs/featured`);
    return response 
  } catch (error) {
    throw error;
  }
};

//to  fetch specific blog category
export const getSpecificBlogCategory= async (category,page) => {
  // console.log(category)
  // console.log(page)
  try {
    const response = await axios.get(`${BASE_URL}/blog/categoryname/${category}?page=${page}`);
    return response 
  } catch (error) {
    throw error;
  }
};


// dropdown for enquery
export const distinctProduct= async () => {
  try {
    const response = await axios.get(`${BASE_URL}/product/distinct/product`);
    return response 
  } catch (error) {
    throw error;
  }
};

// dropdown for enquery
export const allProduct= async () => {
  try {
    const response = await axios.get(`${BASE_URL}/product/all`);
    return response 
  } catch (error) {
    throw error;
  }
};


//to get publish product  count  
export const getPublishedProductCount = async () => {
 try {
    const response = await axios.get(`${BASE_URL}/product/count/publish/product`, {
      // headers: {
      //   Authorization: `Bearer ${token}`,
      // },
    });
    return response;
  } catch (error) {
    throw error;
  }
};



//to search product
export const searchProducts = async (productName) => {
  try {
    const response = await axios.get(`${BASE_URL}/product/select/search/?name=${productName}`, {
      // headers: {
      //   Authorization: `Bearer ${token}`,
      // },
    });
    return response;
  } catch (error) {
    throw error;
  }
};


//to filter product
export const filterProducts = async (productTag) => {
  try {
    const response = await axios.get(`${BASE_URL}/product/search/producttag?producttag=${productTag}`, {
      // headers: {
      //   Authorization: `Bearer ${token}`,
      // },
    });
    return response;
  } catch (error) {
    throw error;
  }
};

//to reverse product
export const reverseProducts = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/product/reverse`, {
      // headers: {
      //   Authorization: `Bearer ${token}`,
      // },
    });
    return response;
  } catch (error) {
    throw error;
  }
};


export const postEmailNewsLetter= async (email) => {
  try {
    const response = await axios.post(`${BASE_URL}/newsletter/add/newsletter`,{email});
    return response.data; 
  } catch (error) {
    throw error;
  }
};
