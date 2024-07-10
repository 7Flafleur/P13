import axios from 'axios';
import { setToken, setUser } from '../redux/UserAuthSlice';
import { setErrorMsg, deleteErrorMsg } from '../redux/ErrorMessageSlice';
import { setCookie, cookiesExpired, getTokenFromCookie } from './cookiesFunctions';

const API_URL = 'http://localhost:3001/api/v1/user/login';

const handleErrors = (error, dispatch) => {
  // remove token from local storage to force reconnextion in case of error
  localStorage.removeItem('token') 
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

    // on login, token is always set to server token
   const tokenPayload = response.data.body.token;

    if (rememberMe){
      localStorage.setItem("token", tokenPayload)
    }
   
    // if (cookiesExpired('auth_token')) {
    //   setCookie(response.data.body.token, rememberMe);
    //   tokenPayload = response.data.body.token;
    // } else {
    //   tokenPayload = getTokenFromCookie('auth_token');
    // }

    // Update Redux state
    dispatch(setUser(emailPayload));
    dispatch(setToken(tokenPayload));
    console.log("State Token", tokenPayload);

    // Navigate to the user's profile
    navigate("/user/profile");

    // Clear any existing error messages
    dispatch(deleteErrorMsg());
  } catch (error) {
    handleErrors(error, dispatch);
  }
};
