import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import AllergiesPage from "./pages/allergies/allergiesPage";
import HomePage from "./pages/userForm/userForm";
import Landing from "./pages/landingPage/landing";
import Recipes from "./pages/recipes/recipes";
import IndivRecipe from "./pages/indivRecipe/indivRecipe";
import LogIn from "./pages/logIn/logIn.tsx";
import Calendar from "./pages/calendar/calendar";
import Profile from "./pages/profile/profile";
import RegistrationForm from "./pages/register/register";
import PrivacyPolicy from "./pages/privacyPolicy/privacyPolicy";

export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          key="Ask for allergies"
          path="/allergies"
          element={<AllergiesPage />}
        />

        <Route
          key="user information form"
          path="/home"
          element={<HomePage />}
        />

        <Route key="homepage" 
        path="/" 
        element={<Landing />} 
        />

        <Route
          key="individual page"
          path="/indivRecipe/:id"
          element={<IndivRecipe />}
        />

        <Route key="log in page" 
        path="/logIn" 
        element={<LogIn />} 
        />

        <Route key="list of recipes" 
        path="/recipes" 
        element={<Recipes />} 
        />

        <Route
          key="weekly plan calendar"
          path="/calendar"
          element={<Calendar />}
        />

        <Route key="profile page" 
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
