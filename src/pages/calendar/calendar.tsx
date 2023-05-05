import { connect } from "react-redux";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { CalendarTable, Wrapper } from "./calendar.style";
import NavBar from "../../components/navBar/navBar";

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
    try {
      axios
        .get("https://finalyearprojectapi.onrender.com/getRecipes")
        .then((response) => {
          setInitialState(response.data);
        });
    } catch (error) {
      console.log("");
    }
  }, []);

  const token = localStorage.getItem("token");

  //get user data in order to fetch their updated calendar
  const fetchCalendarData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:9000/getCalendarData",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setPlanStored(response.data.data.weeklyPlan);

      const selected = planStored
        ? planStored.map((id) =>
            initialState.find((recipe) => recipe._id === id)
          )
        : [];

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
    } catch (err: any) {
      console.log(err.response.data.message);
    } finally {
      setIsReady(true);
    }
  };

  //if user is logged in, load their previous calendar, if hes not, load a new calendar
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
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

  const getSelectedRecipe = (mealType, dayIndex) => {
    const selectedRecipesForMeal = selectedRecipes[mealType];
    const recipeIndex = dayIndex % selectedRecipesForMeal.length;
    return selectedRecipesForMeal[recipeIndex];
  };
  console.log(planStored);
  if (!isReady) {
    return <div>Loading...</div>;
  } else {
    return (
      <Wrapper>
        <NavBar></NavBar>
      <CalendarTable>
        <thead>
          <tr>
            <th></th>
            {meals.map((meal) => (
              <th key={meal}>{meal}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {daysOfWeek.map((day, dayIndex) => (
            <tr key={day}>
              <td>{day}</td>
              {meals?.map((meal) => (
                <td key={meal}>
                  {selectedRecipes[meal]?.length ? (
                    <Link
                      to={`/indivRecipe/${
                        getSelectedRecipe(meal, dayIndex)?._id
                      }`}
                    >
                      <div>{getSelectedRecipe(meal, dayIndex)?.recipeName}</div>
                    </Link>
                  ) : (
                    <div>No recipe selected</div>
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </CalendarTable>
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
