import React, { useState, useEffect } from "react";
import axios from "axios";

import {
  Form,
  ProfileContainer,
  Text,
  Title,
  Input,
  Label,
  StyledButton,
  Select,
  BackButton,
} from "./profile.styles";

import { Navigate, useNavigate } from "react-router-dom";
import NavBar from "../../components/navBar/navBar";

function Profile() {
  const [email, setEmail] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [age, setAge] = useState("");
  const [levelOfActive, setLevelOfActive] = useState("");
  const [userGoal, setUserGoal] = useState("");
  const token = localStorage.getItem("token");

  var [calorieIntake, setCalorieIntake] = React.useState("");
  var [proteinIntake, setProteinIntake] = React.useState("0");
  var [carbsIntake, setCarbsIntake] = React.useState("0");

  const [isEditing, setIsEditing] = useState(false);

  const [validated, setValidated] = React.useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      if (token != null) {
        try {
          const response = await axios.get(
            "https://finalyearprojectapi.onrender.com/userData",
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
          setEmail(response.data.data.email);
          setHeight(response.data.data.height);
          setWeight(response.data.data.weight);
          setLevelOfActive(response.data.data.levelOfActive);
          setAge(response.data.data.age);
          setUserGoal(response.data.data.userGoal);
        } catch (err: any) {
          console.log(err.response.data.message);
        }
      }
    }
    fetchData();
  }, []);

  const handleSub = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const accessToken = token;
    if (form.checkValidity() === false) {
      event.stopPropagation();

      console.log("check validity false");
    } else {
      calculateCalories();
      console.log("check validity true");

      const userData = {
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

      if (token !== undefined) {
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
      setIsEditing(false);
    }
    //registerUser();
    setValidated(true);
  };

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

    calorieIntake = String(equation * levelOfActivityMultiplier); //multiply user info by their level of activity

    var proteinMultiplier; //calculate protein
    if (userGoal == "Bulk") {
      proteinMultiplier = 1.8;
    } else if (userGoal == "Lose weight") {
      proteinMultiplier = 1.2;
    } else if (userGoal === "Mantain weight") {
      proteinMultiplier = 1.4;
    }

    proteinIntake = String(parseInt(weight) * proteinMultiplier);

    if (userGoal == "Bulk") {
      carbsIntake = String(parseInt(calorieIntake) * 0.6 * 0.13); //if bulking, 60% of calories are carbs, which then convert to grams
    } else if (userGoal == "Lose weight") {
      carbsIntake = String(parseInt(calorieIntake) * 0.4 * 0.13); //if losing weight, 40% of calories are carbs
    } else if (userGoal == "Mantain weight") {
      carbsIntake = String(parseInt(calorieIntake) * 0.55 * 0.13); //if mantaining weight, 55% of calories are carbs
    }

    return calorieIntake;
  };

  return (
    <div>
      <NavBar></NavBar>
      <ProfileContainer>
        {!isEditing ? (
          <div>
            <Title>Your profile</Title>
            <Label>Email:</Label>
            <Text>{email}</Text>
            <Label>Height: </Label>
            {height ? (
              <Text>{height} cm</Text>
            ) : (
              <Text>You haven't introduced this value</Text>
            )}
            <Label>Weight:</Label>
            {weight ? (
              <Text>{weight} kg</Text>
            ) : (
              <Text>You haven't introduced this value</Text>
            )}
            <Label>Age:</Label>
            {age ? (
              <Text>{age}</Text>
            ) : (
              <Text>You haven't introduced this value</Text>
            )}
            <Label>Level of Activity:</Label>
            {levelOfActive ? (
              <Text>{levelOfActive}</Text>
            ) : (
              <Text>You haven't introduced this value</Text>
            )}
            <Label>Fitness goal: </Label>
            {userGoal ? (
              <Text>{userGoal}</Text>
            ) : (
              <Text>You haven't introduced this value</Text>
            )}
            <StyledButton
              onClick={() => {
                setValidated(false);
                setIsEditing(true);
              }}
            >
              Edit personal info
            </StyledButton>
          </div>
        ) : (
          !validated && (
            <Form onSubmit={handleSub}>
              <h2>Edit profile</h2>
              <div>
                <Label htmlFor="email">Email:</Label>
                <Input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="height">Height:</Label>
                <Input
                  type="number"
                  id="height"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="weight">Weight:</Label>
                <Input
                  type="number"
                  id="weight"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="age">Age:</Label>
                <Input
                  type="number"
                  id="age"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="levelOfActive">Level of Activity:</Label>
                <Select
                  id="levelOfActive"
                  value={levelOfActive}
                  onChange={(e) => setLevelOfActive(e.target.value)}
                >
                  <option>Select option</option>
                  <option>No exercise</option>
                  <option>Exercise 1-2 times a week</option>
                  <option>Exercise 3-4 times a week</option>
                  <option>Exercise 5-7 times a week</option>
                </Select>
              </div>
              <div>
                <Label htmlFor="userGoal">Fitness goal:</Label>
                <Select
                  id="userGoal"
                  value={userGoal}
                  onChange={(e) => setUserGoal(e.target.value)}
                >
                  <option>Select option</option>
                  <option>Mantain weight</option>
                  <option>Bulk</option>
                  <option>Lose weight</option>
                </Select>
              </div>
              <StyledButton type="submit">Submit</StyledButton>
              <BackButton onClick={() => setIsEditing(false)}>
                Go Back
              </BackButton>
            </Form>
          )
        )}
      </ProfileContainer>
    </div>
  );
}

export default Profile;
