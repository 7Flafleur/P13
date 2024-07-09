// utils/cookies.js
import Cookies from 'js-cookie';



export const setCookie = (token, rememberMe) => {
    const minutes = 5;
    const expires = new Date(new Date().getTime() + minutes * 60 * 1000); // Calculate expiration date
  
    const cookieOptions = {
      secure: true,
      sameSite: 'Strict',
    //   httpOnly: false,
      expires: expires, // Set the expiration date
      path: '/',
    };
  
    if (rememberMe) {
      Cookies.set('cookie', token, cookieOptions);
    }
    return token;
  };


  export const cookiesExpired = (name) =>{
    const cookie = Cookies.get(name)
    try {
        const { expires } = JSON.parse(cookie); // Parse the cookie value, extracting only 
        const expirationDate = new Date(expires);
        const currentDate = new Date();
        return expirationDate < currentDate;
    } catch (error) {
        console.log('Error parsing cookie:', error);
        return true; // Act as if expired if there's an error
    }
  }


