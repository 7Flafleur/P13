import { Link, useNavigate } from "react-router-dom";
import "./transactions.css";
import { logout } from '../redux/Slices';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faPencilAlt, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";

const TransactionsPage = () => {
    const [infoCollapsed, setInfoCollapsed] = useState(false);
    const [categoryCollapsed, setCategoryCollapsed] = useState(false);
    const [notesInputVisible, setNotesInputVisible] = useState(false);

    const imagesContext = require.context('../img', true, /\.(png|jpe?g)$/);

    const getImage = (imageName) => {
        return imagesContext(`./${imageName}`).default;
    };

    const navigate = useNavigate();
    const user = useSelector(state => state.userAuth.user);
    const token = useSelector(state => state.userAuth.token);
    const dispatch = useDispatch();

    const handleLogoutClick = (event) => {
        dispatch(logout());
        console.log('Link was clicked.');
        console.log('User', user);
        console.log("Token", token);
        navigate('/');
    };

    const transactions = [
        { date: 'June 20th, 2020', description: 'Golden Sun Bakery', amount: -5.00, type: 'Electronic', category: 'Food', notes: '' },
        { date: 'June 21st, 2020', description: 'Starbucks', amount: -10.00, type: 'Electronic', category: 'Food', notes: '' },
        { date: 'June 22nd, 2020', description: 'Rent', amount: -800.00, type: 'Electronic', category: 'Housing', notes: '' },
        { date: 'June 23rd, 2020', description: 'Salary', amount: 2000.00, type: 'Electronic', category: 'Income', notes: '' },
        { date: 'June 24th, 2020', description: 'Grocery Store', amount: -150.00, type: 'Electronic', category: 'Food', notes: '' },
        { date: 'June 25th, 2020', description: 'Gym Membership', amount: -30.00, type: 'Electronic', category: 'Fitness', notes: '' },
    ];

    let balance = 2082.79;

    return (
        <div className="transactions-page">
            <header className="transactions-header">
                <div className="transactions-logo">ARGENTBANK</div>
                <div className="transactions-user-info">
                    <span>USER</span>
                    <Link onClick={handleLogoutClick} to="/"><FontAwesomeIcon icon={faSignOutAlt} />Sign out</Link>
                </div>
            </header>
            <section className="transactions-balance-section">
                <h2>Argent Bank Checking (x8349)</h2>
                <h1>${balance.toFixed(2)}</h1>
                <p>Available Balance</p>
            </section>
            <table className="transactions-table">
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Description</th>
                        <th>Amount</th>
                        <th>Balance</th>
                    </tr>
                </thead>
                <tbody>
                    {transactions.map((transaction, index) => {
                        balance += transaction.amount;
                        return (
                            <tr key={index}>
                                <td>
                                    <FontAwesomeIcon icon={faChevronDown} />
                                    <span>{transaction.date}</span>
                                    <div className="transactions-expense-info">
                                        Transaction type: {transaction.type}
                                        <div className="transactions-category">
                                            Category: {transaction.category}
                                            <FontAwesomeIcon icon={faPencilAlt} />
                                        </div>
                                        <div className="transactions-notes">
                                            Notes
                                            <FontAwesomeIcon icon={faPencilAlt} />
                                            <input type="text" className="transactions-notes-input" />
                                        </div>
                                    </div>
                                </td>
                                <td>{transaction.description}</td>
                                <td>${transaction.amount.toFixed(2)}</td>
                                <td>${balance.toFixed(2)}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            <footer className="transactions-footer">
                <p>Copyright 2020 Bank Argent</p>
            </footer>
        </div>
    );
};

export default TransactionsPage;
