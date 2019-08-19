import {
    PURCHASE_BURGER_SUCESS,
    PURCHASE_BURGER_FAIL,
    PURCHASE_BURGER_START,
    PURCHASE_INIT,
    FETCH_ORDERS_SUCCESS,
    FETCH_ORDERS_FAIL,
    FETCH_ORDERS_START
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

export const purchaseOrderSuccess = (orders) => ({
    type: FETCH_ORDERS_SUCCESS,
    orders: orders
})

export const purchaseOrderFail = (error) => ({
    type: FETCH_ORDERS_FAIL,
    error: error
})

export const purchaseOrderStart = () => ({
    type: FETCH_ORDERS_START
})


export const fetchOrders = () => {
    return dispatch => {
        dispatch(purchaseOrderStart());
        axios
            .get("orders.json")
            .then(response => {
                dispatch(purchaseOrderSuccess(response.data))
            })
            .catch((error) => {
                dispatch(purchaseOrderFail(error))
            });
    }
}