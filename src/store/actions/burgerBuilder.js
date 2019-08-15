import {
    ADD_INGREDIENT,
    REMOVE_INGREDIENT,
    SET_INGREDIENTS,
    FETCH_INGREDIENTS_FAILED
} from "./actionTypes";
import axios from "../../axios-orders";


export const addIngredient = (ingredientName) => ({
    type: ADD_INGREDIENT,
    ingredientName: ingredientName
})

export const removeIngredient = (ingredientName) => ({
    type: REMOVE_INGREDIENT,
    ingredientName: ingredientName
})

const setIngredients = (ingredients) => ({
    type: SET_INGREDIENTS,
    ingredients: ingredients
})

export const setError = error => ({
    type: FETCH_INGREDIENTS_FAILED,
    error: error
})

export const initIngredients = () => {
    return (dispatch) => {
        axios
            .get("ingredients.json")
            .then(response => {
                dispatch(setIngredients(response.data));
                dispatch(setError(false))
            })
            .catch(() => dispatch(setError(true)))
    }
}