import { combineReducers } from "redux";
import UserReducer from "./UserReducer";
import ClassListReducer from "./ClassListReducer";
import ListAbsentReducer from "./ListAbsentReducer";
import DetailAbsentReducer from "./DetailAbsentReducer";
import StudentAbsentReducer from "./StudentAbsentReducer";
import ListNotifyReducer from "./ListNotifyReducer";
import { RESET } from "../actions/type";


 appReducer= combineReducers({
  userReducer: UserReducer,
  classListReducer: ClassListReducer,
  listAbsentReducer:ListAbsentReducer,
  detailAbsentReducer:DetailAbsentReducer,
  studentAbsentReducer:StudentAbsentReducer,
  listNotifyReducer:ListNotifyReducer
});

const initialState = appReducer({}, {})

export default  rootReducer = (state, action) => {
  if (action.type === RESET) {
    state = initialState
  }

  return appReducer(state, action)
}
