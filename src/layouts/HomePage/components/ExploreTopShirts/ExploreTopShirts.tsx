import { Link } from "react-router-dom";
import "./ExploreTopShirts.css";

export const ExploreTopShirts = () => {

  return (
    <div className="explore-top-shirts">
      <div className="explore-top-shirts-container">
        <div>
          <h1 className="explore-top-shirts-heading text-white">
            Find what fits you best
          </h1>
          <h3 className="text-white">Where do you want to go</h3>
          <Link to="/clothing" className="btn">Catalog</Link>
        </div>
      </div>
    </div>
  );
};