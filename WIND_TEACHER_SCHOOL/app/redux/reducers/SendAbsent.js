import { SEND_ABSENT,SEND_ABSENT_SUCCESS,SEND_ABSENT_FAIL } from "../actions/type";

const initialState = {
    data :{},
    isLoading: false,
    error: null
}

export default function (state = initialState, action) {
    switch (action.type) {
        case SEND_ABSENT: {
            return { ...state, isLoading: true }
        }
        case SEND_ABSENT_SUCCESS: {
            return {
                ...state,
                isLoading: false,
                error: null,
                data : action.payload
            }
        }
        case SEND_ABSENT_FAIL: {
            return {
                ...state, error: action.payload,isLoading: false,
            }
        }
        default:
            return state;
    }
}

