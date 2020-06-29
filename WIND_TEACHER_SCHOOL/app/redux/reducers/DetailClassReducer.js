import { GET_DETAIL_CLASS,GET_DETAIL_CLASS_SUCCESS,GET_DETAIL_CLASS_FAIL } from "../actions/type";

const initialState = {
    listStudent: [],
    classInfo:null,  
    totalAbsent:null,  
    isLoading: false,
    error: null
};

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_DETAIL_CLASS:
            return {
                ...state,
                isLoading: true,
                error: false,
                listStudent:[],
                classInfo:null,
                totalAbsent:null,  
            }
        case GET_DETAIL_CLASS_SUCCESS:
            return {
                ...state,
                listStudent: action.payload.listStudent,
                classInfo: action.payload.classInfo,
                totalAbsent: action.payload.countTotalAbsent,
                isLoading: false,
                error: null
            }
        case GET_DETAIL_CLASS_FAIL:
            return {
                ...state,
                error: action.payload,
                isLoading: true
            }

        default:
            return state;
    }
    
}
