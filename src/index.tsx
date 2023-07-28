import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { Auth0ProviderWithNavigate } from './auth0/Auth0ProviderWithNavigate';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

const stripePromise = loadStripe("pk_test_51NQnymDcFpxD1Nc81M2dY3hwWJ8gf6okUkeiCwAbU7EAXaqktHbrQWtIqUv4l7bJ20lOizm7gB8YXwfZdWTV0jNu00rs9tQrpX");

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Auth0ProviderWithNavigate >
        <Elements stripe={stripePromise} >
          <App />
        </Elements>
      </Auth0ProviderWithNavigate>
    </BrowserRouter>
  </React.StrictMode>
);
