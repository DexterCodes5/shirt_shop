import { ReviewModel } from "../../../../model/ReviewModel";
import { StarsReview } from "../../../Utils/StarsReview/StarsReview";
import "./Review.css";

export const Review: React.FC<{ review: ReviewModel }> = (props) => {

  return (
    <div className="review">
      <div className="review-col">
        <h3>{props.review.userEmail}</h3>
        <StarsReview rating={props.review.rating} size={26} />
      </div>
        <p>{props.review.date}</p>
        <p>{props.review.description}</p>
        <hr />
    </div>
  );
}