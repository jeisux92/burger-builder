import {
    PURCHASE_BURGER_SUCESS,
    PURCHASE_BURGER_FAIL,
    PURCHASE_BURGER_START,
    PURCHASE_INIT
} from "./actionTypes";
import axios from "../../axios-orders";

export const purchaseBurgerSucess = (id, orderData) => ({
    type: PURCHASE_BURGER_SUCESS,
    orderId: id,
    orderData: orderData
})

export const purchaseBurgerFail = (error) => ({
    type: PURCHASE_BURGER_FAIL,
    error: error
})

const purchaseBurgerStart = () => ({
    type: PURCHASE_BURGER_START,

})
export const purchaseBurger = (orderData) => {
    return dispatch => {
        dispatch(purchaseBurgerStart());
        axios
            .post("orders.json", orderData)
            .then(response => {
                dispatch(purchaseBurgerSucess(response.data.name, orderData))
            })
            .catch(error => dispatch(purchaseBurgerFail(error)))
    }
}

export const purchaseInit = () => ({
    type: PURCHASE_INIT
})