import {  GET_LIST_CLASS, GET_LIST_CLASS_SUCCESS, GET_LIST_CLASS_FAIL } from "../actions/type";

const initialState = {
    data: {},
    isLoading: false,
    error: null,
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
                data: action.payload
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

