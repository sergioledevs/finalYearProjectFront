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
  Div2,
  BigWrapper,
  Header,
  FloatingText,
  DropdownMenu,
  MealInfo,
  MealInfoHeader,
  Text,
  MealInfoText,
  CreateCalendarButton,
  LinkCalendar,
} from "./recipes.style";
import NavBar from "../../components/navBar/navBar";
import Calendar from "../calendar/calendar";
import { Link } from "react-router-dom";
import { useState } from "react";
import Footer from "../../components/footer/footer";

function Recipes(props) {
  const [initialState, setInitialState] = React.useState([]);
  const [selectedRecipes, setSelectedRecipes] = React.useState<string[]>([]);
  const [isHovering, setIsHovering] = React.useState(false);
  const [hoveredRecipe, setHoveredRecipe] = React.useState(null);
  const [loading, setLoading] = useState(true);
  const [userAllergies, setUserAllergies] = React.useState<string[]>([]);

  const dispatch = useDispatch();

  const fetchAllergies = async () => {
    if (token != null) {
      try {
        const response = await axios.get("http://localhost:9000/getAllergies", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUserAllergies(response.data.data.allergicTo);
      } catch (err: any) {
        console.log(err.response.data.message);
      }
    }
  };

  const [calorieIntake, setCalorieIntake] = useState("");
  const [carbsIntake, setCarbsIntake] = useState("");
  const [proteinIntake, setProteinIntake] = useState("");

  useEffect(() => {
    async function fetchData() {
      if (token != null) {
        try {
          const response = await axios.get("http://localhost:9000/userData", {
            headers: { Authorization: `Bearer ${token}` },
          });
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
    try {
      axios
        .get("https://finalyearprojectapi.onrender.com/getRecipes")
        .then((response) => {
          setInitialState(response.data);
        });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAllergies();
  }, []);

  const token = localStorage.getItem("token");

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
                <ImageDiv
                  onClick={() => {
                    const newSelectedRecipes = isSelected
                      ? selectedRecipes.filter(
                          (recipeId) => recipeId !== recipe._id
                        )
                      : [...selectedRecipes, recipe._id];
                    setSelectedRecipes(newSelectedRecipes);
                  }}
                >
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
                <ImageDiv
                  onClick={() => {
                    const newSelectedRecipes = isSelected
                      ? selectedRecipes.filter(
                          (recipeId) => recipeId !== recipe._id
                        )
                      : [...selectedRecipes, recipe._id];
                    setSelectedRecipes(newSelectedRecipes);
                  }}
                >
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
          </Div2>
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
                >
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
          </Div2>
        );
      }
    });

  const RecipesSnacks = initialState
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
      return (
        (token != null ? !userLoggedContains : !contains) &&
        recipe.typeOfMeal === "snacks"
      );
    })
    .map((recipe: any) => {
      const { ingredients } = recipe;
      const proteinIngredient = ingredients.reduce(
        (prev, current) =>
          parseFloat(prev.protein) > parseFloat(current.protein)
            ? prev
            : current,
        {}
      );
      const proteinPerHundredGrams = parseFloat(proteinIngredient.protein) || 0;
      const carbIngredient = ingredients.reduce(
        (prev, current) =>
          parseFloat(prev.carbs) > parseFloat(current.carbs) ? prev : current,
        {}
      );
      const carbsPerHundredGrams = parseFloat(carbIngredient.carbs) || 0;

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

      const isSelected = selectedRecipes.includes(recipe._id);

      const proteinIngredientCalories =
        proteinIngredient.calories * (proteinIngredientAmount / 100) || 0;
      const carbIngredientCalories =
        carbIngredient.calories * (carbIngredientAmount / 100) || 0;
      const totalCalories = proteinIngredientCalories + carbIngredientCalories;

      return (
        <Div2 key={recipe._id}>
          <RecipeCard className={isSelected ? "selected" : "notSelected"}>
            <Checkbox
              checked={isSelected}
              onChange={() => {
                const newSelectedRecipes = isSelected
                  ? selectedRecipes.filter(
                      (recipeId) => recipeId !== recipe._id
                    )
                  : [...selectedRecipes, recipe._id];
                setSelectedRecipes(newSelectedRecipes);
              }}
            />
            <LinkDiv to={`/indivRecipe/${recipe._id}`}>
              <ImageDiv>
                <img src={recipe?.image} alt="image"></img>
              </ImageDiv>
            </LinkDiv>
          </RecipeCard>
          <Description
            onMouseEnter={() => handleMouseEnter(recipe)}
            onMouseLeave={() => handleMouseLeave()}
          >
            <RecipeTitle>{recipe.recipeName}</RecipeTitle>
            {proteinIngredient.name && (
              <Ingredient>
                {proteinIngredient.name + " " + proteinIngredientAmount + "g"}
              </Ingredient>
            )}
            {carbIngredient.name && (
              <Ingredient>
                {carbIngredient.name + " " + carbIngredientAmount + "g"}
              </Ingredient>
            )}
            <Ingredient>{`Total Calories: ${totalCalories.toFixed(
              0
            )}`}</Ingredient>
          </Description>
        </Div2>
      );
    });

  const postCalendar = () => {
    const token = localStorage.getItem("token");
    if (token != null) {
      axios
        .post("http://localhost:9000/saveCalendarData", {
          selectedRecipes: selectedRecipes,
          token: token,
        })
        .then((response) => {
          console.log("Calendar data saved:", response.data);
        })
        .catch((error: any) => {
          console.log("Error saving calendar data:", error);
        });
    }
  };

  const [dropdownVisible, setDropdownVisible] = React.useState(false);

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
        <BigDiv>
          <p>Loading...</p>
        </BigDiv>
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
          <LinkCalendar to={`/calendar`}>
            <CreateCalendarButton onClick={postCalendar}>
              Create weekly plan
            </CreateCalendarButton>
          </LinkCalendar>
        </BigWrapper>
      )}
      <Footer></Footer>
    </div>
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
    caloriesIntake: state.UserInfo.caloriesIntake,
    allergyState: state.allergyReducer.allergyArray,
  };
};

export default connect(mapStateToProps)(Recipes);
