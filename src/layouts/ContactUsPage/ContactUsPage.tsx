import { useState } from "react";
import "./ContactUsPage.css";
import { SubmitQustion } from "./components/SubmitQuestion/SubmitQuestion";
import { QAResponse } from "./components/QAResponse/QAResponse";

export const ContactUsPage = () => {
  const [selectedNavBtn, setSelectedNavBtn] = useState("Submit Question");

  return (
    <div className="container">
      <nav className="admin-page-nav">
        <div className={`admin-page-nav-item${selectedNavBtn === "Submit Question" ? " admin-page-nav-item-active" : ""}`}
          onClick={() => setSelectedNavBtn("Submit Question")}>Submit Qustion</div>
        <div className={`admin-page-nav-item${selectedNavBtn === "Q/A Response Pending" ? " admin-page-nav-item-active" : ""}`}
          onClick={() => setSelectedNavBtn("Q/A Response Pending")}>Q/A Response Pending</div>
      </nav>
      {selectedNavBtn === "Submit Question" &&
        <div className="tab-pane">
          <SubmitQustion />
        </div>
      }
      {selectedNavBtn === "Q/A Response Pending" &&
        <div className="tab-pane">
          <QAResponse />
        </div>
      }
    </div>
  );
}