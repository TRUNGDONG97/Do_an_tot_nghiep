import { REQUEST_LOGIN,REQUEST_LOGIN_FAIL,REQUEST_LOGIN_SUCCESS, GET_LIST_ABSENT, GET_LIST_ABSENT_SUCCESS, GET_LIST_ABSENT_FAIL } from "../actions/type";
import ListClassReducer from './ListClassReducer';

const initialState = {
    data :{},
    isLoading: false,
    error: null,
    className: '',
    classID: '',
    month: null,
    typeLoaing:true
}

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_LIST_ABSENT: {
            return { ...state,
                className: action.payload.ClassName,
                month: action.payload.Month,
                classID: action.payload.ClassID,
                isLoading: true,
                typeLoaing:action.typeLoaing
                }
        }
        case GET_LIST_ABSENT_SUCCESS: {
            return {
                ...state,
                isLoading: false,
                error: null,
                data : action.payload
            }
        }
        case GET_LIST_ABSENT_FAIL: {
            return {
                ...state, error:  action.payload, isLoading: false,
                isSuccess:false
            }
        }
        default:
            return state;
    }
}

