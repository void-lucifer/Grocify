import { GET_ALL_PRODUCTS_LOADING, GET_ALL_PRODUCTS_SUCCESS, GET_ALL_PRODUCTS_FAILURE } from './Types'
import { REGISTER_API_LOADING, REGISTER_API_SUCCESS, REGISTER_API_FAILURE } from './Types'
import { LOGIN_API_LOADING, LOGIN_API_SUCCESS, LOGIN_API_FAILURE } from './Types'
import { CLEAN_AUTH, CLEAN_CART, LOGOUT } from './Types'
import { ADD_TO_CART_LOADING, ADD_TO_CART_SUCCESS, ADD_TO_CART_FAILURE } from './Types'
import { GET_CART_LOADING, GET_CART_SUCCESS, GET_CART_FAILURE } from './Types'

// Products
export const getProductLoading = () => ({
    type : GET_ALL_PRODUCTS_LOADING
})
export const getProductSuccess = (data) => ({
    type : GET_ALL_PRODUCTS_SUCCESS,
    data
})
export const getProductFailure = (err) => ({
    type : GET_ALL_PRODUCTS_FAILURE,
    err
})


// Register
export const registerApiLoading = () => ({
    type : REGISTER_API_LOADING
})
export const registerApiSuccess = (data) => ({
    type : REGISTER_API_SUCCESS,
    data
})
export const registerApiFailure = (err) => ({
    type : REGISTER_API_FAILURE,
    err
})

// Login
export const loginApiLoading = () => ({
    type: LOGIN_API_LOADING
})
export const loginApiSuccess = (data) => ({
    type: LOGIN_API_SUCCESS,
    data
})
export const loginApiFailure = (err) => ({
    type: LOGIN_API_FAILURE,
    err
})

// clean-data
export const cleanAuth = () =>({
    type: CLEAN_AUTH,
})


// add-to-cart
export const addToCartLoading = () => ({
    type : ADD_TO_CART_LOADING
})
export const addToCartSuccess = (data) => ({
    type : ADD_TO_CART_SUCCESS,
    data
})
export const addToCartFailure = (err) => ({
    type : ADD_TO_CART_FAILURE,
    err
})

// get-cart
export const getCartLoading = () => ({
    type : GET_CART_LOADING
})
export const getCartSuccess = (data) => ({
    type : GET_CART_SUCCESS,
    data
})
export const getCartFailure = (err) => ({
    type : GET_CART_FAILURE,
    err
})

// clean cart
export const cleanCart = () => ({
    type: CLEAN_CART
})

export const logout  = () => ({
    type: LOGOUT
})