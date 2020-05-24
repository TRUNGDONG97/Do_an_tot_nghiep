import {
  REQUEST_ABSENT,
  REQUEST_ABSENT_FAIL,
  REQUEST_ABSENT_SUCCESS,
  CHANGE_STATUS
} from "../actions/type";

const initialState = {
  data: {},
  isLoading: false,
  error: null,
  listAbsentStudent: [],
  isSuceess: false,
  isChanged: false,
  isAbsent:null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case REQUEST_ABSENT: {
      return { ...state, isLoading: true, isAbsent:action.payload.absentID };
    }
    case REQUEST_ABSENT_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        error: null,
        data: action.payload,
        listAbsentStudent: action.payload.listabsentDetail,
        isSuceess: true
      };
    }
    case REQUEST_ABSENT_FAIL: {
      return {
        ...state,
        error: action.payload,
        isLoading: false,
        isSuceess: false
      };
    }
    case CHANGE_STATUS: {
      return {
        ...state,
        isLoading: false,
        error: null,
        // data: action.payload,
        listAbsentStudent: action.payload.listStudent,
        isChanged: true
      };
    }
    default:
      return state;
  }
}
