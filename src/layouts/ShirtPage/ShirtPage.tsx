import { useEffect, useState } from "react";
import { StarsReview } from "../Utils/StarsReview/StarsReview";
import "./ShirtPage.css";
import { ShirtModel } from "../../model/ShirtModel";
import { useParams } from "react-router-dom";
import { SpinnerLoading } from "../Utils/SpinnerLoading/SpinnerLoading";
import { LeaveReview } from "./components/LeaveReview/LeaveReview";
import { useAuth0 } from "@auth0/auth0-react";
import { ReviewModel } from "../../model/ReviewModel";
import { Review } from "./components/Review/Review";

export const ShirtPage: React.FC<{ addToCart: Function }> = (props) => {
  const [shirt, setShirt] = useState<ShirtModel>();
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState("");

  const [isReviewed, setIsReviewed] = useState(false);
  const [isLoadingIsReviewed, setIsLoadingIsReviewed] = useState(true);

  const [reviews, setReviews] = useState<ReviewModel[]>([]);
  const [isLoadingReviews, setIsLoadingReviews] = useState(true);
  const [shirtRating, setShirtRating] = useState(0);

  const { shirtId } = useParams();
  const auth0 = useAuth0();

  useEffect(() => {
    const fetchShirt = async () => {
      const fetchUrl = `${process.env.REACT_APP_API}/shirts/${shirtId}`;
      const response = await fetch(fetchUrl);

      if (!response.ok) {
        throw new Error("Something went wrong");
      }

      const responseJson = await response.json();
      setShirt(responseJson);
      setIsLoading(false);
    };

    fetchShirt().catch(error => {
      setIsLoading(false);
      setHttpError(error.message);
    });

    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const fetchIsReviewed = async () => {
      if (auth0.user?.email === undefined) {
        setIsLoadingIsReviewed(false);
        return;
      }

      const url = `${process.env.REACT_APP_API}/review/secure/isreviewed/byuser?userEmail=${auth0.user?.email}&shirtId=${shirtId}`;
      const accessToken = await auth0.getAccessTokenSilently();
      const requestOptions = {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      };
      const response = await fetch(url, requestOptions);
      const responseJson = await response.json();
      setIsReviewed(responseJson);
      setIsLoadingIsReviewed(false);
    };

    fetchIsReviewed().catch(err => {
      setIsLoadingIsReviewed(false);
      setHttpError("Something went wrong");
    });
  }, []);

  useEffect(() => {
    const fetchReviews = async () => {
      const url = `${process.env.REACT_APP_API}/reviews/search/findByShirtId?shirtId=${shirtId}`;
      const response = await fetch(url);
      const responseJson = await response.json();
      const responseData = responseJson._embedded.reviews;
      setReviews(responseData);

      if (responseData) {
        let rating = 0;
        responseData.forEach((review: ReviewModel) => rating += review.rating);
        rating /= responseData.length;
        const round = (Math.round(rating * 2) / 2).toFixed(1);
        setShirtRating(Number(round));
      }
      
      setIsLoadingReviews(false);
    };

    fetchReviews().catch(err => {
      setIsLoadingReviews(false);
      setHttpError("Something went wrong");
    });
  }, [isReviewed]);

  if (isLoading || isLoadingIsReviewed || isLoadingReviews) {
    return (
      <SpinnerLoading />
    );
  }

  if (httpError) {
    return (
      <div className="http-error-container mobile-container">
        <p>{httpError}</p>
      </div>
    );
  }

  const shirtColor = shirt?.color.replaceAll("_", " ");
  
  const renderReview = () => {
    if (auth0.isAuthenticated) {
      if (isReviewed) {
        return <h3>Thank you for your review!</h3>
      }
      return <LeaveReview shirtId={shirtId!} setIsReviewed={setIsReviewed} />;
    }
    return (
      <>
        <p>Sign in to be able to leave a review</p>
        <button className="btn" onClick={() => auth0.loginWithRedirect()}>Sign in</button>
      </>
    );
  };

  return (
    <div className="container mobile-container">
      <div className="shirt-page-top">
        <div className="shirt-page-img-container">
          {shirt?.img ?
            <img className="shirt-page-img" src={shirt.img} alt="Shirt" />
            :
            <img className="shirt-page-img" src={require("../../Images/test-shirt.jpg")} alt="Shirt" />
          }
        </div>
        <div className="shirt-page-info-container">
          <h1 className="shirt-page-title">{shirt?.title}</h1>
          <h3 className="shirt-page-brand">{shirt?.brand}</h3>
          <p>{shirt?.description}</p>
          <StarsReview rating={shirtRating} size={32} />
        </div>
        <div className="shirt-page-card-container">
          <div className="shirt-page-card">
            <h3>{shirt?.brand}</h3>
            <p>{shirt?.title}</p>
            <p className="shirt-page-price">{shirt?.price.toFixed(2)} BGN</p>
            <p>Color: <span className="text-bold">{shirtColor}</span></p>
            <button className="btn" onClick={() => props.addToCart(shirt)}>Add to cart</button>
            <hr />
            <p className="shirt-page-delivery-info">For orders over BGN 29.90, delivery is free. If the value of the order is lower, delivery charges of BGN 4.90 including VAT per order apply. For orders containing several products, it is possible, in some cases, to be delivered in more than one package.</p>
          </div>
        </div>
      </div>
      <hr />
      {renderReview()}
      <hr />
      <div className="latest-reviews">
      <div>
        <h1>Latest Reviews: </h1>
      </div>
      <div className="latest-reviews-right-col">
        {reviews.length > 0 ?
          <>
            {reviews.map(review => <Review review={review} key={review.id} />)}
          </>
          :
          <p>Currently there are no reviews for this shirt</p>
        }
      </div>
    </div>
    </div>
  );
}