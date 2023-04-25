import React from "react";

import { useForm, SubmitHandler } from "react-hook-form";
import {
  BigDiv,
  FormDiv,
  FormField,
  FormGroup2,
  StyledForm,
  StyledInput,
  WeightInputGroupTextLeft,
  InputFormControl,
  WeightInputGroupTextRight,
  InputGroupCustom,
} from "./home.style";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { FormGroup } from "react-bootstrap";
import { Navigate, useNavigate } from "react-router-dom";
import { useDispatch, connect } from "react-redux";
import axios from "axios";
import { useEffect } from "react";
import { userWeight } from "./home.actions";

import NavBar from "../../components/navBar/navBar";

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

  const [calorieIntake, setCalorieIntake] = React.useState("");
  const [proteinIntake, setProteinIntake] = React.useState("");
  const [carbsIntake, setCarbsIntake] = React.useState("");

  const [initialState, setInitialState] = React.useState([]);

  const navigate = useNavigate();

  const handleSub = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
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

      navigate("/allergies");
    }
    //registerUser();
    setValidated(true);
  };

  useEffect(() => {
    try {
      axios.get("https://finalyearprojectapi.onrender.com/getDatabase").then((response) => {
        console.log(response.data);
        setInitialState(response.data);
      });
    } catch (error) {
      console.log("");
    }
  }, []);

  async function registerUser() {
    try {
      await axios.post("http://localhost:9000/getDatabase", {
        height,
        weight,
        levelOfActive,
        age,
      });
    } catch (error: any) {
      console.log(error.response.data);
    }
  }

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

    var equation =
      66.5 +
      13.75 * parseInt(weight) +
      5.003 * parseInt(height) -
      6.75 * parseInt(age);

    var totalCalorieIntake = equation * levelOfActivityMultiplier; //multiply user info by their level of activity

    var proteinMultiplier; //calculate protein
    if (userGoal == "Bulk") {
      proteinMultiplier = 1.8;
    } else if (userGoal == "Lose weight") {
      proteinMultiplier = 1.2;
    } else if (userGoal === "Mantain weight") {
      proteinMultiplier = 1.4;
    }

    var proteinIntake = parseInt(weight) * proteinMultiplier;

    var carbsIntake; //calculate carbs
    if (userGoal == "Bulk") {
      carbsIntake = totalCalorieIntake * 0.6 * 0.13; //if bulking, 60% of calories are carbs, which then convert to grams
    } else if (userGoal == "Lose weight") {
      carbsIntake = totalCalorieIntake * 0.4 * 0.13; //if losing weight, 40% of calories are carbs
    } else if (userGoal == "Mantain weight") {
      carbsIntake = totalCalorieIntake * 0.55 * 0.13; //if mantaining weight, 55% of calories are carbs
    }

    dispatch({
      type: "CALORIES_INTAKE",
      payload: totalCalorieIntake,
    });

    dispatch({
      type: "PROTEIN_INTAKE",
      payload: proteinIntake,
    });

    dispatch({
      type: "CARBS_INTAKE",
      payload: carbsIntake,
    });

    return totalCalorieIntake;
  };

  return (
    <div>
      <NavBar></NavBar>
      <BigDiv>
        <FormDiv>
          <StyledForm noValidate validated={validated} onSubmit={handleSub}>
            <FormGroup>
              <InputGroup className="mb-3">
                <InputGroup.Text id="inputGroup-sizing-default">
                  Gender
                </InputGroup.Text>
                <Form.Select
                  size="sm"
                  value={gender}
                  isInvalid={
                    gender=="" && validated || gender=="Select option" && validated
                  }
                  onChange={(e) => setGender(e.target.value)}
                >
                  <option>Select option</option>
                  <option>Male</option>
                  <option>Female</option>
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  Select your gender
                </Form.Control.Feedback>
              </InputGroup>

              {/*<InputGroup>
                <FormGroup2>
                  <span>Height</span>
                  <InputFormControl
                    value={height}
                    required
                    onChange={(e) => setHeight(e.target.value)}
                    type="text"
                    isInvalid={
                      parseInt(height) < 100 ||
                      (parseInt(height) < 100 && validated)
                    }
                    placeholder="domain.tld"
                  ></InputFormControl>
                  <span>Cm</span>
                  
                </FormGroup2>
                <Form.Control.Feedback type="invalid">
                    Please introduce your height.
                  </Form.Control.Feedback>
                  </InputGroup>*/}

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
                    parseInt(height) < 100 || height=="" && validated ||
                    (parseInt(height) < 100 && validated)
                  }
                  onChange={(e) => setHeight(e.target.value)}
                />
                <WeightInputGroupTextLeft id="inputGroup-sizing-default">
                  Cm
                </WeightInputGroupTextLeft>

                <Form.Control.Feedback type="invalid">
                  Height has to be bigger than 100cm
                </Form.Control.Feedback>
              </InputGroupCustom>

              <InputGroup hasValidation className="mb-3">
                <InputGroup.Text id="inputGroup-sizing-default">
                  Weight
                </InputGroup.Text>
                <Form.Control
                  type="number"
                  aria-label="Height"
                  aria-describedby="inputGroup-sizing-default"
                  {...register("weight", { required: true })}
                  required
                  value={weight}
                  isInvalid={
                    parseInt(weight) < 40 ||weight=="" && validated ||
                    (parseInt(weight) < 40 && validated)
                  }
                  onChange={(e) => setWeight(e.target.value)}
                />
                <InputGroup.Text id="inputGroup-sizing-default">
                  Kg
                </InputGroup.Text>
                <Form.Control.Feedback type="invalid">
                  Weight has to be bigger than 40kg
                </Form.Control.Feedback>
              </InputGroup>

              <InputGroup hasValidation className="mb-3">
                <InputGroup.Text id="inputGroup-sizing-default">
                  Age
                </InputGroup.Text>
                <Form.Control
                  type="number"
                  aria-label="Height"
                  aria-describedby="inputGroup-sizing-default"
                  required
                  value={age}
                  isInvalid={
                    parseInt(age) < 12 || (parseInt(age) < 12 && validated)
                  }
                  onChange={(e) => setAge(e.target.value)}
                />
                <Form.Control.Feedback type="invalid">
                  Have to be older than 12
                </Form.Control.Feedback>
              </InputGroup>

              <InputGroup className="mb-3">
                <InputGroup.Text id="inputGroup-sizing-default">
                  Level of Activity
                </InputGroup.Text>
                <Form.Select
                  size="sm"
                  value={levelOfActive}
                  isInvalid={
                    levelOfActive == "Select option" || levelOfActive=="" && validated||
                    (levelOfActive == "Select option" && validated)
                  }
                  onChange={(e) => setLevelOfActive(e.target.value)}
                >
                  <option>Select option</option>
                  <option>No exercise</option>
                  <option>Exercise 1-2 times a week</option>
                  <option>Exercise 3-4 times a week</option>
                  <option>Exercise 5-7 times a week</option>
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  Select a level of activity
                </Form.Control.Feedback>
              </InputGroup>

              <InputGroup className="mb-3">
                <InputGroup.Text id="inputGroup-sizing-default">
                  Fitness goal
                </InputGroup.Text>
                <Form.Select
                  size="sm"
                  value={userGoal}
                  isInvalid={
                    userGoal == "Select option" || userGoal=="" && validated||
                    (userGoal == "Select option" && validated)
                  }
                  onChange={(e) => setUserGoal(e.target.value)}
                >
                  <option>Select option</option>
                  <option>Mantain weight</option>
                  <option>Bulk</option>
                  <option>Lose weight</option>
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  Select your goal
                </Form.Control.Feedback>
              </InputGroup>
            </FormGroup>
            <Button type="submit">Submit form</Button>
          </StyledForm>
        </FormDiv>
      </BigDiv>
    </div>
  );
}

export default HomePage;
