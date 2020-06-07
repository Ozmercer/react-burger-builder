import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const purchaseSuccess = (id, orderData) => {
    return {
        type: actionTypes.PURCHASE_SUCCESS,
        id,
        orderData,
    }
}

export const purchaseFail = error => {
    return {
        type: actionTypes.PURCHASE_FAIL,
        error,
    }
}

export const purchaseStart = () => {
    return {
        type: actionTypes.PURCHASE_START,
    }
}

export const purchaseInit = () => {
    return {
        type: actionTypes.PURCHASE_INIT,
    }
}

export const purchaseBurger = (order, token) => {
    return dispatch => {
        dispatch(purchaseStart());

        axios.post('/orders.json?auth=' + token, order).then(resp => {
            dispatch(purchaseInit())
            dispatch(purchaseSuccess(resp.data.name, order))
        }).catch(err => {
            console.log(err);
            dispatch(purchaseFail(err))
        })
    }
}

export const fetchOrdersSuccess = (orders) => {
    return {
        type: actionTypes.FETCH_ORDERS_SUCCESS,
        orders
    }
}

export const fetchOrdersFail = (error) => {
    return {
        type: actionTypes.FETCH_ORDERS_FAIL,
        error
    }
}

export const fetchOrdersStart = () => {
    return {
        type: actionTypes.FETCH_ORDERS_START,
    }
}

export const fetchOrders = (token, userId) => {
    return dispatch => {
        dispatch(fetchOrdersStart());
        const queryParams = `?auth=${token}&orderBy="userId"&equalTo="${userId}"`
        axios.get('/orders.json' + queryParams).then(resp => {
            const orders = [];
            for (const order in resp.data) {
                orders.push({
                    ...resp.data[order],
                    id: order,
                })
            }

            dispatch(fetchOrdersSuccess(orders))
        }).catch(err => {
            console.log(err);
            dispatch(fetchOrdersFail(err))
        })
    }

}