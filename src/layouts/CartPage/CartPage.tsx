import { Link, useLocation, useNavigate } from "react-router-dom";
import "./CartPage.css";
import { CartItemModel } from "../../model/CartItemModel";
import { CartItem } from "./components/CartItem/CartItem";
import { useAuth0 } from "@auth0/auth0-react";


export const CartPage: React.FC<{
  cart: CartItemModel[], changeCartItemQuantity: Function, removeCartItem: Function
}> = (props) => {
  const { state } = useLocation();

  const auth0 = useAuth0();
  const navigate = useNavigate();

  const calculateTotal = () => {
    let total = 0;
    for (const cartItem of props.cart) {
      total += cartItem.shirt.price * cartItem.quantity;
    }
    return total;
  };

  const continueToPayment = () => {
    navigate("/checkout/shipping");
  };

  return (
    <div className="container">
      <Link className="btn cart-back-btn" to={state?.prevUrl ? state.prevUrl : "/"}>Back</Link>
      <h1 className="cart-title">Cart</h1>
      {props.cart.length > 0 ?
        <div className="cart-full">
          <div className="cart-table">
            <div className="cart-table-row">
              <div className="cart-img-col">
                <h3>Delivery</h3>
              </div>
            </div>
            {props.cart.map(cartItem =>
              <CartItem cartItem={cartItem} changeCartItemQuantity={props.changeCartItemQuantity} removeCartItem={props.removeCartItem} key={cartItem.shirt.id} />)
            }
          </div>
          <div className="order-summary">
            <div className="order-summary-row">
              <h3>Total <span className="with-dds">with included DDS</span></h3>
              <h3>{calculateTotal().toFixed(2)} BGN</h3>
            </div>
            <div className="order-summary-row">
              <p>Delivery</p>
              <p>0.00 BGN</p>
            </div>
            <div className="to-payment-btn" onClick={continueToPayment}>Continue to payment</div>
          </div>
        </div>
        :
        <div className="cart-empty">
          <div>
            <h3>Your cart is empty!</h3>
            <p>Take a look at our products</p>
            <Link to="/clothing" className="btn">Products</Link>
          </div>
        </div>
      }
    </div>
  );
};