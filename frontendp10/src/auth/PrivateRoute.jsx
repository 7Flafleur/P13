import { Navigate, Route } from 'react-router-dom';
import { Useuser } from "./useUser";

export default function PrivateRoute({children}) {

    console.log("Childre",children)

    const user = Useuser();

    if (!user ){ console.log("No user",user)
         return <Navigate to="/login" replace />}

    return children;
}