import React from "react";
import axios from "axios";
import { useEffect } from "react";
import { Wrapper, Grid, WrapperBack } from "./allergies.style";
import { useDispatch, connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import NavBar from "../../components/navBar/navBar";
import { useState } from "react";

function AllergiesPage(props) {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [arrayAllergies, setArrayAlergies] = React.useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const initialState = [
    "Celery",
    "Gluten",
    "Crustaceans",
    "Eggs",
    "Fish",
    "Lupin",
    "Milk",
    "Molluscs",
    "Mustard",
    "Tree Nuts",
    "Peanuts",
    "Sesame Seeds",
    "Soybeans",
    "Sulphites",
  ];

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const postAllergies = () => {
    const token = localStorage.getItem('token');
    if(token!=null){
    axios.post("http://localhost:9000/saveAllergies", {
      arrayAllergies: props.allergyState,
      token: token
    }).then((response) => {
      console.log("Calendar data saved:", response.data);
    }).catch((error:any) => {
      console.log("Error saving calendar data:", error);
    });
    }
}

  const handleSub = () => {
    navigate("/recipes");
    postAllergies()
  };

  

  const AllergensGrid = initialState
    .filter((allergen: string) => {
      return allergen.toLowerCase().startsWith(searchTerm.toLowerCase());
    })
    .slice(0, 8)
    .map((allergen: string) => {
      const isSelected = arrayAllergies.includes(allergen);
      return (
        <div>
          <p
            onClick={() => {
              const newAllergies = isSelected
                ? arrayAllergies.filter((allergy) => allergy !== allergen)
                : [...arrayAllergies, allergen];
              setArrayAlergies(newAllergies);
              if (isSelected || props.allergyState.includes(allergen)) {
                dispatch({
                  type: "ALLERGY_DELETE",
                  payload: allergen,
                });
              } else {
                dispatch({
                  type: "ALLERGY_ADD",
                  payload: allergen,
                });
              }
            }}
            className={
              props.allergyState.includes(allergen) ? "selected" : "notSelected"
            }
          >
            {allergen}
          </p>
        </div>
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
          <Grid>{AllergensGrid}</Grid>
          
          <button onClick={handleSub}>Continue</button>
          <button onClick={()=>navigate("/home")}>Go back</button>
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
