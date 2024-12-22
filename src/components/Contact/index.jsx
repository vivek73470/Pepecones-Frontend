/** @format */

import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
// import { MdOutlineCall } from 'react-icons/md';
import { AiOutlineMail } from 'react-icons/ai';
// import { TbBrandTelegram } from 'react-icons/tb';
import './index.css';
import { productEnquiery, distinctProduct } from '../../Api/userApi';
import { useDispatch } from 'react-redux';
import { setFetching } from '../../redux/reducer/fetching';
import ProductEnquiryDropdown from '../ProductEnquiryDropdown';
import contactphone1 from '../../assets/User/contactphone.svg';
import contactmail1 from '../../assets/User/contactmail.svg';

const Contactform = () => {
  const [contactData, setContactdata] = useState({
    fullname: '',
    email: '',
    phoneNumber: '',
    productenquiry: '',
    message: '',
  });
  const [enquiry, setEnquiry] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const dispatch = useDispatch();
  useEffect(() => {
    getProductEnquiery();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setContactdata((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    console.log(contactData);
  };
  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  const sendEnquiry = async (e) => {
    e.preventDefault();
    dispatch(setFetching(true));

    // Check if any field is empty
    const isAnyFieldEmpty = Object.values(contactData).some(
      (value) => value === '',
    );

    if (isAnyFieldEmpty) {
      // Show toast warning for empty fields
      toast.warning('Please fill in all fields.');
      dispatch(setFetching(false));
      return;
    }

    try {
      const response = await productEnquiery(contactData);
      console.log('Status Code:', response.status);
      console.log('Response Data:', response.data);

      if (response.status === 201) {
        dispatch(setFetching(false));
        setContactdata({
          fullname: '',
          email: '',
          phoneNumber: '',
          productenquiry: '',
          message: '',
        });
        // toast.success('Drop us a message!');

        toast.success(
          'Your inquiry has been submitted successfully. We will contact you soon!',
        );
      }
    } catch (error) {
      dispatch(setFetching(false));
      toast.error(error.message);
    }
  };

  const getProductEnquiery = async (e) => {
    dispatch(setFetching(true));
    try {
      let response = await distinctProduct();
      if (response.status === 200) {
        console.log(response);
        setEnquiry(response.data);
        dispatch(setFetching(false));
      }
    } catch (error) {
      dispatch(setFetching(false));
      toast.error(error.message);
    }
  };
  // console.log(contactData);
  return (
    <>
      <ToastContainer />
      <div className="container-contact">
        <div className="sub-container">
          <div className="header101">
            <h1 className="getintouch">Get in touch with us</h1>
            <span>
              <p id="contact-get-pargph">
                Pepe Cones is more than a product; it's a journey. Let's embark
                on this journey together and offer your customers an experience
                they'll cherish. Contact us today to explore the possibilities
                and start a partnership that's as strong and reliable as our
                pre-rolled cones.
              </p>
            </span>
          </div>

          <div className="div-12ndrow">
            <div className="div-321">
              <div className="hedi-flex1">
                <div className="header-2">
                  <h2 id="drp-msg">Drop us a message</h2>
                </div>
                <div className="paragraph-contact">
                  <p id="par-cont">
                    We will get back to you as soon as possible.
                  </p>
                </div>
              </div>
              <div className="form-table">
                <div className="left-contact">
                  <form className="left-insddfim">
                    <div className="form-1">
                      <input
                        type="text"
                        id="Full name"
                        className="name"
                        name="fullname"
                        placeholder="FullName"
                        value={contactData.fullname}
                        onChange={handleChange}
                        required
                      />
                      {/* <select
                        id="ProductEnquiry"
                        className="name"
                        name="productenquiry"
                        value={contactData.productenquiry}
                        onChange={handleChange}
                      >
                        <option value="General Inquiry">Product Enquiry</option>
                        <option value="Product Information">
                          Product Information
                        </option>
                        <option value="Technical Support">
                          Technical Support
                        </option>
                        <option value="Other">Other</option>
                      </select> */}
                      <ProductEnquiryDropdown
                        options={enquiry}
                        onSelect={handleOptionSelect}
                        sub={'Select-Category'}
                        formData={contactData}
                        setFormData={setContactdata}
                      />
                    </div>
                    <div className="form-2">
                      <input
                        type="Email"
                        id="Email Address"
                        className="name"
                        placeholder="Email ID"
                        name="email"
                        value={contactData.email}
                        onChange={handleChange}
                        required
                      />
                      <input
                        type="text"
                        id="Subject"
                        className="name"
                        placeholder="Phone Number"
                        name="phoneNumber"
                        value={contactData.phoneNumber}
                        maxlength="10"
                        onChange={handleChange}
                      />
                    </div>
                    <textarea
                      id="Message"
                      name="message"
                      className="message"
                      placeholder="  Message"
                      value={contactData.message}
                      onChange={handleChange}
                    ></textarea>
                    <br />
                    <button id="sbt" onClick={(e) => sendEnquiry(e)}>
                      Send
                    </button>
                  </form>
                </div>
                <div className="contact-info">
                  <div className="inside-contact">
                    <div className="item0">
                      <div className="contact-svgphone">
                        <img src={contactphone1} />
                      </div>

                      {/* <div className="icen">
                        <MdOutlineCall id="rotate-call" />
                      </div> */}
                      <div className="icon-text">
                        <b className="salesfinsweetcom">
                          <a href="tel:+91-9953876008">+91 9953876008</a>
                        </b>
                        <p className="below">Free support</p>
                      </div>
                    </div>
                    <div className="item2">
                      <div className="contact-svgmail">
                        <img src={contactmail1} />
                      </div>

                      {/* <div className="icen">
                        <TbBrandTelegram id="rotate" />
                      </div> */}
                      <div className="icons-text">
                        <b className="salesfinsweetcom">
                          <a href="mailto:outrightmanufacturing@gmail.com">
                            outrightmanufacturing@gmail.com
                          </a>
                        </b>
                        <p className="below">Sales Enquiry</p>
                      </div>
                    </div>
                    {/* <div className="item1">
                      <div className="icen">
                        <AiOutlineMail id="rotate-mail" />
                      </div>
                      <div className="icon-text">
                        <b className="salesfinsweetcom">finsweet@gmail.com</b>
                        <p className="below">Help Email support</p>
                      </div>
                    </div> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Contactform;
