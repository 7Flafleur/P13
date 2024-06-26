import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useToken } from "../auth/useToken";

export  const  LogInPage = () => {
  const {token, setToken} = useToken();

  const [errorMessage, setErrorMessage] = useState('');
  const [emailValue, setEmailValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');

  const navigate = useNavigate();

  const onLogInClicked = async () => {

    const response = await axios.post('http://localhost:3001/api/v1/user/login', {
      email: emailValue,
      password: passwordValue
    })
    const {token} = response.data;

    setToken(token);
    console.log("Token set to:", token)
    navigate('/user/profile');
  }

  return (

    <div className="main bg-dark">

      <section className="sign-in-content">
        <h1>Sign In</h1>
        {errorMessage && <div className="fail">{errorMessage}</div>}
        <i class="fa fa-user-circle sign-in-icon"></i>

        <div className="input-wrapper">
          <label for="username">Username</label>
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
        <div class="input-remember">
            <input type="checkbox" id="remember-me" /><label for="remember-me"
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