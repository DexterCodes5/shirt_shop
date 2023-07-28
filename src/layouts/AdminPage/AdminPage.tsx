import { useState } from "react";
import "./AdminPage.css";
import { AddNewShirt } from "./components/AddNewShirt/AddNewShirt";
import { ChangeQuantity } from "./components/ChangeQuantity/ChangeQuantity";
import { Questions } from "./components/AdminQuestions/AdminQuestions";
import { useAuth0 } from "@auth0/auth0-react";
import { Navigate } from "react-router-dom";

export const AdminPage = () => {
  const auth0 = useAuth0();

  const [selectedNavBtn, setSelectedNavBtn] = useState("Add new shirt");

  const renderBody = () => {
    if (selectedNavBtn === "Add new shirt") {
      return <AddNewShirt />;
    }
    else if (selectedNavBtn === "Change quantity") {
      return <ChangeQuantity />;
    }
    else {
      return <Questions />
    }
  }

  if (auth0.user?.userTypes[0] !== "admin") {
    return <Navigate to="/error" />
  }

  return (
    <div className="container">
      <h1 className="admin-page-h1">Manage Shirt Shop</h1>
      <nav className="admin-page-nav">
        <div className={`admin-page-nav-item${selectedNavBtn === "Add new shirt" ? " admin-page-nav-item-active" : ""}`}
        onClick={() => setSelectedNavBtn("Add new shirt")}>Add new shirt</div>
        <div className={`admin-page-nav-item${selectedNavBtn === "Change quantity" ? " admin-page-nav-item-active" : ""}`}
        onClick={() => setSelectedNavBtn("Change quantity")}>Change quantity</div>
        <div className={`admin-page-nav-item${selectedNavBtn === "Questions" ? " admin-page-nav-item-active" : ""}`}
        onClick={() => setSelectedNavBtn("Questions")}>Questions</div>
      </nav>
      {renderBody()}
    </div>
  );
};