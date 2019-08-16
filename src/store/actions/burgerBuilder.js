import {
    ADD_INGREDIENT,
    REMOVE_INGREDIENT,
    SET_INGREDIENTS,
    FETCH_INGREDIENTS_STATUS
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

export const setState = error => ({
    type: FETCH_INGREDIENTS_STATUS,
    error: error
})

export const initIngredients = () => {
    return (dispatch) => {
        axios
            .get("ingredients.json")
            .then(response => {
                dispatch(setState(false))
                dispatch(setIngredients(response.data));
            })
            .catch(() => dispatch(setState(true)))
    }
}