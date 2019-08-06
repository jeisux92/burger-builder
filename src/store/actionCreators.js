import {
    ADD_INGREDIENT,
    REMOVE_INGREDIENT
} from "./actions";

export const addIngredient = (value) => ({
    type: ADD_INGREDIENT,
    value: value
})

export const addIngredient = (id) => ({
    type: REMOVE_INGREDIENT,
    id: id
})