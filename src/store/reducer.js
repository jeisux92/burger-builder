import { ADD_INGREDIENT, REMOVE_INGREDIENT } from "./actions";

const initialState = {
    ingredients: {
        salad: 0,
        bacon: 0,
        cheese: 0,
        meat: 0
    },
    totalPrice: 4
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName]++
                }
            }
        case REMOVE_INGREDIENT:
            let ingredientCount = state.ingredients[action.ingredientName]
            if (ingredientCount == 0) {
                return
            }


            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: ingredientCount--
                }
            }
        default:
            return state;
    }
}
export default reducer;