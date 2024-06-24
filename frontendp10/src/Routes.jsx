import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { UserProfile } from './pages/UserInfoPage';
import LogInPage from '../src/pages/LoginPage.js';
import PrivateRoute from './auth/PrivateRoute';
import SignUp from './pages/SignUp.jsx';

export const AppRoutes = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<PrivateRoute><UserProfile /></PrivateRoute>} />
                <Route path="/login" element={<LogInPage />} />
               <Route path="/signup" element={<SignUp/>} />
            </Routes>
        </Router>
    );
}