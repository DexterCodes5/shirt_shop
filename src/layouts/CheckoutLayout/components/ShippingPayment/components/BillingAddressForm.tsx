import "./BillingAddressForm.css";
import { useEffect, useRef, useState } from "react";
import { AddressModel } from "../../../../../model/AddressModel";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

export const BillinAddressForm: React.FC<{
  address: AddressModel,
  billingAddress: AddressModel, setBillingAddress: React.Dispatch<React.SetStateAction<AddressModel>>,
  setIsBillingAddressDifferent: React.Dispatch<React.SetStateAction<boolean>>
}> = (props) => {
  const [showModal, setShowModal] = useState(false);
  const [emptyAddressBook, setEmptyAddressBook] = useState(false);
  const [selectAddress, setSelectAddress] = useState(0);

  const [showGenderDropdownMenu, setShowGenderDropdownMenu] = useState(false);

  const [firstNameError, setFirstNameError] = useState(false);
  const [firstNameSuccess, setFirstNameSuccess] = useState(false);
  const [firstNameErrorMessage, setFirstNameErrorMessage] = useState("");

  const [lastNameError, setLastNameError] = useState(false);
  const [lastNameSuccess, setLastNameSuccess] = useState(false);
  const [lastNameErrorMessage, setLastNameErrorMessage] = useState("");

  const [cityError, setCityError] = useState(false);
  const [citySuccess, setCitySuccess] = useState(false);
  const [cityErrorMessage, setCityErrorMessage] = useState("");

  const [postcodeError, setPostcodeError] = useState(false);
  const [postcodeSuccess, setPostcodeSuccess] = useState(false);
  const [postcodeErrorMessage, setPostcodeErrorMessage] = useState("");

  const [streetError, setStreetError] = useState(false);
  const [streetSuccess, setStreetSuccess] = useState(false);
  const [streetErrorMessage, setStreetErrorMessage] = useState("");

  const [numberError, setNumberError] = useState(false);
  const [numberSuccess, setNumberSuccess] = useState(false);
  const [numberErrorMessage, setNumberErrorMessage] = useState("");

  const [additionalInformationError, setAdditionalInformationError] = useState(false);
  const [additionalInformationSuccess, setAdditionalInformationSuccess] = useState(false);
  const [additionalInformationErrorMessage, setAdditionalInformationErrorMessage] = useState("");


  const dropdown = useRef<HTMLDivElement>(null);
  const dropdownMenu = useRef<HTMLUListElement>(null);

  const closeDropdown = (e: any) => {
    if (dropdown.current && showGenderDropdownMenu && !dropdown.current?.contains(e.target) && !dropdownMenu.current!.contains(e.target)) {
      setShowGenderDropdownMenu(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", closeDropdown);
    return () => {
      document.removeEventListener("mousedown", closeDropdown);
    }
  }, [showGenderDropdownMenu]);

  const handleModalClose = () => {
    setSelectAddress(0);
    setShowModal(false);
  };

  const handleModalChoose = () => {
    props.setBillingAddress(props.address)
    setShowModal(false);
  }

  const changeGender = (newGender: string) => {
    props.setBillingAddress(prevAddress => ({ ...prevAddress, gender: newGender }));
    setShowGenderDropdownMenu(false);
  };

  const changeAddressText = (e: React.ChangeEvent<HTMLInputElement>, setError: React.Dispatch<React.SetStateAction<boolean>>,
    setSuccess: React.Dispatch<React.SetStateAction<boolean>>, setErrorMessage: React.Dispatch<React.SetStateAction<string>>) => {
    const { name, value } = e.target;

    if (name === "street") {
      if (value && !(/^[a-zA-Z\d ,.'"]+$/.test(value))) {
        setError(true);
        setSuccess(false);
        setErrorMessage(`${e.target.placeholder} is invalid`);
      }
      else {
        setError(false);
        setSuccess(true);
        setErrorMessage("");
      }
    }
    else if (name === "additionalInformation") {
      if (value && !(/^[a-zA-Z\d ,.'"?!]+$/.test(value))) {
        setError(true);
        setSuccess(false);
        setErrorMessage(`${e.target.placeholder} is invalid`);
      }
      else {
        setError(false);
        setSuccess(true);
        setErrorMessage("");
      }
    }
    else if (value && !(/^[a-zA-Z ]+$/.test(value))) { // check to see if value contains a non letter
      setError(true);
      setSuccess(false);
      setErrorMessage(`${e.target.placeholder} is invalid`);
    }
    else {
      setError(false);
      setSuccess(true);
      setErrorMessage("");
    }

    props.setBillingAddress(prevAddress => ({ ...prevAddress, [name]: value }));
  };

  const handleTextInputBlur = (e: React.FocusEvent<HTMLInputElement>, setError: React.Dispatch<React.SetStateAction<boolean>>,
    setSuccess: React.Dispatch<React.SetStateAction<boolean>>, setErrorMessage: React.Dispatch<React.SetStateAction<string>>) => {

    if (e.target.name === "dateOfBirth") {
      const dateOfBirthPure = e.target.value.replaceAll("_", "").replaceAll(".", "");
      if (dateOfBirthPure.length === 0) {
        setError(true);
        setSuccess(false);
        setErrorMessage(`${e.target.placeholder} is mandatory`);
      }
    }
    else if (e.target.value === "") {
      setError(true);
      setSuccess(false);
      setErrorMessage(`${e.target.placeholder} is mandatory`);
    }
  };

  const changeAddressNumber = (e: React.ChangeEvent<HTMLInputElement>, setError: React.Dispatch<React.SetStateAction<boolean>>,
    setSuccess: React.Dispatch<React.SetStateAction<boolean>>, setErrorMessage: React.Dispatch<React.SetStateAction<string>>) => {

    const { name, value } = e.target;
    if (value && !(/^[\d]+$/.test(value))) {
      return;
    }
    if (value) {
      setError(false);
      setSuccess(true);
      setErrorMessage("");
    }
    props.setBillingAddress(prevAddress => ({ ...prevAddress, [name]: value }));
  }

  const save = () => {
    const firstNameInput = document.getElementById("first-name-input") as HTMLInputElement;
    const lastNameInput = document.getElementById("last-name-input") as HTMLInputElement;
    const cityInput = document.getElementById("city-input") as HTMLInputElement;
    const postcodeInput = document.getElementById("postcode-input") as HTMLInputElement;
    const streetInput = document.getElementById("street-input") as HTMLInputElement;
    const numberInput = document.getElementById("number-input") as HTMLInputElement;
    const additionalInformationInput = document.getElementById("additional-information-input") as HTMLInputElement;

    if (firstNameInput.value.length === 0) {
      setFirstNameError(true);
      setFirstNameErrorMessage(`${firstNameInput.placeholder} is mandatory`);
      firstNameInput.focus();
      window.scrollTo({
        top: 440,
        left: 0,
        behavior: "smooth"
      });
      return;
    }
    else if (firstNameError) {
      firstNameInput.focus();
      window.scrollTo({
        top: 440,
        left: 0,
        behavior: "smooth"
      });
      return;
    }
    else if (lastNameInput.value.length === 0) {
      setLastNameError(true);
      setLastNameErrorMessage(`${lastNameInput.placeholder} is mandatory`);
      lastNameInput.focus();
      window.scrollTo({
        top: 440,
        left: 0,
        behavior: "smooth"
      });
      return;
    }
    else if (lastNameError) {
      lastNameInput.focus();
      window.scrollTo({
        top: 440,
        left: 0,
        behavior: "smooth"
      });
      return;
    }
    else if (cityInput.value.length === 0) {
      setCityError(true);
      setCityErrorMessage(`${cityInput.placeholder} is mandatory`);
      cityInput.focus();
      window.scrollTo({
        top: 500,
        left: 0,
        behavior: "smooth"
      });
      return;
    }
    else if (cityError) {
      cityInput.focus();
      window.scrollTo({
        top: 500,
        left: 0,
        behavior: "smooth"
      });
      return;
    }
    else if (postcodeInput.value.length === 0) {
      setPostcodeError(true);
      setPostcodeErrorMessage(`${postcodeInput.placeholder} is mandatory`);
      postcodeInput.focus();
      window.scrollTo({
        top: 500,
        left: 0,
        behavior: "smooth"
      });
      return;
    }
    else if (postcodeError) {
      postcodeInput.focus();
      window.scrollTo({
        top: 500,
        left: 0,
        behavior: "smooth"
      });
      return;
    }
    else if (streetInput.value.length === 0) {
      setStreetError(true);
      setStreetErrorMessage(`${streetInput.placeholder} is mandatory`)
      streetInput.focus();
      window.scrollTo({
        top: 600,
        left: 0,
        behavior: "smooth"
      });
      return;
    }
    else if (streetError) {
      streetInput.focus();
      window.scrollTo({
        top: 600,
        left: 0,
        behavior: "smooth"
      });
      return;
    }
    else if (numberInput.value.length === 0) {
      setNumberError(true);
      setNumberErrorMessage(`${numberInput.placeholder} is mandatory`);
      numberInput.focus();
      window.scrollTo({
        top: 600,
        left: 0,
        behavior: "smooth"
      });
      return;
    }
    else if (numberError) {
      numberInput.focus();
      window.scrollTo({
        top: 600,
        left: 0,
        behavior: "smooth"
      });
      return;
    }
    else if (additionalInformationError) {
      additionalInformationInput.focus();
      window.scrollTo({
        top: 600,
        left: 0,
        behavior: "smooth"
      });
      return;
    }
    
    props.setIsBillingAddressDifferent(true);
  };

  return (
    <>
      <div className="billing-address_row">
        <div className="billing__address-text-selected">Different address for billing</div>
        <div className="address_book" onClick={() => setShowModal(true)}>Address book</div>
      </div>
      {showModal &&
        <div className="address__book-modal">
          <div className="address__book-modal-content">
            <h3 className="address__book-heading">Choose billing address</h3>
            {emptyAddressBook ?
              <div className="address__book-empty">You address book is empty</div>
              :
              <div className="address__book-full">
                <div className={`address__book-address${selectAddress ? " address__book-address-selected" : ""}`} 
                onClick={e => setSelectAddress(1)}>
                  <div className="address__book-address-delete" onClick={e => setEmptyAddressBook(true)}>Delete</div>
                  <div>{props.address.firstName}&nbsp;{props.address.lastName}</div>
                  <div>{props.address.street}&nbsp;{props.address.number}</div>
                  <div>{props.address.city}&nbsp;{props.address.postcode}</div>
                </div>
              </div>
            }
            <div className="address__book-modal-bottom">
              <div className="address__book-modal-cancel-btn" onClick={handleModalClose}>
                Cancel
              </div>
              {selectAddress === 0 ?
                <div className="address__book-modal-choose-btn address__book-modal-choose-btn-disabled">
                  Choose
                </div>
                :
                <div className="address__book-modal-choose-btn" onClick={handleModalChoose}>
                  Choose
                </div>
              }
            </div>
          </div>
        </div>
      }
      <div className="form__row">
        <div className="select__gender_container">
          <div className="select__gender" style={{ borderColor: showGenderDropdownMenu ? "var(--primary-color)" : undefined }}
            onClick={() => setShowGenderDropdownMenu(!showGenderDropdownMenu)} ref={dropdown}>
            <div>{props.billingAddress.gender}</div>
            <FontAwesomeIcon className="select__gender_chevron" icon={faChevronDown} />
          </div>
          <ul className="select__gender_menu" style={{
            height: showGenderDropdownMenu ? undefined : 0,
            borderColor: showGenderDropdownMenu ? "var(--light-grey)" : undefined
          }} ref={dropdownMenu}>
            <li className={props.billingAddress.gender === "Mr" ? "select__gender_menu_item_selected" : undefined}
              onClick={() => changeGender("Mr")}>
              Mr
            </li>
            <li className={props.billingAddress.gender === "Ms" ? "select__gender_menu_item_selected" : undefined}
              onClick={() => changeGender("Ms")}>
              Ms
            </li>
            <li className={props.billingAddress.gender === "Other" ? "select__gender_menu_item_selected" : undefined}
              onClick={() => changeGender("Other")}>
              Other
            </li>
          </ul>
        </div>
      </div>
      <div className="form__row">
        <div className="form__row-col">
          <div className="form__row_field-container">
            <input id="first-name-input" className={"checkout__input" + (firstNameError ? " checkout__input-error" : "")
              + (firstNameSuccess ? " checkout__input-success" : "")} type="text" placeholder="First name" name="firstName"
              autoComplete="stop"
              value={props.billingAddress.firstName} onChange={e => changeAddressText(e, setFirstNameError, setFirstNameSuccess, setFirstNameErrorMessage)}
              onBlur={(e) => handleTextInputBlur(e, setFirstNameError, setFirstNameSuccess, setFirstNameErrorMessage)} />
            <label className="checkout__label">First name</label>
            {firstNameErrorMessage &&
              <div className="checkout__input-error-message">{firstNameErrorMessage}</div>
            }
          </div>
        </div>
        <div className="form__row-col">
          <div className="form__row_field-container">
            <input id="last-name-input" className={"checkout__input" + (lastNameError ? " checkout__input-error" : "")
              + (lastNameSuccess ? " checkout__input-success" : "")} type="text" placeholder="Last name" name="lastName"
              autoComplete="stop"
              value={props.billingAddress.lastName} onChange={e => changeAddressText(e, setLastNameError, setLastNameSuccess, setLastNameErrorMessage)}
              onBlur={(e) => handleTextInputBlur(e, setLastNameError, setLastNameSuccess, setLastNameErrorMessage)} />
            <label className="checkout__label">Last name</label>
            {lastNameErrorMessage &&
              <div className="checkout__input-error-message">{lastNameErrorMessage}</div>
            }
          </div>
        </div>
      </div>
      <div className="form__row">
        <div className="form__row-col">
          <div className="form__row_field-container">
            <input id="city-input" className={"checkout__input" + (cityError ? " checkout__input-error" : "")
              + (citySuccess ? " checkout__input-success" : "")} type="text" placeholder="City" name="city" value={props.billingAddress.city}
              autoComplete="stop"
              onChange={e => changeAddressText(e, setCityError, setCitySuccess, setCityErrorMessage)}
              onBlur={e => handleTextInputBlur(e, setCityError, setCitySuccess, setCityErrorMessage)} />
            <label className="checkout__label">City</label>
            {cityErrorMessage &&
              <div className="checkout__input-error-message">{cityErrorMessage}</div>
            }
          </div>
        </div>
        <div className="form__row-col" style={{ flex: "0.5 1 50px" }}>
          <div className="form__row_field-container">
            <input id="postcode-input" className={"checkout__input checkout__input-numeric"
              + (postcodeError ? " checkout__input-error" : "") + (postcodeSuccess ? " checkout__input-success" : "")}
              placeholder="Postcode" name="postcode" value={props.billingAddress.postcode}
              autoComplete="stop"
              onChange={e => changeAddressNumber(e, setPostcodeError, setPostcodeSuccess, setPostcodeErrorMessage)}
              onBlur={e => handleTextInputBlur(e, setPostcodeError, setPostcodeSuccess, setPostcodeErrorMessage)} />
            <label className="checkout__label">Postcode</label>
            {postcodeErrorMessage &&
              <div className="checkout__input-error-message">{postcodeErrorMessage}</div>
            }
          </div>
        </div>
      </div>
      <div className="form__row">
        <div className="form__row-col">
          <div className="form__row_field-container">
            <input id="street-input" className={"checkout__input" + (streetError ? " checkout__input-error" : "")
              + (streetSuccess ? " checkout__input-success" : "")} type="text" placeholder="Street" name="street"
              value={props.billingAddress.street}
              autoComplete="stop"
              onChange={e => changeAddressText(e, setStreetError, setStreetSuccess, setStreetErrorMessage)}
              onBlur={e => handleTextInputBlur(e, setStreetError, setStreetSuccess, setStreetErrorMessage)} />
            <label className="checkout__label">Street</label>
            {streetErrorMessage &&
              <div className="checkout__input-error-message">{streetErrorMessage}</div>
            }
          </div>
        </div>
        <div className="form__row-col" style={{ flex: "0.3 1 50px" }}>
          <div className="form__row_field-container">
            <input id="number-input" className={"checkout__input checkout__input-numeric" + (numberError ? " checkout__input-error" : "")
              + (numberSuccess ? " checkout__input-success" : "")} type="number" placeholder="Number" name="number"
              autoComplete="stop"
              value={props.billingAddress.number} onChange={e => changeAddressNumber(e, setNumberError, setNumberSuccess, setNumberErrorMessage)}
              onBlur={e => handleTextInputBlur(e, setNumberError, setNumberSuccess, setNumberErrorMessage)} />
            <label className="checkout__label">Number</label>
            {numberErrorMessage &&
              <div className="checkout__input-error-message">{numberErrorMessage}</div>
            }
          </div>
        </div>
      </div>
      <div className="form__row">
        <div className="form__row-col">
          <div className="form__row_field-container">
            <input id="additional-information-input" className={"checkout__input" + (additionalInformationSuccess ? " checkout__input-success" : "")} type="text"
              placeholder="Additional information (Optional)" name="additionalInformation" value={props.billingAddress.additionalInformation}
              autoComplete="stop"
              onChange={e => changeAddressText(e, setAdditionalInformationError, setAdditionalInformationSuccess,
                setAdditionalInformationErrorMessage)} />
            <label className="checkout__label checkout__label-long">Additional information (Optional)</label>
            {additionalInformationErrorMessage &&
              <div className="checkout__input-error-message">{additionalInformationErrorMessage}</div>
            }
          </div>
        </div>
      </div>
      <div className="form__continue_container">
        <a className="form__continue_btn-billing" onClick={save}>Save</a>
      </div>
    </>
  );
};