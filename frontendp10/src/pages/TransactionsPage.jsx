import { Link,useNavigate } from "react-router-dom";
import "./transactions.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

const TransactionsPage = () => {

    const imagesContext = require.context('../img', true, /\.(png|jpe?g)$/);

    const getImage = (imageName) => {
      return imagesContext(`./${imageName}`).default;
    };
  
    



  return (
    <div className="transaction-page">
      <header className="header">
        <div className="logo">ARGENTBANK</div>
        <div className="user-info">
          <span>Tony</span>
          <button>Sign out</button>
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
          <th></th>
            <th>Date</th>
            <th>Description</th>
            <th>Amount</th>
            <th>Balance</th>
          </tr>
        </thead>
        <tbody>
          <tr>
          <i className="fas fa-chevron-down"></i>
            <td>June 20th, 2020</td>
            <td>Golden Sun Bakery</td>
            <td>$5.00</td>
            <td>$2082.79</td>
          </tr>
          <tr>
          <button></button>
            <td>June 20th, 2020</td>
            <td>Golden Sun Bakery</td>
            <td>$5.00</td>
            <td>$2082.79</td>
          </tr>
          <tr>
          <button></button>
            <td>June 20th, 2020</td>
            <td>Golden Sun Bakery</td>
            <td>$5.00</td>
            <td>$2082.79</td>
          </tr>
          <tr>
          <button></button>
            <td>June 20th, 2020</td>
            <td>Golden Sun Bakery</td>
            <td>$5.00</td>
            <td>$2082.79</td>
          </tr>
          <tr>
          <button></button>
            <td>June 20th, 2020</td>
            <td>Golden Sun Bakery</td>
            <td>$5.00</td>
            <td>$2082.79</td>
          </tr>
          <tr>
          <button></button>
            <td>June 20th, 2020</td>
            <td>Golden Sun Bakery</td>
            <td>$5.00</td>
            <td>$2082.79</td>
          </tr>
          {/* Repeat the rows as necessary */}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionsPage;
