import { useState } from "react";
import {Link, useNavigate } from 'react-router-dom';
import {logout} from '../redux/Slices';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import  argentbanklogo from '../img/argentBankLogo.png';


export const UserPage = () => {


  
  const user = useSelector(state => state.userAuth.user);
  const token = useSelector(state=>state.userAuth.token);

  const [editVisible, setEditVisible] = useState(false);

  const navigate= useNavigate();

  const dispatch = useDispatch();

  const handleLogoutClick = (event) => {
    dispatch(logout())
    console.log('Link was clicked.');
    console.log('User',user)
    console.log("Token",token)
    navigate('/')
  };


  const editName = () =>{


  }



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
<div className="edit-name-content">
  
  <div className="editName-fields">
    <div className="">
        <label htmlFor="username"></label>
        <input
          type="text"
          // value={newFirstNameValue}
          // onChange={editName(firstname)}
          placeholder="First name" id="firstname"
        />
      </div>
      <div className="">
        <label htmlFor="username"></label>
        <input
          type="text"
          // value={newLastNameValue}
          // onChange={editName(lastname)}
          placeholder="Last name" id="lastname"
        />
        </div>
  </div>
  <div className=" editName-buttons">
          <button className="edit-button">Save</button>
          <button className="edit-button">cancel</button>
        </div>
</div>
      <button className="edit-button">Edit Name</button>
   
 
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

