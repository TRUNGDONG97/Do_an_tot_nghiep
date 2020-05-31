import {


  GET_LIST_NOTIFICATION,
  GET_LIST_NOTIFICATION_SUCCESS,
  GET_LIST_NOTIFICATION_FAIL
} from "../actions/type";

const initialState = {
  data: [],
  isLoading: false,
  error: null,
  // checkFirst:1
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_LIST_NOTIFICATION: {
      return {
        ...state,
        isLoading: true,
        // checkFirst: action.checkFirst
      };
    }
    case GET_LIST_NOTIFICATION_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        error: null,
        data: action.payload
      };
    }
    case GET_LIST_NOTIFICATION_FAIL: {
      // alert(state.error+'1212121')
      return {
        ...state,
        error: action.payload
      };
    }
    default:
      return state;
  }
}
