import {
    GET_SALARY,
    GET_SALARY_SUCCESS,
    GET_SALARY_FAIL
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
      case GET_SALARY:
        return {
          ...state,
          isLoading: true,
          error:null,
          // username: action.payload.username,
          // password: action.payload.password
        };
  
      case GET_SALARY_SUCCESS:
        return {
          ...state,
          isLoading: false,
          // mail:action.payload.mail,
          data: action.payload,
          error:null,
          // news: action.payload.listNews,
          // promotion: action.payload.listPromtoion
        };
  
      case GET_SALARY_FAIL:
        return { ...state, error: action.payload, isErr: true, isLoading: false };
      default:
        return state;
    }
  }
  