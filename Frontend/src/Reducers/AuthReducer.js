import { REGISTER_API_LOADING, REGISTER_API_SUCCESS, REGISTER_API_FAILURE } from '../Actions/Types'
import { LOGIN_API_LOADING, LOGIN_API_SUCCESS, LOGIN_API_FAILURE } from '../Actions/Types'
import { CLEAN_AUTH } from '../Actions/Types'

const Auth = (state, action) => {
    if (typeof state === 'undefined') {
        return {
            loading: false,
            r_data: [],
            r_error: {},
            l_data: [],
            l_error: {}
        }
    }

    switch (action.type) {
        case CLEAN_AUTH:
            return{
                ...state,
                loading: false,
                r_data: [],
                r_error: {},
                l_data:[],
                l_error: {}
            }
        case REGISTER_API_LOADING:
            return {
                ...state,
                loading: true,
                r_data: [],
                r_error: {},
                l_data: [],
                l_error: {}
            }
        case REGISTER_API_SUCCESS:
            return {
                ...state,
                loading: false,
                r_data: action.data,
                r_error: {},
            }
        case REGISTER_API_FAILURE:
            return {
                ...state,
                loading: false,
                r_data: [],
                r_error: action.err,
            }
        case LOGIN_API_LOADING:
            return {
                ...state,
                loading: true,
                r_data: [],
                r_error: {},
                l_data: [],
                l_error: {}
            }
        case LOGIN_API_SUCCESS:
            return {
                ...state,
                loading: false,
                l_data: action.data,
                l_error: {}
            }
        case LOGIN_API_FAILURE:
            return {
                ...state,
                loading: false,
                l_data: [],
                l_error: action.err
            }
        default: return state   
    }
}

export default Auth