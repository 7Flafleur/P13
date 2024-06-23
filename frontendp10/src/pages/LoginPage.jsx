import { useState } from "react";
import { useHistory } from 'react-router-dom';



export default function LogInPage() {

  const [emailValue, setEmailValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');

  const history = useHistory();


  return (
    <div className="content-container">
      <h1>Log In</h1>
      <input 
      value={emailValue}
      onChange={e => setEmailValue(e.target.value)}
      placeholder="someemail@someprovider.some" />
      <input
      value={passwordValue}
      onChange={e=> setPasswordValue(e.target.value)}
       placeholder="password" />
      <button>Log In</button>
      <button>Frogot yopur password?</button>
      <button>Sign Up</button>
    </div>
  );
}