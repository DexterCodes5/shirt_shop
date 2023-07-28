import { Link } from "react-router-dom";
import { ShirtModel } from "../../../../model/ShirtModel";
import "./CarouselShirt.css";

export const CarouselShirt: React.FC<{ shirt: ShirtModel }> = (props) => {

  return (
    <div className="carousel-shirt">
      {props.shirt ? 
        <img className="carousel-shirt-img" src={props.shirt.img} alt="shirt" />
        :
        <img className="carousel-shirt-img" src={require("../../../../Images/test-shirt.jpg")} alt="shirt" />
      }
      
      <h3 className="carousel-shirt-title">{props.shirt ? props.shirt.title : 'title'}</h3>
      <p className="carousel-shirt-brand">{props.shirt ? props.shirt.brand : "brand"}</p>
      <p className="carousel-shirt-brand">{props.shirt ? props.shirt.price.toFixed(2) : 100.00} BGN</p>
      <Link className="btn carousel-shirt-btn" to={`/products/${props.shirt.id}`}>Buy</Link>
    </div>
  );
}