import axios from 'axios';
import { setToken, setUser } from '../redux/UserAuthSlice';
import {setErrorMsg,deleteErrorMsg} from '../redux/ErrorMessageSlice';
import Cookies from 'js-cookie';
import CryptoJS from 'crypto-js'

const secretKey = 'abc'

export const UserLogIn = async (emailValue,passwordValue,dispatch,navigate,rememberMe) => {
  // console.log("Login clicked")
  try {
    const response = await axios.post('http://localhost:3001/api/v1/user/login', {
      email: emailValue,
      password: passwordValue
    });


    const emailPayload = { email: emailValue }
    const tokenPayload = { token: response.data.body.token }
    // console.log(emailPayload)
    // console.log(tokenPayload)
    dispatch(setUser(emailPayload))
    dispatch(setToken(tokenPayload))

    const encryptedToken =  CryptoJS.AES.encrypt(tokenPayload.token, secretKey).toString();

    const cookieOptions = {
      secure: true, // Ensures the cookie is only sent over HTTPS
      sameSite: 'Strict', // Ensures the cookie is not sent with cross-site requests
      httpOnly: false, // Makes the cookie inaccessible to JavaScript (set to true if you want it to be HttpOnly)
      expires:  1,
    }


    if (rememberMe) {
      console.log("REmebering!")
      Cookies.set('token', encryptedToken, cookieOptions);
    }
    


    // console.log("Token set to:", tokenPayload.token);

    // console.log("user set to:",emailPayload)

    // console.log("Login Response", response.data)

    navigate("/user/profile")
    deleteErrorMsg()
  }
  catch (error) {
    console.log("error  received", error.response)

    if (error.response) {
      console.log("Inside error response")
      // if (error.response.status==400){
      //   console.log("Error 400")
      //   setErrorMessage('Unable to log in. Did you check your credentials?')
      // }
      switch (error.response.status) {
        case 400:
          console.log("400 received")
          dispatch(setErrorMsg('Unable to log in. Did you check your credentials?'))
          
          break;
        case 500:
          dispatch(setErrorMsg('Server error. Please try again later.'))
          break;
        default:
          console.log("default error")
          dispatch(setErrorMsg(`An error occurred: ${error.response.status}. Please try again later.`))
      }
    } else if (error.request) {
      // The request was made but no response was received
      dispatch(setErrorMsg('No response from server. Please check your network connection.'))
    } else {
      // Something happened in setting up the request that triggered an Error
      dispatch(setErrorMsg(error.message))
    }

  }

};
