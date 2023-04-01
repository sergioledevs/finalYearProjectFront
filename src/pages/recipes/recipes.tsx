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
  RecipeTitle,
  Ingredient,
} from "./recipes.style";

function Recipes(props) {
  const [initialState, setInitialState] = React.useState([]);
  const [selectedRecipes, setSelectedRecipes] = React.useState<string[]>([]);
  console.log(selectedRecipes)

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

  const RecipesBreakfastGrid = initialState
    .filter((recipe: any) => {
      // Check if the recipe contains any ingredients the user is allergic to
      const allergyIngredients = recipe.ingredients.flatMap((ingredient) => [
        ...ingredient.contains,
        ingredient.name,
      ]);
      return !props.allergyState.some((allergy) =>
        allergyIngredients.includes(allergy.toLowerCase())
      );
    })
    .map((recipe: any) => {
      const proteinAmounts = recipe.ingredients.map(
        (ingredient) => ingredient.protein
      );
      const maxProteinAmount = Math.max(...proteinAmounts);

      const carbAmounts = recipe.ingredients.map(
        (ingredient) => ingredient.carbs
      );
      const maxCarbAmount = Math.max(...carbAmounts);

      const proteinIngredient = recipe.ingredients.find(
        (ingredient) => ingredient.protein === maxProteinAmount.toString()
      );
      const proteinIngredientName = proteinIngredient
        ? proteinIngredient.name
        : "";

      const carbIngredient = recipe.ingredients.find(
        (ingredient) => ingredient.carbs === maxCarbAmount.toString()
      );
      const carbIngredientName = carbIngredient ? carbIngredient.name : "";

      if (recipe.typeOfMeal === "breakfast") {
        const proteinAmount = Math.round(
          (props.proteinIntake * 0.15 * 100) / maxProteinAmount
        );
        const carbAmount = Math.round(
          (props.carbsIntake * 0.15 * 100) / maxCarbAmount
        );

        const isSelected = selectedRecipes.includes(recipe._id);

        return (
          <RecipeCard className={isSelected ? "selected" : "notSelected"}>
            <ImageDiv
              onClick={() => {
                const newSelectedRecipes = isSelected
                  ? selectedRecipes.filter(
                      (recipeId) => recipeId !== recipe._id
                    )
                  : [...selectedRecipes, recipe._id];
                setSelectedRecipes(newSelectedRecipes);
              }}
            ></ImageDiv>
            <LinkDiv to={`/indivRecipe/${recipe._id}`}>
              <Description
                key={recipe.id}
                onMouseEnter={() => handleMouseEnter(recipe)}
                onMouseLeave={() => handleMouseLeave()}
              >
                <RecipeTitle>{recipe.recipeName}</RecipeTitle>
                <>
                  {proteinIngredientName && (
                    <Ingredient>
                      {proteinIngredientName + " " + proteinAmount + "g"}
                    </Ingredient>
                  )}
                  {carbIngredientName && (
                    <Ingredient>
                      {carbIngredientName + " " + carbAmount + "g"}
                    </Ingredient>
                  )}
                </>
              </Description>
            </LinkDiv>
          </RecipeCard>
        );
      }
    });

  const [isHovering, setIsHovering] = React.useState(false);
  const [hoveredRecipe, setHoveredRecipe] = React.useState(null);

  const handleMouseEnter = (recipe) => {
    setIsHovering(true);
    setHoveredRecipe(recipe);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
    setHoveredRecipe(null);
  };

  const RecipesGridLunch = initialState
    .filter((recipe: any) => {
      // Check if the recipe contains any ingredients the user is allergic to
      const allergyIngredients = recipe.ingredients.flatMap((ingredient) => [
        ...ingredient.contains,
        ingredient.name,
      ]);
      const contains = props.allergyState.some((allergy) =>
        allergyIngredients.includes(allergy.toLowerCase())
      );
      return !contains;
    })
    .map((recipe: any) => {
      const proteinAmounts = recipe.ingredients.map(
        (ingredient) => ingredient.protein
      );
      const maxProteinAmount = Math.max(...proteinAmounts);

      const carbAmounts = recipe.ingredients.map(
        (ingredient) => ingredient.carbs
      );
      const maxCarbAmount = Math.max(...carbAmounts);

      const proteinIngredient = recipe.ingredients.find(
        (ingredient) => ingredient.protein === maxProteinAmount.toString()
      );
      const proteinIngredientName = proteinIngredient
        ? proteinIngredient.name
        : "";

      const carbIngredient = recipe.ingredients.find(
        (ingredient) => ingredient.carbs === maxCarbAmount.toString()
      );
      const carbIngredientName = carbIngredient ? carbIngredient.name : "";

      if (recipe.typeOfMeal === "meal") {
        const proteinAmount = Math.round(
          (props.proteinIntake * 0.55 * 100) / maxProteinAmount
        );
        const carbAmount = Math.round(
          (props.carbsIntake * 0.55 * 100) / maxCarbAmount
        );

        const isSelected = selectedRecipes.includes(recipe._id);

        return (
          <RecipeCard className={isSelected ? "selected" : "notSelected"}>
            <LinkDiv to={`/indivRecipe/${recipe._id}`}>
              <ImageDiv
                onClick={() => {
                  const newSelectedRecipes = isSelected
                    ? selectedRecipes.filter(
                        (recipeId) => recipeId !== recipe._id
                      )
                    : [...selectedRecipes, recipe._id];
                  setSelectedRecipes(newSelectedRecipes);
                }}
              ></ImageDiv>

              <Description
                key={recipe.id}
                onMouseEnter={() => handleMouseEnter(recipe)}
                onMouseLeave={() => handleMouseLeave()}
                className={isHovering ? "visible" : "notVisible"}
              >
                <RecipeTitle>{recipe.recipeName}</RecipeTitle>
                <>
                  {proteinIngredientName && (
                    <Ingredient>
                      {proteinIngredientName + " " + proteinAmount + "g"}
                    </Ingredient>
                  )}
                  {carbIngredientName && (
                    <Ingredient>
                      {carbIngredientName + " " + carbAmount + "g"}
                    </Ingredient>
                  )}
                </>
              </Description>
            </LinkDiv>
          </RecipeCard>
        );
      }
    });

  const RecipesGridDinner = initialState
    .filter((recipe: any) => {
      // Check if the recipe contains any ingredients the user is allergic to
      const allergyIngredients = recipe.ingredients.flatMap((ingredient) => [
        ...ingredient.contains,
        ingredient.name,
      ]);
      return !props.allergyState.some((allergy) =>
        allergyIngredients.includes(allergy.toLowerCase())
      );
    })
    .map((recipe: any) => {
      const proteinAmounts = recipe.ingredients.map(
        (ingredient) => ingredient.protein
      );
      const maxProteinAmount = Math.max(...proteinAmounts);

      const carbAmounts = recipe.ingredients.map(
        (ingredient) => ingredient.carbs
      );
      const maxCarbAmount = Math.max(...carbAmounts);

      const proteinIngredient = recipe.ingredients.find(
        (ingredient) => ingredient.protein === maxProteinAmount.toString()
      );
      const proteinIngredientName = proteinIngredient
        ? proteinIngredient.name
        : "";

      const carbIngredient = recipe.ingredients.find(
        (ingredient) => ingredient.carbs === maxCarbAmount.toString()
      );
      const carbIngredientName = carbIngredient ? carbIngredient.name : "";

      if (recipe.typeOfMeal === "meal") {
        const proteinAmount = Math.round(
          (props.proteinIntake * 0.3 * 100) / maxProteinAmount
        );
        const carbAmount = Math.round(
          (props.carbsIntake * 0.3 * 100) / maxCarbAmount
        );

        const isSelected = selectedRecipes.includes(recipe._id);

        return (
          <RecipeCard className={isSelected ? "selected" : "notSelected"}>
            <LinkDiv to={`/indivRecipe/${recipe._id}`}>
              <ImageDiv
                onClick={() => {
                  const newSelectedRecipes = isSelected
                    ? selectedRecipes.filter(
                        (recipeId) => recipeId !== recipe._id
                      )
                    : [...selectedRecipes, recipe._id];
                  setSelectedRecipes(newSelectedRecipes);
                }}
              ></ImageDiv>
              <Description
                key={recipe.id}
                onMouseEnter={() => handleMouseEnter(recipe)}
                onMouseLeave={() => handleMouseLeave()}
                className={isHovering ? "visible" : "notVisible"}
              >
                <RecipeTitle>{recipe.recipeName}</RecipeTitle>
                <>
                  {proteinIngredientName && (
                    <Ingredient>
                      {proteinIngredientName + " " + proteinAmount + "g"}
                    </Ingredient>
                  )}
                  {carbIngredientName && (
                    <Ingredient>
                      {carbIngredientName + " " + carbAmount + "g"}
                    </Ingredient>
                  )}
                </>
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
