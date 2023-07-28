import "./CheckoutLoader.css";

export const CheckoutLoader: React.FC<{ size: number }> = (props) => {
  return (
    <div className="lds-ellipsis" style={{ width: props.size, height: props.size }}><div></div><div></div><div></div><div></div></div>
  );
};