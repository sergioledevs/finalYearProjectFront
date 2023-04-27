import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import AllergiesPage from "./pages/allergies/allergiesPage";
import CreateAccount from "./pages/createAccount/createAccount";
import Ingredients from "./pages/familiarIngredients/ingredients";
import HomePage from "./pages/homePage/homePage";
import Landing from "./pages/landingPage/landing";
import LogIn from "./pages/logIn/logIn.tsx";
import Recipes from "./pages/recipes/recipes";
import UserProfile from "./pages/userProfile/userProfile";
import TypeOfMeal from "./pages/whatMeal/typeOfMeal";
import IndivRecipe from "./pages/indivRecipe/indivRecipe";
import LoginButton from "./pages/logIn/logIn.tsx";
import Calendar from "./pages/calendar/calendar";

export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          key="Ask for allergies or preferences"
          path="/allergies"
          element={<AllergiesPage />}
        />

        <Route key="homepage"
         path="/home" 
         element={<HomePage />} />

        <Route key="homepage" 
        path="/" 
        element={<Landing />} />

        <Route path="/indivRecipe/:id" 
        element={<IndivRecipe />} />

        <Route key="logIn" 
        path="/logIn" 
        element={<LoginButton />} />

        <Route
          key="create new user account"
          path="/createAccount"
          element={<CreateAccount />}
        />

        <Route key="list of recipes" 
        path="/recipes" 
        element={<Recipes />} />

        <Route key="list of recipes" 
        path="/calendar" 
        element={<Calendar />} />

        <Route
          key="user profile"
          path="/userProfile"
          element={<UserProfile />}
        />

        <Route
          key="what type of meal does the user want to cook"
          path="/whatMeal"
          element={<TypeOfMeal />}
        />

        <Route
          key="what ingredients is the user familiar with"
          path="/familiarIngredients"
          element={<Ingredients />}
        />
      </Routes>
    </BrowserRouter>
  );
};
