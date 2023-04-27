import React from "react";
import axios from "axios";
import { useEffect } from "react";
import { Wrapper, Grid, WrapperBack } from "./allergies.style";
import { useDispatch, connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import NavBar from "../../components/navBar/navBar";

function AllergiesPage(props) {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [initialState, setInitialState] = React.useState([]);
  const [arrayAllergies, setArrayAlergies] = React.useState<string[]>([]);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    try {
      axios.get("https://finalyearprojectapi.onrender.com/getIngredients").then((response) => {
        console.log(response.data);
        setInitialState(response.data);
      });
    } catch (error) {
      console.log("");
    }
  }, []);

  const handleSub = () => {
    navigate("/recipes");
  };

  const IngredientsGrid = initialState
  
  .filter((ingredient: any) => {
    if (searchTerm === "") {
      return true;
    } else {
      return ingredient.contains.some((containedIngredient: string) =>
        containedIngredient.toLowerCase().startsWith(searchTerm.toLowerCase())
      );
    }
  })
  .slice(0,7)
  .map((ingredient: any) => {
    const filteredContains = ingredient.contains.filter((containedIngredient: string) =>
      containedIngredient.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
      <>
        {filteredContains.map((containedIngredient: string) => {
          const isSelected = arrayAllergies.includes(containedIngredient);
          return (
            <div>
              <p
                onClick={() => {
                  const newAllergies = isSelected
                    ? arrayAllergies.filter(
                        (allergy) => allergy !== containedIngredient
                      )
                    : [...arrayAllergies, containedIngredient];
                  setArrayAlergies(newAllergies);
                  if (isSelected || props.allergyState.includes(containedIngredient)) {
                    dispatch({
                      type: "ALLERGY_DELETE",
                      payload: containedIngredient,
                    });
                  } else {
                    dispatch({
                      type: "ALLERGY_ADD",
                      payload: containedIngredient,
                    });
                  }
                }}
                className={
                  props.allergyState.includes(containedIngredient)
                    ? "selected"
                    : "notSelected"
                }
              >
                {containedIngredient}
              </p>
            </div>
          );
        })}
      </>
    );
  });

  return (
    <div>
      <NavBar></NavBar>
    <WrapperBack>
      
    <Wrapper>
      <h2>Do you have any allergies or dislike any ingredient?</h2>
      <input
        type="text"
        placeholder="Search..."
        onChange={(event) => {
          setSearchTerm(event.target.value);
        }}
      ></input>
      <Grid>{IngredientsGrid}</Grid>
      <button>Go back</button>
      <button onClick={handleSub}>Continue</button>
    </Wrapper>
    </WrapperBack>
    </div>
     
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
