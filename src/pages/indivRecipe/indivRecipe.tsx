import React from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import NavBar from "../../components/navBar/navBar";
import {
  BigDiv,
  FloatingText,
  DropdownMenu,
  Text,
  RightDiv,
  RecipeTitle,
} from "../indivRecipe/indivRecipe.style";

function IndivRecipe(props) {
  interface Recipe {
    _id: string;
    recipeName: string;
    ingredients: any;
    stepsToCook: any;
    image: any;
  }

  const { id } = useParams();

  const [initialState, setInitialState] = React.useState<Recipe[]>([]);
  const [dropdownStepsVisible, setDropdownStepsVisible] = React.useState(true);
  const [dropdownIngredientsVisible, setDropdownIngredientsVisible] =React.useState(true);
  const [dropdownValuesVisible, setDropdownValuesVisible] =React.useState(true);

  useEffect(() => {
    try {
      axios
        .get("https://finalyearprojectapi.onrender.com/getRecipes")
        .then((response) => {
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

  const toggleDropdownSteps = () => {
    setDropdownStepsVisible(!dropdownStepsVisible);
  };

  const toggleDropdownIngredients = () => {
    setDropdownIngredientsVisible(!dropdownIngredientsVisible);
  };

  const toggleDropdownValues = () => {
    setDropdownValuesVisible(!dropdownValuesVisible);
  };

  function getIngredientParagraphs(recipe) {
    return recipe.ingredients.map((ingredient) => {
      return (
        <Text visible={dropdownIngredientsVisible}>{ingredient.name}</Text>
      );
    });
  }

  function getStepsParagraphs(recipe) {
    return recipe.stepsToCook.map((ingredient) => {
      return <Text visible={dropdownStepsVisible}>{ingredient}</Text>;
    });
  }

  function getValuesParagraphs(recipe) {
    return recipe.stepsToCook.map((ingredient) => {
      return <Text visible={dropdownValuesVisible}>{ingredient}</Text>;
    });
  }

  const ingredientParagraphs = recipe ? getIngredientParagraphs(recipe) : null;
  const stepsParagraphs = recipe ? getStepsParagraphs(recipe) : null;
  const valuesParagraphs = recipe ? getValuesParagraphs(recipe) : null;
  
  console.log(ingredientParagraphs);

  return (
    <BigDiv>
      <NavBar></NavBar>

      <img src={recipe.image} alt={recipe.recipeName + " image"}></img>
      <RightDiv>
        <RecipeTitle>{recipe.recipeName}</RecipeTitle>

        <Text onClick={toggleDropdownSteps}>Steps to cook</Text>
        <DropdownMenu visible={dropdownStepsVisible}>
          {stepsParagraphs}
        </DropdownMenu>

        <Text onClick={toggleDropdownIngredients}>Ingredients</Text>
        <DropdownMenu visible={dropdownIngredientsVisible}>
          {ingredientParagraphs}
        </DropdownMenu>

        <Text onClick={toggleDropdownValues}>Ingredients</Text>
        <DropdownMenu visible={dropdownValuesVisible}>
          {valuesParagraphs}
        </DropdownMenu>
      </RightDiv>
    </BigDiv>
  );
}

export default IndivRecipe;
