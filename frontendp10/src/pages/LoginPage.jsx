import { useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
// import axios from 'axios';
import{ UserLogIn }from "../auth/authFunctions"
// import { setToken, setUser } from '../redux/UserAuthSlice';
import { useDispatch, useSelector } from 'react-redux';
import argentbanklogo from "../img/argentBankLogo.png"


export const LogInPage = () => {

  const dispatch = useDispatch();
  const navigate =useNavigate()

  const [emailValue, setEmailValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  const [rememberMe,setRememberMe] = useState(false)

  const user = useSelector(state => state.userAuth.user);
  // console.log("User before",user)
  const token = useSelector(state => state.userAuth.token)
  // console.log("Token before", token)
  const errorMessage = useSelector(state => state.errorMsg.errorMessage);
console.log("errorMessage",errorMessage)
console.log("Remeberme",rememberMe)

  // const navigate = useNavigate();



const handleLoginClick = async ()=>{
  await UserLogIn(emailValue,passwordValue,dispatch,navigate,rememberMe)
  
}

const toggleRemeber = () => {
  setRememberMe(!rememberMe)
 
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
            <input type="checkbox" id="remember-me" onChange={()=>toggleRemeber()} /><label htmlFor="remember-me"
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