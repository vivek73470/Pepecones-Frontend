/** @format */

import React, { useEffect, useState } from 'react';
import './index.css';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { TbEdit } from 'react-icons/tb';
import SubCategoryPoupop from '../../components/SubCategoryPoupop';
import ProfileInfo from '../../components/ProfileInfo';
import Attribute from '../../components/Attribute';
import AddUploadImageModal from '../../components/AddUploadImageModal';
import {
  addCategories,
  getCategories,
  deleteCategories,
  getSubCategories,
  addSubCategories,
  editSubCategories,
  updateSubCategories,
  deleteSubCategories,
  savePaperSize,
  getPaper,
  getColors,
} from '../../Api/adminApi';
import { useDispatch, useSelector } from 'react-redux';
import { setFetching } from '../../redux/reducer/fetching';
import { setEditSubCategory } from '../../redux/reducer/editSubCategory';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import EditSubCategoryPoupop from '../../components/EditSubCategoryPoupop';
import { TOKEN } from '../../constant';

const Setting = () => {
  const [activeButton, setActiveButton] = useState('product');
  const [showSubCategory, setShowSubCategory] = useState(false);
  const [showEditSubCategory, setShowEditSubCategory] = useState(false);
  const [category, setCategory] = useState([]);
  const [subCategorys, setSubtCategorys] = useState([]);
  const [showUpload, setShowUpload] = useState(false);
  const [productcategoryName, setProductcategoryName] = useState('');
  const [subcategoryDiscriptions, setSubcategoryDiscriptions] = useState('');
  const editSubCategory = useSelector((state) => state?.editSubCategory);
  const [subCategory, setSubCategory] = useState(editSubCategory);

  const [paperSize, setPaperSize] = useState({
    papersize: '',
    Unit: '',
  });

  const [colorPicker, setColorPicker] = useState({
    colorname: '',
    color: '#F9C07D',
  });

  const [size, setSize] = useState({
    sizename: '',
    sizeicon: '',
  });

  const [flavourname, setFlavourname] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleButtonClick = (btnName) => {
    // console.log(btnName);
    setActiveButton(btnName === activeButton ? null : btnName);
  };

  const isButtonActive = (btnName) => btnName === activeButton;
  // console.log(categoryName);

  const handleCategorySubmit = async (productcategoryName, TOKEN) => {
    console.log(productcategoryName);
    const token = localStorage.getItem('auth_token');
    dispatch(setFetching(true));
    const data = { productcategoryName };
    try {
      const response = await addCategories(data, token);
      if (response.status === 201) {
        toast.success('Add Category Successfully');
        fetchCategory();
        dispatch(setFetching(false));
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 400) {
          toast.error('Bad Request!');
        } else if (error.response.status === 500) {
          toast.error('Internal Server Error!');
        }
      }
      dispatch(setFetching(false));
    }
  };

  const handleSubCategorySubmit = async (subCategory, TOKEN) => {
    console.log(subCategory);
    const token = localStorage.getItem('auth_token');
    dispatch(setFetching(true));
    // const data = { subCategory };
    try {
      const response = await addSubCategories(subCategory, token);
      if (response.status === 201) {
        toast.success('Add Sub Category Successfully');
        setShowSubCategory(false);
        fetchSubCategory();
        dispatch(setFetching(false));
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 400) {
          toast.error('Bad Request!');
        } else if (error.response.status === 500) {
          toast.error('Internal Server Error!');
        }
      }
      dispatch(setFetching(false));
    }
  };

  useEffect(() => {
    document.title = 'Setting';
    fetchCategory(TOKEN);
    fetchSubCategory(TOKEN);
  }, []);

  const fetchCategory = async (TOKEN) => {
    const token = localStorage.getItem('auth_token');
    dispatch(setFetching(true));
    try {
      const response = await getCategories(token);
      if (response.status === 200) {
        // console.log(response);
        setCategory(response.data);
        dispatch(setFetching(false));
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 400) {
          toast.error('Bad Request!');
        } else if (error.response.status === 500) {
          toast.error('Internal Server Error!');
        }
      }
      dispatch(setFetching(false));
    }
  };

  const fetchSubCategory = async (TOKEN) => {
    const token = localStorage.getItem('auth_token');
    dispatch(setFetching(true));
    try {
      const response = await getSubCategories(token);
      if (response.status === 200) {
        console.log(response);
        setSubtCategorys(response.data);
        dispatch(setFetching(false));
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 400) {
          toast.error('Bad Request!');
        } else if (error.response.status === 500) {
          toast.error('Internal Server Error!');
        }
      }
      dispatch(setFetching(false));
    }
  };

  const handleCategoryDelete = async (name, TOKEN) => {
    console.log(name);
    const token = localStorage.getItem('auth_token');
    dispatch(setFetching(true));
    try {
      const response = await deleteCategories(name, token);
      if (response.status === 204) {
        console.log(response);
        fetchCategory();
        toast.success(' Category Deleted Successfully !');
        dispatch(setFetching(false));
      }
    } catch (error) {
      dispatch(setFetching(false));
      if (error.response) {
        if (error.response.status === 400) {
          toast.error('Bad Request!');
        } else if (error.response.status === 500) {
          toast.error('Internal Server Error!');
        }
      }
      dispatch(setFetching(false));
    }
  };

  const handleEditSubCategory = async (id, TOKEN) => {
    console.log(id);
    const token = localStorage.getItem('auth_token');
    dispatch(setFetching(true));
    try {
      const response = await editSubCategories(id, token);
      if (response.status === 200) {
        console.log(response);
        dispatch(setEditSubCategory(response.data));
        dispatch(setFetching(false));
        setShowEditSubCategory(true);
      }
    } catch (error) {
      dispatch(setFetching(false));
      if (error.response) {
        if (error.response.status === 400) {
          toast.error('Bad Request!');
        } else if (error.response.status === 500) {
          toast.error('Internal Server Error!');
        }
      }
      dispatch(setFetching(false));
    }
  };

  // const handleUpdateSubCategory = async (e, editSubCategory) => {
  //   e.preventDefault();
  //   console.log(subCategory);
  //   const categoryId = editSubCategory._id;
  //   console.log(categoryId);
  //   const token = localStorage.getItem('auth_token');
  //   dispatch(setFetching(true));
  //   try {
  //     const response = await updateSubCategories(
  //       categoryId,
  //       subCategory,
  //       token,
  //     );
  //     if (response.status === 200) {
  //       // console.log(response);
  //       // dispatch(setEditSubCategory(response.data));
  //       fetchSubCategory();
  //       dispatch(setFetching(false));
  //       setShowSubCategory(false);
  //     }
  //   } catch (error) {
  //     dispatch(setFetching(false));
  //     if (error.response) {
  //       if (error.response.status === 400) {
  //         toast.error('Bad Request!');
  //       } else if (error.response.status === 500) {
  //         toast.error('Internal Server Error!');
  //       }
  //     }
  //     dispatch(setFetching(false));
  //   }
  // };

  const handleDeleteSubCategory = async (id, TOKEN) => {
    console.log(id);
    const token = localStorage.getItem('auth_token');
    dispatch(setFetching(true));
    try {
      const response = await deleteSubCategories(id, token);
      if (response.status === 204) {
        console.log(response);
        toast.success('Sub Category Deleted Successfully !');
        fetchSubCategory();
        dispatch(setFetching(false));
      }
    } catch (error) {
      dispatch(setFetching(false));
      if (error.response) {
        if (error.response.status === 400) {
          toast.error('Bad Request!');
        } else if (error.response.status === 500) {
          toast.error('Internal Server Error!');
        }
      }
      dispatch(setFetching(false));
    }
  };

  // const handleSavePapperSize = async () => {
  //   console.log(paperSize);
  //   const token = localStorage.getItem('auth_token');
  //   dispatch(setFetching(true));
  //   try {
  //     let response = await savePaperSize(paperSize, token);
  //     if (response.status === 201) {
  //       console.log(response);
  //       toast.success('Add Paper Size Successfully !');
  //       dispatch(setFetching(false));
  //     }
  //   } catch (error) {
  //     dispatch(setFetching(false));
  //     toast.error(error.message);
  //   }
  // };

  const handleChange = (name, value) => {
    setSubCategory({ ...subCategory, [name]: value });
  };

  const handleChangeSize = (name, value) => {
    setSize({ ...size, [name]: value });
  };
  function extractTextFromHtml(htmlString, maxWords) {
    const cleanedText = htmlString
      .replace(/<[^>]*>/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
    const words = cleanedText.split(' ');
    const firstTwoLines = words.slice(0, maxWords).join(' ');
    const limitedText = firstTwoLines.slice(0, 100);
    return limitedText;
  }
  // console.log(subCategory);
  console.log(editSubCategory);
  return (
    <div className="setting-container">
      <div className="nav-btn-containers">
        <div className="tab-container">
          <span
            onClick={() => handleButtonClick('product')}
            className={isButtonActive('product') ? 'active' : 'inActive'}
          >
            Product
          </span>
          <span
            onClick={() => handleButtonClick('profile')}
            className={isButtonActive('profile') ? 'active' : 'inActive'}
          >
            Profile
          </span>

          <span
            onClick={() => handleButtonClick('attributes')}
            className={isButtonActive('attributes') ? 'active' : 'inActive'}
          >
            Attributes
          </span>
        </div>
      </div>
      <div className="nav-btn-container">
        <div className="tab-container">
          <button
            onClick={() => handleButtonClick('product')}
            className={isButtonActive('product') ? 'active' : ''}
          >
            <b></b>
            <b></b>
            <span> Product</span>
          </button>
          <button
            onClick={() => handleButtonClick('profile')}
            className={isButtonActive('profile') ? 'active' : ''}
          >
            <b></b>
            <b></b>
            <span>Profile</span>
          </button>
          <button
            onClick={() => handleButtonClick('attributes')}
            className={isButtonActive('attributes') ? 'active' : ''}
          >
            <b></b>
            <b></b>
            <span> Attributes</span>
          </button>
        </div>
      </div>
      {activeButton === 'product' && (
        <div className="product-attribute">
          <span>Attributes</span>
          <br />
          <br />
          <span id="category">Category Name</span>
          <br />
          <br />
          <div className="category-div">
            <input
              placeholder="category"
              value={productcategoryName}
              onChange={(e) => setProductcategoryName(e.target.value)}
            />
            <span
              className="btn-secondery"
              onClick={() => handleCategorySubmit(productcategoryName, TOKEN)}
            >
              Submit
            </span>
          </div>
          <br />
          <div
            className="category-table table-wrapper
        "
          >
            <table className="tables">
              <thead style={{ height: '72px' }}>
                <tr>
                  <th>
                    <span>Sr. No</span>
                  </th>
                  <th>
                    <span>Category</span>
                  </th>
                  <th>
                    <span>Action</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {category?.length > 0
                  ? category?.map((item, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{item?.productcategoryName}</td>
                        <td>
                          <span
                            onClick={() =>
                              handleCategoryDelete(
                                item.productcategoryName,
                                TOKEN,
                              )
                            }
                          >
                            <RiDeleteBin6Line fontSize={25} />
                          </span>
                        </td>
                      </tr>
                    ))
                  : null}
              </tbody>
            </table>
          </div>
          <br />
          <br />
          <div id="sub-category">
            <span className="sub-category-child">Sub-Category</span>
            <span
              style={{
                color: '#335918',
                textDecoration: 'underline',
              }}
              className="sub-category-child"
              onClick={() => setShowSubCategory(true)}
            >
              +Add
            </span>
          </div>
          <br />
          <br />
          <div className="sub-category-table table-wrapper">
            <table className="tables">
              <thead style={{ height: '72px' }}>
                <tr>
                  <th>
                    <span>Sr. No</span>
                  </th>
                  <th>
                    <span>Category</span>
                  </th>
                  <th>
                    <span>Sub-Category</span>
                  </th>
                  <th>
                    <span>Description</span>
                  </th>
                  <th>
                    <span>Action</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {subCategorys?.length > 0
                  ? subCategorys.map((item, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{item?.categoryName}</td>
                        <td>{item?.subcategoriesname}</td>
                        <td>
                          {/* <p>{item?.subcategoryDiscription}</p> */}
                          <p>
                            {extractTextFromHtml(item?.subcategoryDiscription)}
                          </p>
                        </td>
                        <td>
                          <span>
                            <span
                              id="edit"
                              onClick={() =>
                                handleEditSubCategory(item._id, TOKEN)
                              }
                            >
                              <TbEdit fontSize={25} />
                            </span>
                            &nbsp; &nbsp;
                            <span
                              onClick={() =>
                                handleDeleteSubCategory(item._id, TOKEN)
                              }
                            >
                              <RiDeleteBin6Line fontSize={25} />
                            </span>
                          </span>
                        </td>
                      </tr>
                    ))
                  : null}
              </tbody>
            </table>
          </div>
        </div>
      )}
      {activeButton === 'profile' && (
        <ProfileInfo
        // formData={formData}
        // setFormData={setFormData}
        // handleChangeProfile={handleChangeProfile}
        />
      )}
      {activeButton === 'attributes' && (
        <div className="product-attribute">
          <Attribute
            size={size}
            setSize={setSize}
            paperSize={paperSize}
            setPaperSize={setPaperSize}
            colorPicker={colorPicker}
            setColorPicker={setColorPicker}
            setShowUpload={setShowUpload}
            setFlavourname={setFlavourname}
            flavourname={flavourname}
            handleChangeSize={handleChangeSize}
          />
        </div>
      )}
      {showSubCategory ? (
        <SubCategoryPoupop
          subCategory={subCategory}
          setSubCategory={setSubCategory}
          handleChange={handleChange}
          setShowSubCategory={setShowSubCategory}
          handleSubCategorySubmit={handleSubCategorySubmit}
          category={category}
        />
      ) : null}

      {showEditSubCategory ? (
        <EditSubCategoryPoupop
          subCategory={subCategory}
          setSubCategory={setSubCategory}
          handleChange={handleChange}
          setSubcategoryDiscriptions={setSubcategoryDiscriptions}
          subcategoryDiscriptions={subcategoryDiscriptions}
          setShowEditSubCategory={setShowEditSubCategory}
          fetchSubCategory={fetchSubCategory}
          category={category}
          // setShowEditSubCategory={setShowEditSubCategory}
        />
      ) : null}
      {showUpload ? (
        <AddUploadImageModal
          size={size}
          setSize={setSize}
          setShowUpload={setShowUpload}
          handleChangeSize={handleChangeSize}
        />
      ) : null}
    </div>
  );
};

export default Setting;
