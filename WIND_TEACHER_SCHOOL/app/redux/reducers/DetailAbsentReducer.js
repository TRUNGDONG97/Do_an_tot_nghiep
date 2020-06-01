import { GET_DETAIL_ABSENT, GET_DETAIL_ABSENT_SUCCESS, GET_DETAIL_ABSENT_FAIL } from "../actions/type";
const initialState = {
  listStudent: [],
  countAbsent: null,
  total: null,
  absentClass:{},
  class:{},
  // mail: {},
  // promotion: [],
  isLoading: true,
  error: null,

};
export default function (state = initialState, action) {
  switch (action.type) {
    case GET_DETAIL_ABSENT:
      return {
        ...state,
        isLoading: true,
        error: null,
        listStudent: []
      };

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

    case GET_DETAIL_ABSENT_FAIL:
      return { ...state, error: action.payload, isLoading: false, listStudent: [] };
    default:
      return state;
  }
}