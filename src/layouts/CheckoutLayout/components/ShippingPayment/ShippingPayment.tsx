import { Link, Navigate, useNavigate } from "react-router-dom";
import { AddressModel } from "../../../../model/AddressModel";
import "./ShippingPayment.css";
import { useEffect, useState } from "react";
import { useRenderCheckoutLayout } from "../../CheckoutLayout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBuilding as farBuilding } from "@fortawesome/free-regular-svg-icons";
import { BillinAddressForm } from "./components/BillingAddressForm";
import { CheckoutLoader } from "../CheckoutLoader/CheckoutLoader";
import Mastercard from "../../../../Images/cards/mastercard.svg";
import Visa from "../../../../Images/cards/visa.svg";
import CashOnDelivery from "../../../../Images/cards/cod.svg";
import Maestro from "../../../../Images/cards/maestro.svg";
import useWindowDimensions from "../../../../hooks/useWindowDimensions";
import { CustomerOrderModel } from "../../../../model/CustomerOrderModel";
import { ShippingCart } from "../ShippingCart/ShippingCart";
import { CartItemModel } from "../../../../model/CartItemModel";
import { useAuth0 } from "@auth0/auth0-react";
import { CustomerOrderRequest } from "../../../../model/CustomerOrderRequest";
import { CardModal2 } from "./components/CardModal2/CardModal2";

