import {
  GET_CLASS_LIST,
  GET_CLASS_LIST_FAIL,
  GET_CLASS_LIST_SUCCESS
} from "../actions/type";
const initialState = {
  data: [],
  // mail: {},
  // promotion: [],
  isLoading: false,
  error: null,

};
export default function(state = initialState, action) {
  switch (action.type) {
    case GET_CLASS_LIST:
      return {
        ...state,
        isLoading: true,
        error: null,
      };

    case GET_CLASS_LIST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: null,
        data: action.payload
      };

    case GET_CLASS_LIST_FAIL:
      return { ...state, error: action.payload, isLoading: false };
    default:
      return state;
  }
}
