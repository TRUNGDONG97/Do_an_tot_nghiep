import {
  GET_DETAIL_ABSENT, GET_DETAIL_ABSENT_SUCCESS, GET_DETAIL_ABSENT_FAIL,
CHANGE_ABSENT_STUDENT,CHANGE_ABSENT_STUDENT_SUCCESS,CHANGE_ABSENT_STUDENT_FAIL
} from "../actions/type";
const initialState = {
  listStudent: [],
  countAbsent: null,
  total: null,
  absentClass: {},
  class: {},
  // mail: {},
  // promotion: [],
  isLoading: true,
  error: null,

};
export default function (state = initialState, action) {
  switch (action.type) {
    case CHANGE_ABSENT_STUDENT:
    case GET_DETAIL_ABSENT:
      return {
        ...state,
        isLoading: true,
        error: null,
        listStudent: []
      };
    case CHANGE_ABSENT_STUDENT_SUCCESS:
    case GET_DETAIL_ABSENT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: null,
        // data: action.payload,
        listStudent: action.payload.listStudent,
        countAbsent: action.payload.countAbsent,
        total: action.payload.total,
        absentClass: action.payload.absentClass,
        classes: action.payload.classes,
      };
    case CHANGE_ABSENT_STUDENT_FAIL:
    case GET_DETAIL_ABSENT_FAIL:
      return { ...state, error: action.payload, isLoading: false, listStudent: [] };
    default:
      return state;
  }
}