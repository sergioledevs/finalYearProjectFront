import React from "react";
import axios from "axios";
import { useEffect } from "react";
import { Wrapper } from "./allergies.style";
import { useDispatch, connect } from "react-redux";

function AllergiesPage(props) {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [initialState, setInitialState] = React.useState([]);
  const [arrayAllergies, setArrayAlergies] = React.useState<string[]>([]);

  const dispatch = useDispatch();

  useEffect(() => {
    try {
      axios.get("http://localhost:9000/getIngredients").then((response) => {
        console.log(response.data);
        setInitialState(response.data);
      });
    } catch (error) {
      console.log("");
    }
  }, []);

  const addIngredient = () => {};

  const checkArray = () => {
    initialState.map((recipe: any) => {
      let name;
      // eslint-disable-next-line no-lone-blocks
      {
        if (arrayAllergies.includes(recipe.name)) {
          name = <div style={{ color: "red" }}>{recipe.name}</div>;
        } else {
          name = <div style={{ color: "green" }}>{recipe.name}</div>;
        }
      }
      return <div>{name}</div>;
    });
  };

  const CharactersGrid = initialState
    .filter((val: any) => {
      if (searchTerm === "") {
        return val;
      } else if (val.name.toLowerCase().startsWith(searchTerm.toLowerCase())) {
        return val;
      }
    })
    .map((recipe: any) => {
      return (
        <div onClick={() => console.log(arrayAllergies)}>
          <p
            onClick={() =>
              {dispatch({
                type: "ALLERGY_ING",
                payload: recipe.name,
              })
              recipe.style={color:"red"}
            }
            }
          >
            {recipe.name}
          </p>
        </div>
      );
    });

  return (
    <Wrapper>
      <input
        type="text"
        placeholder="Search..."
        onChange={(event) => {
          setSearchTerm(event.target.value);
        }}
      ></input>
      {CharactersGrid}
    </Wrapper>
  );
}

export default AllergiesPage;
