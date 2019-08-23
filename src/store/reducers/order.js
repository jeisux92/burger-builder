import {
  PURCHASE_BURGER_FAIL,
  PURCHASE_BURGER_SUCESS,
  PURCHASE_BURGER_START,
  PURCHASE_INIT,
  FETCH_ORDERS_START,
  FETCH_ORDERS_FAIL,
  FETCH_ORDERS_SUCCESS
} from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialState = {
  orders: [],
  loading: false,
  purchased: false
};

const purchaseInit = state => {
  return updateObject(state, {
    purchased: false
  });
};

const burgerSuccess = (state, action) => {
  const newOrder = {
    ...action.orderData,
    id: action.orderId
  };
  const newState = {
    loading: false,
    orders: { ...state.orders, newOrder },
    purchased: true
  };
  return updateObject(state, newState);
};

const burgerFail = state => {
  return updateObject(state, {
    loading: false
  });
};

const burgerStart = state => {
  return updateObject(state, {
    loading: true
  });
};

const fetchOrdersStart = state => {
  return updateObject(state, {
    loading: true
  });
};

const fetchOrderSuccess = (state, action) => {
  return updateObject(state, {
    orders: action.orders,
    loading: false
  });
};

const fetchOrderFail = state => {
  return updateObject(state, {
    loading: false
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case PURCHASE_INIT:
      return purchaseInit(state);
    case PURCHASE_BURGER_SUCESS:
      return burgerSuccess(state, action);
    case PURCHASE_BURGER_FAIL:
      return burgerFail(state);
    case PURCHASE_BURGER_START:
      return burgerStart(state);
    case FETCH_ORDERS_START:
      return fetchOrdersStart(state);
    case FETCH_ORDERS_SUCCESS:
      return fetchOrderSuccess(state, action);
    case FETCH_ORDERS_FAIL:
      return fetchOrderFail(state);
    default:
      return state;
  }
};

export default reducer;
