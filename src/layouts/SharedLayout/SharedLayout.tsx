import { Outlet } from "react-router-dom";
import { Footer } from "../HeaderAndFooter/Footer/Footer";
import { Header } from "../HeaderAndFooter/Header/Header";

export const SharedLayout: React.FC<{ cartQuantity: number }> = (props) => {

  return (
    <div className="main-view">
      <Header cartQuantity={props.cartQuantity} />
      <div className="main-content">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}