import { Link, useNavigate } from "react-router-dom";
import "./transactions.css";
import {logout} from '../redux/Slices';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { faUserCircle, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { useDispatch,useSelector } from "react-redux";

const TransactionsPage = () => {

    const imagesContext = require.context('../img', true, /\.(png|jpe?g)$/);

    const getImage = (imageName) => {
        return imagesContext(`./${imageName}`).default;
    };

    const navigate = useNavigate();

    const user = useSelector(state => state.userAuth.user);
   
    const token = useSelector(state => state.userAuth.token)
 



    const dispatch = useDispatch();

    const handleLogoutClick = (event) => {
      dispatch(logout())
      console.log('Link was clicked.');
      console.log('User',user)
      console.log("Token",token)
      navigate('/')
    };



    return (
        <div className="transaction-page">
            <header className="header">
                <div className="logo">ARGENTBANK</div>
                <div className="user-info">
                    <span>Tony</span>
                    <Link onClick={handleLogoutClick} to="/"><FontAwesomeIcon icon={faSignOutAlt} />Sign out</Link>
                </div>
            </header>
            <section className="balance-section">
                <h2>Argent Bank Checking (x8349)</h2>
                <h1>$2,082.79</h1>
                <p>Available Balance</p>
            </section>
            <table className="transaction-table">
                <thead>
                    <tr>

                        <th>Date</th>
                        <th>Description</th>
                        <th>Amount</th>
                        <th>Balance</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>

                        <td>   <FontAwesomeIcon icon={faChevronDown} /> <span>June 20th, 2020</span>
                        <div className="expeneinfo">Transaction type <div >Category<FontAwesomeIcon icon={faPencilAlt} /> 
                         <div className="notes"> Notes<FontAwesomeIcon icon={faPencilAlt} /> </div> 
                         </div>  <input type="text" className="notesinput"></input></div></td>
                        <td>Golden Sun Bakery</td>
                        <td>$5.00</td>
                        <td>$2082.79</td>
                    </tr>
                    <tr>
                    <td>   <FontAwesomeIcon icon={faChevronDown} /> <span>June 20th, 2020</span>
                        <div className="expeneinfo">Transaction type <div >Category<FontAwesomeIcon icon={faPencilAlt} /> 
                         <div className="notes"> Notes<FontAwesomeIcon icon={faPencilAlt} /> </div> 
                         </div>  <input type="text" className="notesinput"></input></div></td>
             <td>Golden Sun Bakery</td>
                        <td>$5.00</td>
                        <td>$2082.79</td>
                    </tr>
                    <tr>
                    <td>   <FontAwesomeIcon icon={faChevronDown} /> <span>June 20th, 2020</span>
                        <div className="expeneinfo">Transaction type <div >Category<FontAwesomeIcon icon={faPencilAlt} /> 
                         <div className="notes"> Notes<FontAwesomeIcon icon={faPencilAlt} /> </div> 
                         </div>  <input type="text" className="notesinput"></input></div></td>

                        <td>Golden Sun Bakery</td>
                        <td>$5.00</td>
                        <td>$2082.79</td>
                    </tr>
                    <tr>
                    <td>   <FontAwesomeIcon icon={faChevronDown} /> <span>June 20th, 2020</span>
                        <div className="expeneinfo">Transaction type <div >Category<FontAwesomeIcon icon={faPencilAlt} /> 
                         <div className="notes"> Notes<FontAwesomeIcon icon={faPencilAlt} /> </div> 
                         </div>  <input type="text" className="notesinput"></input></div></td>
                        <td>Golden Sun Bakery</td>
                        <td>$.00</td>
                        <td>$2082.79</td>
                    </tr>
                    <tr>
                    <td>   <FontAwesomeIcon icon={faChevronDown} /> <span>June 20th, 2020</span>
                        <div className="expeneinfo">Transaction type <div >Category<FontAwesomeIcon icon={faPencilAlt} /> 
                         <div className="notes"> Notes<FontAwesomeIcon icon={faPencilAlt} /> </div> 
                         </div>  <input type="text" className="notesinput"></input></div></td>
                        <td>Golden Sun Bakery</td>
                        <td>$5.00</td>
                        <td>$2082.79</td>
                    </tr>
                    <tr>
                    <td>   <FontAwesomeIcon icon={faChevronDown} /> <span>June 20th, 2020</span>
                        <div className="expeneinfo">Transaction type <div >Category<FontAwesomeIcon icon={faPencilAlt} /> 
                         <div className="notes"> Notes<FontAwesomeIcon icon={faPencilAlt} /> </div> 
                         </div>  <input type="text" className="notesinput"></input></div></td>
                        <td>Golden Sun Bakery</td>
                        <td>$5.00</td>
                        <td>$2082.79</td>
                    </tr>
                   
                </tbody>
            </table>
        </div>
    );
};

export default TransactionsPage;
