import {
    PURCHASE_BURGER_FAIL,
    PURCHASE_BURGER_SUCESS,
    PURCHASE_BURGER_START,
    PURCHASE_INIT
} from "../actions/actionTypes"



const initialState = {
    orders: [],
    loading: false,
    purchased: false
}
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case PURCHASE_INIT:
            return {
                ...state,
                purchased: false
            }

        case PURCHASE_BURGER_SUCESS:
            const newOrder = {
                ...action.orderData,
                id: action.orderId
            }
            return {
                ...state,
                loading: false,
                orders: state.orders.concat(newOrder),
                purchased: true
            }
        case PURCHASE_BURGER_FAIL:
            return {
                ...state,
                loading: false
            }
        case PURCHASE_BURGER_START:
            return {
                ...state,
                loading: true
            }
        default:
            return state;

    }
}

export default reducer;