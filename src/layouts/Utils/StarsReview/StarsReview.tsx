import "./StarsReview.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as fasFaStar } from "@fortawesome/free-solid-svg-icons";
import { faStarHalfStroke as fasFaStarHalfStroke } from "@fortawesome/free-solid-svg-icons";
import { faStar as farFaStar } from "@fortawesome/free-regular-svg-icons";

export const StarsReview: React.FC<{
  rating: number, size: number
}> = (props) => {

  let ratingTemp = props.rating;
  let fullStars = 0;
  let halfStars = 0;
  let emptyStars = 0;
  
  while (ratingTemp > 0) {
    if (ratingTemp - 1 >= 0) {
      fullStars++;
    }
    else if (ratingTemp === 0.5) {
      halfStars++;
    }
    ratingTemp--;
  }
  emptyStars = 5 - (fullStars + halfStars);
  
  return (
    <div>
      {Array.from({ length: fullStars }, (_, i) =>
        <FontAwesomeIcon className="stars-review-star" style={{ height: props.size }} icon={fasFaStar} key={i} />
      )}
      {Array.from({ length: halfStars }, (_, i) =>
        <FontAwesomeIcon className="stars-review-star" style={{ height: props.size }} icon={fasFaStarHalfStroke} key={i} />
      )}
      {Array.from({ length: emptyStars }, (_, i) =>
        <FontAwesomeIcon className="stars-review-star" style={{ height: props.size }} icon={farFaStar} key={i} />
      )}
    </div>
  );
}