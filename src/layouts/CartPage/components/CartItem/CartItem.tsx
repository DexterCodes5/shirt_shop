import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./CartItem.css";
import { CartItemModel } from "../../../../model/CartItemModel";
import { useEffect, useRef, useState } from "react";

export const CartItem: React.FC<{
  cartItem: CartItemModel, changeCartItemQuantity: Function, removeCartItem: Function
}> = (props) => {
  const [showDropdownMenu, setShowDropdownMenu] = useState(false);
  const [selectedQuantity, setSelectedQuantity] = useState(props.cartItem.quantity);

  const dropdownStyles = () => {
    if (showDropdownMenu) {
      return {
        height: 150,
        paddingTop: 8,
        paddingBottom: 8,
        opacity: 1
      }
    }
    return {
      height: 0,
      padding: 0,
      opacity: 0
    }
  };

  const dropdown = useRef<HTMLDivElement>(null);

  const closeDropdown = (e: any) => {
    if (!dropdown.current!.contains(e.target)) {
      setShowDropdownMenu(false);
    }
  }

  useEffect(() => {
    document.addEventListener("mousedown", closeDropdown);
    return () => {
      document.removeEventListener("mousedown", closeDropdown);
    }
  }, []);

  const dropdownMenuSelectedStyle = (quantity: number) => {
    return { backgroundColor: selectedQuantity === quantity ? "var(--light-grey)" : undefined };
  };

  const selectQuantity = (quantity: number) => {
    props.changeCartItemQuantity(props.cartItem, quantity);
    setSelectedQuantity(quantity);
  }

  return (
    <div className="cart-item">
      <div className="cart-item-left">
        <div className="cart-img-col">
          <img className="cart-img" src={props.cartItem.shirt.img} alt="Shirt" />
        </div>
        <div className="cart-info-col">
          <h3 className="cart-info-title">{props.cartItem.shirt.title}</h3>
          <p className="cart-info-brand">{props.cartItem.shirt.brand}</p>
          <p className="cart-info-color">{props.cartItem.shirt.color}</p>
          <p className="cart-info-price">{props.cartItem.shirt.price.toFixed(2)} BGN</p>
        </div>
      </div>
      <div className="cart-quantity-trash">
        <div>
          <div className="cart-dropdown" onClick={() => setShowDropdownMenu(!showDropdownMenu)} ref={dropdown}>
            <div>
              {selectedQuantity}
            </div>
            <div>
              <FontAwesomeIcon icon={faCaretDown} className="cart-dropdown-arrow" />
            </div>
          </div>
        </div>
        <div className="cart-dropdown-menu-container" style={dropdownStyles()}>
          <ul className="cart-dropdown-menu">
            <li style={dropdownMenuSelectedStyle(1)} onClick={() => selectQuantity(1)}>1</li>
            <li style={dropdownMenuSelectedStyle(2)} onClick={() => selectQuantity(2)}>2</li>
            <li style={dropdownMenuSelectedStyle(3)} onClick={() => selectQuantity(3)}>3</li>
            <li style={dropdownMenuSelectedStyle(4)} onClick={() => selectQuantity(4)}>4</li>
            <li style={dropdownMenuSelectedStyle(5)} onClick={() => selectQuantity(5)}>5</li>
            <li style={dropdownMenuSelectedStyle(6)} onClick={() => selectQuantity(6)}>6</li>
            <li style={dropdownMenuSelectedStyle(7)} onClick={() => selectQuantity(7)}>7</li>
            <li style={dropdownMenuSelectedStyle(8)} onClick={() => selectQuantity(8)}>8</li>
            <li style={dropdownMenuSelectedStyle(9)} onClick={() => selectQuantity(9)}>9</li>
          </ul>
        </div>
        <div className="cart-trash-col">
          <FontAwesomeIcon className="trash-can" icon={faTrashCan} onClick={() => props.removeCartItem(props.cartItem)} />
        </div>
      </div>
    </div>
  );
};