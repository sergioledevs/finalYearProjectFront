import React from "react";
import axios from "axios";
import { useEffect } from "react";
import {
  Wrapper,
  Grid,
  WrapperBack,
  GoBackButton,
  SearchBar,
  AllergiesTitle,
  EatingIcon,
} from "./allergies.style";
import { useDispatch, connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import NavBar from "../../components/navBar/navBar";
import { useState } from "react";
import { GradientButton } from "../landingPage/landing.style";
import eatingMan from "../../media/lunchMan.png";

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
    const token = localStorage.getItem("token");
    if (token != null) {
      axios
        .post("https://finalyearprojectapi.onrender.com/saveAllergies", {
          arrayAllergies: props.allergyState,
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

  const handleSub = () => {
    navigate("/recipes");
    postAllergies();
  };

  const filteredAllergens = initialState
    .filter((allergen: string) => {
      return allergen.toLowerCase().startsWith(searchTerm.toLowerCase());
    })
    .slice(0, 8);

  const AllergensGrid =
    filteredAllergens.length === 0 ? (
      <h3>Allergy doesn't exist</h3>
    ) : (
      filteredAllergens.map((allergen: string) => {
        const isSelected = arrayAllergies.includes(allergen);
        return (
          <div key={allergen}>
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
                props.allergyState.includes(allergen)
                  ? "selected"
                  : "notSelected"
              }
            >
              {allergen}
            </p>
          </div>
        );
      })
    );

  return (
    <div>
      <NavBar></NavBar>
      <WrapperBack>
        <Wrapper>
          <AllergiesTitle>Do you have any allergies?</AllergiesTitle>
          <SearchBar
            type="text"
            placeholder="Search..."
            onChange={(event) => {
              setSearchTerm(event.target.value);
            }}
          ></SearchBar>
          <Grid>{AllergensGrid}</Grid>
          <GradientButton onClick={handleSub}>Finish</GradientButton>
          <GoBackButton onClick={() => navigate("/home")}>Go back</GoBackButton>
          <EatingIcon src={eatingMan}></EatingIcon>
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
