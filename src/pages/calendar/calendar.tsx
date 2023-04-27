import { connect } from "react-redux";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { CalendarTable } from "./calendar.style";

function Calendar(props) {
    const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  
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
      snacks: []
    });
  
    const [initialState, setInitialState] = React.useState<Recipe[]>([]);
  
    useEffect(() => {
      try {
        axios.get("https://finalyearprojectapi.onrender.com/getRecipes").then((response) => {
          console.log(response.data);
          setInitialState(response.data);
        });
      } catch (error) {
        console.log("");
      }
    }, []);
  
    const selected = props.selected?.map(id =>
      initialState.find(recipe => recipe._id === id)
    );
  
    useEffect(() => {
      const selected = props.selected?.map(id =>
        initialState.find(recipe => recipe._id === id)
      );
  
      // update selectedRecipes state
      const newSelectedRecipes = {
        breakfast: [],
        lunch: [],
        dinner: [],
        snacks: []
      };
  
      selected.forEach(recipe => {
        if (recipe) {
          const mealType = recipe.typeOfMeal;
          newSelectedRecipes[mealType].push(recipe);
        }
      });
  
      setSelectedRecipes(newSelectedRecipes);
    }, [props.selected, initialState]);
  
    console.log(selectedRecipes);
  
    const getSelectedRecipe = (mealType, dayIndex) => {
      const selectedRecipesForMeal = selectedRecipes[mealType];
      const recipeIndex = dayIndex % selectedRecipesForMeal.length;
      return selectedRecipesForMeal[recipeIndex];
    };
  
    return (
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
              {meals.map((meal) => (
                <td key={meal}>
                  {selectedRecipes[meal].length ? (
                    <Link to={`/indivRecipe/${getSelectedRecipe(meal, dayIndex)?._id}`} ><div>{getSelectedRecipe(meal, dayIndex)?.recipeName}</div></Link>
                  ) : (
                    <div>No recipe selected</div>
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </CalendarTable>
    );
  }
  
  interface RootState {
    selectedRecipesReducer:any;
  }
  
  const mapStateToProps = (state: RootState) => {
    return {
      selected: state.selectedRecipesReducer.selectedRecipes
    };
  };
  
  export default connect(mapStateToProps)(Calendar);
  