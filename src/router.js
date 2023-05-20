import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import AllergiesPage from "./pages/allergies/allergiesPage";
import HomePage from "./pages/homePage/homePage";
import Landing from "./pages/landingPage/landing";
import LogIn from "./pages/logIn/logIn.tsx";
import Recipes from "./pages/recipes/recipes";
import TypeOfMeal from "./pages/whatMeal/typeOfMeal";
import IndivRecipe from "./pages/indivRecipe/indivRecipe";
import LoginButton from "./pages/logIn/logIn.tsx";
import Calendar from "./pages/calendar/calendar";
import Profile from "./pages/profile/profile";
import RegistrationForm from "./pages/register/register";
import PrivacyPolicy from "./pages/privacyPolicy/privacyPolicy";

export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          key="Ask for allergies or preferences"
          path="/allergies"
          element={<AllergiesPage />}
        />

        <Route key="homepage" path="/home" element={<HomePage />} />

        <Route key="homepage" path="/" element={<Landing />} />

        <Route path="/indivRecipe/:id" element={<IndivRecipe />} />

        <Route key="logIn" path="/logIn" element={<LoginButton />} />

        <Route key="list of recipes" path="/recipes" element={<Recipes />} />

        <Route key="list of recipes" path="/calendar" element={<Calendar />} />

        <Route
          key="what type of meal does the user want to cook"
          path="/whatMeal"
          element={<TypeOfMeal />}
        />


        <Route
          key="profile page"
          path="/profile"
          element={<Profile />}
        />

        <Route
          key="privacy policy"
          path="/privacyPolicy"
          element={<PrivacyPolicy />}
        />

        <Route
          key="register new profile"
          path="/register"
          element={<RegistrationForm />}
        />
      </Routes>
    </BrowserRouter>
  );
};
