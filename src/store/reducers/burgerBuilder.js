import {
    ADD_INGREDIENT,
    REMOVE_INGREDIENT,
    SET_INGREDIENTS,
    FETCH_INGREDIENTS_STATUS
} from "../actions/actionTypes";

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

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] + 1
                },
                totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName]
            }
        case REMOVE_INGREDIENT:
            let ingredientCount = state.ingredients[action.ingredientName] - 1
            if (ingredientCount < 0) {
                return state
            }
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: ingredientCount--
                },
                totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName]
            }
        case SET_INGREDIENTS:
            return {
                ...state,
                ingredients: {
                    salad: action.ingredients.salad,
                    bacon: action.ingredients.bacon,
                    cheese: action.ingredients.cheese,
                    meat: action.ingredients.meat
                },
                totalPrice: 4
            }
        case FETCH_INGREDIENTS_STATUS:
            return {
                ...state,
                error: action.error
            }
        default:
            return state;
    }
}
export default reducer;