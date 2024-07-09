import axios from 'axios';
import { setToken, setUser } from '../redux/UserAuthSlice';
import { setErrorMsg, deleteErrorMsg } from '../redux/ErrorMessageSlice';
import Cookies from 'js-cookie';
import CryptoJS from 'crypto-js';
import { setCookie,getCookie,eraseCookie,cookiesExpired } from './cookiesFunctions';

const API_URL = 'http://localhost:3001/api/v1/user/login';

const handleErrors = (error, dispatch) => {
  if (error.response) {
    switch (error.response.status) {
      case 400:
        dispatch(setErrorMsg('Unable to log in. Did you check your credentials?'));
        break;
      case 500:
        dispatch(setErrorMsg('Server error. Please try again later.'));
        break;
      default:
        dispatch(setErrorMsg(`An error occurred: ${error.response.status}. Please try again later.`));
    }
  } else if (error.request) {
    dispatch(setErrorMsg('No response from server. Please check your network connection.'));
  } else {
    dispatch(setErrorMsg(error.message));
  }
};

export const UserLogIn = async (emailValue, passwordValue, dispatch, navigate, rememberMe) => {
  try {
    const response = await axios.post(API_URL, { email: emailValue, password: passwordValue });
    const emailPayload = { email: emailValue };
    // let tokenPayload = Cookies.get('cookie') || setCookie(response.data.body.token, rememberMe);

    let tokenPayload = cookiesExpired('cookie') ? setCookie(response.data.body.token, rememberMe) : Cookies.get('cookie')  

    dispatch(setUser(emailPayload));
    dispatch(setToken(tokenPayload));
    navigate("/user/profile");
    deleteErrorMsg();
  } catch (error) {
    handleErrors(error, dispatch);
  }
};