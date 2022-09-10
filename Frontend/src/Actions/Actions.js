import axios from 'axios'
import { base_url  } from './config'
import { getProductLoading, getProductSuccess, getProductFailure } from './ActionCreators'
import { registerApiLoading, registerApiSuccess, registerApiFailure } from './ActionCreators'
import { loginApiLoading, loginApiSuccess, loginApiFailure } from './ActionCreators'
import { addToCartLoading, addToCartSuccess, addToCartFailure } from './ActionCreators'
import { getCartLoading, getCartSuccess, getCartFailure } from './ActionCreators'

// Product Actions
export const getAllProducts = (data) => {
    return (dispatch) => {
        dispatch(getProductLoading())
        axios.get(base_url + '/admin/get-products', data).then((res) => {
            dispatch(getProductSuccess(res.data))
        }).catch((err) => {
            dispatch(getProductFailure(err.response.data))
        })
    }
}

// Register Actions
export const registerAction = (data) => {
    return(dispatch) => {
        dispatch(registerApiLoading())
        axios.post(base_url + '/user/register', data).then((res) => {
            dispatch(registerApiSuccess(res.data))
        }).catch((err) => {
            dispatch(registerApiFailure(err.response.data))
        })
    }
}

// Login Actions
export const loginAction = (data) => {
    return (dispatch) => {
        dispatch(loginApiLoading())
        axios.post(base_url + '/user/login', data).then((res) => {
            dispatch(loginApiSuccess(res.data))
        }).catch((err) => {
            dispatch(loginApiFailure(err.response.data))
        })
    }
}

// Add to cart
export const addToCart = (data) => {
    return (dispatch) => {
        dispatch(addToCartLoading())
        axios.post(base_url + '/user/add-to-cart', data).then((res) => {
            dispatch(addToCartSuccess(res.data))
        }).catch((err) => {
            dispatch(addToCartFailure(err.response.data))
        })
    }
}

// Get cart
export const getCartItems = (uid) => {
    return (dispatch) => {
        dispatch(getCartLoading())
        axios.get(base_url + '/user/get-cart-items', {params: {u_id: uid}}).then((res) => {
            dispatch(getCartSuccess(res.data))
        }).catch((err) => {
            dispatch(getCartFailure(err.response.data))
        })
    }
}