import axios from 'axios';
import { setToken, setUser } from '../redux/UserAuthSlice';


export const UserLogIn = async (emailValue,passwordValue,dispatch,navigate) => {
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
    sessionStorage.setItem('token', tokenPayload.token);

    // console.log("Token set to:", tokenPayload.token);

    // console.log("user set to:",emailPayload)

    // console.log("Login Response", response.data)

    navigate("/user/profile")
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
          setErrorMessage('Unable to log in. Did you check your credentials?')
          break;
        case 500:
          setErrorMessage('Server error. Please try again later.')
          break;
        default:
          console.log("default error")
          setErrorMessage(`An error occurred: ${error.response.status}. Please try again later.`)
      }
    } else if (error.request) {
      // The request was made but no response was received
      setErrorMessage('No response from server. Please check your network connection.')
    } else {
      // Something happened in setting up the request that triggered an Error
      setErrorMessage(error.message)
    }

  }

};
