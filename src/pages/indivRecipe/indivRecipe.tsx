import React from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import NavBar from "../../components/navBar/navBar";
import {
  BigDiv,
  FloatingText,
  DropdownMenu,
  Text,
  RightDiv,
  RecipeTitle,
  DropdownText,
  Arrow,
  RecipeImage,
  Dropdown,
} from "../indivRecipe/indivRecipe.style";
import arrow from "../../media/downArrow.png";
import Footer from "../../components/footer/footer";
import Loader from "../../components/loader/loader";

function IndivRecipe(props) {
  interface Recipe {
    _id: string;
    recipeName: string;
    ingredients: any;
    stepsToCook: any;
    image: any;
  }

  const { id } = useParams();

  const [initialState, setInitialState] = React.useState<Recipe[]>([]);
  const [dropdownStepsVisible, setDropdownStepsVisible] = React.useState(true);
  const [dropdownIngredientsVisible, setDropdownIngredientsVisible] =
    React.useState(true);
  const [dropdownValuesVisible, setDropdownValuesVisible] =
    React.useState(true);

    const token= localStorage.getItem('token')

    useEffect(() => {
      async function fetchData() {
          try {
            const response = await axios.get("http://localhost:9000/getRecipes", {
              headers: { Authorization: `Bearer ${token}`, 'Access-Control-Allow-Origin': 'http://localhost:3000' },
            });
            setInitialState(response.data);
          } catch (err: any) {
            console.log(err.response.data.message);
          } 
       
      }
      fetchData();
    }, []);

  const recipe = initialState.find((recipe) => recipe._id === id);

  if (!recipe) {
    return <Loader/>
  }

  const toggleDropdownSteps = () => {
    setDropdownStepsVisible(!dropdownStepsVisible);
  };

  const toggleDropdownIngredients = () => {
    setDropdownIngredientsVisible(!dropdownIngredientsVisible);
  };

  const toggleDropdownValues = () => {
    setDropdownValuesVisible(!dropdownValuesVisible);
  };

  function getIngredientParagraphs(recipe) {
    return recipe.ingredients.map((ingredient) => {
      return (
        <Text visible={dropdownIngredientsVisible}>{ingredient.name}</Text>
      );
    });
  }

  function getStepsParagraphs(recipe) {
    return recipe.stepsToCook.map((step, index) => {
      return (
        <Text key={index} visible={dropdownStepsVisible}>
          {index + 1}. {step}
        </Text>
      );
    });
  }

  function getValuesParagraphs(recipe) {
    return recipe.stepsToCook.map((values) => {
      return <Text visible={dropdownValuesVisible}>{values}</Text>;
    });
  }

  const ingredientParagraphs = recipe ? getIngredientParagraphs(recipe) : null;
  const stepsParagraphs = recipe ? getStepsParagraphs(recipe) : null;
  const valuesParagraphs = recipe ? getValuesParagraphs(recipe) : null;

  console.log(ingredientParagraphs);

  return (
    <div>
      <BigDiv>
        <NavBar></NavBar>

        <RecipeImage
          src={recipe.image}
          alt={recipe.recipeName + " image"}
        ></RecipeImage>
        <RightDiv>
          <RecipeTitle>{recipe.recipeName}</RecipeTitle>

          <Dropdown visible={dropdownStepsVisible}>
            <DropdownText onClick={toggleDropdownSteps}>
              Steps to cook
              <Arrow src={arrow}></Arrow>
            </DropdownText>
          </Dropdown>

          <DropdownMenu visible={dropdownStepsVisible}>
            {stepsParagraphs}
          </DropdownMenu>

          <Dropdown visible={dropdownIngredientsVisible}>
            <DropdownText onClick={toggleDropdownIngredients}>
              Ingredients
              <Arrow src={arrow}></Arrow>
            </DropdownText>
            <DropdownMenu visible={dropdownIngredientsVisible}>
              {ingredientParagraphs}
            </DropdownMenu>
          </Dropdown>

          <Dropdown visible={dropdownValuesVisible}>
            <DropdownText onClick={toggleDropdownValues}>
              Nutritional values
              <Arrow src={arrow}></Arrow>
            </DropdownText>
            <DropdownMenu visible={dropdownValuesVisible}>
              {valuesParagraphs}
            </DropdownMenu>
          </Dropdown>
        </RightDiv>
      </BigDiv>
      <Footer></Footer>
    </div>
  );
}

export default IndivRecipe;
