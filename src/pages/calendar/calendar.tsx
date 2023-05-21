import { connect } from "react-redux";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { CalendarTable, Wrapper } from "./calendar.style";
import NavBar from "../../components/navBar/navBar";
import Loader from "../../components/loader/loader";
import { BackButton } from "../profile/profile.styles";

function Calendar(props) {
  const daysOfWeek = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  const meals = ["breakfast", "lunch", "dinner", "snacks"];

  interface Recipe {
    _id: string;
    recipeName: string;
    typeOfMeal: string;
    ingredients: any;
  }

  const [selectedRecipes, setSelectedRecipes] = useState({
    breakfast: [],
    lunch: [],
    dinner: [],
    snacks: [],
  });

  const [initialState, setInitialState] = React.useState<Recipe[]>([]);

  const [planStored, setPlanStored] = React.useState<[]>([]);
  const [isReady, setIsReady] = useState(false);

  //get all the recipes
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

  const token = localStorage.getItem("token");

  //get user data in order to fetch their updated calendar
  const fetchCalendarData = async () => {
    try {
      const response = await axios.get(
        "https://finalyearprojectapi.onrender.com/getCalendarData",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setPlanStored(response.data.data.weeklyPlan);
    } catch (err: any) {
      console.log(err.response.data.message);
    }
  }
  //if user is logged in, load their previous calendar, if hes not, load a new calendar
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsReady(false);
      fetchCalendarData();
    } else {
      const selected = props.selected?.map((id) =>
        initialState.find((recipe) => recipe._id === id)
      );

      // update selectedRecipes state
      const newSelectedRecipes = {
        breakfast: [],
        lunch: [],
        dinner: [],
        snacks: [],
      };

      selected.forEach((recipe) => {
        if (recipe) {
          const mealType = recipe.typeOfMeal;
          newSelectedRecipes[mealType].push(recipe);
        }
      });

      setSelectedRecipes(newSelectedRecipes);
    }
  }, [props.selected, initialState]);

  useEffect(() => {
    const selected = planStored.map((id) =>
      initialState.find((recipe) => recipe._id === id)
    );

    const newSelectedRecipes = {
      breakfast: [],
      lunch: [],
      dinner: [],
      snacks: [],
    };

    selected.forEach((recipe) => {
      if (recipe) {
        const mealType = recipe.typeOfMeal;
        newSelectedRecipes[mealType].push(recipe);
      }
    });

    setSelectedRecipes(newSelectedRecipes);
    setIsReady(true);
  }, [planStored, initialState]);

  const navigate = useNavigate();

  const getSelectedRecipe = (mealType, dayIndex) => {
    // Get the array of selected recipes for the specified meal type
    const selectedRecipesForMeal = selectedRecipes[mealType];
  
    // Calculate the index of the recipe based on the day index
    const recipeIndex = dayIndex % selectedRecipesForMeal.length;
  
    // Return the selected recipe for the specified meal and day
    return selectedRecipesForMeal[recipeIndex];
  };
  
  // Check if the initialState array is empty
  if (initialState.length === 0) {
    // Render a loading state if the initialState is empty
    return (
      <div>
        <NavBar></NavBar>
        <Loader></Loader>
      </div>
    );
  } else {
    // Render the calendar table and recipes
    return (
      <Wrapper>
        <NavBar></NavBar>
        <CalendarTable>
          <thead>
            <tr>
              <th></th>
              {/* Render table header for each meal */}
              {meals.map((meal) => (
                <th key={meal}>{meal}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {/* Render rows for each day of the week */}
            {daysOfWeek.map((day, dayIndex) => (
              <tr key={day}>
                <td>{day}</td>
                {/* Render cells for each meal of the day */}
                {meals?.map((meal) => (
                  <td key={meal}>
                    {/* Check if a recipe is selected for the meal */}
                    {selectedRecipes[meal]?.length ? (
                      // Render a link to the individual recipe page
                      <Link
                        to={`/indivRecipe/${
                          getSelectedRecipe(meal, dayIndex)?._id
                        }`}
                      >
                        <div>
                          {/* Display the name of the selected recipe */}
                          {getSelectedRecipe(meal, dayIndex)?.recipeName}
                        </div>
                      </Link>
                    ) : (
                      // If no recipe is selected, display a message
                      <div>No recipe selected</div>
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </CalendarTable>
        <BackButton
          style={{ marginTop: "20px" }}
          onClick={() => navigate("/recipes")}
        >
          Back to recipes
        </BackButton>
      </Wrapper>
    );
  }
}

interface RootState {
  selectedRecipesReducer: any;
}

const mapStateToProps = (state: RootState) => {
  return {
    selected: state.selectedRecipesReducer.selectedRecipes,
  };
};

export default connect(mapStateToProps)(Calendar);
