import { useState } from "react";
import { useHistory } from 'react-router-dom';

export default function SignUp() {
  const [errorMessage, setErrorMessage] = useState('');
  const [emailValue, setEmailValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  const [confirmedPasswordValue, setconfirmedPasswordValue] = useState('');

  const history = useHistory();

  const onSignUpClicked = async () => {
    alert('SignUp not implemented yet!')
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
      
      <button onClick={() => history.push('/login')}>Already have an account?</button>
    </div>
  );
}