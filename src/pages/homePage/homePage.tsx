import React from "react";

import { useForm, SubmitHandler } from "react-hook-form";
import { BigDiv, FormDiv, StyledForm, StyledInput } from "./home.style";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { FormGroup } from "react-bootstrap";
import { Navigate, useNavigate } from "react-router-dom";
import { useDispatch, connect } from "react-redux";
import axios from "axios";
import { useEffect } from "react";

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
  const [gender, setGender]= React.useState("")
  const [height, setHeight] = React.useState("");
  const [weight, setWeight] = React.useState("");
  const [age, setAge] = React.useState("");
  const [levelOfActive, setLevelOfActive] = React.useState("");
  const [userGoal, setUserGoal] = React.useState("");

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

      navigate("/whatMeal");
    }
    //registerUser();
    setValidated(true);
  };

  useEffect(() => {
    try {
      axios.get("http://localhost:9000/getDatabase").then((response) => {
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

  


  const calculateCalories = () => {  //https://www.omnicalculator.com/health/bmr-harris-benedict-equation#:~:text=It%20needs%20your%20age%2C%20weight,%2D%20(6.75%20%C3%97%20age)%20.
    var levelOfActivityMultiplier=0
    if(levelOfActive==="No exercise"){
      levelOfActivityMultiplier=1.2
    }else if(levelOfActive==="Exercise 1-2 times a week"){
      levelOfActivityMultiplier=1.375
    }else if(levelOfActive==="Exercise 3-4 times a week"){
      levelOfActivityMultiplier=1.55
    }else if(levelOfActive==="Exercise 5-7 times a week"){
      levelOfActivityMultiplier=1.725
    }
    
    var equation =
      66.5 +
      13.75 * parseInt(weight) +
      5.003 * parseInt(height) -
      6.75 * parseInt(age);
    
    var totalValue= equation * levelOfActivityMultiplier //multiply user info by their level of activity
    console.log(levelOfActivityMultiplier)
    console.log(totalValue);
    return totalValue;
  };

  return (
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
              isInvalid={parseInt(age) < 5 || (parseInt(age) < 5 && validated)}
              onChange={(e) => setGender(e.target.value)}
            >
              <option>Male</option>
              <option>Female</option>
            </Form.Select>
          </InputGroup>
            
            <InputGroup className="mb-3">
              <InputGroup.Text id="inputGroup-sizing-default">
                Height
              </InputGroup.Text>
              <Form.Control
                {...register("height", { required: true })}
                type="number"
                name="height"
                aria-label="Height"
                aria-describedby="inputGroup-sizing-default"
                required
                value={height}
                isInvalid={
                  parseInt(height) < 5 || (parseInt(height) < 5 && validated)
                }
                onChange={(e) => setHeight(e.target.value)}
              />
              <InputGroup.Text id="inputGroup-sizing-default">
                Cm
              </InputGroup.Text>
              <Form.Control.Feedback type="invalid">
                Please introduce your height.
              </Form.Control.Feedback>
            </InputGroup>
          

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
                parseInt(weight) < 5 || (parseInt(weight) < 5 && validated)
              }
              onChange={(e) => setWeight(e.target.value)}
            />
            <InputGroup.Text id="inputGroup-sizing-default">
                Kg
              </InputGroup.Text>
            <Form.Control.Feedback type="invalid">
              Please introduce your weight.
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
              isInvalid={parseInt(age) < 5 || (parseInt(age) < 5 && validated)}
              onChange={(e) => setAge(e.target.value)}
            />
            <Form.Control.Feedback type="invalid">
              Please introduce your weight.
            </Form.Control.Feedback>
          </InputGroup>

          <InputGroup className="mb-3">
            <InputGroup.Text id="inputGroup-sizing-default">
              Level of Activity
            </InputGroup.Text>
            <Form.Select
              size="sm"
              value={levelOfActive}
              isInvalid={parseInt(age) < 5 || (parseInt(age) < 5 && validated)}
              onChange={(e) => setLevelOfActive(e.target.value)}
            >
              <option>No exercise</option>
              <option>Exercise 1-2 times a week</option>
              <option>Exercise 3-4 times a week</option>
              <option>Exercise 5-7 times a week</option>
            </Form.Select>
          </InputGroup>

          <InputGroup className="mb-3">
            <InputGroup.Text id="inputGroup-sizing-default">
              Fitness goal
            </InputGroup.Text>
            <Form.Select
              size="sm"
              value={userGoal}
              isInvalid={parseInt(age) < 5 || (parseInt(age) < 5 && validated)}
              onChange={(e) => setUserGoal(e.target.value)}
            >
              <option>Mantain weight</option>
              <option>Bulk</option>
              <option>Lose weight</option>
            </Form.Select>
          </InputGroup>
          </FormGroup>
          <Button type="submit">Submit form</Button>
        </StyledForm>
      </FormDiv>
    </BigDiv>
  );
}

export default HomePage;
