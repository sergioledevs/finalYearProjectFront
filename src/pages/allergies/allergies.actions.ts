export const ALLERGY_ADD= 'ALLERGY_ADD'
export const ALLERGY_DELETE= 'ALLERGY_DELETE'

export const addAllergy = () =>{
    return{
        type: ALLERGY_ADD,
        payload:""
    }
}

export const deleteAllergy = () =>{
    return{
        type: ALLERGY_DELETE,
        payload:""
    }
}