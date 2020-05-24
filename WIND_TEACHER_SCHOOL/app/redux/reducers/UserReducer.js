import { REQUEST_LOGIN,REQUEST_LOGIN_FAIL,REQUEST_LOGIN_SUCCESS } from "../actions/type";

const initialState = {
    data :{},
    isLoading: false,
    error: null
}

export default function (state = initialState, action) {
    switch (action.type) {
        case REQUEST_LOGIN: {
            return { ...state, isLoading: true }
        }
        case REQUEST_LOGIN_SUCCESS: {
            return {
                ...state,
                isLoading: false,
                error: null,
                data : action.payload
            }
        }
        case REQUEST_LOGIN_FAIL: {
            return {
                ...state, error: "Lỗi mạng"
            }
        }
        default:
            return state;
    }
}

