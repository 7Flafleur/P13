import { useState } from "react";
import { useHistory } from 'react-router-dom';

export default function LogInPage() {
  const [errorMessage, setErrorMessage] = useState('');
  const [emailValue, setEmailValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');

  const history = useHistory();

  const onLogInClicked = async () => {
    alert('Not implemented yet!')
  }

  return (
    <div className="content-container">
      <h1>Log In</h1>
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
      <button 
        disabled={!emailValue || !passwordValue}
        onClick={onLogInClicked}
      >
        Log In
      </button>
      <button onClick={() => history.push('/forgot-password')}>Forgot your password?</button>
      <button onClick={() => history.push('/signup')}>Sign Up</button>
    </div>
  );
}