import { REQUEST_LOGIN, REQUEST_LOGIN_FAIL, REQUEST_LOGIN_SUCCESS, GET_LIST_ABSENT, GET_LIST_ABSENT_SUCCESS, GET_LIST_ABSENT_FAIL, GET_LIST_FEE, GET_LIST_FEE_SUCCESS, GET_LIST_FEE_FAIL } from "../actions/type";

const initialState = {
    data: {},
    isLoading: true,
    error: null,
    data: [],
    parentName: '',
    free: {}
}

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_LIST_FEE: {
            return {
                ...state,
                isLoading: true
            }
        }
        case GET_LIST_FEE_SUCCESS: {
            return {
                ...state,
                isLoading: false,
                error: null,
                data: action.payload.free,
                // free: action.payload.result.free,
                parentName: action.payload.parentName
            }
        }
        case GET_LIST_FEE_FAIL: {
            return {
                ...state, error: action.payload,isLoading: false,
            }
        }
        default:
            return state;
    }
}

