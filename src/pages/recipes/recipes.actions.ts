export const SELECTED_RECIPES= 'SELECTED_RECIPES'
export const RECIPES_DELETE= 'RECIPES_DELETE'

export const selectRecipes = () =>{
    return{
        type: SELECTED_RECIPES,
        payload:""
    }
}

export const diselectRecipes = () =>{
    return{
        type: RECIPES_DELETE,
        payload:""
    }
}