/** @format */

import React, { useState, useEffect, useRef } from 'react';
import './index.css';
import Image from '../../assets/pepecons/pepe cones 2.png';
// import { auth } from "../../firebase.config";
import { PiEyeSlashLight, PiEyeLight } from 'react-icons/pi';
import { toast } from 'react-toastify';
import Register from '../../components/Register';
import { useDispatch } from 'react-redux';
import { setMobileNumber } from '../../redux/reducer/mobileNumber';
import { setFetching } from '../../redux/reducer/fetching';
import { checkIfUserExists } from '../../Api/userApi';
import { adminLogin } from '../../Api/adminApi';
import { useNavigate } from 'react-router-dom';
import { AUTH_TOKEN_KEY } from '../../constant';
import { useSelector } from 'react-redux';
import { setAuthToken } from '../../redux/reducer/auth';
import { loginAdmin, loginUser } from '../../redux/reducer/role';
import { customFontStyle } from '../../constant';
import LogoNazoxLight from '../../assets/pepecons/pepe cones 1.png';

const Login = () => {
  const [userData, setUserdata] = useState({ email: '', password: '' });
  const [isValid, setIsValid] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [user, setUser] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const authToken = useSelector((state) => state.auth.authToken);

  useEffect(() => {
    document.title = 'Pepe conse ';
    localStorage.getItem('auth_token') &&
      navigate('/dashboard', { replace: true });
  }, [navigate, authToken]);

  const handleChange = (e) => {
    console.log(e.target.value);
    const { name, value } = e.target;
    setUserdata((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const onLogin = async (e) => {
    e.preventDefault();
    dispatch(setFetching(true));
    console.warn(userData);
    try {
      const response = await adminLogin(userData);
      if (response.status === 200) {
        toast.success('Congratulations! You have successfully logged in!');
        const authToken = response.data.token;
        localStorage.setItem(AUTH_TOKEN_KEY, authToken);
        dispatch(setAuthToken(authToken)); // Dispatch the action to update the authToken
        dispatch(loginAdmin(true));
        dispatch(setFetching(false));
        if (authToken) {
          navigate('/dashboard');
        }
      }
    } catch (error) {
      toast.error('Internal Server Error!');
      dispatch(setFetching(false));
    }
  };
  const handleTogglePassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };
  return (
    <section className="form-body">
      <div className="website-logo">
        <div className="recaptcha-container" id="recaptcha-container"></div>
        <div className="logo">
          <img className="logo-size" src={Image} alt="" />
          <a className="logo logo-dark logo-min">
            <h1 style={customFontStyle}>
              <span className="logo-pepe">PePe</span>&nbsp;
              <span className="logo-cones">Cones</span>
            </h1>
          </a>
        </div>
      </div>
      <div className="row_">
        <div className="img-holder">
          <div className="background"></div>
          <div className="info-holder"></div>
        </div>
        <div className="form-holder">
          <div className="form-content">
            <div className="login-card">
              <h1 className="welcome">Admin Sign In!</h1>
              <p>Enter your email and password to sign in!</p>
              {user ? (
                <Register />
              ) : (
                <>
                  <form onSubmit={onLogin}>
                    <label>Email *</label>
                    <input
                      className="form-control_"
                      type="text"
                      name="email"
                      placeholder="mail@simmmple.com"
                      value={userData.email}
                      onChange={handleChange}
                      required
                    />
                    <label>Password *</label>
                    <input
                      className="form-control_"
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      value={userData.password}
                      onChange={handleChange}
                      placeholder="Min. 8 characters"
                      required
                      maxLength={20}
                      minLength={5}
                    />
                    {/* <div className="forget-checked">
                      <div className="check-box">
                        <input id="keep-logged" type="checkbox" />
                        &nbsp;&nbsp;
                        <p>Keep me logged in</p>
                      </div>
                      <p>Forget password?</p>
                    </div> */}

                    <span onClick={handleTogglePassword}>
                      {showPassword ? (
                        <PiEyeLight fontSize={20} />
                      ) : (
                        <PiEyeSlashLight fontSize={20} />
                      )}
                    </span>
                    <div className="form-button">
                      <button
                        id="submit"
                        type="submit"
                        className="ibtn"
                        style={{ maxWidth: '558px' }}
                        // disabled={!isValid}
                      >
                        Sign In
                      </button>
                    </div>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
