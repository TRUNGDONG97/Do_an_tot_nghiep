import {
  GET_CLASS_LIST,
  GET_CLASS_LIST_FAIL,
  GET_CLASS_LIST_SUCCESS
} from "../actions/type";
const initialState = {
  data: {},
  news: [],
  mail: {},
  promotion: [],
  isLoading: false,
  error: null,
  isErr: false,

};
export default function(state = initialState, action) {
  switch (action.type) {
    case GET_CLASS_LIST:
      return {
        ...state,
        isLoading: true,
        error: null,
        // username: action.payload.username,
        // password: action.payload.password
      };

    case GET_CLASS_LIST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: null,
        // mail:action.payload.mail,
        data: action.payload
        // news: action.payload.listNews,
        // promotion: action.payload.listPromtoion
      };

    case GET_CLASS_LIST_FAIL:
      return { ...state, error: action.payload, isErr: true, isLoading: false };
    default:
      return state;
  }
}
