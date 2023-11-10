import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { initializeApp } from "firebase/app";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

const firebaseConfig = {
  apiKey: "AIzaSyBvYtRIYtp-07TVUh1PQMnkcSc3UtgiRQM",
  authDomain: "my-react-blog-5054e.firebaseapp.com",
  projectId: "my-react-blog-5054e",
  storageBucket: "my-react-blog-5054e.appspot.com",
  messagingSenderId: "654778152866",
  appId: "1:654778152866:web:f1db18078cbfafad4464fb",
};

const app = initializeApp(firebaseConfig);

const router = createBrowserRouter([
  {
    path: "*",
    element: <App />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
