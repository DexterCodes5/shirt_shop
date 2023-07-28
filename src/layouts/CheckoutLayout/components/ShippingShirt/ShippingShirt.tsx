import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./ShippingShirt.css";
import { faMinus, faPlus, faXmark } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { CartItemModel } from "../../../../model/CartItemModel";

export const ShippingShirt: React.FC<{
  cartItem: CartItemModel, changeCartItemQuantity: Function, removeCartItem: Function
}> = (props) => {
  const [quantity, setQuantity] = useState(props.cartItem.quantity);

  const handleQuantityInput = (e: any) => {
    if (e.target.value <= 0) return;
    changeQuantity(e.target.value);
  }

  const changeQuantity = (newQuantity: number) => {
    props.changeCartItemQuantity(props.cartItem, newQuantity);
    setQuantity(newQuantity);
  }

  return (
    <div className="shipping-shirt">
      <div className="shipping-shirt-img-container">
        <img className="shipping-shirt-img" src={props.cartItem.shirt.img} alt="Shirt" />
      </div>
      <div className="shipping-shirt-info">
        <div className="shipping-shirt-remove-container" onClick={() => props.removeCartItem(props.cartItem)}>
          <FontAwesomeIcon className="shipping-shirt-remove" icon={faXmark} />
        </div>
        <p className="shipping-shirt-brand">{props.cartItem.shirt.brand}</p>
        <p className="shipping-shirt-title">{props.cartItem.shirt.title}</p>
        <p className="shipping-shirt-id">{props.cartItem.shirt.id}</p>
        <p className="shipping-shirt-color">Color: {props.cartItem.shirt.color.toLowerCase()}</p>
        <p className="shipping-shirt-size">Size: M</p>
        <div className="shipping-shirt-quantity-and-price">
          <div className="shipping-shirt-quantity">
            <div className={"shipping-shirt-quantity-sign-container" +
              (quantity === 1 ? " shipping-shirt-quantity-sign-container-disabled" : "")} onClick={
                () => changeQuantity(quantity - 1)}>
              <FontAwesomeIcon icon={faMinus} />
            </div>
            <div>
              <input className="shipping-shirt-quantity-input" type="number" value={quantity}
                onChange={handleQuantityInput} />
            </div>
            <div className="shipping-shirt-quantity-sign-container" onClick={() => changeQuantity(quantity + 1)}>
              <FontAwesomeIcon icon={faPlus} />
            </div>
          </div>
          <div className="shipping-shirt-price">
            {(props.cartItem.shirt.price * props.cartItem.quantity).toFixed(2)}&nbsp;BGN
          </div>
        </div>
      </div>
    </div>
  );
}