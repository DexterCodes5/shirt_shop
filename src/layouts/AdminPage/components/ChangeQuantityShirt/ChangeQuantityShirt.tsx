import { useAuth0 } from "@auth0/auth0-react";
import { ShirtModel } from "../../../../model/ShirtModel";
import "./ChangeQuantityShirt.css";

export const ChangeQuantityShirt: React.FC<{ shirt: ShirtModel, 
  setIsQuantityChanged: React.Dispatch<React.SetStateAction<boolean>>, setIsLoading: React.Dispatch<React.SetStateAction<boolean>> 
}> = (props) => {
  const auth0 = useAuth0();

  const addQuantity = () => {
    props.setIsLoading(true);
    props.shirt.inStock++;
    postShirt();
    setTimeout(() => {
      props.setIsQuantityChanged(preValue => !preValue)
    }, 500);
  };

  const decreaseQuantity = () => {
    props.setIsLoading(true);
    props.shirt.inStock--;
    postShirt();
    setTimeout(() => {
      props.setIsQuantityChanged(preValue => !preValue)
    }, 500);
  };

  const postShirt = async () => {
    const url = `${process.env.REACT_APP_API}/admin`;
    const accessToken = await auth0.getAccessTokenSilently();
    const requestOptions = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(props.shirt)
    };
    const response = await fetch(url, requestOptions);
  };

  const deleteShirt = async () => {
    props.setIsLoading(true);

    const url = `${process.env.REACT_APP_API}/admin?shirtId=${props.shirt.id}`;
    const accessToken = await auth0.getAccessTokenSilently();
    const requestOptions = {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(props.shirt)
    };
    const response = await fetch(url, requestOptions);

    setTimeout(() => {
      props.setIsQuantityChanged(preValue => !preValue);
    }, 500);
  };

  return (
    <div className="change-quantity-shirt">
      <div className="change-quantity-row">
        <div className="change-quantity-col1">
          <img className="change-quantity-img" src={props.shirt.img} alt="Shirt" />
        </div>
        <div className="change-quantity-col2">
          <h4 style={{ marginTop: 0, marginBottom: "0.5rem" }}>{props.shirt.brand}</h4>
          <h3 style={{ marginTop: 0, marginBottom: "0.5rem" }}>{props.shirt.title}</h3>
          <div>{props.shirt.description}</div>
        </div>
        <div className="change-quantity-col1">
          <div className="change-quantity-in-stock">In stock: <b>{props.shirt.inStock}</b></div>
        </div>
        <div className="change-quantity-col3">
          <div className="change-quantity-add-btn" onClick={addQuantity}>Add quantity</div>
          <div className="change-quantity-decrease-btn" onClick={decreaseQuantity}>Decrease quantity</div>
          <div className="change-quantity-delete-btn" onClick={deleteShirt}>Delete</div>
        </div>
      </div>
    </div>
  );
}