import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { IndexPage } from '../pages/IndexPage';
import {LogInPage} from '../pages/LoginPage';
import SignUpPage from '../pages/SignUpPage.jsx';
import {UserPage} from '../pages/UserPage';
import {PrivateOutlet} from '../auth/PrivateOutlet.jsx'
import TransactionsPage from '../pages/TransactionsPage.jsx';
import SwaggerDoc from '../pages/SwaggerUi.jsx';

// import { UserProfile } from './pages/UserInfoPage';
// import LogInPage from '../src/pages/LoginPage.js';
// import PrivateRoute from './auth/PrivateRoute';


export const AppRoutes = () => {
    return (
        <Router>
            <Routes>
            <Route path="/" element={<IndexPage />} />
            <Route path="/login" element={<LogInPage />} />
           
            <Route path='/user/profile' element={<PrivateOutlet/>} > 
            <Route path='/user/profile' element={<UserPage/>}/>
            
            </Route>
            <Route path='/user/transactions' element={<TransactionsPage/>}>

            </Route>
            <Route path='/user/signup' element={<SignUpPage/>}/>
            <Route path='api-docs' element={<SwaggerDoc/>}/>
           
            </Routes>
        </Router>
    );
}