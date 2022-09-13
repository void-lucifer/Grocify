import { GET_ALL_PRODUCTS_LOADING, GET_ALL_PRODUCTS_SUCCESS, GET_ALL_PRODUCTS_FAILURE } from "../Actions/Types"

const Products = (state, action) => {
    if (typeof(state) === "undefined"){
        return {
            loading: false,
            p_data: [],
            p_error: {}
        }
    }
    
    switch(action.type){
        case GET_ALL_PRODUCTS_LOADING:
            return {
                ...state,
                loading: true,
                p_data: [],
                p_error: {}
            }
        case GET_ALL_PRODUCTS_SUCCESS:
            return {
                ...state,
                loading: false,
                p_data: action.data,
                p_error: {}
            }
        case GET_ALL_PRODUCTS_FAILURE:
            return {
                ...state,
                loading: false,
                p_data: [],
                p_error: action.err
            }
        default:
            return {
                ...state
            }
    }
}

export default Products