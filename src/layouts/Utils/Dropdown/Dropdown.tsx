import { useEffect, useRef, useState } from "react";
import "./Dropdown.css";

export const Dropdown: React.FC<{
  selectedItem: string, setSelectedItem: Function,
  items: string[]
}> = (props) => {
  const [showDropdownMenu, setShowDropdownMenu] = useState(false);

  const dropdown = useRef<HTMLDivElement>(null);
  const dropdownMenu = useRef<HTMLUListElement>(null);

  const closeDropdown = (e: any) => {
    if (dropdown.current && showDropdownMenu && !dropdown.current?.contains(e.target) && !dropdownMenu.current!.contains(e.target)) {
      setShowDropdownMenu(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", closeDropdown);
    return () => {
      document.removeEventListener("mousedown", closeDropdown);
    }
  }, [showDropdownMenu]);

  const selectItem = (item: string) => {
    props.setSelectedItem(item);
    setShowDropdownMenu(false);
  }

  return (
    <div className="dropdown">
      <div className="dropdown-btn" onClick={() => setShowDropdownMenu(!showDropdownMenu)} ref={dropdown}>{props.selectedItem}</div>
      {showDropdownMenu &&
        <ul className="dropdown-menu" ref={dropdownMenu}>
          {props.items.map(item => <li key={item} onClick={() => selectItem(item)}>{item}</li>)}
        </ul>
      }
    </div>
  );
};