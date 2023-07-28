import { Link } from "react-router-dom";
import "./Footer.css";

export const Footer = () => {

  return (
    <footer>
      <div className="container footer-grid">
        <p className="text-white">
          @Example Shirt Shop, Inc
        </p>
        <ul className="footer-navbar text-white">
          <li>
            <Link className="nav-link" to="/">Home</Link>
          </li>
          <li>
            <Link className="nav-link" to="/clothing">Clothing</Link>
          </li>
        </ul>
      </div>
    </footer>
  );
}