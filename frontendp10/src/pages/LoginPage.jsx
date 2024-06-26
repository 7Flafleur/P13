import { useState,useEffect } from "react";
import { useNavigate } from 'react-router-dom';
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

      if (response.status !== 200) {
        setErrorMessage('Unable to log in. Did you check your credentials?');
      } else {
        const emailPayload={email:emailValue}
        const tokenPayload = {token:response.data.body.token}
        console.log(emailPayload)
        console.log(tokenPayload)
        dispatch(setUser(emailPayload))
        dispatch(setToken(tokenPayload))
        console.log("Token set to:", tokenPayload);
        console.log("user set to:",emailPayload)
        

      }
    } catch (error) {
      setErrorMessage('An error occurred. Please try again later.');
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

    <div className="main bg-dark">

      <section className="sign-in-content">
        <h1>Sign In</h1>
        {errorMessage && <div className="fail">{errorMessage}</div>}
        <i className="fa fa-user-circle sign-in-icon"></i>

        <div className="input-wrapper">
          <label htmlFor="username">username</label>
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
  );
}