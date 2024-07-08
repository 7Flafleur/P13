import { logout } from "../redux/UserAuthSlice";
import { deleteErrorMsg } from "../redux/ErrorMessageSlice";
import Cookies from "js-cookie"



export const UserLogOut = (dispatch, navigate) => {
    dispatch(logout());
    Cookies.remove('token');
    deleteErrorMsg();
    navigate("/")
}