import { REQUEST_LOGIN, REQUEST_LOGIN_FAIL, REQUEST_LOGIN_SUCCESS, GET_LIST_ABSENT, GET_LIST_ABSENT_SUCCESS, GET_LIST_ABSENT_FAIL, GET_LIST_CLASS, GET_LIST_CLASS_SUCCESS, GET_LIST_CLASS_FAIL } from "../actions/type";

const initialState = {
    data: {},
    isLoading: false,
    error: null,
    className: [],
    classID: []
}

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_LIST_CLASS: {
            return { ...state, isLoading: true }
        }
        case GET_LIST_CLASS_SUCCESS: {
            return {
                ...state,
                isLoading: false,
                error: null,
                data: action.payload,
                className: Array.from(
                    action.payload,
                    (item, index) => action.payload[index].className
                ),
                classID: Array.from(
                    action.payload,
                    (item, index) => action.payload[index].classID
                )
            }
        }
        case GET_LIST_CLASS_FAIL: {
            return {
                ...state, error: action.payload, isLoading: false,
            }
        }
        default:
            return state;
    }
}

