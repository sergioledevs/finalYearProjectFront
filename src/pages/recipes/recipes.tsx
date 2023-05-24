import React from "react";
import axios from "axios";
import { connect, useDispatch } from "react-redux";
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
  RecipeWrapper,
  BigWrapper,
  Header,
  FloatingText,
  DropdownMenu,
  MealInfo,
  MealInfoHeader,
  Text,
  MealInfoText,
  CreateCalendarButton,
} from "./recipes.style";
import NavBar from "../../components/navBar/navBar";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Footer from "../../components/footer/footer";
import Loader from "../../components/loader/loader";

function Recipes(props) {
  const [initialState, setInitialState] = React.useState([]);
  const [selectedRecipes, setSelectedRecipes] = React.useState<string[]>(
    props.recipesSelected
  );
  const [isHovering, setIsHovering] = React.useState(false);
  const [hoveredRecipe, setHoveredRecipe] = React.useState(null);
  const [loading, setLoading] = useState(true);
  const [userAllergies, setUserAllergies] = React.useState<string[]>([]);

  const [dropdownVisible, setDropdownVisible] = React.useState(false);

  const [calorieIntake, setCalorieIntake] = useState("");
  const [carbsIntake, setCarbsIntake] = useState("");
  const [proteinIntake, setProteinIntake] = useState("");

  const dispatch = useDispatch();

  const token = localStorage.getItem("token");

  const fetchAllergies = async () => {
    if (token != null) {
      try {
        const response = await axios.get(
          "https://finalyearprojectapi.onrender.com/getAllergies",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setUserAllergies(response.data.data.allergicTo);
      } catch (err: any) {
        console.log(err.response.data.message);
      }
    }
  };

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

  useEffect(() => {
    async function fetchData() {
      if (token != null) {
        try {
          const response = await axios.get(
            "https://finalyearprojectapi.onrender.com/getCalendarData",
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
          setSelectedRecipes(response.data.data.weeklyPlan);
        } catch (err: any) {
          console.log(err.response.data.message);
        }
      }
    }
    fetchData();
  }, []);

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
        console.log(err.response);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    fetchAllergies();
  }, []);

  const navigate = useNavigate();

  const postCalendar = () => {
    // Retrieve the token from the localStorage
    const token = localStorage.getItem("token");

    // Check if a token is available
    if (token != null) {
      // Send a POST request to the server endpoint
      axios
        .post("https://finalyearprojectapi.onrender.com/saveCalendarData", {
          selectedRecipes: selectedRecipes,
          token: token,
        })
        .then((response) => {
          // Log a success message and navigate to the calendar page
          console.log("Calendar data saved:", response.data);
          navigate("/calendar");
        })
        .catch((error: any) => {
          // Log an error message if there is an error saving the data
          console.log("Error saving calendar data:", error);
        });
    } else {
      // Show an alert message if the token is not available
      alert("You need to log in to create a weekly meal plan");
    }
  };

  let carbsInBreakfast;
  let proteinInBreakfast;

  let proteinInLunch;
  let carbsInLunch;

  let carbsInDinner;
  let proteinInDinner;

  const RecipesBreakfastGrid = initialState
    .filter((recipe: any) => {
      // Check if the recipe contains any ingredients the user is allergic to
      const allergyIngredients = recipe.allergens?.flatMap(
        (ingredient) => ingredient
      );
      const contains = props.allergyState.some((allergy) =>
        allergyIngredients?.includes(allergy.toLowerCase())
      );

      const userLoggedContains = userAllergies.some((allergy) =>
        allergyIngredients?.includes(allergy.toLowerCase())
      );

      if (token != null) {
        return !userLoggedContains;
      } else {
        return !contains;
      }
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
        var proteinIngredientAmount = 0;
        var carbIngredientAmount = 0;

        //use requierements if user is logged in
        if (token != null) {
          proteinIngredientAmount = Math.round(
            (parseInt(proteinIntake) * 0.15 * 100) / proteinPerHundredGrams
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

        Math.round((props.carbsIntake * 0.15 * 100) / carbsPerHundredGrams);

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
          <RecipeWrapper>
            <RecipeCard
              className={
                selectedRecipes.includes(recipe._id)
                  ? "selected"
                  : "notSelected"
              }
            >
              <Checkbox
                checked={isSelected}
                onClick={() => {
                  const newSelectedRecipes = isSelected
                    ? selectedRecipes.filter(
                        (recipeId) => recipeId !== recipe._id
                      )
                    : [...selectedRecipes, recipe._id];
                  setSelectedRecipes(newSelectedRecipes);
                  isSelected || props.recipesSelected.includes(recipe._id)
                    ? dispatch({
                        type: "RECIPES_DELETE",
                        payload: recipe._id,
                      })
                    : dispatch({
                        type: "SELECTED_RECIPES",
                        payload: recipe._id,
                      });
                }}
              />
              <LinkDiv to={`/indivRecipe/${recipe._id}`}>
                <ImageDiv>
                  <img src={recipe?.image} alt="image" />
                </ImageDiv>
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
              <Ingredient>{`Total Calories: ${totalCalories.toFixed(
                0
              )}`}</Ingredient>
            </Description>
          </RecipeWrapper>
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
      const allergyIngredients = recipe.allergens?.flatMap(
        (ingredient) => ingredient
      );
      const contains = props.allergyState.some((allergy) =>
        allergyIngredients?.includes(allergy.toLowerCase())
      );

      const userLoggedContains = userAllergies.some((allergy) =>
        allergyIngredients?.includes(allergy.toLowerCase())
      );

      if (token != null) {
        return !userLoggedContains;
      } else {
        return !contains;
      }
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

      var proteinIngredientAmount = 0;
      var carbIngredientAmount = 0;

      //use requierements if user is logged in
      if (token != null) {
        proteinIngredientAmount = Math.round(
          (parseInt(proteinIntake) * 0.5 * 100) / proteinPerHundredGrams
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

      proteinInLunch = (proteinIngredientAmount / 100) * proteinPerHundredGrams;
      carbsInLunch = (carbIngredientAmount / 100) * carbsPerHundredGrams;

      if (recipe.typeOfMeal === "lunch") {
        const isSelected = selectedRecipes.includes(recipe._id);

        const proteinIngredientCalories =
          proteinIngredient?.calories * (proteinIngredientAmount / 100) || 0;
        const carbIngredientCalories =
          carbIngredient?.calories * (carbIngredientAmount / 100) || 0;
        const totalCalories =
          proteinIngredientCalories + carbIngredientCalories;

        return (
          <RecipeWrapper>
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
                onClick={() => {
                  isSelected
                    ? dispatch({
                        type: "RECIPES_DELETE",
                        payload: recipe._id,
                      })
                    : dispatch({
                        type: "SELECTED_RECIPES",
                        payload: recipe._id,
                      });
                }}
              />
              <LinkDiv to={`/indivRecipe/${recipe._id}`}>
                <ImageDiv>
                  <img src={recipe?.image} alt="image"></img>
                </ImageDiv>
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
              <Ingredient>{`Total Calories: ${totalCalories.toFixed(
                0
              )}`}</Ingredient>
            </Description>
          </RecipeWrapper>
        );
      }
    });

  const RecipesGridDinner = initialState
    // Filter initial state of recipes based on user's allergies
    .filter((recipe: any) => {
      const allergyIngredients = recipe.allergens?.flatMap(
        (ingredient) => ingredient
      );
      const contains = props.allergyState.some((allergy) =>
        allergyIngredients?.includes(allergy.toLowerCase())
      );

      const userLoggedContains = userAllergies.some((allergy) =>
        allergyIngredients?.includes(allergy.toLowerCase())
      );

      if (token != null) {
        return !userLoggedContains;
      } else {
        return !contains;
      }
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
      var proteinIngredientAmount = 0;
      var carbIngredientAmount = 0;

      //use requierements if user is logged in
      if (token != null) {
        proteinIngredientAmount = Math.round(
          (parseInt(proteinIntake) * 0.35 * 100) / proteinPerHundredGrams
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
          <RecipeWrapper>
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
                onClick={() => {
                  isSelected
                    ? dispatch({
                        type: "RECIPES_DELETE",
                        payload: recipe._id,
                      })
                    : dispatch({
                        type: "SELECTED_RECIPES",
                        payload: recipe._id,
                      });
                }}
              />

              <LinkDiv to={`/indivRecipe/${recipe._id}`}>
                <ImageDiv>
                  <img src={recipe?.image} alt="image"></img>
                </ImageDiv>
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
              {/* Display total number of calories in protein and carbs */}
              <Ingredient>{`Total Calories: ${totalCalories.toFixed(
                0
              )}`}</Ingredient>
            </Description>
          </RecipeWrapper>
        );
      }
    });

  const RecipesSnacks = initialState
    // Filter initial state of recipes based on user's allergies
    .filter((recipe: any) => {
      const allergyIngredients = recipe.allergens?.flatMap(
        (ingredient) => ingredient
      );
      const contains = props.allergyState.some((allergy) =>
        allergyIngredients?.includes(allergy.toLowerCase())
      );

      const userLoggedContains = userAllergies.some((allergy) =>
        allergyIngredients?.includes(allergy.toLowerCase())
      );

      if (token != null) {
        return !userLoggedContains;
      } else {
        return !contains;
      }
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
      var proteinIngredientAmount = 0;
      var carbIngredientAmount = 0;

      //use requierements if user is logged in
      if (token != null) {
        proteinIngredientAmount = Math.round(
          (parseInt(proteinIntake) * 0.1 * 100) / proteinPerHundredGrams
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

      //if it is a meal, display the recipe
      if (recipe.typeOfMeal === "snacks") {
        const isSelected = selectedRecipes.includes(recipe._id);

        // Calculate total number of calories in protein and carbs
        const proteinIngredientCalories =
          proteinIngredient?.calories * (proteinIngredientAmount / 100) || 0;
        const carbIngredientCalories =
          carbIngredient?.calories * (carbIngredientAmount / 100) || 0;
        const totalCalories =
          proteinIngredientCalories + carbIngredientCalories;

        return (
          <RecipeWrapper>
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
                onClick={() => {
                  isSelected
                    ? dispatch({
                        type: "RECIPES_DELETE",
                        payload: recipe._id,
                      })
                    : dispatch({
                        type: "SELECTED_RECIPES",
                        payload: recipe._id,
                      });
                }}
              />

              <LinkDiv to={`/indivRecipe/${recipe._id}`}>
                <ImageDiv>
                  <img src={recipe?.image} alt="image"></img>
                </ImageDiv>
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
              {/* Display total number of calories in protein and carbs */}
              <Ingredient>{`Total Calories: ${totalCalories.toFixed(
                0
              )}`}</Ingredient>
            </Description>
          </RecipeWrapper>
        );
      }
    });

  var caloriesIntakeDropdown;
  var carbsIntakeDropdown;
  var proteinIntakeDropdown;

  //use requierements if user is logged in
  if (token != null) {
    caloriesIntakeDropdown = Math.round(parseInt(calorieIntake));
    carbsIntakeDropdown = Math.round(parseInt(carbsIntake));
    proteinIntakeDropdown = Math.round(parseInt(proteinIntake));
  } else {
    caloriesIntakeDropdown = Math.round(props?.caloriesIntake);
    carbsIntakeDropdown = Math.round(props?.carbsIntake);
    proteinIntakeDropdown = Math.round(props?.proteinIntake);
  }

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  return (
    <div>
      <NavBar></NavBar>
      {loading || initialState.length === 0 ? (
        <Loader />
      ) : (
        <BigWrapper>
          <FloatingText onClick={toggleDropdown}>
            See your daily requirements
          </FloatingText>
          <DropdownMenu visible={dropdownVisible}>
            <p>Calories: {caloriesIntakeDropdown}kcal</p>
            <p>Protein: {proteinIntakeDropdown}g</p>
            <p>Carbs: {carbsIntakeDropdown}g</p>
          </DropdownMenu>
          <Text onClick={toggleDropdown} visible={dropdownVisible}>
            <p>Hide requirements</p>
          </Text>

          <Header>
            <p>Breakfast</p>
            <p>Lunch</p>
            <p>Dinner</p>
            <p>Snacks</p>
          </Header>
          <MealInfoHeader>
            <MealInfo>
              <MealInfoText>
                {"Protein in breakfast: " +
                  proteinInBreakfast?.toFixed(0) +
                  "g"}
              </MealInfoText>
              <MealInfoText>
                {"Carbs in breakfast: " + carbsInBreakfast?.toFixed(0) + "g"}
              </MealInfoText>
            </MealInfo>
            <MealInfo>
              <MealInfoText>
                {"Protein in lunch: " + proteinInLunch?.toFixed(0) + "g"}
              </MealInfoText>
              <MealInfoText>
                {"Carbs in lunch: " + carbsInLunch?.toFixed(0) + "g"}
              </MealInfoText>
            </MealInfo>
            <MealInfo>
              <MealInfoText>
                {"Protein in dinner: " + proteinInDinner?.toFixed(0) + "g"}
              </MealInfoText>
              <MealInfoText>
                {"Carbs in dinner: " + carbsInDinner?.toFixed(0) + "g"}
              </MealInfoText>
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

          <CreateCalendarButton onClick={postCalendar}>
            Create weekly plan
          </CreateCalendarButton>
        </BigWrapper>
      )}
      <Footer></Footer>
    </div>
  );
}

//connect to the Redux state
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

export default connect(mapStateToProps)(Recipes);
