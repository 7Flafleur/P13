import { useState } from "react";
import {Link, useNavigate } from 'react-router-dom';
import {logout} from '../redux/Slices';
import {   setUser } from '../redux/Slices';
import {useDispatch, useSelector} from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import  argentbanklogo from '../img/argentBankLogo.png';
import axios from "axios";


export const UserPage = () => {


  
  const user = useSelector(state => state.userAuth.user);
  const token = useSelector(state=>state.userAuth.token.token);

  // console.log("User",user)
  // console.log("Token",token)

  const [editVisible, setEditVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [firstNameValue, setFirstNameValue] = useState('');
  const [lastNameValue, setLastNameValue] = useState('');


  const navigate= useNavigate();

  const dispatch = useDispatch();

  const handleLogoutClick = (event) => {
    dispatch(logout())
    console.log('Link was clicked.');
    console.log('User',user)
    console.log("Token",token)
    navigate('/')
  };

  const onEditNameClicked = () =>{
    setEditVisible(!editVisible)
  }

  const onSaveNameClicked = async () =>{

    try{

      const response= await axios.put('http://localhost:3001/api/v1/user/profile',
        {
          firstName:firstNameValue,
          lastName:lastNameValue
        },
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );

      console.log("Authorization Header: ", `Bearer ${token}`);
      const firstNamePayload = {firstName:firstNameValue}
      console.log(firstNameValue)
      const lastNamePayload = {lastName: lastNameValue}
      dispatch(setUser(firstNamePayload))
      dispatch(setUser(lastNamePayload))

      

    }

    catch(error){
      setErrorMessage(`An error occurred: ${error.response.status}. Please try again later.`);

    }

  }

  console.log("User new",user)


    return (

     <div className="body"> 
         <nav class="main-nav">
      <a class="main-nav-logo" href="./index.html">
        <img
          class="main-nav-logo-image"
          src={argentbanklogo}
          alt="Argent Bank Logo"
        />
        <h1 class="sr-only">Argent Bank</h1>
      </a>
      <div>
        <Link to="/" class="main-nav-item" onClick={handleLogoutClick}>
        <FontAwesomeIcon icon={faSignOutAlt} />
          Sign Out
        </Link>
      </div>
    </nav>    
    <main className="main bg-dark">
    <div className="header">
      <h1>Welcome back<br />{user.email}!</h1>
<div className={`edit-name-content ${editVisible ? "visible" : ""}`}>
  
  <div className="editName-fields">
    <div className="input-wrapper">
        <label htmlFor="username"></label>
        <input
          type="text"
           value={firstNameValue}
           onChange={e=>setFirstNameValue(e.target.value)}      
          placeholder="First name" className="name"
        />
      </div>
      <div className="input-wrapper">
        <label htmlFor="username"></label>
        <input
          type="text"
          value={lastNameValue}
          onChange={e=>setLastNameValue(e.target.value)}     
          placeholder="Last name" className="name"
        />
        </div>
  </div>
  <div className=" editName-buttons">
          <button className="editName edit-button" onClick={onSaveNameClicked}>Save</button>
          <button className="editName edit-button">Cancel</button>
        </div>
</div>
      <button className="edit-button" onClick={onEditNameClicked}>Edit Name</button>
   
 
    </div>
    <h2 className="sr-only">Accounts</h2>
    <section className="account">
      <div className="account-content-wrapper">
        <h3 className="account-title">Argent Bank Checking (x8349)</h3>
        <p className="account-amount">$2,082.79</p>
        <p className="account-amount-description">Available Balance</p>
      </div>
      <div className="account-content-wrapper cta">
        <Link to="/user/transactions" className="transaction-button">View transactions</Link>
      </div>
    </section>
    <section className="account">
      <div className="account-content-wrapper">
        <h3 className="account-title">Argent Bank Savings (x6712)</h3>
        <p className="account-amount">$10,928.42</p>
        <p className="account-amount-description">Available Balance</p>
      </div>
      <div className="account-content-wrapper cta">
      <Link to="/user/transactions" className="transaction-button">View transactions</Link>
      </div>
    </section>
    <section className="account">
      <div className="account-content-wrapper">
        <h3 className="account-title">Argent Bank Credit Card (x8349)</h3>
        <p className="account-amount">$184.30</p>
        <p className="account-amount-description">Current Balance</p>
      </div>
      <div className="account-content-wrapper cta">
      <Link to="/user/transactions" className="transaction-button">View transactions</Link>
      </div>
    </section>
  </main>
  <footer class="footer">
      <p class="footer-text">Copyright 2020 Argent Bank</p>
    </footer>
    </div>
  

    )

}

