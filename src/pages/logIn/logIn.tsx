import React from 'react'
import { useForm, SubmitHandler } from "react-hook-form";
import { BigDiv, StyledForm } from './logIn.style';

type Inputs = {
  height: Number,
  weight: Number,
  levelOfActive: String,
  heightUnits: String,
  weightUnits: String
};


const LogIn = () => {

  const { register, handleSubmit, watch, formState: { errors } } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = data => console.log(data);


  return (
  <div></div>
  );

}

  export default LogIn;