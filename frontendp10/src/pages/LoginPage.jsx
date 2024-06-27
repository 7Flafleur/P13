import { useState,useEffect } from "react";
import { Link,useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useToken } from "../auth/useToken";
import {  setToken, setUser } from '../redux/Slices';
import {useDispatch, useSelector} from 'react-redux';


export  const  LogInPage = () => {

  const dispatch = useDispatch();

  
  const [errorMessage, setErrorMessage] = useState('');
  const [emailValue, setEmailValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');

  const user = useSelector(state => state.userAuth.user);
  console.log("User before",user)
  const token = useSelector(state => state.userAuth.token)
  console.log ("Token before",token)

  
  const navigate = useNavigate();

  const onLogInClicked = async () => {
    try {
      const response = await axios.post('http://localhost:3001/api/v1/user/login', {
        email: emailValue,
        password: passwordValue
      });

      
        const emailPayload={email:emailValue}
        const tokenPayload = {token:response.data.body.token}
        console.log(emailPayload)
        console.log(tokenPayload)
        dispatch(setUser(emailPayload))
        dispatch(setToken(tokenPayload))
        console.log("Token set to:", tokenPayload);
        console.log("user set to:",emailPayload)
        

      
    } catch (error) {
      if(error.response.status === 400)
        {
          setErrorMessage('Unable to log in. Did you check your credentials?');
        }
       else if (error.response.status === 500) {
        setErrorMessage('Server error. Please try again later.');
      } else {
        
        setErrorMessage(`An error occurred: ${error.response.status}. Please try again later.`);
      }
    }
  };

  console.log("User end",user)

  useEffect(() => {
    // Check if both user and token are set
    if (user && token) {
      navigate('/user/profile');
    }
    else {
      console.log("Error logging")
    }
  }, [user]); 



  return (

    <div className="body">
        <nav className="main-nav">
      <Link to="/" className="main-nav-logo" href="">
        <img
          className="main-nav-logo-image"
          src="./img/argentBankLogo.png"
          alt="Argent Bank Logo"
        />
        <h1 className="sr-only">Argent Bank</h1>
      </Link>
      <div>
        <a className="main-nav-item" href="">
          <i id="loginuser" class="fa fa-user-circle"></i>
          Sign In
        </a>
      </div>
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
            <input type="checkbox" id="remember-me" /><label htmlFor="remember-me"
              >Remember me</label>
          </div>

        <button className="sign-in-button"
          disabled={!emailValue || !passwordValue}
          onClick={onLogInClicked}
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