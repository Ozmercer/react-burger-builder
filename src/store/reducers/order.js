import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    orders: [],
    loading: false,
    error: null,
    purchased: false,
}

const purchaseSuccess = (state, action) => {
    const newOrder = updateObject(action.orderData, { id: action.id });
    return updateObject(state, {
        orders: state.orders.concat(newOrder),
        loading: false,
        purchased: true,
    })
}

const purchaseFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        loading: false,
    })
}

const fetchOrdersSuccess = (state, action) => {
    return updateObject(state, {
        orders: action.orders,
        loading: false,
    });
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.PURCHASE_START: return updateObject(state, { loading: true });
        case actionTypes.PURCHASE_SUCCESS: return purchaseSuccess(state, action);
        case actionTypes.PURCHASE_FAIL: return purchaseFail(state, action);
        case actionTypes.PURCHASE_INIT: return updateObject(state, { purchased: false });
        case actionTypes.FETCH_ORDERS_START: return updateObject(state, { loading: true });
        case actionTypes.FETCH_ORDERS_SUCCESS: return fetchOrdersSuccess(state, action)
        case actionTypes.FETCH_ORDERS_FAIL: return updateObject(state, { loading: false })
        default: return state
    }
};

export default reducer;