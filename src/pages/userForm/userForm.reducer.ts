

var USER_STATE = {
  userWeight:"",
  userHeight:"",
  userAge:"",
  levelOfActivity:"",
  caloriesIntake:"",
  proteinIntake:"",
  carbsIntake:"",
};

function removeItemOnce(arr, value) {
  var index = arr.indexOf(value);
  if (index > -1) {
    arr.splice(index, 1);
  }
  return arr;
}

const UserInfo = (state = USER_STATE, action) => {
  switch (action.type) {
    case "USER_WEIGHT":
      return {
        ...state,
        userWeight: action.payload,
      }
      case "USER_HEIGHT":
      return {
        ...state,
        userHeight: action.payload,
      }
      case "USER_AGE":
      return {
        ...state,
        userAge: action.payload,
      }
      case "LEVEL_ACTIVITY":
      return {
        ...state,
        levelOfActivity: action.payload,
      }
      case "CALORIES_INTAKE":
      return {
        ...state,
        caloriesIntake: action.payload,
      }
      case "PROTEIN_INTAKE":
      return {
        ...state,
        proteinIntake: action.payload,
      }
      case "CARBS_INTAKE":
      return {
        ...state,
        carbsIntake: action.payload,
      }

    default:
      return state;
  }
};

export default UserInfo;