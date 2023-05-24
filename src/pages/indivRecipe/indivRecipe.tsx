import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import NavBar from "../../components/navBar/navBar";
import {
  Text,
  RightDiv,
  RecipeTitle,
  Arrow,
  RecipeImage,
  StyledDiv,
  StyledAccordion,
  StyledTypography,
} from "../indivRecipe/indivRecipe.style";
import arrow from "../../media/downArrow.png";
import Loader from "../../components/loader/loader";
import { connect } from "react-redux";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";

function IndivRecipe(props) {
  interface Recipe {
    _id: string;
    recipeName: string;
    ingredients: any;
    stepsToCook: any;
    image: any;
    typeOfMeal: any;
  }

  const { id } = useParams();

  const [initialState, setInitialState] = React.useState<Recipe[]>([]);

  const [calorieIntake, setCalorieIntake] = useState("");
  const [carbsIntake, setCarbsIntake] = useState("");
  const [proteinIntakes, setProteinIntake] = useState("");

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

  useEffect(() => {
    async function fetchData() {
      if (token != null) {
        try {
          const response = await axios.get(
            "https://finalyearprojectapi.onrender.com/userData",
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
          setCalorieIntake(response.data.data.calorieIntake);
          setCarbsIntake(response.data.data.carbsIntake);
          setProteinIntake(response.data.data.proteinIntake);
        } catch (err: any) {
          console.log(err.response.data.message);
        }
      }
    }
    fetchData();
  }, []);

  const recipe = initialState.find((recipe) => recipe._id === id);
  var proteinInBreakfast;
  var carbsInBreakfast;

  var proteinIngredientName;
  var carbIngredientName;

  var proteinIngredientAmount = 0;
  var carbIngredientAmount = 0;

  var proteinCalories;
  var carbCalories;
  var calories;

  if (recipe) {
    const proteinIngredientAmounts = recipe.ingredients.map(
      (ingredient) => ingredient.protein
    );
    const proteinPerHundredGrams = Math.max(...proteinIngredientAmounts);

    const carbIngredientAmounts = recipe.ingredients.map(
      (ingredient) => ingredient.carbs
    );
    const carbsPerHundredGrams = Math.max(...carbIngredientAmounts);

    const proteinIngredient = recipe.ingredients.find(
      (ingredient) => ingredient.protein === proteinPerHundredGrams.toString()
    );
    proteinIngredientName = proteinIngredient ? proteinIngredient.name : "";

    const carbIngredient = recipe.ingredients.find(
      (ingredient) => ingredient.carbs === carbsPerHundredGrams.toString()
    );
    carbIngredientName = carbIngredient ? carbIngredient.name : "";

    if (recipe.typeOfMeal === "breakfast") {
      // Use requirements if user is logged in
      if (token != null) {
        proteinIngredientAmount = Math.round(
          (parseInt(proteinIntakes) * 0.15 * 100) / proteinPerHundredGrams
        );
        carbIngredientAmount = Math.round(
          (parseInt(carbsIntake) * 0.15 * 100) / carbsPerHundredGrams
        );
      } else {
        proteinIngredientAmount = Math.round(
          (props.proteinIntake * 0.15 * 100) / proteinPerHundredGrams
        );
        carbIngredientAmount = Math.round(
          (props.carbsIntake * 0.15 * 100) / carbsPerHundredGrams
        );
      }

      proteinInBreakfast =
        (proteinIngredientAmount / 100) * proteinPerHundredGrams;
      carbsInBreakfast = (carbIngredientAmount / 100) * carbsPerHundredGrams;

      proteinCalories =
        proteinIngredient?.calories * (proteinIngredientAmount / 100) || 0;
      carbCalories =
        carbIngredient?.calories * (carbIngredientAmount / 100) || 0;
      calories = proteinCalories + carbCalories;
    }

    if (recipe.typeOfMeal === "lunch") {
      // Use requirements if user is logged in
      if (token != null) {
        proteinIngredientAmount = Math.round(
          (parseInt(proteinIntakes) * 0.5 * 100) / proteinPerHundredGrams
        );
        carbIngredientAmount = Math.round(
          (parseInt(carbsIntake) * 0.5 * 100) / carbsPerHundredGrams
        );
      } else {
        proteinIngredientAmount = Math.round(
          (props.proteinIntake * 0.5 * 100) / proteinPerHundredGrams
        );
        carbIngredientAmount = Math.round(
          (props.carbsIntake * 0.5 * 100) / carbsPerHundredGrams
        );
      }

      proteinInBreakfast =
        (proteinIngredientAmount / 100) * proteinPerHundredGrams;
      carbsInBreakfast = (carbIngredientAmount / 100) * carbsPerHundredGrams;

      proteinCalories =
        proteinIngredient?.calories * (proteinIngredientAmount / 100) || 0;
      carbCalories =
        carbIngredient?.calories * (carbIngredientAmount / 100) || 0;
      calories = proteinCalories + carbCalories;
    }

    if (recipe.typeOfMeal === "dinner") {
      // Use requirements if user is logged in
      if (token != null) {
        proteinIngredientAmount = Math.round(
          (parseInt(proteinIntakes) * 0.35 * 100) / proteinPerHundredGrams
        );
        carbIngredientAmount = Math.round(
          (parseInt(carbsIntake) * 0.35 * 100) / carbsPerHundredGrams
        );
      } else {
        proteinIngredientAmount = Math.round(
          (props.proteinIntake * 0.35 * 100) / proteinPerHundredGrams
        );
        carbIngredientAmount = Math.round(
          (props.carbsIntake * 0.35 * 100) / carbsPerHundredGrams
        );
      }

      proteinInBreakfast =
        (proteinIngredientAmount / 100) * proteinPerHundredGrams;
      carbsInBreakfast = (carbIngredientAmount / 100) * carbsPerHundredGrams;

      proteinCalories =
        proteinIngredient?.calories * (proteinIngredientAmount / 100) || 0;
      carbCalories =
        carbIngredient?.calories * (carbIngredientAmount / 100) || 0;
      calories = proteinCalories + carbCalories;
    }

    if (recipe.typeOfMeal === "snacks") {
      // Use requirements if user is logged in
      if (token != null) {
        proteinIngredientAmount = Math.round(
          (parseInt(proteinIntakes) * 0.1 * 100) / proteinPerHundredGrams
        );
        carbIngredientAmount = Math.round(
          (parseInt(carbsIntake) * 0.1 * 100) / carbsPerHundredGrams
        );
      } else {
        proteinIngredientAmount = Math.round(
          (props.proteinIntake * 0.1 * 100) / proteinPerHundredGrams
        );
        carbIngredientAmount = Math.round(
          (props.carbsIntake * 0.1 * 100) / carbsPerHundredGrams
        );
      }

      proteinInBreakfast =
        (proteinIngredientAmount / 100) * proteinPerHundredGrams;
      carbsInBreakfast = (carbIngredientAmount / 100) * carbsPerHundredGrams;

      proteinCalories =
        proteinIngredient?.calories * (proteinIngredientAmount / 100) || 0;
      carbCalories =
        carbIngredient?.calories * (carbIngredientAmount / 100) || 0;
      calories = proteinCalories + carbCalories;
    }
  }

  if (!recipe) {
    return <Loader />;
  }

  function getIngredientParagraphs(recipe) {
    return recipe.ingredients.map((ingredient) => {
      // Check if the ingredient name matches the protein or carb name
      if (ingredient.name === proteinIngredientName) {
        // Append the proteinAmount next to the ingredient name
        return (
          <Text>
            {ingredient.name} {proteinIngredientAmount}
            {"g"}
          </Text>
        );
      } else if (ingredient.name === carbIngredientName) {
        // Append the proteinAmount next to the ingredient name
        return (
          <Text>
            {ingredient.name} {carbIngredientAmount}
            {"g"}
          </Text>
        );
      } else {
        // Render the ingredient name without the proteinAmount
        return <Text>{ingredient.name}</Text>;
      }
    });
  }

  function getStepsParagraphs(recipe) {
    return recipe.stepsToCook.map((step, index) => {
      return (
        <Text key={index}>
          {index + 1}. {step}
        </Text>
      );
    });
  }

  function getValuesParagraphs(recipe) {
    return (
      <div>
        <Text>
          {"Protein"}{" "}
          {proteinInBreakfast
            ? parseFloat(proteinInBreakfast).toFixed(2)
            : "N/A"}
          {"g"}
        </Text>
        <Text>
          {"Carbohydrates"}{" "}
          {carbsInBreakfast ? parseFloat(carbsInBreakfast).toFixed(2) : "N/A"}
          {"g"}
        </Text>
        <Text>
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
      <NavBar></NavBar>

      <StyledDiv>
        <RecipeImage
          src={recipe.image}
          alt={recipe.recipeName + " image"}
        ></RecipeImage>
        <RightDiv>
          <RecipeTitle>{recipe.recipeName}</RecipeTitle>

          <StyledAccordion>
            <AccordionSummary
              expandIcon={<Arrow src={arrow} />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <StyledTypography>Ingredients</StyledTypography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>{ingredientParagraphs}</Typography>
            </AccordionDetails>
          </StyledAccordion>

          <StyledAccordion>
            <AccordionSummary
              expandIcon={<Arrow src={arrow} />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <StyledTypography>Steps to cook</StyledTypography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>{stepsParagraphs}</Typography>
            </AccordionDetails>
          </StyledAccordion>

          <StyledAccordion>
            <AccordionSummary
              expandIcon={<Arrow src={arrow} />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <StyledTypography>Nutritional values</StyledTypography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>{valuesParagraphs}</Typography>
            </AccordionDetails>
          </StyledAccordion>
        </RightDiv>
      </StyledDiv>
    </div>
  );
}

interface RootState {
  UserInfo: any;
  allergyReducer: any;
  selectedRecipesReducer: any;
}

const mapStateToProps = (state: RootState) => {
  return {
    proteinIntake: state.UserInfo.proteinIntake,
    carbsIntake: state.UserInfo.carbsIntake,
    caloriesIntake: state.UserInfo.caloriesIntake,
    allergyState: state.allergyReducer.allergyArray,
    recipesSelected: state.selectedRecipesReducer.selectedRecipes,
  };
};

export default connect(mapStateToProps)(IndivRecipe);
