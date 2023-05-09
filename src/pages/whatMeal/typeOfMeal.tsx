import React, { useState } from "react";

const genderOptions = ["Male", "Female", "Non-binary"];
const activityOptions = [
  "Sedentary",
  "Lightly active",
  "Moderately active",
  "Very active",
  "Extra active",
];
const fitnessGoalOptions = ["Lose weight", "Maintain weight", "Gain muscle"];

interface Errors {
    gender?: string;
    height?: string;
    weight?: string;
    age?: string;
    activity?: string;
    fitnessGoal?: string;
  }
  
  const Form2: React.FC = () => {
    const [gender, setGender] = useState('');
    const [height, setHeight] = useState('');
    const [weight, setWeight] = useState('');
    const [age, setAge] = useState('');
    const [activity, setActivity] = useState('');
    const [fitnessGoal, setFitnessGoal] = useState('');
    const [errors, setErrors] = useState<Errors>({});
  
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
  
      // Validation
      let isValid = true;
      const newErrors: Errors = {};
  
      if (!gender) {
        newErrors.gender = 'Please select a gender';
        isValid = false;
      }
  
      if (!height) {
        newErrors.height = 'Please enter your height';
        isValid = false;
      }
  
      if (!weight) {
        newErrors.weight = 'Please enter your weight';
        isValid = false;
      }
  
      if (!age) {
        newErrors.age = 'Please enter your age';
        isValid = false;
      }
  
      if (!activity) {
        newErrors.activity = 'Please select your activity level';
        isValid = false;
      }
  
      if (!fitnessGoal) {
        newErrors.fitnessGoal = 'Please select your fitness goal';
        isValid = false;
      }
  
      if (isValid) {
        console.log('Form submitted!');
        // Handle form submission here
      } else {
        console.log('Form errors:', newErrors);
        setErrors(newErrors);
      }
    };

  return (
    <form onSubmit={handleSubmit}>
      <div style={{borderColor:"black"}}>
        <label htmlFor="gender">Gender:</label>
        <select
          id="gender"
          value={gender}
          onChange={(e) => setGender(e.target.value)}
        >
          <option value="">--Please select a gender--</option>
          {genderOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        {errors.gender && <span>{errors.gender}</span>}
      </div>
      <div>
        <label htmlFor="height">Height (cm):</label>
        <input
          id="height"
          type="number"
          value={height}
          onChange={(e) => setHeight(e.target.value)}
        />
        {errors.height && <span>{errors.height}</span>}
      </div>
      <div>
        <label htmlFor="weight">Weight (kg):</label>
        <input
          id="weight"
          type="number"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
        />
        {errors.weight && <span>{errors.weight}</span>}
      </div>
      <div>
        <label htmlFor="age">Age:</label>
        <input
          id="age"
          type="number"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          placeholder="age"
        />
        {errors.age && <span>{errors.age}</span>}
      </div>
      <div style={{borderStyle:"solid", borderRadius:"8px"}}>
        <label htmlFor="activity">Activity level:</label>
        <select
          id="activity"
          value={activity}
          onChange={(e) => setActivity(e.target.value)}
          style={{borderStyle:"none"}}
        >
          <option value="">--Please select an activity level--</option>
          {activityOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        {errors.activity && <span>{errors.activity}</span>}
      </div>{" "}
      <div>
        <label htmlFor="fitnessGoal">Fitness goal:</label>
        <select
          id="fitnessGoal"
          value={fitnessGoal}
          onChange={(e) => setFitnessGoal(e.target.value)}
        >
          <option value="">--Please select a fitness goal--</option>
          {fitnessGoalOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        {errors.fitnessGoal && <span>{errors.fitnessGoal}</span>}
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default Form2;
