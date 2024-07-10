import { useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { setUser } from '../redux/UserAuthSlice';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import argentbanklogo from '../img/argentBankLogo.png';
import axios from "axios";
import useFetchToken from "../utils/API"
import { UserLogOut } from "../auth/logOut";
import Cookies from 'js-cookie';
import { getTokenFromCookie } from "../auth/cookiesFunctions"


export const UserPage = () => {



  const user = useSelector(state => state.userAuth.user);
  const token = useSelector(state => state.userAuth.token);


  // console.log("First token",token)

  console.log("User", user)
  console.log("User Token", token)

  const [editVisible, setEditVisible] = useState(false);
  const [firstNameValue, setFirstNameValue] = useState('');
  const [lastNameValue, setLastNameValue] = useState('');

  const navigate = useNavigate();
  const dispatch = useDispatch();


  const re = useFetchToken(token) 

  // console.log("re", re)

  const userdata = re.response

  // console.log("user data", userdata)

  useEffect(() => {
    if (userdata) {
      dispatch(setUser(userdata));
    }

    // console.log("Cookie", Cookies.get('cookie'))
    // const token = getTokenFromCookie('cookie');
    // console.log('Token from cookie:', token);
  }, [userdata]);

  const onEditNameClicked = () => {
    setEditVisible(!editVisible)
  }

  const onSaveNameClicked = async () => {

    try {

      const response = await axios.put('http://localhost:3001/api/v1/user/profile',
        {
          firstName: firstNameValue,
          lastName: lastNameValue
        },
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );

      // console.log("Authorization Header: ", `Bearer ${token}`);
      const firstNamePayload = { firstName: firstNameValue }
      // console.log(firstNameValue)
      const lastNamePayload = { lastName: lastNameValue }
      dispatch(setUser(firstNamePayload))
      dispatch(setUser(lastNamePayload))

      setEditVisible(!editVisible)

    }

    catch (error) {
      console.log(`An error occurred: ${error.response.status}. Please try again later.`);

    }

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
        <div>
          <Link to="/" className="main-nav-item" onClick={() => UserLogOut(dispatch, navigate)}>
            <FontAwesomeIcon icon={faSignOutAlt} />
            Sign Out
          </Link>
        </div>
      </nav>
      <main className="main bg-dark">
        <div className="header">
          <h1>Welcome back {user.firstName || user.lastName ? "" : "!"} <br /> {user.firstName} {user.lastName}{user.firstName || user.lastName ? "!" : ""} </h1>
          <div className={`edit-name-content ${editVisible ? "visible" : ""}`}>

            <div className="editName-fields">
              <div className="input-wrapper">
                <label htmlFor="username"></label>
                <input
                  type="text"
                  value={firstNameValue}
                  onChange={e => setFirstNameValue(e.target.value)}
                  placeholder="First name" className="name"
                />
              </div>
              <div className="input-wrapper">
                <label htmlFor="username"></label>
                <input
                  type="text"
                  value={lastNameValue}
                  onChange={e => setLastNameValue(e.target.value)}
                  placeholder="Last name" className="name"
                />
              </div>
            </div>
            <div className=" editName-buttons">
              <button className="editName edit-button" onClick={onSaveNameClicked}>Save</button>
              <button className="editName edit-button" onClick={onEditNameClicked}>Cancel</button>
            </div>
          </div>
          <button className="edit-button" onClick={onEditNameClicked}>Edit Name</button>
          {/* <button className="edit-button" onClick={fetchUserData}>User data</button> */}



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
      <footer className="footer">
        <p className="footer-text">Copyright 2020 Argent Bank</p>
      </footer>
    </div>


  )

}

