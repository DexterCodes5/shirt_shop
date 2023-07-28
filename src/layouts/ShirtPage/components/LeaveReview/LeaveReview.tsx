import { useEffect, useRef, useState } from "react";
import { StarsReview } from "../../../Utils/StarsReview/StarsReview";
import "./LeaveReview.css";
import { useAuth0 } from "@auth0/auth0-react";
import { ReviewModel } from "../../../../model/ReviewModel";

export const LeaveReview: React.FC<{ shirtId: string, setIsReviewed: React.Dispatch<React.SetStateAction<boolean>> }> = (props) => {
  
  const [showReviewDropdown, setShowReviewDropdown] = useState(false);
  const [rating, setRating] = useState(0);
  const [description, setDescription] = useState("");

  const auth0 = useAuth0();

  const dropdown = useRef<HTMLUListElement>(null);
  
  const closeDropdown = (e: any)=>{
    if(!dropdown.current!.contains(e.target)){
      setShowReviewDropdown(false);
    }
  }

  useEffect(() => {
    document.addEventListener("mousedown", closeDropdown);
    return () => {
      document.removeEventListener("mousedown", closeDropdown);
    }
  }, []);

  const handleStars = (stars: number) => {
    setRating(stars);
    setShowReviewDropdown(!showReviewDropdown);
  };
  
  const submitReview = async () => {
    const url = `${process.env.REACT_APP_API}/review/secure/postreview`;
    const accessToken = await auth0.getAccessTokenSilently();
    const review = new ReviewModel(auth0.user?.email!, rating, Number(props.shirtId), description);
    
    const requestOptions = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(review)
    };
    const response = await fetch(url, requestOptions);
    props.setIsReviewed(true);
  }
  
  return (
    <div className="leave-review-container">
      <div className="leave-review-top">
        <div className="leave-review-heading-dropdown">
          <h1 className="leave-review" onClick={() => setShowReviewDropdown(!showReviewDropdown)}>Leave a review</h1>
          <ul className="leave-review-dropdown" style={{ bottom: showReviewDropdown ? -140 : 20 }} ref={dropdown}>
            <li onClick={() => handleStars(0.0)}>0.0 Stars</li>
            <li onClick={() => handleStars(0.5)}>0.5 Stars</li>
            <li onClick={() => handleStars(1.0)}>1.0 Stars</li>
            <li onClick={() => handleStars(1.5)}>1.5 Stars</li>
            <li onClick={() => handleStars(2.0)}>2.0 Stars</li>
            <li onClick={() => handleStars(2.5)}>2.5 Stars</li>
            <li onClick={() => handleStars(3.0)}>3.0 Stars</li>
            <li onClick={() => handleStars(3.5)}>3.5 Stars</li>
            <li onClick={() => handleStars(4.0)}>4.0 Stars</li>
            <li onClick={() => handleStars(4.5)}>4.5 Stars</li>
            <li onClick={() => handleStars(5.0)}>5.0 Stars</li>
          </ul>
        </div>
        <StarsReview rating={rating} size={32} />
      </div>
      <h3>Description</h3>
      <textarea className="leave-review-description" rows={3} placeholder="Optional" onChange={(e) => setDescription(e.target.value)} 
      value={description}></textarea>
      <div className="leave-review-btn">
        <button className="btn" onClick={submitReview}>Submit Review</button>
      </div>
    </div>
  );
};