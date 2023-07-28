import { useNavigate } from "react-router-dom";
import "./ErrorPage.css";

export const ErrorPage = () => {
  const navigate = useNavigate();

  return (
    <div className="error-page">
      <div className="container">
        <h1 className="error-page-heading">Oops, something went wrong!</h1>
        <p className="erro-page-info">Error code 404. Let's find a better place for you to go.</p>
        <div className="error-page-btns-container">
          <button className="btn error-page-btn" onClick={() => navigate(-1)}>Back</button>
          <button className="btn" onClick={() => navigate("/clothing")}>Cloting</button>
        </div>
      </div>
    </div>
  );
}