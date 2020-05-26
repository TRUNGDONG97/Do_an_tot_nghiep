import { GET_LIST_NOTIFICATION_FAIL, GET_LIST_ABSENT, GET_LIST_ABSENT_SUCCESS, GET_LIST_ABSENT_FAIL, GET_LIST_CLASS, GET_LIST_CLASS_SUCCESS, GET_LIST_CLASS_FAIL, GET_LIST_NOTIFICATION, GET_LIST_NOTIFICATION_SUCCESS } from "../actions/type";

const initialState = {
    data :{},
    isLoading: false,
    error: null
}

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_LIST_NOTIFICATION: {
            return { ...state, isLoading: true }
        }
        case GET_LIST_NOTIFICATION_SUCCESS: {
            return {
                ...state,
                isLoading: false,
                error: null,
                data : action.payload
            }
        }
        case GET_LIST_NOTIFICATION_FAIL: {
            return {
                    ...state, error: "Lỗi mạng",  isLoading: false,
            }
        }
        default:
            return state;
    }
}

