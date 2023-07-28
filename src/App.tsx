import { Route, Routes } from 'react-router-dom';
import { SharedLayout } from './layouts/SharedLayout/SharedLayout';
import { HomePage } from './layouts/HomePage/HomePage';
import { ClothingPage } from './layouts/ClothingPage/ClothingPage';
import { ShirtPage } from './layouts/ShirtPage/ShirtPage';
import { CartPage } from './layouts/CartPage/CartPage';
import { useEffect, useState } from 'react';
import { CartItemModel } from './model/CartItemModel';
import { ShirtModel } from './model/ShirtModel';
import { CheckoutLayout } from './layouts/CheckoutLayout/CheckoutLayout';
import { ShippingDelivery } from './layouts/CheckoutLayout/components/ShippingDelivery/ShippingDelivery';
import { ErrorPage } from './layouts/ErrorPage/ErrorPage';
import { ShippingPayment } from './layouts/CheckoutLayout/components/ShippingPayment/ShippingPayment';
import { useAuth0 } from '@auth0/auth0-react';
import { CallbackPage } from './layouts/CallbackPage/CallbackPage';
import { AuthenticationGuard } from './auth0/AuthenticationGuard';
import { LoadingPage } from './layouts/LoadingPage/LoadingPage';
import { AddressModel } from './model/AddressModel';
import { AdminPage } from './layouts/AdminPage/AdminPage';
import { ContactUsPage } from './layouts/ContactUsPage/ContactUsPage';

function App() {
  const [cart, setCart] = useState<CartItemModel[]>(() => {
    const stored = localStorage.getItem("cart");
    if (stored === "undefined" || stored === "null") {
      return [];
    }
    const value = JSON.parse(stored!);
    return value;
  });
  
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (shirt: ShirtModel) => {
    for (const cartItem of cart) {
      if (cartItem.shirt.id === shirt!.id) {
        cartItem.quantity++;
        setCart([...cart]);
        return;
      }
    }
    setCart([...cart, new CartItemModel(shirt, 1)]);
  };

  const changeCartItemQuantity = (cartItem: CartItemModel, quantity: number) => {
    cartItem.quantity = quantity;
    setCart([...cart]);
  };

  const removeCartItem = (cartItem: CartItemModel) => {
    const idx = cart.indexOf(cartItem);
    cart.splice(idx, 1);
    setCart([...cart]);
  };

  // ADDRESS
  const auth0 = useAuth0();
  const [address, setAddress] = useState<AddressModel>(() => {
    const stored = localStorage.getItem("address");
    if (stored === null || stored === "undefined" || stored === "null") {
      const address = new AddressModel("", "", "", "Mr", "", "", "", "", "", "");
      return address;
    }
    const value = JSON.parse(stored!);
    return value;
  });
  
  useEffect(() => {
    localStorage.setItem("address", JSON.stringify(address));
  }, [address]);

  
  if (auth0.isLoading) {
    return <LoadingPage />;
  }

  return (
    <Routes>
      <Route path="/" element={<SharedLayout cartQuantity={cart.length} />} >
        <Route index element={<HomePage />} />
        <Route path="/clothing" element={<ClothingPage />} />
        <Route path="/products/:shirtId" element={<ShirtPage addToCart={addToCart} />} />
        <Route path="/cart" element={<CartPage cart={cart} changeCartItemQuantity={changeCartItemQuantity} removeCartItem={removeCartItem} />} />
        <Route path="/contact-us" element={<AuthenticationGuard component={ContactUsPage} />} />
        <Route path="/admin" element={<AuthenticationGuard component={AdminPage} />} />
        <Route path="callback" element={<CallbackPage />}/>
        <Route path="*" element={<ErrorPage />} />
      </Route>
      <Route path="/checkout" element={<AuthenticationGuard component={CheckoutLayout} props={{cart: cart, 
        changeCartItemQuantity: changeCartItemQuantity, removeCartItem: removeCartItem }} /> } >
        <Route path="shipping" element={<ShippingDelivery address={address} setAddress={setAddress} />} />
        <Route path="payment" element={<ShippingPayment address={address} cart={cart} setCart={setCart} 
        changeCartItemQuantity={changeCartItemQuantity} removeCartItem={removeCartItem} />} />
      </Route>
    </Routes>
  );
}

export default App;
