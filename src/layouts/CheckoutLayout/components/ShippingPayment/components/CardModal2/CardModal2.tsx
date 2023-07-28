import { CardCvcElement, CardExpiryElement, CardNumberElement, useElements, useStripe } from "@stripe/react-stripe-js";
import "./CardModal2.css";
import { useMemo, useState } from "react";
import { PaymentInfoModel } from "../../../../../../model/PaymentInfoModel";
import { useAuth0 } from "@auth0/auth0-react";
import { CustomerOrderRequest } from "../../../../../../model/CustomerOrderRequest";
import { useNavigate } from "react-router-dom";

const useOptions = () => {
  const options = useMemo(() => ({
    style: {
      base: {
        fontFamily: "Lato, Arial, Helvetica, sans-serif",
        "::placeholder": {
          color: "#aab7c4"
        }
      },
      invalid: {
        color: "black"
      },

    }
  }), []);

  return options;
}

export const CardModal2: React.FC<{
  paymentOption: string, setPayWithCard: React.Dispatch<React.SetStateAction<boolean>>,paymentAmount: number,
  finalizeOrder: Function
}> = (props) => {
  const stripe = useStripe();
  const elements = useElements();
  const options = useOptions();

  const [isProcessing, setProcessingTo] = useState(false);
  const [checkoutError, setCheckoutError] = useState("");

  const auth0 = useAuth0();
  const navigate = useNavigate();

  const handleCardDetailsChange = (event: any) => {
    event.error ? setCheckoutError(event.error.message) : setCheckoutError("");
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault()

    const url = `${process.env.REACT_APP_API}/customer-order/secure/payment-intent`;
    const accessToken = await auth0.getAccessTokenSilently();
    const requestOptions = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(new PaymentInfoModel(Math.round(props.paymentAmount * 100), "BGN", auth0.user?.email!))
    };
    
    const response = await fetch(url, requestOptions);
    const repsonseJson = await response.json();
    
    setProcessingTo(true);

    const confirmedCardPayment = await stripe!.confirmCardPayment(
      repsonseJson.client_secret, {
        payment_method: {
          card: elements?.getElement(CardNumberElement)!,
          billing_details: {
            email: auth0.user?.email
          }
        }
    }, { handleActions: false });

    if (confirmedCardPayment.error) {
      setCheckoutError(confirmedCardPayment.error.message!);
      setProcessingTo(false);
      return;
    }

    props.finalizeOrder();
  }

  return (
    <div className="pay-with-card">
      <div className="card-modal">
        <div className="visa-card-container">
          <img className="visa-card" src={require("../../../../../../Images/cards/visa-business-credit.png")} alt="Card" />
        </div>
        <h3 className="card-modal-heading">{props.paymentOption}</h3>
        <form onSubmit={handleSubmit} >
          <div className="card-modal-col">
            <div className="card-modal-label">Card number</div>
            <CardNumberElement options={options} onChange={handleCardDetailsChange} />
          </div>
          <div className="card-modal-col">
            <div className="card-modal-label">Expiration date</div>
            <CardExpiryElement options={options} onChange={handleCardDetailsChange} />
          </div>
          <div className="card-modal-col">
            <div className="card-modal-label">CVC</div>
            <CardCvcElement options={options} onChange={handleCardDetailsChange} />
          </div>
          <div className="card-modal-btn-container">
            <button className="card-modal-cancel-btn">Cancel</button>
            <button className="card-modal-proceed" type="submit" disabled={isProcessing || !stripe}>Proceed</button>
          </div>
        </form>
      </div>
    </div>

  );
};