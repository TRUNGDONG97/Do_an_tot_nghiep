import { GET_STUDENT_ABSENT, GET_STUDENT_ABSENT_SUCCESS, GET_STUDENT_ABSENT_FAIL } from "../actions/type";
const initialState = {
  student: {},
  countAbsent: null,
  total: null,
  listAbsent:[],
  // mail: {},
  // promotion: [],
  isLoading: true,
  error: null,

};
export default function (state = initialState, action) {
  switch (action.type) {
    case GET_STUDENT_ABSENT:
      return {
        ...state,
        isLoading: true,
        error: null

      };

    case GET_STUDENT_ABSENT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: null,
        // data: action.payload,
        student: action.payload.student,
        countAbsent: action.payload.countAbsent,
        total: action.payload.total,
        listAbsent:action.payload.listAbsent
      };

    case GET_STUDENT_ABSENT_FAIL:
      return { ...state, error: action.payload, isLoading: false};
    default:
      return state;
  }
}