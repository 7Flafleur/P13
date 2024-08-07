import { logout,setRememberMe } from "../redux/UserAuthSlice";
import { deleteErrorMsg } from "../redux/ErrorMessageSlice";



export const UserLogOut = (dispatch, navigate) => {
    dispatch(logout());
    localStorage.removeItem('token')
    // Cookies.remove('cookie');
    dispatch(deleteErrorMsg());
    dispatch(setRememberMe(false))
    navigate("/")
}