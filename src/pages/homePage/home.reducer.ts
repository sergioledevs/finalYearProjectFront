

var USER_STATE = {
  userWeight:"",
  userHeight:"",
  userAge:"",
  levelOfActivity:""
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
      

    default:
      return state;
  }
};

export default UserInfo;