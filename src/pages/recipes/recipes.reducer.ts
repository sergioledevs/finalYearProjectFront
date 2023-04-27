var USER_STATE = {
    selectedRecipes:[]
  };
  
  function removeItemOnce(arr, value) {
    var index = arr.indexOf(value);
    if (index > -1) {
      arr.splice(index, 1);
    }
    return arr;
  }
  
  const selectedRecipesReducer = (state = USER_STATE, action) => {
    switch (action.type) {
      case "SELECTED_RECIPES":
        return {
          ...state,
          selectedRecipes: state.selectedRecipes.concat(action.payload),
        }
      case "RECIPES_DELETE":
        removeItemOnce(state.selectedRecipes, action.payload);
      return {
        ...state,
      };
      default:
        return state;
    }
  };
  
  export default selectedRecipesReducer;