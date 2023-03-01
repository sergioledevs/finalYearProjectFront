
var USER_STATE = {
    allergyArray:[]
  };
  
  function removeItemOnce(arr, value) {
    var index = arr.indexOf(value);
    if (index > -1) {
      arr.splice(index, 1);
    }
    return arr;
  }
  
  const allergyReducer = (state = USER_STATE, action) => {
    switch (action.type) {
      case "ALLERGY_ING":
        return {
          ...state,
          allergyArray: state.allergyArray.concat(action.payload),
        }
      default:
        return state;
    }
  };
  
  export default allergyReducer;