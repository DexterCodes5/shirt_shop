import { Link } from "react-router-dom";
import "./Hero.css";

export const Hero = () => {

  return (
    <div className="hero mobile-container">
      {/* Desktop */}
      <div className="desktop">
        <div className="hero-row">
          <div className="hero-row-left-col">
            <img className="hero-row-image-left" src={require("../../../../Images/models.jpg")} />
          </div>
          <div className="hero-row-right-col">
            <div className="hero-row-text-container">
              <h1 className="hero-row-text-heading">
                Concept
              </h1>
              <p className="hero-row-text">
                Elegant style and unique look Formal wear, ceremonial and business suits. For those men who are interested in the current fashion trends and want to combine a new, modern look with a classic style. Our range of luxury outfits is diverse and specially crafted to embody timeless style and innovative spirit.
              </p>
              <Link className="btn" to="/clothing">See More</Link>
            </div>
          </div>
        </div>
        <div className="hero-row">
          <div className="hero-row-right-col">
            <div className="hero-row-text-container">
              <h1 className="hero-row-text-heading">
                Men's Suits
              </h1>
              <p className="hero-row-text">
                Sharp slim cuts, defined tailored fits and roomier regulars, our designer and own-brand men's suits have something for every taste and shape. Whether you're in the market for tailored separates in feel-good flannel, a tweed three-piece or an evening-ready tuxedo suit, we've got you covered for all your on-form moments.
              </p>
              <Link className="btn" to="/clothing">Our Collection</Link>
            </div>
          </div>
          <div className="hero-row-left-col">
            <img className="hero-row-image-right" src={require("../../../../Images/models2-small.png")} />
          </div>
        </div>
      </div>

      {/* Mobile */}
      <div className="mobile">
        <div className="hero-row">
          <div className="hero-row-left-col">
            <img className="hero-row-image-left" src={require("../../../../Images/models.jpg")} />
          </div>
          <div className="hero-row-right-col">
            <div className="hero-row-text-container">
              <h1 className="hero-row-text-heading">
                Concept
              </h1>
              <p className="hero-row-text">
                Elegant style and unique look Formal wear, ceremonial and business suits. For those men who are interested in the current fashion trends and want to combine a new, modern look with a classic style. Our range of luxury outfits is diverse and specially crafted to embody timeless style and innovative spirit.
              </p>
              <Link className="btn" to="clothing">See More</Link>
            </div>
          </div>
        </div>
        <div className="hero-row">
          <div className="hero-row-left-col">
            <img className="hero-row-image-right" src={require("../../../../Images/models2-small.png")} />
          </div>
          <div className="hero-row-right-col">
            <div className="hero-row-text-container">
              <h1 className="hero-row-text-heading">
                Men's Suits
              </h1>
              <p className="hero-row-text">
                Sharp slim cuts, defined tailored fits and roomier regulars, our designer and own-brand men's suits have something for every taste and shape. Whether you're in the market for tailored separates in feel-good flannel, a tweed three-piece or an evening-ready tuxedo suit, we've got you covered for all your on-form moments.
              </p>
              <Link className="btn" to="clothing">Our Collection</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}