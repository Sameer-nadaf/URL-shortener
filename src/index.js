import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter} from "react-router-dom";
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyANF2rM2djHz-k2PEIIcbssj_xe1z4CAl4",
  authDomain: "urlshortener-4d85b.firebaseapp.com",
  projectId: "urlshortener-4d85b",
  storageBucket: "urlshortener-4d85b.firebasestorage.app",
  messagingSenderId: "416307061386",
  appId: "1:416307061386:web:cb2f933eb9d4bec04b8373",
  measurementId: "G-KEZ9LWR2X3"
};

initializeApp(firebaseConfig);
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
