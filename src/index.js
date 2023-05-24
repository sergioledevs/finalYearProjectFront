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
import UserInfo from "./pages/userForm/userForm.reducer";
import allergyReducer from "./pages/allergies/allergies.reducer";
import selectedRecipesReducer from "./pages/recipes/recipes.reducer";

const allReducers = combineReducers({
  UserInfo,
  allergyReducer,
  selectedRecipesReducer,
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
        redirectUri={window.location.origin}
        audience="https://finalyearprojectapi.onrender.com"
      >
        <App />
      </Auth0Provider>
    </React.StrictMode>
  </Provider>
);

reportWebVitals();
