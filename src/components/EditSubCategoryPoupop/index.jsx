/** @format */

import React from 'react';
import { MdOutlineClose } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import EditCategoryDropdownPopoup from '../EditCategoryDropdownPopoup';
import { useState } from 'react';
import EditSubCategoryDescEditer from '../EditSubCategoryDescEditer';
import { setFetching } from '../../redux/reducer/fetching';
import { toast } from 'react-toastify';
import { updateSubCategories } from '../../Api/adminApi';
import { TOKEN } from '../../constant';
const EditSubCategoryPoupop = ({
  // subCategory,
  // setSubCategory,
  setShowEditSubCategory,
  handleSubCategorySubmit,
  // handleUpdateSubCategory,
  fetchSubCategory,
  category,
  setShowSubCategory,
}) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const editSubCategory = useSelector(
    (state) => state?.editSubCategory.subCategory || {},
  );
  //  const editSubCategory = useSelector((state) => state?.editSubCategory);
  const [subCategory, setSubCategory] = useState(editSubCategory);
  // console.log(editSubCategories);

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  const handleChange = (name, value) => {
    setSubCategory({ ...subCategory, [name]: value });
  };

  const dispatch = useDispatch();
  const handleUpdateSubCategory = async (e, editSubCategory) => {
    e.preventDefault();
    const token = localStorage.getItem('auth_token');
    console.log(subCategory);
    const categoryId = editSubCategory._id;
    console.log(categoryId);
    dispatch(setFetching(true));
    try {
      const response = await updateSubCategories(
        categoryId,
        subCategory,
        token,
      );
      if (response.status === 200) {
        // console.log(response);
        // dispatch(setEditSubCategory(response.data));
        setShowEditSubCategory(false);
        fetchSubCategory(token);
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
  console.log(subCategory);
  return (
    <div className="modal">
      <div
        className="modal-content modal-confirm"
        style={{
          height: '620px',
          justifyContent: 'space-evenly',
          maxWidth: '1050px',
        }}
      >
        <span
          onClick={() => setShowEditSubCategory(false)}
          className="cancle-modal"
        >
          <MdOutlineClose fontSize={40} />
        </span>
        <div className="category-modal" style={{ paddingInline: '30px' }}>
          <span>Sub-Category</span>
          <br />
          <div className="category-field">
            <EditCategoryDropdownPopoup
              category={category}
              onSelect={handleOptionSelect}
              sub={'Select-Category'}
              formData={subCategory}
              setFormData={setSubCategory}
              subCategory={subCategory}
            />
            <input
              defaultValue={subCategory?.subcategoriesname}
              onChange={(e) =>
                handleChange('subcategoriesname', e.target.value)
              }
              placeholder="Sub-category name"
            />
          </div>
          <br />
          <EditSubCategoryDescEditer
            setSubCategory={setSubCategory}
            subCategory={subCategory}
          />
        </div>
        <button
          className=""
          onClick={(e) => handleUpdateSubCategory(e, subCategory)}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default EditSubCategoryPoupop;
