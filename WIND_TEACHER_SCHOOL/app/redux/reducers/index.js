import { combineReducers } from "redux";
import UserReducer from "./UserReducer";
import ClassListReducer from "./ClassListReducer";
import { RESET } from "../actions/type";


 appReducer= combineReducers({
  userReducer: UserReducer,
  classListReducer: ClassListReducer,
});

const initialState = appReducer({}, {})

export default  rootReducer = (state, action) => {
  if (action.type === RESET) {
    state = initialState
  }

  return appReducer(state, action)
}
