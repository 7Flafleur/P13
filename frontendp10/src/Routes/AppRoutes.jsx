import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { IndexPage } from '../pages/IndexPage';
import {LogInPage} from '../pages/LoginPage';
import SignUpPage from '../pages/SignUpPage.jsx';
import {UserPage} from '../pages/UserPage';
import {PrivateRoute} from '../utils/PrivateRoute'

// import { UserProfile } from './pages/UserInfoPage';
// import LogInPage from '../src/pages/LoginPage.js';
// import PrivateRoute from './auth/PrivateRoute';


export const AppRoutes = () => {
    return (
        <Router>
            <Routes>
            <Route path="/" element={<IndexPage />} />
            <Route path="/login" element={<LogInPage />} />
            <Route path='/user/profile' element={<UserPage/>} />
            <Route path='/user/signup' element={<SignUpPage/>}/>
           
            </Routes>
        </Router>
    );
}