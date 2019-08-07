import {
    ADD_INGREDIENT,
    REMOVE_INGREDIENT
} from "./actions";

export const addIngredient = (ingredientName) => ({
    type: ADD_INGREDIENT,
    ingredientName: ingredientName
})

export const removeIngredient = (ingredientName) => ({
    type: REMOVE_INGREDIENT,
    ingredientName: ingredientName
})