import React from "react";
import axios from "axios";
import { useEffect } from "react";
import { BigDiv, RecipeCard, LinkDiv, Wrapper, SmallDiv, Description, ImageDiv } from "./recipes.style";

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

  const RecipesGrid = initialState.map((recipe: any) => {
    if (recipe.typeOfMeal === "meal") {
      return (
        <RecipeCard>
          <LinkDiv href="#">
          <ImageDiv></ImageDiv>
            <Description>
            <p>{recipe.recipeName}</p>
            {recipe.ingredients.map(ingredient => <p>{ingredient.name}</p>)}
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
          {RecipesGrid}
        </SmallDiv>
      </BigDiv>
      <BigDiv>
        <SmallDiv> 
          <h3>Dinner</h3> 
          {RecipesGrid}
        </SmallDiv>
      </BigDiv>
    </Wrapper>
  );
}

export default Recipes;
