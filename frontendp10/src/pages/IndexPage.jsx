
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import {Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import  argentbanklogo from '../img/argentBankLogo.png';
import banktree from "../img/bank-tree.jpeg";
import chaticon from "../img/icon-chat.png";
import moneyicon from '../img/icon-money.png';
import securityicon from '../img/icon-security.png';






export const IndexPage = () => {


  const user = useSelector(state => state.userAuth.user)
  const token = useSelector(state=>state.userAuth.token)

  // console.log("Index user",user)
  // console.log('Index token',token)


  return (
    <>
      <nav className="main-nav">
      <Link className="main-nav-logo" to="/">
          <img
            className="main-nav-logo-image"
            src={argentbanklogo}
            alt="Argent Bank Logo"
          />
          <h1 className="sr-only">Argent Bank</h1>
        </Link>
        <div>
          <Link to="/login" className="main-nav-item" href="./login">
            <FontAwesomeIcon icon={faUserCircle} />
            Sign In
          </Link>
        </div>
      </nav>
      <main>
        <div className="hero">
          <section className="hero-content">
            <h2 className="sr-only">Promoted Content</h2>
            <p className="subtitle">No fees.</p>
            <p className="subtitle">No minimum deposit.</p>
            <p className="subtitle">High interest rates.</p>
            <p className="text">Open a savings account with Argent Bank today!</p>
          </section>
        </div>
        <section className="features">
          <h2 className="sr-only">Features</h2>
          <div className="feature-item">
            <img src={chaticon} alt="Chat Icon" className="feature-icon" />
            <h3 className="feature-item-title">You are our #1 priority</h3>
            <p>
              Need to talk to a representative? You can get in touch through our
              24/7 chat or through a phone call in less than 5 minutes.
            </p>
          </div>
          <div className="feature-item">
            <img
              src={moneyicon}
              alt="Money Icon"
              className="feature-icon"
            />
            <h3 className="feature-item-title">More savings means higher rates</h3>
            <p>
              The more you save with us, the higher your interest rate will be!
            </p>
          </div>
          <div className="feature-item">
            <img
              src={securityicon}
              alt="Security Icon"
              className="feature-icon"
            />
            <h3 className="feature-item-title">Security you can trust</h3>
            <p>
              We use top of the line encryption to make sure your data and money
              is always safe.
            </p>
          </div>
        </section>
      </main>
      <footer className="footer">
        <p className="footer-text">Copyright 2020 Argent Bank</p>
      </footer>
    </>
  );
};

