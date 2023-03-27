import React from "react";
import axios from "axios";
import { useEffect } from "react";
import { Wrapper, Grid } from "./allergies.style";
import { useDispatch, connect } from "react-redux";
import { useNavigate } from "react-router-dom";

function AllergiesPage(props) {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [initialState, setInitialState] = React.useState([]);
  const [arrayAllergies, setArrayAlergies] = React.useState<string[]>([]);

  const dispatch = useDispatch();
  const navigate = useNavigate();

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

  const handleSub = () => {
    navigate("/recipes")
  };


  const IngredientsGrid = initialState
    .filter((val: any) => {
      if (searchTerm === "") {
        return val;
      } else if (val.name.toLowerCase().startsWith(searchTerm.toLowerCase())) {
        return val;
      }
    })
    .map((recipe: any) => {
      var classChange = true;
      if (props.allergyState.includes(recipe.name)) {
        classChange = true;
      } else if (!props.allergyState.includes(recipe.name)) {
        classChange = !classChange;
      }
      return (
        <div>
          <p
            onClick={() => {
              setArrayAlergies(arrayAllergies.concat(recipe.name)); //weird stuff happening here, double check it
              if (props.allergyState.includes(recipe.name)) {
                dispatch({
                  type: "ALLERGY_DELETE",
                  payload: recipe.name,
                });
              } else {
                dispatch({
                  type: "ALLERGY_ADD",
                  payload: recipe.name,
                });
              }
            }}
            className={classChange ? "selected" : "notSelected"}
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
      <Grid>
        {IngredientsGrid}
      </Grid>
      <button>Go back</button>
      <button onClick={handleSub}>Continue</button>
    </Wrapper>
  );
}

interface RootState {
  allergyReducer: any;
}

const mapStateToProps = (state: RootState) => {
  return {
    allergyState: state.allergyReducer.allergyArray,
  };
};

export default connect(mapStateToProps)(AllergiesPage);
