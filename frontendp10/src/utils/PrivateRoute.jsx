import { Redirect,Route } from "react-router-dom/cjs/react-router-dom.min";


export default function PrivateRoute(props){

    const user= null;

    if (!user) return <Redirect to="/login" />

    return <Route {...props} />


}