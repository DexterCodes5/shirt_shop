import { useState } from "react";
import { CardModel } from "../../../../../../model/CardModel";
import "./CardModal.css";

export const CardModal: React.FC<{ paymentOption: string, setPayWithCard: React.Dispatch<React.SetStateAction<boolean>> }> = (props) => {
  const [card, setCard] = useState<CardModel>(new CardModel("", "", "", ""));

  const [cardNumberError, setCardNumberError] = useState("");
  const [cardholderError, setCardholderError] = useState("");
  const [exparationError, setExparationError] = useState("");
  const [cvvError, setCvvError] = useState("");

  const changeCard = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    if (name === "cardNumber") {
      if (!/^\d*| *$/.test(value)) {
        return;
      }
    }
    else if (name === "cardholder") {
      if (!/^[a-zA-Z]*[ ]*[a-zA-Z]*$/.test(value)) {
        return;
      }
    }
    else if (name === "exparation") {
      if (!/^\d{0,2}\/?\d{0,2}$/.test(value)) {
        return;
      }
    }
    else if (name === "cvv") {
      if (!/^\d{0,3}$/.test(value)) {
        return;
      }
    }

    setCard({...card, [name]: value});
  };

  const [invalidInput, setInvalidInput] = useState(false);

  const proceed = () => {
    if (!/^\d{16}$/.test(card.cardNumber.replaceAll(" ", ""))) {
      setCardNumberError("Card number is invalid");
    }
    else {
      setCardNumberError("");
    }
    if (!/^[a-zA-Z]+ [a-zA-Z]+$/.test(card.cardholder)) {
      setCardholderError("Name on card is invalid");
    }
    else {
      setCardholderError("");
    }
    if (!/^\d{2}\/\d{2}$/.test(card.exparation)) {
      setExparationError("Exparation is invalid");
    }
    else {
      setExparationError("");
    }
    if (!/^\d{3}$/.test(card.cvv)) {
      setCvvError("CVV is invalid");
    }
    else {
      setCvvError("");
    }

    if (!/^\d{16}$/.test(card.cardNumber.replaceAll(" ", ""))) {
      return;
    }
    else if (!/^[a-zA-Z]+ [a-zA-Z]+$/.test(card.cardholder)) {
      return;
    }
    else if (!/^\d{2}\/\d{2}$/.test(card.exparation)) {
      return;
    }
    else if (!/^\d{3}$/.test(card.cvv)) {
      return;
    }

    const url = `${process.env.REACT_APP_API}`;
  };

  console.log(card);
  return (
    <div className="pay-with-card">
      <div className="card-modal">
        <div className="visa-card-container">
          <img className="visa-card" src={require("../../../../../../Images/cards/visa-business-credit.png")} alt="Card" />
        </div>
        <h3 className="card-modal-heading">{props.paymentOption}</h3>
        {invalidInput &&
          <div className="card-modal-invalid-input">Invalid input</div>
        }
        <div className="card-modal-col">
          <div className="card-modal-label">Card Number</div>
          <input className={`card-modal-input${cardNumberError ? " card-modal-input-error" : ""}`} type="text" name="cardNumber" value={card?.cardNumber} onChange={changeCard} />
          {cardNumberError && <div className="card-modal-error-text">* {cardNumberError}</div>}
        </div>
        <div className="card-modal-col">
          <div className="card-modal-label">Name on card</div>
          <input className={`card-modal-input${cardholderError ? " card-modal-input-error" : ""}`} type="text" name="cardholder" 
          value={card.cardholder} onChange={changeCard} />
          {cardholderError && <div className="card-modal-error-text">* {cardholderError}</div>}
        </div>
        <div className="card-modal-row">
          <div className="card-modal-col">
            <div className="card-modal-label">Exparation MM/YY</div>
            <input className={`card-modal-input${exparationError ? " card-modal-input-error" : ""}`} type="text" name="exparation" 
            value={card.exparation} onChange={changeCard} />
            {exparationError && <div className="card-modal-error-text">* {exparationError}</div>}
          </div>
          <div className="card-modal-col">
            <div className="card-modal-label">CVV code</div>
            <input className={`card-modal-input${cvvError ? " card-modal-input-error" : ""}`} type="text" name="cvv" 
            value={card.cvv} onChange={changeCard} />
            {cvvError && <div className="card-modal-error-text">* {cvvError}</div>}
          </div>
        </div>
        <div className="card-modal-btn-container">
          <button className="card-modal-cancel-btn" onClick={() => props.setPayWithCard(false)}>Cancel</button>
          <button className="card-modal-btn" onClick={proceed}>Proceed</button>
        </div>
      </div>
    </div>

  );
};