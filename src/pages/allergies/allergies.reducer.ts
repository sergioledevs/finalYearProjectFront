
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
      case "ALLERGY_ADD":
        return {
          ...state,
          allergyArray: state.allergyArray.concat(action.payload),
        }
      case "ALLERGY_DELETE":
        removeItemOnce(state.allergyArray, action.payload);
      return {
        ...state,
      };
      default:
        return state;
    }
  };
  
  export default allergyReducer;