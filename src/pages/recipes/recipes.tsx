import React from "react";
import axios from "axios";
import { connect } from "react-redux";
import { useEffect } from "react";
import {
  BigDiv,
  RecipeCard,
  LinkDiv,
  Wrapper,
  SmallDiv,
  Description,
  ImageDiv,
} from "./recipes.style";

function Recipes(props) {
  const [initialState, setInitialState] = React.useState([]);

  useEffect(() => {
    try {
      axios.get("http://localhost:9000/getRecipes").then((response) => {
        console.log(response.data);
        setInitialState(response.data);
      });
    } catch (error) {
      console.log("");
    }
  }, []);

  const RecipesBreakfastGrid = initialState.map((recipe: any) => {
    if (recipe.typeOfMeal === "breakfast") {
      return (
        <RecipeCard>
          <LinkDiv href="#">
            <ImageDiv></ImageDiv>
            <Description>
              <p>{recipe.recipeName}</p>
            </Description>
          </LinkDiv>
        </RecipeCard>
      );
    }
  });

  const RecipesGridLunch = initialState
  .filter((recipe: any) => {
    // Check if the recipe contains any ingredients the user is allergic to
    const allergyIngredients = recipe.ingredients.map((ingredient) => ingredient.name);
    return !props.allergyState.some((allergy) => allergyIngredients.includes(allergy));
  })
  .map((recipe: any) => {
    const proteinAmounts = recipe.ingredients.map((ingredient) => ingredient.protein);
    const maxProteinAmount = Math.max(...proteinAmounts);

    const carbAmounts = recipe.ingredients.map((ingredient) => ingredient.carbs);
    const maxCarbAmount = Math.max(...carbAmounts);

    const proteinIngredient = recipe.ingredients.find((ingredient) => ingredient.protein === maxProteinAmount.toString());
    const proteinIngredientName = proteinIngredient ? proteinIngredient.name : '';

    const carbIngredient = recipe.ingredients.find((ingredient) => ingredient.carbs === maxCarbAmount.toString());
    const carbIngredientName = carbIngredient ? carbIngredient.name : '';

    if (recipe.typeOfMeal === "meal") {
      const proteinAmount = Math.round((props.proteinIntake * 0.55 * 100) / maxProteinAmount);
      const carbAmount = Math.round((props.carbsIntake * 0.55 * 100) / maxCarbAmount);

      return (
        <RecipeCard>
          <LinkDiv href="#">
            <ImageDiv></ImageDiv>
            <Description>
              <p>{recipe.recipeName}</p>
              {proteinIngredientName && <p>{proteinIngredientName + " " + proteinAmount + "g"}</p>}
              {carbIngredientName && <p>{carbIngredientName + " " + carbAmount + "g"}</p>}
            </Description>
          </LinkDiv>
        </RecipeCard>
      );
    }
  });

  const RecipesGridDinner = initialState
  .filter((recipe: any) => {
    // Check if the recipe contains any ingredients the user is allergic to
    const allergyIngredients = recipe.ingredients.map(ingredient => ingredient.name);
    return !props.allergyState.some(allergy => allergyIngredients.includes(allergy));
  })
  .map((recipe: any) => {
    var getProtein = recipe.ingredients.map((ingredient) => ingredient.protein);
    var maxProteinIngredient = Math.max(...getProtein); //find what the ingredient with most protein is inside the recipe
    var amountProteinRecipe= Math.round((props.proteinIntake*0.3)*100/maxProteinIngredient) //calculate how many grams of the protein ingredient will be used in the recipe

    var proteinIngredientRecipe = recipe.ingredients
  .filter((ingredient) => ingredient.protein === maxProteinIngredient.toString())
  .map((ingredient) => ingredient.name)
  .join('');

    var getCarbs = recipe.ingredients.map((ingredient) => ingredient.carbs);
    var maxCarbsIngredient = Math.max(...getCarbs); //find what the ingredient with most protein is inside the recipe
    var amountCarbsRecipe= Math.round((props.carbsIntake*0.3)*100/maxCarbsIngredient) //calculate how many grams of the protein ingredient will be used in the recipe. 30% of total carbs

    var carbsIngredientRecipe = recipe.ingredients
  .filter((ingredient) => ingredient.carbs === maxCarbsIngredient.toString())
  .map((ingredient) => ingredient.name)
  .join('');

    if (recipe.typeOfMeal === "meal" ) {
      return (
        <RecipeCard>
          <LinkDiv href="#">
            <ImageDiv></ImageDiv>
            <Description>
              <p>{recipe.recipeName}</p>
              {<p>{proteinIngredientRecipe+ " " + amountProteinRecipe+ "g"}</p>}
              {<p>{carbsIngredientRecipe + " "+ amountCarbsRecipe + "g"}</p>}
            </Description>
          </LinkDiv>
        </RecipeCard>
      );
    }
  });

  return (
    <Wrapper>
      <BigDiv>
        <SmallDiv>
          <h3>Breakfast</h3>
          {RecipesBreakfastGrid}
        </SmallDiv>
      </BigDiv>
      <BigDiv>
        <SmallDiv>
          <h3>Lunch</h3>
          {RecipesGridLunch}
        </SmallDiv>
      </BigDiv>
      <BigDiv>
        <SmallDiv>
          <h3>Dinner</h3>
          {RecipesGridDinner}
        </SmallDiv>
      </BigDiv>
    </Wrapper>
  );
}

interface RootState {
  UserInfo: any;
  allergyReducer: any;
}

const mapStateToProps = (state: RootState) => {
  return {
    proteinIntake: state.UserInfo.proteinIntake,
    carbsIntake: state.UserInfo.carbsIntake,
    allergyState: state.allergyReducer.allergyArray,
  };
};

export default connect(mapStateToProps)(Recipes);
