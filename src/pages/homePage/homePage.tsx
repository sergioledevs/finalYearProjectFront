import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useForm, SubmitHandler } from "react-hook-form";
import {
  BigDiv,
  FormDiv,
  StyledForm,
  StyledInput,
  WeightInputGroupTextLeft,
  InputFormControl,
  WeightInputGroupTextRight,
  InputGroupCustom,
  InputFormSelect,
  AgeFormControl,
  ChefIcon,
  RunnerIcon,
} from "./home.style";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";
import Form2 from "../whatMeal/typeOfMeal";
import Button from "react-bootstrap/Button";
import { FormGroup } from "react-bootstrap";
import { Navigate, useNavigate } from "react-router-dom";
import { useDispatch, connect } from "react-redux";
import axios from "axios";
import { useEffect } from "react";
import { userWeight } from "./home.actions";

import NavBar from "../../components/navBar/navBar";
import { GradientButton } from "../landingPage/landing.style";
import chef from "../../media/icons/Chef_Flatline.png";
import runner from "../../media/icons/Fitness_Flatline.png";
import { FeatureTitle } from "../../components/featuresSection/features.styles";

type StyledInputs = {
  height: Number;
  weight: Number;
  levelOfActive: String;
  heightUnits: String;
  weightUnits: String;
  Form?: React.ReactNode;
};

