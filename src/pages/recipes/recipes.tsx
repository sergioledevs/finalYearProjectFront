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
  Checkbox,
  Div2,
  BigWrapper,
  Header,
  FloatingText,
  MealInfo,
  MealInfoHeader,
  MealInfoText,
} from "./recipes.style";
import NavBar from "../../components/navBar/navBar";

function Recipes(props) {
  const [initialState, setInitialState] = React.useState([]);
  const [selectedRecipes, setSelectedRecipes] = React.useState<string[]>([]);
  const [isHovering, setIsHovering] = React.useState(false);
  const [hoveredRecipe, setHoveredRecipe] = React.useState(null);

  useEffect(() => {
    try {
      axios.get("http://localhost:9000/getRecipes").then((response) => {
        //console.log(response.data);
        setInitialState(response.data);
      });
    } catch (error) {
      //console.log("");
    }
  }, []);

  let carbsInBreakfast;
  let proteinInBreakfast;

  let proteinInLunch;
  let carbsInLunch;

  let carbsInDinner;
  let proteinInDinner;

  const RecipesBreakfastGrid = initialState
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
      const proteinIngredientName = proteinIngredient
        ? proteinIngredient.name
        : "";

      const carbIngredient = recipe.ingredients.find(
        (ingredient) => ingredient.carbs === carbsPerHundredGrams.toString()
      );
      const carbIngredientName = carbIngredient ? carbIngredient.name : "";

      if (recipe.typeOfMeal === "breakfast") {
        const proteinIngredientAmount = Math.round(
          (props.proteinIntake * 0.15 * 100) / proteinPerHundredGrams
        );
        const carbIngredientAmount = Math.round(
          (props.carbsIntake * 0.15 * 100) / carbsPerHundredGrams
        );

        proteinInBreakfast =
          (proteinIngredientAmount / 100) * proteinPerHundredGrams;
        carbsInBreakfast = (carbIngredientAmount / 100) * carbsPerHundredGrams;

        const isSelected = selectedRecipes.includes(recipe._id);

        const proteinIngredientCalories =
          proteinIngredient?.calories * (proteinIngredientAmount / 100) || 0;
        const carbIngredientCalories =
          carbIngredient?.calories * (carbIngredientAmount / 100) || 0;
        const totalCalories =
          proteinIngredientCalories + carbIngredientCalories;

        return (
          <Div2>
            <RecipeCard className={isSelected ? "selected" : "notSelected"}>
              <Checkbox
                checked={isSelected}
                onChange={() => {
                  // Update selected recipes
                  const newSelectedRecipes = isSelected
                    ? selectedRecipes.filter(
                        (recipeId) => recipeId !== recipe._id
                      )
                    : [...selectedRecipes, recipe._id];
                  setSelectedRecipes(newSelectedRecipes);
                }}
              />
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
              </LinkDiv>
            </RecipeCard>

            <Description
              key={recipe.id}
              onMouseEnter={() => handleMouseEnter(recipe)}
              onMouseLeave={() => handleMouseLeave()}
              //className={isHovering ? "visible" : "notVisible"}
            >
              <RecipeTitle>{recipe.recipeName}</RecipeTitle>
              <>
                {proteinIngredientName && (
                  <Ingredient>
                    {proteinIngredientName +
                      " " +
                      proteinIngredientAmount +
                      "g"}
                  </Ingredient>
                )}
                {carbIngredientName && (
                  <Ingredient>
                    {carbIngredientName + " " + carbIngredientAmount + "g"}
                  </Ingredient>
                )}
              </>
              <Ingredient>{`Total Calories: ${totalCalories.toFixed(0)}`}</Ingredient>
            </Description>
          </Div2>
        );
      }
    });

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
      const proteinIngredientName = proteinIngredient
        ? proteinIngredient.name
        : "";

      const carbIngredient = recipe.ingredients.find(
        (ingredient) => ingredient.carbs === carbsPerHundredGrams.toString()
      );
      const carbIngredientName = carbIngredient ? carbIngredient.name : "";

      const proteinIngredientAmount = Math.round(
        (props.proteinIntake * 0.5 * 100) / proteinPerHundredGrams
      );
      const carbIngredientAmount = Math.round(
        (props.carbsIntake * 0.5 * 100) / carbsPerHundredGrams
      );

      proteinInLunch = (proteinIngredientAmount / 100) * proteinPerHundredGrams;
      carbsInLunch = (carbIngredientAmount / 100) * carbsPerHundredGrams;

      if (recipe.typeOfMeal === "meal") {
        const isSelected = selectedRecipes.includes(recipe._id);

        const proteinIngredientCalories =
          proteinIngredient?.calories * (proteinIngredientAmount / 100) || 0;
        const carbIngredientCalories =
          carbIngredient?.calories * (carbIngredientAmount / 100) || 0;
        const totalCalories =
          proteinIngredientCalories + carbIngredientCalories;

        return (
          <Div2>
            <RecipeCard className={isSelected ? "selected" : "notSelected"}>
              <Checkbox
                checked={isSelected}
                onChange={() => {
                  // Update selected recipes
                  const newSelectedRecipes = isSelected
                    ? selectedRecipes.filter(
                        (recipeId) => recipeId !== recipe._id
                      )
                    : [...selectedRecipes, recipe._id];
                  setSelectedRecipes(newSelectedRecipes);
                }}
              />
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
              </LinkDiv>
            </RecipeCard>

            <Description
              key={recipe.id}
              onMouseEnter={() => handleMouseEnter(recipe)}
              onMouseLeave={() => handleMouseLeave()}
              //className={isHovering ? "visible" : "notVisible"}
            >
              <RecipeTitle>{recipe.recipeName}</RecipeTitle>
              <>
                {proteinIngredientName && (
                  <Ingredient>
                    {proteinIngredientName +
                      " " +
                      proteinIngredientAmount +
                      "g"}
                  </Ingredient>
                )}
                {carbIngredientName && (
                  <Ingredient>
                    {carbIngredientName + " " + carbIngredientAmount + "g"}
                  </Ingredient>
                )}
              </>
              <Ingredient>{`Total Calories: ${totalCalories.toFixed(0)}`}</Ingredient>
            </Description>
          </Div2>
        );
      }
    });

  const RecipesGridDinner = initialState
    // Filter initial state of recipes based on user's allergies
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
    // Map each recipe to a RecipeCard component to display
    .map((recipe: any) => {
      // Get the maximum protein and carb amounts of the recipe
      const proteinIngredientAmounts = recipe.ingredients.map(
        (ingredient) => ingredient.protein
      );
      const proteinPerHundredGrams = Math.max(...proteinIngredientAmounts);

      const carbIngredientAmounts = recipe.ingredients.map(
        (ingredient) => ingredient.carbs
      );
      const carbsPerHundredGrams = Math.max(...carbIngredientAmounts);

      // Get the ingredient with the highest protein amount
      const proteinIngredient = recipe.ingredients.find(
        (ingredient) => ingredient.protein === proteinPerHundredGrams.toString()
      );
      const proteinIngredientName = proteinIngredient
        ? proteinIngredient.name
        : "";

      // Get the ingredient with the highest carb amount
      const carbIngredient = recipe.ingredients.find(
        (ingredient) => ingredient.carbs === carbsPerHundredGrams.toString()
      );
      const carbIngredientName = carbIngredient ? carbIngredient.name : "";

      // Calculate the recommended amount of protein and carbs to consume
      const proteinIngredientAmount = Math.round(
        (props.proteinIntake * 0.35 * 100) / proteinPerHundredGrams
      );
      const carbIngredientAmount = Math.round(
        (props.carbsIntake * 0.35 * 100) / carbsPerHundredGrams
      );

      proteinInDinner =
        (proteinIngredientAmount / 100) * proteinPerHundredGrams;
      carbsInDinner = (carbIngredientAmount / 100) * carbsPerHundredGrams;

      //if it is a meal, display the recipe
      if (recipe.typeOfMeal === "dinner") {
        const isSelected = selectedRecipes.includes(recipe._id);

        // Calculate total number of calories in protein and carbs
        const proteinIngredientCalories =
          proteinIngredient?.calories * (proteinIngredientAmount / 100) || 0;
        const carbIngredientCalories =
          carbIngredient?.calories * (carbIngredientAmount / 100) || 0;
        const totalCalories =
          proteinIngredientCalories + carbIngredientCalories;

        return (
          <Div2>
            <RecipeCard className={isSelected ? "selected" : "notSelected"}>
              <Checkbox
                checked={isSelected}
                onChange={() => {
                  // Update selected recipes
                  const newSelectedRecipes = isSelected
                    ? selectedRecipes.filter(
                        (recipeId) => recipeId !== recipe._id
                      )
                    : [...selectedRecipes, recipe._id];
                  setSelectedRecipes(newSelectedRecipes);
                }}
              />

              <LinkDiv to={`/indivRecipe/${recipe._id}`}>
                <ImageDiv
                  onClick={() => {
                    // Update selected recipes
                    const newSelectedRecipes = isSelected
                      ? selectedRecipes.filter(
                          (recipeId) => recipeId !== recipe._id
                        )
                      : [...selectedRecipes, recipe._id];
                    setSelectedRecipes(newSelectedRecipes);
                  }}
                ></ImageDiv>
              </LinkDiv>
            </RecipeCard>
            <Description
              key={recipe.id}
              onMouseEnter={() => handleMouseEnter(recipe)}
              onMouseLeave={() => handleMouseLeave()}
              className={isHovering ? "visible" : "notVisible"}
            >
              <RecipeTitle>{recipe.recipeName}</RecipeTitle>
              <>
                {/* Display the ingredient with the highest protein amount */}
                {proteinIngredientName && (
                  <Ingredient>
                    {proteinIngredientName + " " + proteinIngredientAmount + "g"}
                  </Ingredient>
                )}
                {carbIngredientName && (
                  <Ingredient>
                    {carbIngredientName + " " + carbIngredientAmount + "g"}
                  </Ingredient>
                )}
              </>
              {/* Display total number of calories in protein and carbs */}
              <Ingredient>{`Total Calories: ${totalCalories.toFixed(0)}`}</Ingredient>
            </Description>
          </Div2>
        );
      }
    });

  const RecipesSnacks = initialState
    // Filter initial state of recipes based on user's allergies
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
    // Map each recipe to a RecipeCard component to display
    .map((recipe: any) => {
      // Get the maximum protein and carb amounts of the recipe
      const proteinIngredientAmounts = recipe.ingredients
        .map((ingredient) => parseFloat(ingredient.protein))
        .filter((value) => !isNaN(value));
      const proteinPerHundredGrams = proteinIngredientAmounts.length
        ? Math.max(...proteinIngredientAmounts)
        : 0;

      const carbIngredientAmounts = recipe.ingredients
        .map((ingredient) => parseFloat(ingredient.carbs))
        .filter((value) => !isNaN(value));
      const carbsPerHundredGrams = carbIngredientAmounts.length
        ? Math.max(...carbIngredientAmounts)
        : 0;

      // Get the ingredient with the highest protein amount
      const proteinIngredient = recipe.ingredients.find(
        (ingredient) => ingredient.protein === proteinPerHundredGrams.toString()
      );
      const proteinIngredientName = proteinIngredient
        ? proteinIngredient.name
        : "";

      // Get the ingredient with the highest carb amount
      const carbIngredient = recipe.ingredients.find(
        (ingredient) => ingredient.carbs === carbsPerHundredGrams.toString()
      );
      const carbIngredientName = carbIngredient ? carbIngredient.name : "";

      //if it is a meal, display the recipe
      if (recipe.typeOfMeal === "snack") {
        // Calculate the recommended amount of protein and carbs to consume
        const proteinIngredientAmount = Math.round(
          (props.proteinIntake * 0.1 * 100) / proteinPerHundredGrams
        );
        const carbIngredientAmount = Math.round(
          (props.carbsIntake * 0.1 * 100) / carbsPerHundredGrams
        );

        const proteinInRecipe =
          (proteinIngredientAmount / 100) * proteinPerHundredGrams;
        const carbsInRecipe =
          (carbIngredientAmount / 100) * carbsPerHundredGrams;

        const isSelected = selectedRecipes.includes(recipe._id);

        // Calculate total number of calories in protein and carbs
        const proteinIngredientCalories =
          proteinIngredient?.calories * (proteinIngredientAmount / 100) || 0;
        const carbIngredientCalories =
          carbIngredient?.calories * (carbIngredientAmount / 100) || 0;
        const totalCalories =
          proteinIngredientCalories + carbIngredientCalories;

        return (
          <Div2>
            <RecipeCard className={isSelected ? "selected" : "notSelected"}>
              <Checkbox
                checked={isSelected}
                onChange={() => {
                  // Update selected recipes
                  const newSelectedRecipes = isSelected
                    ? selectedRecipes.filter(
                        (recipeId) => recipeId !== recipe._id
                      )
                    : [...selectedRecipes, recipe._id];
                  setSelectedRecipes(newSelectedRecipes);
                }}
              />
              <LinkDiv to={`/indivRecipe/${recipe._id}`}>
                <ImageDiv></ImageDiv>
              </LinkDiv>
            </RecipeCard>
            <Description
              key={recipe.id}
              onMouseEnter={() => handleMouseEnter(recipe)}
              onMouseLeave={() => handleMouseLeave()}
              className={isHovering ? "visible" : "notVisible"}
            >
              <RecipeTitle>{recipe.recipeName}</RecipeTitle>
              <>
                {/* Display the ingredient with the highest protein amount */}
                {proteinIngredientName && (
                  <Ingredient>
                    {proteinIngredientName + " " + proteinIngredientAmount + "g"}
                  </Ingredient>
                )}
                {carbIngredientName && (
                  <Ingredient>
                    {carbIngredientName + " " + carbIngredientAmount + "g"}
                  </Ingredient>
                )}
              </>
              {/* Display total number of calories in protein and carbs */}
              <Ingredient>{`Total Calories: ${totalCalories.toFixed(0)}`}</Ingredient>
            </Description>
          </Div2>
        );
      }
    });

  return (
    <BigWrapper>
      <NavBar></NavBar>
      <FloatingText>See your requirements</FloatingText>
      <Header>
        <p>Breakfast</p>
        <p>Lunch</p>
        <p>Dinner</p>
        <p>Snacks</p>
      </Header>
      <MealInfoHeader>
        <MealInfo>
          <MealInfoText>{"Protein in breakfast: " + proteinInBreakfast?.toFixed(0) + "g"}</MealInfoText>
          <MealInfoText>{"Carbs in breakfast: " + carbsInBreakfast?.toFixed(0) + "g"}</MealInfoText>
        </MealInfo>
        <MealInfo>
          <MealInfoText>{"Protein in lunch: " + proteinInLunch?.toFixed(0) + "g"}</MealInfoText>
          <MealInfoText>{"Carbs in lunch: " + carbsInLunch?.toFixed(0) + "g"}</MealInfoText>
        </MealInfo>
        <MealInfo>
          <MealInfoText>{"Protein in dinner: " + proteinInDinner?.toFixed(0) + "g"}</MealInfoText>
          <MealInfoText>{"Carbs in dinner: " + carbsInDinner?.toFixed(0) + "g"}</MealInfoText>
        </MealInfo>
        <MealInfo>
          <p></p>
          <p></p>
        </MealInfo>
      </MealInfoHeader>
      <Wrapper>
        <BigDiv>
          <SmallDiv>{RecipesBreakfastGrid}</SmallDiv>
        </BigDiv>
        <BigDiv>
          <SmallDiv>{RecipesGridLunch}</SmallDiv>
        </BigDiv>
        <BigDiv>
          <SmallDiv>{RecipesGridDinner}</SmallDiv>
        </BigDiv>
        <BigDiv>
          <SmallDiv>{RecipesSnacks}</SmallDiv>
        </BigDiv>
      </Wrapper>
    </BigWrapper>
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
