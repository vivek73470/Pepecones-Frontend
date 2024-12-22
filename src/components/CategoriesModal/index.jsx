/** @format */

import React, { useEffect, useState } from 'react';
import './index.css';
import { MdOutlineClose, MdDelete } from 'react-icons/md';
import { addCategory, getCategory, deleteCategory } from '../../Api/adminApi';
import { toast } from 'react-toastify';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { setFetching } from '../../redux/reducer/fetching';

const CategoriesModal = ({ setShowModal, fetchOptions }) => {
  const [categorie, setCategorie] = useState('');
  const [error, setError] = useState('');
  const [category, setcategory] = useState([]);
  const [categoryErrors, setCategoryErrors] = useState({});

  useEffect(() => {
    fetchCategories();
  }, []);

  const dispatch = useDispatch();

  const fetchCategories = async () => {
    dispatch(setFetching(true));
    const token = localStorage.getItem('auth_token');
    try {
      let response = await getCategory(token);
      if (response.status === 200) {
        console.warn(response);
        setcategory(response?.data);
        dispatch(setFetching(false));
      }
    } catch (error) {
      dispatch(setFetching(false));
    }
  };

  const handleAddCategory = async (e) => {
    e.preventDefault();
    const data = {
      blogcategoryName: categorie,
    };
    dispatch(setFetching(true));
    const token = localStorage.getItem('auth_token');
    let response = await addCategory(data, token);
    try {
      if (response.status === 201) {
        fetchOptions();
        toast.success('New Category Added!');
        dispatch(setFetching(false));
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 400) {
          toast.error('Bad Request!');
        } else if (error.response.status === 409) {
          toast.error('Duplicate request!');
        } else if (error.response.status === 500) {
          toast.error('Internal Server Error!');
        }
      }
      dispatch(setFetching(false));
    }
  };

  const handleDeleteCategory = async (name) => {
    dispatch(setFetching(true));
    const token = localStorage.getItem('auth_token');
    try {
      let response = await deleteCategory(name, token);
      if (response.status === 204) {
        toast.success('Category Deleted!');
        fetchCategories();
        dispatch(setFetching(false));
      }
    } catch (error) {
      console.warn(error.response.data.error);
      setCategoryErrors((prevErrors) => ({
        ...prevErrors,
        [name]: error.response.data.error,
      }));
      fetchCategories();
      dispatch(setFetching(false));
      toast.error('Category Not Deleted!');

      // Remove the error message after 3 seconds
      setTimeout(() => {
        setCategoryErrors((prevErrors) => {
          const updatedErrors = { ...prevErrors };
          delete updatedErrors[name];
          return updatedErrors;
        });
      }, 5000);
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="cancle-modal" onClick={() => setShowModal(false)}>
          <MdOutlineClose fontSize={40} />
        </span>
        <h4 className="welcome">Categories</h4>
        <form className="categories-form" onSubmit={handleAddCategory}>
          <input
            type="text"
            value={categorie}
            onChange={(e) => setCategorie(e.target.value)}
            style={{ marginBottom: '15px' }}
          />
          <button type="submit">Submit</button>
        </form>
        <div className="categorie-section">
          {category.length > 0
            ? category?.map((prodCategory, index) => (
                <div className="categories-list" key={index}>
                  <div
                    className="description"
                    style={{ textAlign: 'start', width: '100%' }}
                  >
                    <h5>{prodCategory?.blogcategoryName}</h5>
                    <h6>
                      created on:
                      {prodCategory?.createdAt
                        ? moment(prodCategory?.createdAt).format('DD MMM YYYY')
                        : 'N/A'}
                    </h6>
                    {categoryErrors[prodCategory?.blogcategoryName] && (
                      <p style={{ color: 'red', textAlign: 'start' }}>
                        !&nbsp;{categoryErrors[prodCategory?.blogcategoryName]}
                      </p>
                    )}
                  </div>
                  <span
                    onClick={() =>
                      handleDeleteCategory(prodCategory?.blogcategoryName)
                    }
                  >
                    <MdDelete fontSize={25} />
                  </span>
                </div>
              ))
            : null}
        </div>
      </div>
    </div>
  );
};

export default CategoriesModal;