function HomePage(props: StyledInputs) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<StyledInputs>();

  const dispatch = useDispatch();

  const [validated, setValidated] = React.useState(false);
  const [gender, setGender] = React.useState("");
  const [height, setHeight] = React.useState("");
  const [weight, setWeight] = React.useState("");
  const [age, setAge] = React.useState("");
  const [levelOfActive, setLevelOfActive] = React.useState("");
  const [userGoal, setUserGoal] = React.useState("");

  var [calorieIntake, setCalorieIntake] = React.useState("");
  var [proteinIntake, setProteinIntake] = React.useState("0");
  var [carbsIntake, setCarbsIntake] = React.useState("0");

  const [initialState, setInitialState] = React.useState([]);

  const navigate = useNavigate();

  const accessToken = localStorage.getItem("token");

  const handleSub = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();

      console.log("check validity false");
    } else {
      calculateCalories();
      dispatch({
        type: "USER_WEIGHT",
        payload: weight,
      });
      dispatch({
        type: "USER_HEIGHT",
        payload: height,
      });
      dispatch({
        type: "USER_AGE",
        payload: age,
      });
      dispatch({
        type: "LEVEL_ACTIVITY",
        payload: levelOfActive,
      });

      console.log("check validity true");

      const userData = {
        gender,
        height,
        weight,
        levelOfActive,
        userGoal,
        age,
        accessToken,
        calorieIntake,
        proteinIntake,
        carbsIntake,
      };

      if (accessToken !== undefined) {
        try {
          const response = await axios.post(
            "https://finalyearprojectapi.onrender.com/userData",
            userData
          );
          console.log(response.data);
        } catch (error: any) {
          console.log(error.response.data);
        }
      }
      navigate("/allergies");
    }

    //registerUser();
    setValidated(true);
  };

  useEffect(() => {
    try {
      axios
        .get("https://finalyearprojectapi.onrender.com/getDatabase")
        .then((response) => {
          console.log(response.data);
          setInitialState(response.data);
        });
    } catch (error) {
      console.log("");
    }
  }, []);

  const calculateCalories = () => {
    //https://www.omnicalculator.com/health/bmr-harris-benedict-equation#:~:text=It%20needs%20your%20age%2C%20weight,%2D%20(6.75%20%C3%97%20age)%20.
    var levelOfActivityMultiplier = 0;
    if (levelOfActive === "No exercise") {
      levelOfActivityMultiplier = 1.2;
    } else if (levelOfActive === "Exercise 1-2 times a week") {
      levelOfActivityMultiplier = 1.375;
    } else if (levelOfActive === "Exercise 3-4 times a week") {
      levelOfActivityMultiplier = 1.55;
    } else if (levelOfActive === "Exercise 5-7 times a week") {
      levelOfActivityMultiplier = 1.725;
    }

    var equation;

    if (gender == "Male") {
      equation =
        66.5 +
        13.75 * parseInt(weight) +
        5.003 * parseInt(height) -
        6.75 * parseInt(age);
    } else {
      equation =
        655.1 +
        9.563 * parseInt(weight) +
        1.85 * parseInt(height) -
        4.675 * parseInt(age);
    }

    var proteinMultiplier; //calculate protein
    var caloryAdjustment;
    if (userGoal == "Bulk") {
      proteinMultiplier = 1.8;
      caloryAdjustment=200;
    } else if (userGoal == "Lose weight") {
      proteinMultiplier = 1.2;
      caloryAdjustment=-200;
    } else if (userGoal === "Just want to eat healthy") {
      proteinMultiplier = 1.4;
      caloryAdjustment=0;
    }

    calorieIntake = String(equation * levelOfActivityMultiplier+caloryAdjustment); //multiply user info by their level of activity

   

    proteinIntake = String(parseInt(weight) * proteinMultiplier);

    if (userGoal == "Bulk") {
      carbsIntake = String(parseInt(calorieIntake) * 0.6 * 0.13); //if bulking, 60% of calories are carbs, which then convert to grams
    } else if (userGoal == "Lose weight") {
      carbsIntake = String(parseInt(calorieIntake) * 0.4 * 0.13); //if losing weight, 40% of calories are carbs
    } else if (userGoal == "Just want to eat healthy") {
      carbsIntake = String(parseInt(calorieIntake) * 0.55 * 0.13); //if mantaining weight, 55% of calories are carbs
    }

    dispatch({
      type: "CALORIES_INTAKE",
      payload: calorieIntake,
    });

    dispatch({
      type: "PROTEIN_INTAKE",
      payload: proteinIntake,
    });

    dispatch({
      type: "CARBS_INTAKE",
      payload: carbsIntake,
    });

    return calorieIntake;
  };

  return (
    <div>
      <NavBar></NavBar>

      <BigDiv>
        <FeatureTitle>Step 1 of 2</FeatureTitle>
        <FormDiv>
          <StyledForm noValidate validated={validated} onSubmit={handleSub}>
            <FormGroup>
              <InputGroupCustom className="mb-3">
                <WeightInputGroupTextRight id="inputGroup-sizing-default">
                  Gender
                </WeightInputGroupTextRight>
                <InputFormSelect
                  size="sm"
                  value={gender}
                  isInvalid={
                    (gender == "" && validated) ||
                    (gender == "Select option" && validated)
                  }
                  onChange={(e) => setGender(e.target.value)}
                >
                  <option>Select option</option>
                  <option>Male</option>
                  <option>Female</option>
                </InputFormSelect>
                <Form.Control.Feedback type="invalid">
                  Select your gender
                </Form.Control.Feedback>
              </InputGroupCustom>

              <InputGroupCustom className="mb-3">
                <WeightInputGroupTextRight id="inputGroup-sizing-default">
                  Height
                </WeightInputGroupTextRight>
                <InputFormControl
                  {...register("height", { required: true })}
                  type="number"
                  name="height"
                  aria-label="Height"
                  aria-describedby="inputGroup-sizing-default"
                  required
                  value={height}
                  isInvalid={
                    parseInt(height) < 100 ||
                    parseInt(height) > 230 ||
                    (height == "" && validated) ||
                    (parseInt(height) < 100 && validated) ||
                    (parseInt(height) > 230 && validated)
                  }
                  onChange={(e) => setHeight(e.target.value)}
                />
                <WeightInputGroupTextLeft id="inputGroup-sizing-default">
                  Cm
                </WeightInputGroupTextLeft>

                <Form.Control.Feedback type="invalid">
                  Height has to be bigger than 100cm and smaller than 230cm
                </Form.Control.Feedback>
              </InputGroupCustom>

              <InputGroupCustom hasValidation className="mb-3">
                <WeightInputGroupTextRight id="inputGroup-sizing-default">
                  Weight
                </WeightInputGroupTextRight>
                <InputFormControl
                  type="number"
                  aria-label="Height"
                  aria-describedby="inputGroup-sizing-default"
                  {...register("weight", { required: true })}
                  required
                  value={weight}
                  isInvalid={
                    parseInt(weight) < 40 ||
                    (weight == "" && validated) ||
                    (parseInt(weight) < 40 && validated)
                  }
                  onChange={(e) => setWeight(e.target.value)}
                />
                <WeightInputGroupTextLeft id="inputGroup-sizing-default">
                  Kg
                </WeightInputGroupTextLeft>
                <Form.Control.Feedback type="invalid">
                  Weight has to be bigger than 40kg
                </Form.Control.Feedback>
              </InputGroupCustom>

              <InputGroupCustom hasValidation className="mb-3">
                <WeightInputGroupTextRight id="inputGroup-sizing-default">
                  Age
                </WeightInputGroupTextRight>
                <AgeFormControl
                  type="number"
                  aria-label="Height"
                  aria-describedby="inputGroup-sizing-default"
                  required
                  value={age}
                  isInvalid={
                    parseInt(age) < 12 ||
                    (parseInt(age) < 12 && validated) ||
                    (age == "" && validated)
                  }
                  onChange={(e) => setAge(e.target.value)}
                />
                <Form.Control.Feedback type="invalid">
                  Have to be older than 12
                </Form.Control.Feedback>
              </InputGroupCustom>

              <InputGroupCustom className="mb-3">
                <WeightInputGroupTextRight id="inputGroup-sizing-default">
                  Level of Activity
                </WeightInputGroupTextRight>
                <InputFormSelect
                  size="sm"
                  value={levelOfActive}
                  isInvalid={
                    levelOfActive == "Select option" ||
                    (levelOfActive == "" && validated) ||
                    (levelOfActive == "Select option" && validated)
                  }
                  onChange={(e) => setLevelOfActive(e.target.value)}
                  required
                >
                  <option>Select option</option>
                  <option>No exercise</option>
                  <option>Exercise 1-2 times a week</option>
                  <option>Exercise 3-4 times a week</option>
                  <option>Exercise 5-7 times a week</option>
                </InputFormSelect>
                <Form.Control.Feedback type="invalid">
                  Select a level of activity
                </Form.Control.Feedback>
              </InputGroupCustom>

              <InputGroupCustom className="mb-3">
                <WeightInputGroupTextRight id="inputGroup-sizing-default">
                  Fitness goal
                </WeightInputGroupTextRight>
                <InputFormSelect
                  size="sm"
                  value={userGoal}
                  isInvalid={
                    userGoal == "Select option" ||
                    (userGoal == "" && validated) ||
                    (userGoal == "Select option" && validated)
                  }
                  onChange={(e) => setUserGoal(e.target.value)}
                  required
                >
                  <option>Select option</option>
                  <option>Just want to eat healthy</option>
                  <option>Bulk</option>
                  <option>Lose weight</option>
                </InputFormSelect>
                <Form.Control.Feedback type="invalid">
                  Select your goal
                </Form.Control.Feedback>
              </InputGroupCustom>
            </FormGroup>
            <GradientButton type="submit" style={{ marginTop: "40px" }}>
              Continue
            </GradientButton>
          </StyledForm>
        </FormDiv>
        {/*<Form2></Form2>*/}
      </BigDiv>
      <ChefIcon src={chef}></ChefIcon>
      <RunnerIcon src={runner}></RunnerIcon>
    </div>
  );
}

export default HomePage;
