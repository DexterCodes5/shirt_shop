import { faBuilding, faChevronDown, faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef, useState } from "react";
import "./ShippingDelivery.css";
import { AddressModel } from "../../../../model/AddressModel";
import { useNavigate } from "react-router-dom";
import { useRenderCheckoutLayout } from "../../CheckoutLayout";
import { useAuth0 } from "@auth0/auth0-react";

export const ShippingDelivery: React.FC<{
  address: AddressModel, setAddress: React.Dispatch<React.SetStateAction<AddressModel>>
}> = (props) => {
  const [deliveryOption, setDeliveryOption] = useState("Delivery to home");

  const [showModal, setShowModal] = useState(false);

  // Form state
  const [address, setAddress] = useState<AddressModel>(props.address);
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

  const [dateOfBirthError, setDateOfBirthError] = useState(false);
  const [dateOfBirthSuccess, setDateOfBirthSuccess] = useState(false);
  const [dateOfBirthErrorMessage, setDateOfBirthErrorMessage] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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

  const changeGender = (newGender: string) => {
    setAddress(prevAddress => ({ ...prevAddress, gender: newGender }));
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

    setAddress(prevAddress => ({ ...prevAddress, [name]: value }));
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
    setAddress(prevAddress => ({ ...prevAddress, [name]: value }));
  }

  // DATE OF BIRTH
  const [dateOfBirthCursor, setDateOfBirthCursor] = useState(0);
  const [dateOfBirthAdjustCursor, setDateOFBirthAdjustCursor] = useState(false);

  const changeAddressDateOfBirth = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    let newPos = e.currentTarget.selectionStart!;
    if (value && !(/^[\d._]+$/.test(value))) {
      setDateOFBirthAdjustCursor(!dateOfBirthAdjustCursor);
      return;
    }

    if (newPos === 2) {
      newPos = 3;
    }
    else if (newPos === 5) {
      newPos = 6;
    }
    setDateOfBirthCursor(newPos);

    const dateOfBirthFormat = "__.__.____";
    let dateOfBirthPure = value.replaceAll("_", "").replaceAll(".", "");
    const dateOfBirthPureWithDots = getDateOfBirthPureWithDots(dateOfBirthPure);

    if (dateOfBirthPureWithDots.length === 10) {
      // Validate Date of Year
      const [day, month, year] = dateOfBirthPureWithDots.split(".");
      const dayNum = Number(day);
      const monthNum = Number(month);
      const yearNum = Number(year);
      const currYear = new Date().getFullYear();
      if (dayNum === 0
        || ((monthNum === 1 || monthNum === 3 || monthNum === 5 || monthNum === 7 || monthNum === 8
          || monthNum === 10 || monthNum == 12) && dayNum > 31)
        || (monthNum === 2 && ((yearNum % 4 === 0 && yearNum % 100 !== 0) || yearNum % 400 === 0) && dayNum > 29)
        || (monthNum === 2 && !((yearNum % 4 === 0 && yearNum % 100 !== 0) || yearNum % 400 === 0) && dayNum > 28)
        || ((monthNum === 4 || monthNum === 6 || monthNum === 9 || monthNum === 11) && dayNum > 30)) {
        setDateOfBirthError(true);
        setDateOfBirthSuccess(false);
        setDateOfBirthErrorMessage(`${e.currentTarget.placeholder} is invalid`);
      }
      else if (monthNum === 0 || monthNum > 12) {
        setDateOfBirthError(true);
        setDateOfBirthSuccess(false);
        setDateOfBirthErrorMessage(`${e.currentTarget.placeholder} is invalid`);
      }
      else if (yearNum === 0 || yearNum < currYear - 80) {
        setDateOfBirthError(true);
        setDateOfBirthSuccess(false);
        setDateOfBirthErrorMessage(`${e.currentTarget.placeholder} is invalid`);
      }
      else {
        setDateOfBirthError(false);
        setDateOfBirthSuccess(true);
        setDateOfBirthErrorMessage("");
      }
    }
    else if (dateOfBirthPureWithDots.length > 10) {
      return;
    }
    else {
      setDateOfBirthError(true);
      setDateOfBirthSuccess(false);
      setDateOfBirthErrorMessage(`${e.currentTarget.placeholder} is invalid`);
    }

    const res = dateOfBirthPureWithDots + dateOfBirthFormat.substring(dateOfBirthPureWithDots.length);
    // setDateOfBirth(res);
    setAddress({ ...address, dateOfBirth: res });
  }

  useEffect(() => {
    const input = document.getElementById("date-of-birth-input") as HTMLInputElement;
    input.setSelectionRange(dateOfBirthCursor, dateOfBirthCursor);
  }, [address.dateOfBirth, dateOfBirthAdjustCursor]);

  const handleDateOfBirthInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    let newPos = e.currentTarget.selectionStart!;

    if (e.key === "ArrowRight") {
      const dateOfBirthPure = e.currentTarget.value.replaceAll("_", "").replaceAll(".", "");
      const dateOfBirthPureWithDots = getDateOfBirthPureWithDots(dateOfBirthPure);

      if (newPos >= dateOfBirthPureWithDots.length) {
        e.currentTarget.setSelectionRange(dateOfBirthPureWithDots.length - 1, dateOfBirthPureWithDots.length - 1);
      }
      return;
    }

    if (e.key === "Backspace") {
      if (newPos === 3) {
        newPos = 2;
      }
      else if (newPos === 6) {
        newPos = 5;
      }

      e.currentTarget.setSelectionRange(newPos, newPos);
    }
  }

  const handleDateOfBirthInputClick = (e: React.MouseEvent<HTMLInputElement>) => {
    const newPos = e.currentTarget.selectionStart!;

    const dateOfBirthPure = e.currentTarget.value.replaceAll("_", "").replaceAll(".", "");
    const dateOfBirthPureWithDots = getDateOfBirthPureWithDots(dateOfBirthPure);

    if (newPos >= dateOfBirthPureWithDots.length) {
      e.currentTarget.setSelectionRange(dateOfBirthPureWithDots.length, dateOfBirthPureWithDots.length);
    }
  }

  const getDateOfBirthPureWithDots = (dateOfBirthPure: string) => {
    let dateOfBirthPureWithDots = "";
    if (dateOfBirthPure.length > 4) {
      dateOfBirthPureWithDots = dateOfBirthPure.slice(0, 2) + "." + dateOfBirthPure.slice(2, 4) + "." + dateOfBirthPure.slice(4);
    }
    else if (dateOfBirthPure.length > 2) {
      dateOfBirthPureWithDots = dateOfBirthPure.slice(0, 2) + "." + dateOfBirthPure.slice(2);
    }
    else {
      dateOfBirthPureWithDots = dateOfBirthPure;
    }
    return dateOfBirthPureWithDots;
  }

  // CONTINUE TO PAYMENT
  const navigate = useNavigate();
  const auth0 = useAuth0();

  const continueToPayment = async () => {
    const firstNameInput = document.getElementById("first-name-input") as HTMLInputElement;
    const lastNameInput = document.getElementById("last-name-input") as HTMLInputElement;
    const cityInput = document.getElementById("city-input") as HTMLInputElement;
    const postcodeInput = document.getElementById("postcode-input") as HTMLInputElement;
    const streetInput = document.getElementById("street-input") as HTMLInputElement;
    const numberInput = document.getElementById("number-input") as HTMLInputElement;
    const additionalInformationInput = document.getElementById("additional-information-input") as HTMLInputElement;
    const dateOfBirthInput = document.getElementById("date-of-birth-input") as HTMLInputElement;

    if (firstNameInput.value.length === 0) {
      setFirstNameError(true);
      setFirstNameErrorMessage(`${firstNameInput.placeholder} is mandatory`);
      firstNameInput.focus();
      window.scrollTo({
        top: 220,
        left: 0,
        behavior: "smooth"
      });
      return;
    }
    else if (firstNameError) {
      firstNameInput.focus();
      window.scrollTo({
        top: 220,
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
        top: 220,
        left: 0,
        behavior: "smooth"
      });
      return;
    }
    else if (lastNameError) {
      lastNameInput.focus();
      window.scrollTo({
        top: 220,
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
        top: 250,
        left: 0,
        behavior: "smooth"
      });
      return;
    }
    else if (cityError) {
      cityInput.focus();
      window.scrollTo({
        top: 250,
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
        top: 250,
        left: 0,
        behavior: "smooth"
      });
      return;
    }
    else if (postcodeError) {
      postcodeInput.focus();
      window.scrollTo({
        top: 250,
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
        top: 280,
        left: 0,
        behavior: "smooth"
      });
      return;
    }
    else if (streetError) {
      streetInput.focus();
      window.scrollTo({
        top: 280,
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
        top: 280,
        left: 0,
        behavior: "smooth"
      });
      return;
    }
    else if (numberError) {
      numberInput.focus();
      window.scrollTo({
        top: 280,
        left: 0,
        behavior: "smooth"
      });
      return;
    }
    else if (additionalInformationError) {
      additionalInformationInput.focus();
      window.scrollTo({
        top: 310,
        left: 0,
        behavior: "smooth"
      });
      return;
    }
    else if (dateOfBirthInput.value.length === 0) {
      setDateOfBirthError(true);
      setDateOfBirthErrorMessage(`${dateOfBirthInput.placeholder} is mandatory`);
      dateOfBirthInput.focus();
      window.scrollTo({
        top: 330,
        left: 0,
        behavior: "smooth"
      });
      return;
    }
    else if (dateOfBirthError) {
      dateOfBirthInput.focus();
      window.scrollTo({
        top: 330,
        left: 0,
        behavior: "smooth"
      });
      return;
    }

    address.userEmail = auth0.user?.email!;
    props.setAddress(address);
    navigate("/checkout/payment");
  };

  const { renderCheckoutLayout, setRenderCheckoutLayout } = useRenderCheckoutLayout();
  useEffect(() => {
    setRenderCheckoutLayout(!renderCheckoutLayout);

    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth"
    });
  }, []);

  return (
    <div className="shipping-page">
      <h3 className="checkout-heading">Delivery details</h3>
      <h4 className="shipping-page-delivery-where">Where to deliver?</h4>
      <div className="shipDel__btns-container">
        <div className={"shipDel__btn" + (deliveryOption === "Delivery to home" ? " shipDel__btn-selected" : "")}
          onClick={() => setDeliveryOption("Delivery to home")}>
          <FontAwesomeIcon className="shipDel__btn-icon" icon={faLocationDot} />
          <div>
            Delivery to home
          </div>
        </div>
        <div className={"shipDel__btn" + (deliveryOption === "Office of Econt" ? " shipDel__btn-selected" : "")}
          onClick={() => setDeliveryOption("Office of Econt")}>
          <FontAwesomeIcon className="shipDel__btn-icon" icon={faBuilding} />
          <div>
            Office of Econt
          </div>
        </div>
      </div>
      {deliveryOption === "Delivery to home" ?
        <form>
          <div className="address_row">
            <h4 className="address_title">Address of delivery</h4>
            <div className="address_book" onClick={() => setShowModal(true)}>Address book</div>
          </div>
          {showModal &&
            <div className="address__book-modal">
              <div className="address__book-modal-content">
                <h3>Choose address for delivery</h3>
                <div className="address__book">
                  <p>
                    Your address book is empty
                  </p>
                </div>
                <div className="address__book-modal-bottom">
                  <div className="address__book-modal-cancel-btn" onClick={() => setShowModal(false)}>
                    Cancel
                  </div>
                  <div className="address__book-modal-choose-btn address__book-modal-choose-btn-disabled">
                    Choose
                  </div>
                </div>
              </div>
            </div>
          }
          <div className="form__row">
            <div className="select__gender_container">
              <div className="select__gender" style={{ borderColor: showGenderDropdownMenu ? "var(--primary-color)" : undefined }}
                onClick={() => setShowGenderDropdownMenu(!showGenderDropdownMenu)} ref={dropdown}>
                <div>{address.gender}</div>
                <FontAwesomeIcon className="select__gender_chevron" icon={faChevronDown} />
              </div>
              <ul className="select__gender_menu" style={{
                height: showGenderDropdownMenu ? undefined : 0,
                borderColor: showGenderDropdownMenu ? "var(--light-grey)" : undefined
              }} ref={dropdownMenu}>
                <li className={address.gender === "Mr" ? "select__gender_menu_item_selected" : undefined}
                  onClick={() => changeGender("Mr")}>
                  Mr
                </li>
                <li className={address.gender === "Ms" ? "select__gender_menu_item_selected" : undefined}
                  onClick={() => changeGender("Ms")}>
                  Ms
                </li>
                <li className={address.gender === "Other" ? "select__gender_menu_item_selected" : undefined}
                  onClick={() => changeGender("Other")}>
                  Other
                </li>
              </ul>
            </div>
          </div>
          <div className="form__row">
            <div className="form__row-col">
              <div className="form__row_field-container">
                <div className="form__row_input_container">
                  <input id="first-name-input" className={"checkout__input" + (firstNameError ? " checkout__input-error" : "")
                    + (firstNameSuccess ? " checkout__input-success" : "")} type="text" placeholder="First name" name="firstName"
                    autoComplete="stop"
                    value={address.firstName} onChange={e => changeAddressText(e, setFirstNameError, setFirstNameSuccess,
                      setFirstNameErrorMessage)}
                    onBlur={(e) => handleTextInputBlur(e, setFirstNameError, setFirstNameSuccess, setFirstNameErrorMessage)} />
                  <label className="checkout__label">First name</label>
                </div>
                {firstNameErrorMessage &&
                  <div className="checkout__input-error-message">{firstNameErrorMessage}</div>
                }
              </div>
            </div>
            <div className="form__row-col">
              <div className="form__row_field-container">
                <div className="form__row_input_container">
                  <input id="last-name-input" className={"checkout__input" + (lastNameError ? " checkout__input-error" : "")
                    + (lastNameSuccess ? " checkout__input-success" : "")} type="text" placeholder="Last name" name="lastName"
                    autoComplete="stop"
                    value={address.lastName} onChange={e => changeAddressText(e, setLastNameError, setLastNameSuccess, setLastNameErrorMessage)}
                    onBlur={(e) => handleTextInputBlur(e, setLastNameError, setLastNameSuccess, setLastNameErrorMessage)} />
                  <label className="checkout__label">Last name</label>
                </div>
                {lastNameErrorMessage &&
                  <div className="checkout__input-error-message">{lastNameErrorMessage}</div>
                }
              </div>
            </div>
          </div>
          <div className="form__row">
            <div className="form__row-col">
              <div className="form__row_field-container">
                <div className="form__row_input_container">
                  <input id="city-input" className={"checkout__input" + (cityError ? " checkout__input-error" : "")
                    + (citySuccess ? " checkout__input-success" : "")} type="text" placeholder="City" name="city" value={address.city}
                    autoComplete="stop"
                    onChange={e => changeAddressText(e, setCityError, setCitySuccess, setCityErrorMessage)}
                    onBlur={e => handleTextInputBlur(e, setCityError, setCitySuccess, setCityErrorMessage)} />
                  <label className="checkout__label">City</label>
                </div>
                {cityErrorMessage &&
                  <div className="checkout__input-error-message">{cityErrorMessage}</div>
                }
              </div>
            </div>
            <div className="form__row-col" style={{ flex: "0.5 1 50px" }}>
              <div className="form__row_field-container">
                <div className="form__row_input_container">
                  <input id="postcode-input" className={"checkout__input checkout__input-numeric"
                    + (postcodeError ? " checkout__input-error" : "") + (postcodeSuccess ? " checkout__input-success" : "")}
                    placeholder="Postcode" name="postcode" value={address.postcode}
                    autoComplete="stop"
                    onChange={e => changeAddressNumber(e, setPostcodeError, setPostcodeSuccess, setPostcodeErrorMessage)}
                    onBlur={e => handleTextInputBlur(e, setPostcodeError, setPostcodeSuccess, setPostcodeErrorMessage)} />
                  <label className="checkout__label">Postcode</label>
                </div>
                {postcodeErrorMessage &&
                  <div className="checkout__input-error-message">{postcodeErrorMessage}</div>
                }
              </div>
            </div>
          </div>
          <div className="form__row">
            <div className="form__row-col">
              <div className="form__row_field-container">
                <div className="form__row_input_container">
                  <input id="street-input" className={"checkout__input" + (streetError ? " checkout__input-error" : "")
                    + (streetSuccess ? " checkout__input-success" : "")} type="text" placeholder="Street" name="street" value={address.street}
                    autoComplete="stop"
                    onChange={e => changeAddressText(e, setStreetError, setStreetSuccess, setStreetErrorMessage)}
                    onBlur={e => handleTextInputBlur(e, setStreetError, setStreetSuccess, setStreetErrorMessage)} />
                  <label className="checkout__label">Street</label>
                </div>
                {streetErrorMessage &&
                  <div className="checkout__input-error-message">{streetErrorMessage}</div>
                }
              </div>
            </div>
            <div className="form__row-col" style={{ flex: "0.3 1 50px" }}>
              <div className="form__row_field-container">
                <div className="form__row_input_container">
                  <input id="number-input" className={"checkout__input checkout__input-numeric" + (numberError ? " checkout__input-error" : "")
                    + (numberSuccess ? " checkout__input-success" : "")} type="number" placeholder="Number" name="number"
                    autoComplete="stop"
                    value={address.number} onChange={e => changeAddressNumber(e, setNumberError, setNumberSuccess, setNumberErrorMessage)}
                    onBlur={e => handleTextInputBlur(e, setNumberError, setNumberSuccess, setNumberErrorMessage)} />
                  <label className="checkout__label">Number</label>
                </div>
                {numberErrorMessage &&
                  <div className="checkout__input-error-message">{numberErrorMessage}</div>
                }
              </div>
            </div>
          </div>
          <div className="form__row">
            <div className="form__row-col">
              <div className="form__row_field-container">
                <div className="form__row_input_container">
                  <input id="additional-information-input" className={"checkout__input" + (additionalInformationSuccess ? " checkout__input-success" : "")} type="text"
                    placeholder="Additional information (Optional)" name="additionalInformation" value={address.additionalInformation}
                    autoComplete="stop"
                    onChange={e => changeAddressText(e, setAdditionalInformationError, setAdditionalInformationSuccess,
                      setAdditionalInformationErrorMessage)} />
                  <label className="checkout__label checkout__label-long">Additional information (Optional)</label>
                </div>
                {additionalInformationErrorMessage &&
                  <div className="checkout__input-error-message">{additionalInformationErrorMessage}</div>
                }
              </div>
            </div>
          </div>
          <div className="form__row">
            <div className="form__row-col">
              <div className="form__row_field-container">
                <div className="form__row_input_container">
                  <input id="date-of-birth-input" className={"checkout__input" + (dateOfBirthError ? " checkout__input-error" : "")
                    + (dateOfBirthSuccess ? " checkout__input-success" : "")} type="text" placeholder="Date of birth (DD.MM.YYYY)"
                    name="dateOfBirth" value={address.dateOfBirth} onChange={changeAddressDateOfBirth} autoComplete="stop"
                    onBlur={e => handleTextInputBlur(e, setDateOfBirthError, setDateOfBirthSuccess, setDateOfBirthErrorMessage)}
                    onKeyDown={handleDateOfBirthInputKeyDown} onClick={handleDateOfBirthInputClick} />
                  <label className="checkout__label checkout__label-long">Date of birth (DD.MM.YYYY)</label>
                </div>
                {dateOfBirthErrorMessage &&
                  <div className="checkout__input-error-message">{dateOfBirthErrorMessage}</div>
                }
              </div>
            </div>
          </div>
          <div className="form__continue_container">
            <a className="form__continue_btn" onClick={continueToPayment}>Continue to payment</a>
          </div>
        </form>
        :
        <div>
          Map
        </div>
      }
    </div>
  );
}