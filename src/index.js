import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { Auth0Provider } from "@auth0/auth0-react";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "bootstrap/dist/css/bootstrap.min.css";
import { createStore } from "redux";
import { Provider } from "react-redux";
import { combineReducers } from "redux";
import UserInfo from "./pages/homePage/home.reducer";
import allergyReducer from "./pages/allergies/allergies.reducer";

const allReducers = combineReducers({
  UserInfo,
  allergyReducer,
});

const store = createStore(
  allReducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <React.StrictMode>
    <Auth0Provider
    domain="dev-s016gihn6cxe73pi.eu.auth0.com"
    clientId="t7lApWOLfYunn0Yd4rOXEtG9dYnM9vM4"
    authorizationParams={{
      redirect_uri: window.location.origin
    }}
  >
        <App />
      </Auth0Provider>
    </React.StrictMode>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
