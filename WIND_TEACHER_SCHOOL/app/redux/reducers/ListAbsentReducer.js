import { GET_LIST_ABSENT, GET_LIST_ABSENT_SUCCESS, GET_LIST_ABSENT_FAIL } from "../actions/type";
  const initialState = {
    data: {},
    // mail: {},
    // promotion: [],
    isLoading: false,
    error: null,
  
  };
  export default function(state = initialState, action) {
    switch (action.type) {
      case GET_LIST_ABSENT:
        return {
          ...state,
          isLoading: true,
          error: null,
        };
  
      case GET_LIST_ABSENT_SUCCESS:
        return {
          ...state,
          isLoading: false,
          error: null,
          data: action.payload
        };
  
      case GET_LIST_ABSENT_FAIL:
        return { ...state, error: action.payload, isLoading: false };
      default:
        return state;
    }
  }
  