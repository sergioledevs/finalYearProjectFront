import React from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";

function IndivRecipe(props) {
  interface Recipe {
    _id: string;
    recipeName: string;
    ingredients: any;
  }

  const { id } = useParams();

  const [initialState, setInitialState] = React.useState<Recipe[]>([]);

  useEffect(() => {
    try {
      axios.get("https://finalyearprojectapi.onrender.com/getRecipes").then((response) => {
        console.log(response.data);
        setInitialState(response.data);
      });
    } catch (error) {
      console.log("");
    }
  }, []);

  const recipe = initialState.find((recipe) => recipe._id === id);

  if (!recipe) {
    return <div>Recipe not found.</div>;
  }

  return (
    <div>
      <h1>{recipe.recipeName}</h1>
      <p>{recipe.ingredients.map((ingredient) => ingredient.name)}</p>
    </div>
  );
}

export default IndivRecipe;
