import { Link, Outlet, useOutletContext } from "react-router-dom";
import { Footer } from "../HeaderAndFooter/Footer/Footer";
import { ShippingCart } from "./components/ShippingCart/ShippingCart";
import { CartItemModel } from "../../model/CartItemModel";
import "./CheckoutLayout.css";
import { ProgressTracker } from "./components/PrograssTracker/ProgressTracker";
import { useState } from "react";

export const CheckoutLayout: React.FC<{
  cart: CartItemModel[], changeCartItemQuantity: Function, removeCartItem: Function
}> = (props) => {
  const [renderCheckoutLayout, setRenderCheckoutLayout] = useState(false);
  const url = window.location.href.split("/");
  const step = url[4];
  
  return (
    <div className="main-view">
      <header className="checkout-header">
        <div>
          <Link className="header-title" to="/">
            Shirt Shop
          </Link>
        </div>
      </header>
      <div className="main-content">
        <div className="checkout-grid">
          <div className="checkout-left">
            <div className="checkout-left-container">
              <ProgressTracker step={step.split("?")[0]} />
              <Outlet context={{renderCheckoutLayout, setRenderCheckoutLayout}} />
            </div>
          </div>
          <div className="checkout-right">
            <ShippingCart cart={props.cart} changeCartItemQuantity={props.changeCartItemQuantity} removeCartItem={props.removeCartItem} />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

type CheckoutLayoutContextType = { renderCheckoutLayout: boolean, setRenderCheckoutLayout: React.Dispatch<React.SetStateAction<boolean>> };

export const useRenderCheckoutLayout = () => {
  return useOutletContext<CheckoutLayoutContextType>();
};