export const ShippingPayment: React.FC<{
  address: AddressModel, cart: CartItemModel[], setCart: React.Dispatch<React.SetStateAction<CartItemModel[]>>,
   changeCartItemQuantity: Function, removeCartItem: Function
}> = (props) => {
  const { renderCheckoutLayout, setRenderCheckoutLayout } = useRenderCheckoutLayout();

  useEffect(() => {
    setRenderCheckoutLayout(!renderCheckoutLayout);

    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth"
    });
  }, []);

  const auth0 = useAuth0();

  const [billingAddress, setBillingAddress] = useState<AddressModel | undefined>(undefined);
  const [billingAddressOption, setBillingAddressOption] = useState(0);

  const [load, setLoad] = useState(false);
  const [isBillingAddressDifferent, setIsBillingAddressDifferent] = useState(false);

  const handleSameAddressClick = () => {
    if (billingAddressOption === 0) {
      return;
    }
    if (isBillingAddressDifferent) {
      setIsBillingAddressDifferent(false);
    }
    setBillingAddress(undefined);
    setLoad(true);
    setTimeout(() => setLoad(false), 1500);
    setBillingAddressOption(0);
  }

  const handleDifferentAddress = () => {
    setBillingAddress(new AddressModel(auth0.user?.email!, props.address.firstName, props.address.lastName, props.address.gender,
      props.address.city, props.address.postcode, props.address.street, props.address.number,props.address.additionalInformation));
    setBillingAddressOption(1);
  }

  const [paymentOption, setPaymentOption] = useState("Mastercard");

  const [phone, setPhone] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [phoneSuccess, setPhoneSuccess] = useState(false);

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (/^([+]3598|08)(7|8|9)([\d]{7})$/.test(e.target.value.replaceAll(" ", ""))) {
      setPhoneError("");
      setPhoneSuccess(true);
    }
    else if (e.target.value.length === 0 && (phoneError || phoneSuccess)) {
      setPhoneError("Phone number field is mandatory");
      setPhoneSuccess(false);
    }
    else if (!/^([+]3598|08)(7|8|9)([\d]{7})$/.test(e.target.value.replaceAll(" ", "")) && (phoneError || phoneSuccess)) {
      setPhoneError("Phone number is invalid");
      setPhoneSuccess(false);
    }

    setPhone(e.target.value);
  };

  const handlePhoneBlur = (e: React.ChangeEvent<HTMLInputElement>) => {
    const phoneNumber = e.target.value.replaceAll(" ", "");
    if (phoneNumber.length === 0) {
      setPhoneError("Phone number field is mandatory");
      setPhoneSuccess(false);
    }
    else if (!/^([+]3598|08)(7|8|9)([\d]{7})$/.test(phoneNumber)) {
      setPhoneError("Phone number is invalid");
      setPhoneSuccess(false);
    }
    else {
      let phoneFormated = phoneNumber;
      if (e.target.value.startsWith("0")) {
        phoneFormated = phoneFormated.replace("0", "+359");
      }
      phoneFormated = phoneFormated.slice(0, 4) + " " + phoneFormated.slice(4, 6) + " " + phoneFormated.slice(6, 9) + " " 
      + phoneFormated.slice(9);
      setPhone(phoneFormated);
    }
  };

  const [agreenmentError, setAgreenmentError] = useState(false);

  const handleMandatoryAgreenment = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.checked) {
      setAgreenmentError(true);
      return;
    }
    setAgreenmentError(false);
  }

  useEffect(() => {
    const hideShowFixedScrollNavigation = () => {
      const fixedNavigation = document.getElementById("fixed-scroll-navigation") as HTMLDivElement;
      if (window.scrollY >= 743) {
        fixedNavigation!.style.display = "none";
      }
      else {
        fixedNavigation!.style.display = "flex";
      }
    };
    window.addEventListener("scroll", hideShowFixedScrollNavigation);

    return () => {
      window.removeEventListener("scroll", hideShowFixedScrollNavigation);
    };
  }, []);

  const windowDimensions = useWindowDimensions();
  const navigate = useNavigate();
  const [payWithCard, setPayWithCard] = useState(false);

  const handlePayNow = async () => {
    const agreeTerms = document.getElementById("agree-terms") as HTMLInputElement;
    if (phone.length === 0) {
      setPhoneError("Phone number field is mandatory");
    }
    if (!agreeTerms.checked) {
      setAgreenmentError(true);
    }

    if (phoneError || phone.length === 0) {
      if (windowDimensions.height < 500) {
        window.scrollTo({
          top: 700,
          behavior: "smooth"
        });
      }
      else {
        window.scrollTo({
          top: 625,
          behavior: "smooth"
        });
      }
      return;
    }
    else if (agreenmentError || !agreeTerms.checked) {
      if (windowDimensions.height < 500) {
        window.scrollTo({
          top: 1100,
          behavior: "smooth"
        });
      }
      else {
        window.scrollTo({
          top: 800,
          behavior: "smooth"
        });
      }
      return;
    }

    if (paymentOption === "Mastercard" || paymentOption === "Visa" || paymentOption === "Maestro") {
      setPayWithCard(true);
      return;
    }
    
    finalizeOrder();
  };

  const finalizeOrder = async () => {
    const customerOrder = new CustomerOrderModel(props.address, paymentOption, phone, billingAddress);
    const customerOrderRequest = new CustomerOrderRequest(customerOrder, props.cart);

    const url = `${process.env.REACT_APP_API}/customer-order/secure/place-order`;
    const accessToken = await auth0.getAccessTokenSilently();
    const requestOptions = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`, 
        "Content-Type": "application/json"
      },
      body: JSON.stringify(customerOrderRequest)
    };
    const response = await fetch(url, requestOptions);
    props.setCart([]);

    navigate("/?successfull-order");
  }

  const calculatePaymentAmount = () => {
    let paymentAmount = 0;
    for (const cartItem of props.cart) {
      paymentAmount += cartItem.shirt.price * cartItem.quantity;
    }
    return paymentAmount;
  }

  if (props.address.firstName === "") {
    return <Navigate to="/checkout/shipping?payment-no-address" />;
  }

  return (
    <div className="shipping-payment">
      <h3 className="checkout-heading">Data for payment</h3>
      <div className="shipping__address">
        <Link to="/checkout/shipping" className="shipping__address-change">Change</Link>
        <dl>
          <dt className="shipping__address-heading">Address for delivery</dt>
          <dd>{props.address.firstName}&nbsp;{props.address.lastName}</dd>
          <dd>{props.address.street}&nbsp;{props.address.number}</dd>
          <dd>{props.address.city}&nbsp;{props.address.postcode}</dd>
        </dl>
      </div>
      <Link to="/checkout/shipping" className="shipping__address__suggestion">
        <FontAwesomeIcon className="shipping__address__suggestion-icon" icon={farBuilding} />
        Choose ofis of Econt or Econtomat
      </Link>
      <h3 className="shipping-payment-heading">Billing address</h3>
      <div className="billing__address">
        <div className={`billing__address-option${billingAddressOption === 0 ? " billing__address-option-selected" : ""}`}
          onClick={handleSameAddressClick}>
          <div className={`${billingAddressOption === 0 ? "billing__address-text-selected" : ""}`}>The same as the address for delivery</div>
          {load &&
            <div className="billing-address-option-loader">
              <CheckoutLoader size={50} />
            </div>
          }
        </div>
        <div className={`billing__address-option${billingAddressOption === 1 ? " billing__address-option-selected" : ""}`}
          style={{ cursor: load ? "not-allowed" : undefined }}
          onClick={!load ? handleDifferentAddress : undefined}>
          {billingAddressOption === 0 && <div>Different address for billing</div>}
          {billingAddressOption === 1 && !isBillingAddressDifferent &&
            <BillinAddressForm address={props.address} billingAddress={billingAddress!} setBillingAddress={setBillingAddress as React.Dispatch<React.SetStateAction<AddressModel>>} 
            setIsBillingAddressDifferent={setIsBillingAddressDifferent} />
          }
          {billingAddressOption === 1 && isBillingAddressDifferent && 
            <div>
              <div className="billing__address-text-selected">Different address for billing</div>
              <div className="billing__address_address-change" onClick={() => setIsBillingAddressDifferent(false)}>Change</div>
              <div className="billing__address_address">
                {billingAddress!.firstName}&nbsp;{billingAddress!.lastName}&nbsp;&#128900;&nbsp;{billingAddress!.street}
                &nbsp;{billingAddress!.number}&nbsp;&#128900;&nbsp;{billingAddress!.city}&nbsp;{billingAddress!.street}
              </div>
            </div>
          }
        </div>
      </div>
      <h3 className="shipping-payment-heading">Payment</h3>
      <div className="payment__options">
        <div className={`payment__option${paymentOption === "Mastercard" ? " payment__option-selected" : ""}`}
          onClick={() => setPaymentOption("Mastercard")}>
          <div>
            Mastercard
          </div>
          <div className="payment__option-img-container">
            <img className="payment-option-img" src={Mastercard} alt="Card" />
          </div>
        </div>
        <div className={`payment__option${paymentOption === "Visa" ? " payment__option-selected" : ""}`}
          onClick={() => setPaymentOption("Visa")}>
          <div>
            Visa
          </div>
          <div className="payment__option-img-container">
            <img className="payment-option-img" src={Visa} alt="Card" />
          </div>
        </div>
        <div className={`payment__option${paymentOption === "Cash on delivery" ? " payment__option-selected" : ""}`}
          onClick={() => setPaymentOption("Cash on delivery")}>
          <div>
            Cash on delivery
          </div>
          <div className="payment__option-img-container">
            <img className="payment-option-img" src={CashOnDelivery} alt="Card" />
          </div>
        </div>
        <div className={`payment__option${paymentOption === "Maestro" ? " payment__option-selected" : ""}`}
          onClick={() => setPaymentOption("Maestro")}>
          <div>
            Maestro
          </div>
          <div className="payment__option-img-container">
            <img className="payment-option-img" src={Maestro} alt="Card" />
          </div>
        </div>
      </div>
      <h3 className="shipping-payment-heading">Do you have a voucher?</h3>
      <div className="shipping-payment-voucher">
        <input className="checkout__input" placeholder="Voucher code" />
        <label className="checkout__label checkout__label_payment">Vocher code</label>
        <div className="shipping-payment-vaucher-add">Add</div>
      </div>
      <div className="shipping-payment-phone">
        <input className={`checkout__input${phoneError ? " checkout__input-error" : ""}${phoneSuccess ? " checkout__input-success" : ""}`} placeholder="Phone number:" value={phone} 
        onChange={handlePhoneChange} onBlur={handlePhoneBlur}/>
        <label className="checkout__label checkout__label_payment">Phone number:</label>
        {phoneError && <div className="checkout__input-error-message">{phoneError}</div>}
      </div>
      <div className="shipping-payment-mobile-cart">
        <ShippingCart cart={props.cart} changeCartItemQuantity={props.changeCartItemQuantity} removeCartItem={props.removeCartItem} />
      </div>
      <div className="shipping-payment-agree-section">
        <label className="agreenment">
          <div>
            <input className="agreenment-checkbox" type="checkbox" />
          </div>
          <div>
            I want to receive email updates about current trends, offers and vouchers. You can unsubscribe at any time completely free of charge.
          </div>
        </label>
        <label className="agreenment">
          <div>
            <input id="agree-terms" className="agreenment-checkbox" type="checkbox" onChange={handleMandatoryAgreenment} />
          </div>
          <div>
            <div>
              I agree to the <a className="agreenment-link">Terms</a> and understand the <a className="agreenment-link">Privacy Policy</a>.
            </div>
          </div>
        </label>
        {agreenmentError &&
          <div className="agreenment-error">
            This checkbox is mandatory.
          </div>
        }
      </div>
      <div className="navigation-section">
        <div>
          <Link to="/checkout/shipping" className="navigation-prev-step">
            Previous step
          </Link>
        </div>
        <div>
          <div className="navigation-pay-step" onClick={handlePayNow}>
            Pay now
          </div>
        </div>
      </div>
      <div id="fixed-scroll-navigation" className="fixed-scroll-navigation" onClick={() => window.scrollTo({ top: 790, behavior: "smooth" })}>
        <div className="fixed-scroll-navigation-text">Continue</div>
      </div>
      {payWithCard &&
        <CardModal2 paymentOption={paymentOption} setPayWithCard={setPayWithCard} paymentAmount={calculatePaymentAmount()} 
        finalizeOrder={finalizeOrder}/>
      }
    </div>
  );
}