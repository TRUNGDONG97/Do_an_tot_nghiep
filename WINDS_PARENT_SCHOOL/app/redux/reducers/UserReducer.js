import {
    GET_USER_INFOR,
    GET_USER_INFOR_SUCCESS,
    GET_USER_INFOR_FAIL,
    UPDATE_USER,
    UPDATE_USER_FAIL,
    UPDATE_USER_SUCCESS
} from "../actions/type";

const initialState = {
    data: {},
    isLoading: false,
    error: null
}

export default function (state = initialState, action) {
    switch (action.type) {
        case UPDATE_USER:
        case GET_USER_INFOR: {
            return { ...state, isLoading: true }
        }
        case UPDATE_USER_SUCCESS:
        case GET_USER_INFOR_SUCCESS: {
            return {
                ...state,
                isLoading: false,
                error: null,
                data: action.payload
            }
        }
        case UPDATE_USER_FAIL:
        case GET_USER_INFOR_FAIL: {
            return {
                ...state,
                error: action.payload,
                isLoading: false
            }
        }
        default:
            return state;
    }
}

