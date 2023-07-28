import { Link, NavLink, useLocation } from "react-router-dom";
import "./Header.css";
import { useState, } from "react";
import { useAuth0 } from "@auth0/auth0-react";

export const Header: React.FC<{ cartQuantity: number }> = (props) => {
  const auth0 = useAuth0();
  const location = useLocation();

  const [showHeaderContent, setShowHeaderContent] = useState(false);
  
  const handleHamburger = () => {
    setShowHeaderContent(!showHeaderContent);
  };

  // console.log(auth0);
  
  const getAccessToken = async () => {
    if (!auth0.isAuthenticated) return;
    const accessToken = await auth0.getAccessTokenSilently();
    console.log(accessToken);
  };
  // getAccessToken();

  return (
    <header>
      {/* Desktop */}
      <div className="container header-container">
        <div className="header-left">
          <Link className="header-title" to="/">
            Shirt Shop
          </Link>
          <div className="header-content">
            <ul className="header-list">
              <li>
                <NavLink className="nav-link" to="/">Home</NavLink>
              </li>
              <li>
                <NavLink className="nav-link" to="/clothing">Clothing</NavLink>
              </li>
              {auth0.user?.userTypes[0] === "admin" &&
                <li>
                  <NavLink className="nav-link" to="/admin">Admin</NavLink>
                </li>
              }
            </ul>
          </div>
        </div>
        <div className="header-right">
          <div>
            {!auth0.isAuthenticated ?
              <button className="sign-in-btn" onClick={async () => auth0.loginWithRedirect({ appState: { returnTo: "/" }})}>Sign in</button>
              :
              <button className="sign-in-btn" onClick={async () => auth0.logout({ logoutParams: { returnTo: window.location.origin } })}>Sign out</button>
            }
          </div>
          <div className="header-cart-container">
            <Link to="cart" state={{ prevUrl: location.pathname }}>
              <img className="header-cart" src={require("../../../Images/cart.png")} />
            </Link>
            <div className="header-cart-quantity">{props.cartQuantity}</div>
          </div>
        </div>
      </div>
      {/* Mobile */}
      <div className="container header-container-mobile">
        <div className="header-mobile-top">
          <h1>
            Shirt Shop
          </h1>
          <div className="hamburger-container">
            <img className="hamburger-icon" src={require("../../../Images/hamburger-icon.png")} onClick={handleHamburger} />
          </div>
        </div>
        <div className="header-content" style={{ height: showHeaderContent ? 150 : 0 }}>
          <ul className="header-list">
            <li>
              <NavLink className="nav-link" to="/">Home</NavLink>
            </li>
            <li>
              <NavLink className="nav-link" to="/clothing">Clothing</NavLink>
            </li>
            <li>
              <NavLink className="nav-link" to="/cart" state={{ prevUrl: location.pathname }}>Cart</NavLink>
            </li>
          </ul>
          <div className="header-right">
            {auth0.isAuthenticated ?
              <button className="sign-in-btn" onClick={() => auth0.logout()}>Sign out</button>
              :
              <button className="sign-in-btn" onClick={() => auth0.loginWithRedirect()}>Sign in</button>
            }
          </div>
        </div>
      </div>
    </header>
  );
}