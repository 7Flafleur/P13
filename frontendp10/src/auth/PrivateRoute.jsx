import { Navigate, Route } from 'react-router-dom';
import { Useuser } from "./useUser";

export default function PrivateRoute(props) {
    const user = Useuser();

    if (!user) return <Navigate to="/login" replace />

    return <Route {...props} />
}