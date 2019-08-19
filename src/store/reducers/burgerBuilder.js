import {
    ADD_INGREDIENT,
    REMOVE_INGREDIENT,
    SET_INGREDIENTS,
    FETCH_INGREDIENTS_STATUS
} from "../actions/actionTypes";
import { updateObject } from "../utility"

const initialState = {
    ingredients: null,
    totalPrice: 4,
    error: false
}

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
};

const addIngredient = (state, action) => {
    const updatedIngredient = { [action.ingredientName]: state.ingredients[action.ingredientName] + 1 };
    const updatedIngredients = updateObject(state.ingredients, updatedIngredient);
    const updatedState = {
        ingredients: updatedIngredients,
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName]
    }
    return updateObject(state, updatedState);
}

const removeIngredient = (state, action) => {
    const updatedIngr = { [action.ingredientName]: state.ingredients[action.ingredientName] - 1 };
    const updatedIngrs = updateObject(state.ingredients, updatedIngr);
    const updatedSt = {
        ingredients: updatedIngrs,
        totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName]
    }
    return updateObject(state, updatedSt);
}


const setIngredients = (state, action) => {
    const updated = {
        ingredients: {
            salad: action.ingredients.salad,
            bacon: action.ingredients.bacon,
            cheese: action.ingredients.cheese,
            meat: action.ingredients.meat
        },
        totalPrice: 4
    }
    return updateObject(state, updated)
}


const ingredientStatus = (state, action) => {
    return updateObject(state, {
        error: action.error
    })
}
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_INGREDIENT:
            return addIngredient(state, action)
        case REMOVE_INGREDIENT:
            return removeIngredient(state, action);
        case SET_INGREDIENTS:
            return setIngredients(state, action);
        case FETCH_INGREDIENTS_STATUS:
            return ingredientStatus(state, action);
        default:
            return state;
    }
}
export default reducer;