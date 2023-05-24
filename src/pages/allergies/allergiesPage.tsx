import React from "react";
import axios from "axios";
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
  const [searchTerm, setSearchTerm] = useState("");
  const [arrayAllergies, setArrayAlergies] = useState<string[]>([]);
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
  ]; //14 allergens list

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

 // Filter the initial array of allergens based on the search term
const filteredAllergens = initialState
.filter((allergen: string) => {
  return allergen.toLowerCase().startsWith(searchTerm.toLowerCase());
})
.slice(0, 8); // Take the first 8 filtered allergens

const AllergensGrid =
filteredAllergens.length === 0 ? ( // If there are no filtered allergens
  <h3>Allergy doesn't exist</h3> // Display a message indicating that the allergy doesn't exist
) : (
  filteredAllergens.map((allergen: string) => { // Map over the filtered allergens array
    const isSelected = arrayAllergies.includes(allergen); // Check if the allergen is selected (included in arrayAllergies)
    return (
      <div key={allergen}>
        <p
          onClick={() => {
            // Handle click event for selecting/deselecting allergens
            const newAllergies = isSelected
              ? arrayAllergies.filter((allergy) => allergy !== allergen) // If already selected, remove allergen from arrayAllergies
              : [...arrayAllergies, allergen]; // If not selected, add allergen to arrayAllergies
            setArrayAlergies(newAllergies); // Update the state with the new array of selected allergens

            if (isSelected || props.allergyState.includes(allergen)) {
              // If the allergen is already selected or included in the allergyState prop
              dispatch({
                type: "ALLERGY_DELETE", // Dispatch an action to delete the allergen from the state
                payload: allergen,
              });
            } else {
              // If the allergen is not selected or included in the allergyState prop
              dispatch({
                type: "ALLERGY_ADD", // Dispatch an action to add the allergen to the state
                payload: allergen,
              });
            }
          }}
          className={
            props.allergyState.includes(allergen)
              ? "selected" // Apply "selected" class if the allergen is included in the allergyState prop
              : "notSelected" // Apply "notSelected" class if the allergen is not included in the allergyState prop
          }
        >
          
          {allergen} {/*display the allergen name */}
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
          <AllergiesTitle>Do you have any allergies? If not, continue</AllergiesTitle>
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
