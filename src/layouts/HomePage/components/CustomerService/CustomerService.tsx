import { Link } from "react-router-dom";
import "./CustomerService.css";

export const CustomerService = () => {

  return (
    <div className="customer-service mobile-container">
      <div className="customer-service-content">
        <div className="customer-service-text">
          <h1 className="customer-service-text-heading">
            Can't find what you are looking for?
          </h1>
          <p>
            If you cannot find what you are looking for, send us a message!
          </p>
          <Link className="btn" to="contact-us">Contact Us</Link>
        </div>
        <div className="customer-service-image-container">
          <img className="customer-service-image" src={require("../../../../Images/customer-service.jpg")} alt="Customer Service" />
        </div>
      </div>
    </div>
  );
}