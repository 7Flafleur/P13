import { useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { UserLogIn } from "../auth/authFunctions"
import { setRememberMe } from '../redux/UserAuthSlice';
import { useDispatch, useSelector } from 'react-redux';
import argentbanklogo from "../img/argentBankLogo.png"

import { setErrorMsg } from "../redux/ErrorMessageSlice";


export const LogInPage = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate()
  const [emailValue, setEmailValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');


  const user = useSelector(state => state.userAuth.user);
  // console.log("User before",user)
  const token = useSelector(state => state.userAuth.token)
  // console.log("Token before", token)
  let rememberMe = useSelector(state => state.userAuth.rememberMe)
  console.log("Remeberme", rememberMe)
  const errorMessage = useSelector(state => state.errorMsg.errorMessage);
  // console.log("errorMessage",errorMessage)

  const localToken = localStorage.getItem('token') // just for demonstration purposes, use HTTP-only ,secure an SameSite cookies and server-side validation for more safety

  useEffect(() => {
    if (localToken) {
      alert("Token found!You're still logged in!")
      navigate("/user/profile");
    }

  }, [])


  const handleLoginClick = async () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
    if (emailRegex.test(emailValue))   
{    await UserLogIn(emailValue, passwordValue, dispatch, navigate, rememberMe)}
    else {
      setEmailValue(emailValue); // Allow the user to correct their entry by updating the state
      dispatch(setErrorMsg('Sure that\'s an email address?'));
    }
  }

  const toggleRemeber = () => {
    dispatch(setRememberMe(!rememberMe))
    console.log("Remeber me", rememberMe)
  }

  return (

    <div className="body">
      <nav className="main-nav">
        <Link to="/" className="main-nav-logo" href="">
          <img
            className="main-nav-logo-image"
            src={argentbanklogo}
            alt="Argent Bank Logo"
          />
          <h1 className="sr-only">Argent Bank</h1>
        </Link>

      </nav>


      <div className="main bg-dark">

        <section className="sign-in-content">
          <h1 className="loginsignin">Sign In</h1>
          {errorMessage && <div className="fail">{errorMessage}</div>}
          <i className="fa fa-user-circle sign-in-icon"></i>

          <div className="input-wrapper">
            <label htmlFor="username"></label>
            <input
              type="email"
              value={emailValue}
              onChange={e => setEmailValue(e.target.value)}
              placeholder="username" id="username"
            />

          </div>


          <div className="input-wrapper">
            <input
              type="password"
              value={passwordValue}
              onChange={e => setPasswordValue(e.target.value)}
              placeholder="password"
            />
          </div>
          <div className="input-remember">
            <input type="checkbox" id="remember-me" onChange={() => toggleRemeber()} /><label htmlFor="remember-me"
            >Remember me</label>
          </div>

          <button className="sign-in-button"
            disabled={!emailValue || !passwordValue}
            onClick={handleLoginClick}
          >
            Sign In
          </button>
          {/* <button onClick={() => navigate('/forgot-password')}>Forgot your password?</button>
        <button className="sign-up-button" onClick={() => navigate('/user/signup')}>Sign Up</button>
         */}
        </section>
      </div>

      <footer className="footer">
        <p className="footer-text">Copyright 2020 Argent Bank</p>
      </footer>


    </div>
  );
}