import { useState } from "react";
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { useToken } from "../auth/useToken";
import { useNavigate } from 'react-router-dom';

export default function SignUpPage() {
  const {token, setToken} = useToken();
  const [errorMessage, setErrorMessage] = useState('');
  const [emailValue, setEmailValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  const [confirmedPasswordValue, setconfirmedPasswordValue] = useState('');

  const nagivate = useNavigate();

  const onSignUpClicked = async () => {
    const response = await axios.post('/api/signup', {
      email: emailValue,
      password: passwordValue
    })
    const {token} = response.data;
    setToken(token);
    navigate('/');
  }

  return (

    

    <div className="content-container">
      <h1>Sign Up</h1>
      {errorMessage && <div className="fail">{errorMessage}</div>}
      <input 
        type="email"
        value={emailValue}
        onChange={e => setEmailValue(e.target.value)}
        placeholder="someone@example.com" 
      />
      <input
        type="password"
        value={passwordValue}
        onChange={e => setPasswordValue(e.target.value)}
        placeholder="password" 
      />
            <input
        type="password"
        value={confirmedPasswordValue}
        onChange={e => setconfirmedPasswordValue(e.target.value)}
        placeholder="password" 
      />
      <button 
        disabled={!emailValue || !passwordValue ||
        passwordValue !== confirmedPasswordValue
        
        }
        onClick={onSignUpClicked}
      >
       Sign Up
      </button>
      
      <button onClick={() => nagivate('/login')}>Already have an account?</button>
    </div>
  );
}