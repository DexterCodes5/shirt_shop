import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import "./ProgressTracker.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

export const ProgressTracker: React.FC<{ step: string }> = (props) => {
  return (
    <div className="progress-tracker">
      <Link to="/checkout/shipping" className={`progress-tracker-step${props.step === "shipping" ? " progress-tracker-selected" : ""}`}>
        <FontAwesomeIcon className="progress-tracker-chevron" icon={faChevronLeft} />
        <div className="progress-tracker-link">Delivery</div>
      </Link>
      <Link to="/checkout/payment" className={`progress-tracker-step${props.step === "payment" ? " progress-tracker-selected" : ""}`}>
        <FontAwesomeIcon className="progress-tracker-chevron" icon={faChevronLeft} />
        <div className="progress-tracker-link">Payment</div>
      </Link>
    </div>
  );
};