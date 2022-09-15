import {combineReducers} from 'redux'
import Auth from './AuthReducer'
import Products from './ProductReducer'
import Cart from './CartReducer'


export default combineReducers({
    Auth,
    Products,
    Cart
})