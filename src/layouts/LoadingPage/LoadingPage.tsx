import { SpinnerLoading } from "../Utils/SpinnerLoading/SpinnerLoading";
import "./LoadingPage.css";

export const LoadingPage = () => {
  return (
    <div className="loading-page">
        <div className="loading-page-content">
          <SpinnerLoading />
        </div>
      </div>
  );
};