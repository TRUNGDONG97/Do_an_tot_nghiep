import {
  REQUEST_LOGIN,
  REQUEST_LOGIN_SUCCESS,
  REQUEST_LOGIN_FAIL
} from "../actions/type";
const initialState = {
  data: {},
  news: [],
  field_account_full_name: {
    und: []
  },
  mail: {},
  promotion: [],
  isLoading: false,
  error: null,
  isErr: false,
  username: "",
  password: "",
  
};
export default function(state = initialState, action) {
  switch (action.type) {
    case REQUEST_LOGIN:
      return {
        ...state,
        isLoading: true,
        // username: action.payload.username,
        // password: action.payload.password
      };

    case REQUEST_LOGIN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        // mail:action.payload.mail,
        userInfo: action.payload
        // news: action.payload.listNews,
        // promotion: action.payload.listPromtoion
      };

    case REQUEST_LOGIN_FAIL:
      return { ...state, error: action.payload, isErr: true, isLoading:false };
    default:
      return state;
  }
}
