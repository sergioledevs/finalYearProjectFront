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
  DropdownText,
  Arrow,
  RecipeImage,
  Dropdown,
} from "../indivRecipe/indivRecipe.style";
import arrow from "../../media/downArrow.png";
import Footer from "../../components/footer/footer";
import Loader from "../../components/loader/loader";
import { useLocation } from "react-router-dom";

function IndivRecipe(props) {
  interface Recipe {
    _id: string;
    recipeName: string;
    ingredients: any;
    stepsToCook: any;
    image: any;
  }

  const { id } = useParams();

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const proteinAmount = searchParams.get("proteinAmount");
  const protIng = searchParams.get("protIng");
  const carbAmount = searchParams.get("carbAmount");
  const carbIng = searchParams.get("carbIng");
  const protein = searchParams.get("protein");
  const carbs = searchParams.get("carbs");
  const calories = searchParams.get("calories");

  const [initialState, setInitialState] = React.useState<Recipe[]>([]);
  const [dropdownStepsVisible, setDropdownStepsVisible] = React.useState(true);
  const [dropdownIngredientsVisible, setDropdownIngredientsVisible] =
    React.useState(true);
  const [dropdownValuesVisible, setDropdownValuesVisible] =
    React.useState(true);

  const token = localStorage.getItem("token");

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          "https://finalyearprojectapi.onrender.com/getRecipes",
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Access-Control-Allow-Origin": "https://cukfit.netlify.app",
            },
          }
        );
        setInitialState(response.data);
      } catch (err: any) {
        console.log(err.response.data.message);
      }
    }
    fetchData();
  }, []);

  const recipe = initialState.find((recipe) => recipe._id === id);

  if (!recipe) {
    return <Loader />;
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
      // Check if the ingredient name matches a specific condition
      console.log(protIng);
      if (ingredient.name === protIng) {
        // Append the proteinAmount next to the ingredient name
        return (
          <Text visible={dropdownIngredientsVisible}>
            {ingredient.name} {proteinAmount}
            {"g"}
          </Text>
        );
      } else if (ingredient.name === carbIng) {
        // Append the proteinAmount next to the ingredient name
        return (
          <Text visible={dropdownIngredientsVisible}>
            {ingredient.name} {carbAmount}
            {"g"}
          </Text>
        );
      } else {
        console.log("gfalse"); // Render the ingredient name without the proteinAmount
        return (
          <Text visible={dropdownIngredientsVisible}>{ingredient.name}</Text>
        );
      }
    });
  }

  function getStepsParagraphs(recipe) {
    return recipe.stepsToCook.map((step, index) => {
      return (
        <Text key={index} visible={dropdownStepsVisible}>
          {index + 1}. {step}
        </Text>
      );
    });
  }

  function getValuesParagraphs(recipe) {
    console.log(protein);
    return (
      <div>
        <Text visible={dropdownValuesVisible}>
          {"Protein"} {protein ? parseFloat(protein).toFixed(2) : "N/A"}
          {"g"}
        </Text>
        <Text visible={dropdownValuesVisible}>
          {"Carbohydrates"} {carbs ? parseFloat(carbs).toFixed(2) : "N/A"}
          {"g"}
        </Text>
        <Text visible={dropdownValuesVisible}>
          {"Calories"} {calories ? parseFloat(calories).toFixed(2) : "N/A"}
          {"Kcal"}
        </Text>
      </div>
    );
  }

  const ingredientParagraphs = recipe ? getIngredientParagraphs(recipe) : null;
  const stepsParagraphs = recipe ? getStepsParagraphs(recipe) : null;
  const valuesParagraphs = recipe ? getValuesParagraphs(recipe) : null;

  return (
    <div>
      <BigDiv>
        <NavBar></NavBar>

        <RecipeImage
          src={recipe.image}
          alt={recipe.recipeName + " image"}
        ></RecipeImage>
        <RightDiv>
          <RecipeTitle>{recipe.recipeName}</RecipeTitle>

          <Dropdown visible={dropdownStepsVisible}>
            <DropdownText onClick={toggleDropdownSteps}>
              Steps to cook
              <Arrow src={arrow}></Arrow>
            </DropdownText>
          </Dropdown>

          <DropdownMenu visible={dropdownStepsVisible}>
            {stepsParagraphs}
          </DropdownMenu>

          <Dropdown visible={dropdownIngredientsVisible}>
            <DropdownText onClick={toggleDropdownIngredients}>
              Ingredients
              <Arrow src={arrow}></Arrow>
            </DropdownText>
            <DropdownMenu visible={dropdownIngredientsVisible}>
              {ingredientParagraphs}
            </DropdownMenu>
          </Dropdown>

          <Dropdown visible={dropdownValuesVisible}>
            <DropdownText onClick={toggleDropdownValues}>
              Nutritional values
              <Arrow src={arrow}></Arrow>
            </DropdownText>
            <DropdownMenu visible={dropdownValuesVisible}>
              {valuesParagraphs}
            </DropdownMenu>
          </Dropdown>
        </RightDiv>
      </BigDiv>
      <Footer></Footer>
    </div>
  );
}

export default IndivRecipe;
