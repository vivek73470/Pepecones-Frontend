/** @format */

import React, { useEffect, useState } from 'react';
import './index.css';
import UnitDropdown from '../UnitDropdown';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { FiUpload } from 'react-icons/fi';
import Vector from '../../assets/pepecons/Vector.svg';
import {
  getSize,
  getPaper,
  getColors,
  getFlavour,
  savePaperSize,
  saveColor,
  saveSize,
  saveFlavour,
  deletePapperSize,
  deleteColor,
  deleteSizes,
  deleteFlavour,
} from '../../Api/adminApi';
import { useDispatch } from 'react-redux';
import { setFetching } from '../../redux/reducer/fetching';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { TOKEN } from '../../constant';
const Attribute = ({
  setShowUpload,
  handleChangeSize,
  paperSize,
  setPaperSize,
  colorPicker,
  setColorPicker,
  setSize,
  size,
  setFlavourname,
  flavourname,
}) => {
  // const [selectedColor, setSelectedColor] = useState('#F9C07D');
  const [papperSize, setPapperSize] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [color, setColor] = useState([]);
  const [flavour, setFlavour] = useState([]);
  const dispatch = useDispatch();
  const options = [
    {
      unit: 'mm',
    },
    {
      unit: 'cm',
    },
    {
      unit: 'inch',
    },
    // {
    //   unit: 'mm',
    // },
  ];
  // const handleColorChange = (event) => {
  //   const newColor = event.target.value;
  //   setSelectedColor(newColor);
  // };
  useEffect(() => {
    fetchPapperSize();
    fetchColor();
    fetchSize();
    fetchFlavour();
  }, []);

  console.log(papperSize);
  const fetchPapperSize = async () => {
    const token = localStorage.getItem('auth_token');
    dispatch(setFetching(true));
    try {
      let response = await getPaper(token);
      if (response.status === 200) {
        console.log(response);
        setPapperSize(response.data);
        dispatch(setFetching(false));
      }
    } catch (error) {
      dispatch(setFetching(false));
      toast.error(error.message);
    }
  };

  const fetchSize = async () => {
    const token = localStorage.getItem('auth_token');
    dispatch(setFetching(true));
    try {
      let response = await getSize(token);
      if (response.status === 200) {
        console.log(response);
        setSizes(response.data);
        dispatch(setFetching(false));
      }
    } catch (error) {
      dispatch(setFetching(false));
      toast.error(error.message);
    }
  };

  const fetchFlavour = async () => {
    const token = localStorage.getItem('auth_token');
    dispatch(setFetching(true));
    try {
      let response = await getFlavour(token);
      if (response.status === 200) {
        console.log(response);
        setFlavour(response.data);
        dispatch(setFetching(false));
      }
    } catch (error) {
      dispatch(setFetching(false));
      toast.error(error.message);
    }
  };

  const fetchColor = async () => {
    const token = localStorage.getItem('auth_token');
    dispatch(setFetching(true));
    try {
      const response = await getColors(token);
      if (response.status === 200) {
        console.log(response);
        setColor(response.data);
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

  const handleChangeColor = (name, value) => {
    setColorPicker({ ...colorPicker, [name]: value });
  };

  const handleChangePaperSize = (name, value) => {
    setPaperSize({ ...paperSize, [name]: value });
  };
  console.log(paperSize);

  const handleSavePapperSize = async () => {
    console.log(paperSize);
    const token = localStorage.getItem('auth_token');
    dispatch(setFetching(true));
    try {
      let response = await savePaperSize(paperSize, token);
      if (response.status === 201) {
        console.log(response);
        setPaperSize({
          papersize: '',
          Unit: '',
        });
        toast.success('Add Paper Size Successfully !');
        fetchPapperSize();
        dispatch(setFetching(false));
      }
    } catch (error) {
      dispatch(setFetching(false));
      toast.error(error.message);
    }
  };
  const handleSaveColor = async () => {
    console.log(colorPicker);
    const token = localStorage.getItem('auth_token');
    dispatch(setFetching(true));
    try {
      let response = await saveColor(colorPicker, token);
      if (response.status === 201) {
        console.log(response);
        setColorPicker({
          colorname: '',
          color: '#F9C07D',
        });
        toast.success('Add New Color Successfully !');
        fetchColor();
        dispatch(setFetching(false));
      }
    } catch (error) {
      dispatch(setFetching(false));
      toast.error(error.message);
    }
  };

  const handleSaveSize = async () => {
    console.log(size);
    const token = localStorage.getItem('auth_token');
    dispatch(setFetching(true));
    try {
      let response = await saveSize(size, token);
      if (response.status === 201) {
        console.log(response);
        setSize({
          sizename: '',
          sizeicon: '',
        });
        toast.success('Add New Size Successfully !');
        fetchSize();
        dispatch(setFetching(false));
      }
    } catch (error) {
      dispatch(setFetching(false));
      toast.error(error.message);
    }
  };

  const handleSaveFalvour = async () => {
    console.log(flavourname);
    const token = localStorage.getItem('auth_token');
    dispatch(setFetching(true));
    const data = { flavourname };
    try {
      let response = await saveFlavour(data, token);
      if (response.status === 201) {
        console.log(response);
        setFlavourname('');
        toast.success('Add New Falvour Successfully !');
        fetchFlavour();
        dispatch(setFetching(false));
      }
    } catch (error) {
      dispatch(setFetching(false));
      toast.error(error.message);
    }
  };
  const handleDeletePapperSize = async (id) => {
    console.log(id);
    const token = localStorage.getItem('auth_token');
    dispatch(setFetching(true));
    try {
      const response = await deletePapperSize(id, token);
      if (response.status === 200) {
        console.log(response);
        toast.success('Papper Size Deleted Successfully !');
        fetchPapperSize();
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

  const handleDeleteColor = async (id) => {
    console.log(id);
    const token = localStorage.getItem('auth_token');
    dispatch(setFetching(true));
    try {
      const response = await deleteColor(id, token);
      if (response.status === 200) {
        console.log(response);
        toast.success('Color Deleted Successfully !');
        fetchColor();
        dispatch(setFetching(false));
      }
    } catch (error) {
      // dispatch(setFetching(false));
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
  const handleDeleteSizes = async (id) => {
    console.log(id);
    const token = localStorage.getItem('auth_token');
    dispatch(setFetching(true));
    try {
      const response = await deleteSizes(id, token);
      if (response.status === 200) {
        console.log(response);
        toast.success('Size Deleted Successfully !');
        fetchSize();
        dispatch(setFetching(false));
      }
    } catch (error) {
      // dispatch(setFetching(false));
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

  const handleDeleteFlavour = async (id) => {
    console.log(id);
    const token = localStorage.getItem('auth_token');
    dispatch(setFetching(true));
    try {
      const response = await deleteFlavour(id, token);
      if (response.status === 200) {
        console.log(response);
        toast.success('Flavour Deleted Successfully !');
        fetchFlavour();
        dispatch(setFetching(false));
      }
    } catch (error) {
      // dispatch(setFetching(false));
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
  //
  console.log(flavourname);
  return (
    <div>
      <div className="content-container">
        <span>Attribute</span>
        {/* <button type="submit" className="profile-submit">
        Update
      </button> */}
      </div>
      <br />
      <div className="papper-attribute">
        <span>Papper Size</span>
        <div className="attribute-field">
          <input
            value={paperSize.papersize}
            onChange={(e) => handleChangePaperSize('papersize', e.target.value)}
            placeholder="paper size"
          />
          <UnitDropdown
            paperSize={paperSize}
            setPaperSize={setPaperSize}
            options={options}
          />
          <span onClick={() => handleSavePapperSize()}>Save</span>
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
                  <span>Papper Size</span>
                </th>
                <th>
                  <span>Unit</span>
                </th>
                <th>
                  <span>Action</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {papperSize?.length > 0
                ? papperSize.map((item, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{item.papersize}</td>
                      <td>{item.Unit}</td>
                      <td>
                        <span onClick={() => handleDeletePapperSize(item._id)}>
                          <RiDeleteBin6Line fontSize={25} />
                        </span>
                      </td>
                    </tr>
                  ))
                : null}
            </tbody>
          </table>
        </div>
      </div>
      <div className="papper-attribute">
        <span>Color</span>
        <div className="attribute-field">
          <input
            value={colorPicker.colorname}
            onChange={(e) => handleChangeColor('colorname', e.target.value)}
            placeholder="Color Name"
          />
          <div className="color-picker">
            <input
              style={{
                height: '32px',
                width: '32px',
              }}
              type="color"
              value={colorPicker.color}
              onChange={(e) => handleChangeColor('color', e.target.value)}
            />
            &nbsp; &nbsp;<span>{colorPicker.color}</span>
          </div>
          <span onClick={() => handleSaveColor()}>Save</span>
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
                  <span>Color Name</span>
                </th>
                <th>
                  <span>Color</span>
                </th>
                <th>
                  <span>Action</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {color.length > 0
                ? color.map((item, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{item.colorname}</td>
                      <td>{item.color}</td>
                      <td>
                        <span onClick={() => handleDeleteColor(item._id)}>
                          <RiDeleteBin6Line fontSize={25} />
                        </span>
                      </td>
                    </tr>
                  ))
                : null}
            </tbody>
          </table>
        </div>
      </div>
      <div className="papper-attribute">
        <span>Size</span>
        <div className="attribute-field">
          <input
            value={size?.sizename}
            onChange={(e) => handleChangeSize('sizename', e.target.value)}
            placeholder="Size Name"
          />
          <div className="color-picker" onClick={() => setShowUpload(true)}>
            <span className="vector-image">
              <img
                // src={size ? size.sizeicon : Vector}
                src={size.sizeicon || Vector}
                style={{ height: '25px', width: 'inherit' }}
              />
            </span>
            {/* <input className="picker" type="file" style={{ width: '72px' }} /> */}
            <span id="upload">
              <FiUpload />
            </span>
          </div>
          <span onClick={() => handleSaveSize()}>Save</span>
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
                  <span>Size Name</span>
                </th>
                <th>
                  <span>Icon</span>
                </th>
                <th>
                  <span>Action</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {sizes?.length > 0
                ? sizes.map((item, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{item.sizename}</td>
                      <td>
                        <img
                          src={item.sizeicon}
                          style={{ height: '25px', width: 'inherit' }}
                        />
                      </td>
                      <td>
                        <span onClick={() => handleDeleteSizes(item._id)}>
                          <RiDeleteBin6Line fontSize={25} />
                        </span>
                      </td>
                    </tr>
                  ))
                : null}
            </tbody>
          </table>
        </div>
      </div>
      <div className="papper-attribute">
        <span>Flavor</span>
        <div className="attribute-field">
          <input
            value={flavourname}
            onChange={(e) => setFlavourname(e.target.value)}
            placeholder="Flavor Name"
          />
          <span onClick={() => handleSaveFalvour()}>Save</span>
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
                  <span>Flavor Name</span>
                </th>
                <th>
                  <span>Action</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {flavour.length > 0
                ? flavour.map((item, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{item.flavourname}</td>
                      <td>
                        <span onClick={() => handleDeleteFlavour(item._id)}>
                          <RiDeleteBin6Line fontSize={25} />
                        </span>
                      </td>
                    </tr>
                  ))
                : null}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Attribute;
