import axios from "axios";
// import io from 'socket.io-client';

const BASE_URL = process.env.REACT_APP_SERVER_URL;

//to check if admin is exists
export const adminLogin = async (payload) => {
  console.warn(BASE_URL);
  try {
    const response = await axios.post(`${BASE_URL}/admin/login`,payload);
    return response;
  } catch (error) {
    throw error;
  }
};


//to get all products
export const getAllProducts = async (page,token) => {
  // `${BASE_URL}/product/${id}?page=${page}`,
  try {
    const response = await axios.get(`${BASE_URL}/product?page=${page}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
};
//to get all products
export const totalProduct = async (token) => {
  // `${BASE_URL}/product/${id}?page=${page}`,
  try {
    const response = await axios.get(`${BASE_URL}/product/count/product`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
};

//to get total leads
export const totalLeads = async (token) => {
  try {
    const response = await axios.get(`${BASE_URL}/contact/count/contact`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
};

//to get total categories
export const totalCategories= async (token) => {
  try {
    const response = await axios.get(`${BASE_URL}/category/allproductcategoies`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
};

//to get published products
export const totalProductPublished = async (token) => {
  // `${BASE_URL}/product/${id}?page=${page}`,
  try {
    const response = await axios.get(`${BASE_URL}/product/count/product`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
};

//to get draft products
export const totalProductDraft = async (token) => {
  // `${BASE_URL}/product/${id}?page=${page}`,
  try {
    const response = await axios.get(`${BASE_URL}/product/count/draft/product`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
};

//to get all blog
export const getAllBlogs = async (token) => {
  try {
    const response = await axios.get(`${BASE_URL}/blog`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
};

//to get all blog  length
export const getAllBlogsLength = async (token) => {
  try {
    const response = await axios.get(`${BASE_URL}/blog/count/all/blog`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
};

//to add  blog  publish
export const addBlogs = async (blog,token) => {
  try {
    const response = await axios.post(`${BASE_URL}/blog/add/publish`,blog, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
};


//to save draft  blog  
export const saveBlog = async (blog,token) => {
  try {
    const response = await axios.post(`${BASE_URL}/blog/add/draft`,blog, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
};

//to fetch category  
export const getCategory = async (token) => {
  try {
    const response = await axios.get(`${BASE_URL}/category/blogcategory`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
};


//to add category  
export const addCategory = async (blogcategoryName,token) => {
  try {
    const response = await axios.post(`${BASE_URL}/category/add/blogcategory`,blogcategoryName, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
};

//to delete category  
export const deleteCategory = async (name,token) => {
  try {
    const response = await axios.delete(`${BASE_URL}/category//blogcategories/${name}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
};

//to get draft blog  
export const getDraftBlog = async (page,token) => {
  try {
    const response = await axios.get(`${BASE_URL}/blog/api/blogs/draft?page=${page}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
};


//to get publish  blog  
export const getPublishBlog = async (page,token) => {
  try {
    const response = await axios.get(`${BASE_URL}/blog/api/blogs/published?page=${page}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
};


//to get publish  blog  
export const getSelectCategory = async (page,categoryname,token) => {
  try {
    const response = await axios.get(`${BASE_URL}/blog/categoryname/${categoryname}?page=${page}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
};

//to get publish  blog  
export const getFeatureBlog = async (page,token) => {
  try {
    const response = await axios.get(`${BASE_URL}/blog/api/blogs/featured?page=${page}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
};

//to get draft product  
export const getDraftProduct = async (page,token) => {
  try {
    const response = await axios.get(`${BASE_URL}/product/api/product/draft?page=${page}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
};

//to get publish  blog  
export const getFeatureProduct = async (token) => {
  try {
    const response = await axios.get(`${BASE_URL}/blog/api/blogs/featured`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
};

//to get publish  product  
export const getPublishProduct = async (page,token) => {
  try {
    const response = await axios.get(`${BASE_URL}/product/api/product/published?page=${page}`, {
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
export const getProductSelectCategory = async (token) => {
 try {
    const response = await axios.get(`${BASE_URL}/category/productcategory`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
};

//to get product sub category  
export const getProductSubCategory = async (token) => {
 try {
    const response = await axios.get(`${BASE_URL}/category/subproductcategory`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
};

//to get paper size 
export const getPaperSize = async (token) => {
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

//to get color 
export const getColor = async (token) => {
 try {
    const response = await axios.get(`${BASE_URL}/atribute/allcolor/colorcode`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
};

//to get all size 
export const getAllSize = async (token) => {
 try {
    const response = await axios.get(`${BASE_URL}/atribute/allsize/sizeicon`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
};

//to get all flavour 
export const getAllFlavour = async (token) => {
 try {
    const response = await axios.get(`${BASE_URL}/atribute/flavour/flavourname`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
};


//to add  product  publish
export const addProduct = async (product,token) => {
  try {
    const response = await axios.post(`${BASE_URL}/product/add/publish`,product, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
};


//to save draft  product  
export const saveProduct = async (product,token) => {
  try {
    const response = await axios.post(`${BASE_URL}/product/add/draft`,product, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
};


//to delete blog
export const deleteBlogs = async (blogId,token) => {
  try {
    const response = await axios.delete(`${BASE_URL}/blog/delete/${blogId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
};

//to update blog
export const updateBlogs = async (blogId,data,token) => {
  try {
    const response = await axios.patch(`${BASE_URL}/blog/update/${blogId}`,data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
};

//to edit blog
export const editBlogs = async (blogId,token) => {
  try {
    const response = await axios.get(`${BASE_URL}/blog/${blogId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
};

//to un publish product
export const unPublishProduct = async (productId,token) => {
  try {
    const response = await axios.put(`${BASE_URL}/product/api/blogs/unpublish/${productId}`,null, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
};

//to un publish blog
export const unPublishBlogs = async (blogId,token) => {
  try {
    const response = await axios.put(`${BASE_URL}/blog/api/blogs/unpublish/${blogId}`,null, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
};

//to  publish product
export const publishProduct = async (productId,token) => {
  try {
    const response = await axios.put(`${BASE_URL}/product/api/blogs/publish/${productId}`,null, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
};

//to  publish blog
export const publishBlogs = async (blogId,token) => {
  try {
    const response = await axios.put(`${BASE_URL}/blog/api/blogs/publish/${blogId}`,null, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
};

//to  unfeature blog
export const unFeatureBlogs = async (blogId,token) => {
  try {
    const response = await axios.put(`${BASE_URL}/blog/api/blogs/remove-feature/${blogId}`, null,{
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
};

//to  unfeature blog
export const featureBlogs = async (blogId,token) => {
  try {
    const response = await axios.put(`${BASE_URL}/blog/api/blogs/feature/${blogId}`,null, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
};

//to un publish blog
export const categoryWiseBlogs = async (categoryname,token) => {
  try {
    const response = await axios.get(`${BASE_URL}/blog/categoryname/${categoryname}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
};


//to edit product
export const editProducts = async (productId,token) => {
  try {
    const response = await axios.get(`${BASE_URL}/product/${productId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
};

//to delete product
export const deleteProducts = async (productId,token) => {
  try {
    const response = await axios.delete(`${BASE_URL}/product/${productId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
};

//to edit product
export const featureCount = async (token) => {
  try {
    const response = await axios.get(`${BASE_URL}/blog/count/fatures/blog`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
};


//to update blog
export const updateProduct = async (productId,data,token) => {
  try {
    const response = await axios.patch(`${BASE_URL}/product/${productId}`,data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
};


// setting routes

//to add  Category
export const addCategories = async (prouctcategory,token) => {
  try {
    const response = await axios.post(`${BASE_URL}/category/add/prouctcategory`,prouctcategory, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
};

//to get  Category
export const getCategories = async (token) => {
  try {
    const response = await axios.get(`${BASE_URL}/category/productcategory`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
};

//to delete  Category
export const deleteCategories = async (name,token) => {
  try {
    const response = await axios.delete(`${BASE_URL}/category/productcategories/${name}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
};

//to get sub Category
export const getSubCategories = async (token) => {
  try {
    const response = await axios.get(`${BASE_URL}/category/subproductcategory`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
};

//to add  Category
export const addSubCategories = async (prouctcategory,token) => {
  try {
    const response = await axios.post(`${BASE_URL}/category/add/subproductcategory`,prouctcategory, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
};

//to edit sub  Category
export const editSubCategories = async (id,token) => {
  try {
    const response = await axios.get(`${BASE_URL}/category/subproductcategories/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
};

//to edit sub  Category
export const updateSubCategories = async (id,data,token) => {
  try {
    const response = await axios.patch(`${BASE_URL}/category/subproductcategories/${id}`,data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
};


//to delete sub  Category
export const deleteSubCategories = async (id,token) => {
  try {
    const response = await axios.delete(`${BASE_URL}/category/subproductcategories/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
};

//to delete papper size
export const deletePapperSize = async (id,token) => {
  try {
    const response = await axios.delete(`${BASE_URL}/atribute/paper/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
};

//to delete color
export const deleteColor = async (id,token) => {
  try {
    const response = await axios.delete(`${BASE_URL}/atribute/color/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
};

//to delete size
export const deleteSizes = async (id,token) => {
  try {
    const response = await axios.delete(`${BASE_URL}/atribute/size/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
};

//to delete flavour
export const deleteFlavour = async (id,token) => {
  try {
    const response = await axios.delete(`${BASE_URL}/atribute/flavour/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
};

// to save paper size
export const savePaperSize = async (data,token) => {
  try {
    const response = await axios.post(`${BASE_URL}/atribute/add/paper`,data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
};

// to save color
export const saveColor = async (data,token) => {
  try {
    const response = await axios.post(`${BASE_URL}/atribute/add/color`,data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
};

// to save size
export const saveSize = async (data,token) => {
  try {
    const response = await axios.post(`${BASE_URL}/atribute/add/size`,data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
};

// to save size
export const saveFlavour = async (data,token) => {
  try {
    const response = await axios.post(`${BASE_URL}/atribute/add/flavour`,data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
};

// to get paper size
export const getPaper = async (token) => {
  try {
    const response = await axios.get(`${BASE_URL}/atribute/paper`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
};
// to get  size
export const getSize = async (token) => {
  try {
    const response = await axios.get(`${BASE_URL}/atribute/size`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
};

// to get  size
export const getFlavour = async (token) => {
  try {
    const response = await axios.get(`${BASE_URL}/atribute/flavour`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
};

// to get paper size
export const getColors = async (token) => {
  try {
    const response = await axios.get(`${BASE_URL}/atribute/color`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
};

//to get all leads

export const getAllLeads = async (page,token) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/contact?page=${page}`,
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

// to specific lead
export const getSpecificLead = async (token, contactId) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/contact/${contactId}`,
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

//to delete lead
export const leadDelete = async (contactId, token) => {
  try {
    const response = await axios.delete(`${BASE_URL}/contact/${contactId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
};

//to get Number  
export const getNum = async () => {
 try {
    const response = await axios.get(`${BASE_URL}/contact/get-num`, {
      // headers: {
      //   Authorization: `Bearer ${token}`,
      // },
    });
    return response;
  } catch (error) {
    throw error;
  }
};

//to get Number  
export const getReset = async () => {
 try {
    const response = await axios.patch(`${BASE_URL}/contact/reset-num `,null, {
      // headers: {
      //   Authorization: `Bearer ${token}`,
      // },
    });
    return response;
  } catch (error) {
    throw error;
  }
};

//notification Count
export const notificationCount = async (token) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/notification/unread-count`,
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
export const notificationRead = async (token) => {
  try {
    const response = await axios.put(
      `${BASE_URL}/notification/mark-as-read`,null,
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

//to save draft  product  
export const addFeatureProduct = async (feature,token) => {
  try {
    const response = await axios.post(`${BASE_URL}/features/add/adds`,feature, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
};

//to get feature  product  
export const getFeatures = async (token) => {
  try {
    const response = await axios.get(`${BASE_URL}/features/adds`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
};

//to get feature  product  
export const getFeaturesEdit = async (id,token) => {
  try {
    const response = await axios.get(`${BASE_URL}/features/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
};

//to Update feature
export const updateFeatureProduct = async (id,data,token) => {
  try {
    const response = await axios.patch(`${BASE_URL}/features/adds/update/${id}`,data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
};
       
//to delete feature
export const deleteFeatureProduct = async (id,token) => {
  try {
    const response = await axios.delete(`${BASE_URL}/features/adds/delete/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
};
////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////

//to check if admin is exists
export const checkIfAdminExists = async (number) => {
  console.warn(BASE_URL);
  try {
    const response = await axios.post(`${BASE_URL}/admin/login/${number}`);
    return response;
  } catch (error) {
    throw error;
  }
};

//add vendor 
export const addVendor = async (userData, token) => {
  try {
    const response = await axios.post(`${BASE_URL}/admin/add`, userData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
};

// get all pending vendors
export const getAllVendors = async (page,token) => {
  try {
    const response = await axios.get(`${BASE_URL}/admin/vendor/pending?page=${page}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    return { status: false };
    // throw error;
  }
};

// get all valid vendors
export const getAllVendorsValid = async (page,token) => {
  try {
    const response = await axios.get(`${BASE_URL}/admin/vendor/valid?page=${page}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    return { status: false };
    // throw error;
  }
};

// get all suspended vendors
export const getAllVendorsSuspendedList = async (page,token) => {
  try {
    const response = await axios.get(`${BASE_URL}/admin/admin/vendor/suspendedlist?page=${page}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    return { status: false };
    // throw error;
  }
};

// get all coupons admin
export const getAllCoupons = async (page,token) => {
  console.warn(page,token)
  try {
    const response = await axios.get(`${BASE_URL}/admin/coupons/admincoupon?page=${page}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
};

// get all coupons for vendor
export const getAllCouponsForVendor = async (page,token) => {
  try {
    const response = await axios.get(`${BASE_URL}/admin/coupons/vendorcoupon?page=${page}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
};

//to update admin
export const adminUpdate = async (id, token, userData) => {
  try {
    const response = await axios.patch(
      `${BASE_URL}/admin/update/${id}`,
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

//to approve vendors
export const vendorApprove = async (id, token) => {
  try {
    const response = await axios.patch(
      `${BASE_URL}/admin/approval/${id}`,
      null,
      {
        headers: {
          Authorization: `bearer ${token}`,
        },
      }
    );
    console.warn(response);
    return response;
  } catch (error) {
    console.warn(error);
    throw error;
  }
};

//to reject vendors
export const vendorReject = async (id,reject_region, token) => {
  try {
    const response = await axios.patch(`${BASE_URL}/admin/vendor/recieved/request/rejected/${id}`, reject_region, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
};

//to delete vendors
export const vendorDelete = async (id, token) => {
  try {
    const response = await axios.delete(`${BASE_URL}/admin/vendor/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
};

//to suspend vendor
export const suspendVendor = async (id, token) => {
  console.warn(token)
  try {
    const response = await axios.patch(`${BASE_URL}/admin/vendor/suspended/${id}`, null,{
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
};

// to update vendors
export const vendorUpdate = async (id, userData, token) => {
  try {
    const response = await axios.patch(
      `${BASE_URL}/admin/update/${id}`,
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

//to get all products
// export const getAllProducts = async (id,page,token) => {
//   try {
//     const response = await axios.get(`${BASE_URL}/admin/product/${id}?page=${page}`, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });
//     return response;
//   } catch (error) {
//     throw error;
//   }
// };

//to  add products
export const addProducts = async (token, newProduct) => {
  try {
    const response = await axios.post(`${BASE_URL}/admin/product`, newProduct, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
};




//to view coupons
export const viewCoupons = async (id, page,token) => {
  console.warn(id, page,token)
  try {
    const response = await axios.get(`${BASE_URL}/admin/settle/coupon/${id}?page=${page}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
};

//to send request
export const sendRequest = async (couponCode, token) => {
  console.warn(couponCode);
  try {
    const response = await axios.post(
      `${BASE_URL}/admin/settle/send/${couponCode}`,
      null,
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

//to view coupons
export const allSendRequestForVendors = async (token) => {
  try {
    const response = await axios.get(`${BASE_URL}/admin/settle/recieved`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
};

//to view only admin all send request 

export const allSendRequestForAdmin = async (page,token) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/admin/admin/recieved/request?page=${page}`,
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

//to get all reject request 

export const getAllRejectRequestForAdmin = async (page,token) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/admin/vendor/rejected/request?page=${page}`,
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

// to update  admin and vendor info
export const updateAdminInfo = async (id, formData,token) => {
  try {
    const response = await axios.patch(
      `${BASE_URL}/admin/update/${id}`,
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

// to get  admin and vendor info
export const getAdminInfo = async (token) => {
  try {
    const response = await axios.get(`${BASE_URL}/admin`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
};

//to post Checkout
export const checkoutPost = async (token, formData) => {
  try {
    const response = await axios.post(`${BASE_URL}/admin/checkout`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
};

//for admin get  payment settlement 
export const paymentSettlement = async (page,token) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/paymentsettlement/payment-settlements?page=${page}`,
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

//for vendor get  payment settlement 
export const paymentSettlementForVendor = async (page,token) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/paymentsettlement/payment-settlements/vendor?page=${page}`,
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

// forward request
export const forwardRequest = async (token, _id) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/admin/forward/${_id}`,
      null,
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

// to accept  request
export const acceptRequest = async (token, id) => {
  try {
    const response = await axios.patch(
      `${BASE_URL}/admin/vendor/recieved/request/accept/${id}`,
      null,
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

// For Return request
export const returnRequest = async (token, id) => {
  try {
    const response = await axios.patch(`${BASE_URL}/admin/return/${id}`, null, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
};

//to get daily reports
export const getDailyReports = async (page,token) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/admin/dailyreport/generate-csvfile?page=${page}`,
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

//to get admin wallet
export const getWalletPoint = async (token) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/admin/wallet`,
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

//dashboard points
export const getDashboardPoint = async (token) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/admin/vendor/point/dashboard`,
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

//dashboard graph data for admin
export const getDashboardGraph = async (token) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/admin/payment/month-data/amount`,
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

//dashboard graph data for vendor
export const getDashboardGraphVendor = async (token) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/admin/payment/coupon/month-data`,
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

//search pending vendor Name
export const searchName = async (name,page,token) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/admin/vendor/pending/user/${name}?page=${page}`,
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

//search valid vendor Name
export const searchValidVendor = async (name,page,token) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/admin/vendor/valid/${name}?page=${page}`,
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
export const searchProductVendor = async (name,page,token) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/admin/product/admin/product/${name}?page=${page}`,
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

