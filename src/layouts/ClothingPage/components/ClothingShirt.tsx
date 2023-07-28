import { Link } from "react-router-dom";
import { ShirtModel } from "../../../model/ShirtModel";
import "./ClothingShirt.css";

export const ClothingShirt: React.FC<{ shirt: ShirtModel }> = (props) => {

  return (
    <div className="clothing-shirt">
      <div className="clothing-shirt-img-container">
        {props.shirt.img ? 
          <img className="clothing-shirt-img" src={props.shirt.img} alt="Shirt" />
          :
          <img className="clothing-shirt-img" src={require("../../../Images/test-shirt.jpg")} alt="Shirt" />
        }
      </div>
      <div className="clothing-shirt-info-container">
        <p className="clothing-shirt-brand">{props.shirt.brand}</p>
        <h2 className="clothing-shirt-title">{props.shirt.title}</h2>
        <p>{props.shirt.description}</p>
      </div>
      <div  className="clothing-shirt-btn-container">
        <Link className="btn" to={`/products/${props.shirt.id}`}>View Details</Link>
      </div>
    </div>
  );
}