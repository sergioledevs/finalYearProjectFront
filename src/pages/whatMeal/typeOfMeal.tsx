import React from "react";
import { Navigate, useNavigate } from "react-router-dom";

function TypeOfMeal() {
  const navigate = useNavigate();
  const handleSub = () => {
    navigate("/allergies")
  };


  return( <div>
    typeofmeal
    <button onClick={handleSub}></button>
    </div>
  )
}

export default TypeOfMeal;
