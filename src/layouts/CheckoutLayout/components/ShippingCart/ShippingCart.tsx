import { CartItemModel } from "../../../../model/CartItemModel";
import econtbg from "../../../../Images/econtbg.svg";
import { ShippingShirt } from "../ShippingShirt/ShippingShirt";
import infoFill from "../../../../Images/infoFill.svg";
import "./ShippingCart.css";

export const ShippingCart: React.FC<{
  cart: CartItemModel[], changeCartItemQuantity: Function, removeCartItem: Function
}> = (props) => {

  const calculateSubtotal = () => {
    let total = 0;
    for (const cartItem of props.cart) {
      total += cartItem.shirt.price * cartItem.quantity;
    }
    return total;
  }

  return (
    <div className="shipping-cart">
      <h3 className="shipping-page-order-info">Order info</h3>
      <div className="shipping-page-delivery-estimate">Delivery on Wed 19.07 - Thu 20.07 &#128900;
        <img className="shipping-page-econt" src={econtbg} alt="Econt" />
      </div>
      <div className="basket__content">
        {props.cart.length > 0 ?
          <>
            {props.cart.map(cartItem => <ShippingShirt cartItem={cartItem} changeCartItemQuantity={props.changeCartItemQuantity}
              removeCartItem={props.removeCartItem} key={cartItem.shirt.id} />)}
          </>
          :
          <p>Cart is empty</p>
        }
      </div>
      <div className="order__summary">
        <div className="order__summary-row">
          <div>
            Subtotal
          </div>
          <div>
            {calculateSubtotal().toFixed(2)}&nbsp;BGN
          </div>
        </div>
        <div className="order__summary-row">
          <div>
            Delivery
          </div>
          <div>
            Free
          </div>
        </div>
        <div className="information-box-alt">
          <div className="information-box-alt__text">
            Free delivery for orders above 29,99 BGN
          </div>
          <img src={infoFill} alt="infoFill" />
        </div>
        <div className="order__summary-row order__summary-total">
          <div>
            Total
          </div>
          <div>
            {calculateSubtotal().toFixed(2)}&nbsp;BGN
            <div className="order__summary-dds">with DDS</div>
          </div>
        </div>
      </div>
    </div>
  );
}