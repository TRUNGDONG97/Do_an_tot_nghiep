import { put, takeEvery, call } from "redux-saga/effects";
import { Alert } from "react-native";
import {
  REQUEST_LOGIN_SUCCESS,
  REQUEST_LOGIN_FAIL,
  REQUEST_LOGIN,
  GET_CLASS_LIST,
  GET_CLASS_LIST_SUCCESS,
  GET_CLASS_LIST_FAIL,
  GET_SALARY,
  GET_SALARY_SUCCESS,
  GET_SALARY_FAIL,
  REQUEST_ABSENT_SUCCESS,
  REQUEST_ABSENT_FAIL,
  REQUEST_ABSENT,
  SEND_ABSENT_SUCCESS,
  SEND_ABSENT_FAIL,
  SEND_ABSENT,
  GET_LIST_NOTIFICATION,
  GET_LIST_NOTIFICATION_FAIL,
  GET_LIST_NOTIFICATION_SUCCESS
} from "../actions/type";

import * as API from "../../constants/Api";
import reactotron from "reactotron-react-native";
import NavigationUtil from "../../navigation/NavigationUtil";
import { showMessages, _showDialogWaring } from "@app/utils/Alert";
import AsyncStorage from "@react-native-community/async-storage"

// import ReactontronConfig from '.../ReactontronConfig'

export function* requestLogin(action) {
  try {
    const response = yield call(API.requestLogin, action.payload);
    yield call(AsyncStorage.setItem, "token", response.result.token);
    yield call(AsyncStorage.setItem, "name", response.result.name);
    yield put({ type: REQUEST_LOGIN_SUCCESS, payload: response.result });

    NavigationUtil.navigate("Main");
    // alert(response)
  } catch (err) {
    yield put({ type: REQUEST_LOGIN_FAIL, payload: err });
    // alert(err+'lỗi')
  }
}

export function* getListClass() {
  try {
    // console.tron = ReactontronConfig
    // console.tron.log
    const response = yield call(API.getListClass);
    yield put({ type: GET_CLASS_LIST_SUCCESS, payload: response.result });
  } catch (err) {
    yield put({ type: GET_CLASS_LIST_FAIL, payload: err });
    // alert(err+'lỗi')
  }
}

export function* getSalary(action) {
  try {
    const response = yield call(API.getSalary, action.payload);
    yield put({ type: GET_SALARY_SUCCESS, payload: response.result });
    // alert(JSON.stringify(response))
  } catch (err) {
    yield put({ type: GET_SALARY_FAIL, payload: err });
    // alert(err + "lỗi");
  }
}

handleEnableAbsent = (data, payload) => {
  if (data.dayLate !== 0) {
    let dayLate = data.dayLate == 8 ? "Chủ nhật" : `Thứ ${data.dayLate}`
    _showDialogWaring(
      "Thông báo",
      dayLate +
      " bạn đã điển danh muộn, Bạn có muốn tiếp tục điểm danh không",
      () =>
        NavigationUtil.navigate("absent", {
          classID: data.classID,
          absentID: data.absentID
        }), 'Điểm danh'
    );
  } else if (data.is_Absent === 0 && payload.classID !== 0) {
    showMessages("Thông báo", "Bạn chưa thể thực hiện tác vụ này");
    // console.log("Thông báo", "Bạn chưa thể thực hiện tác vụ này");
  } else {
    NavigationUtil.navigate("absent", {
      classID: data.classID,
      absentID: data.absentID
    });
  }
};
export function* absentByTeacher(action) {
  try {
    const response = yield call(API.absentByTeacher, action.payload);
    yield put({ type: REQUEST_ABSENT_SUCCESS, payload: response.result });
    this.handleEnableAbsent(response.result, action.payload);

    // Alert.alert("Thông báo", "Bạn chưa thể thực hiện tác vụ này");
  } catch (err) {
    yield put({ type: REQUEST_ABSENT_FAIL, payload: err });
    // alert(err+'lỗi')
  }
}

export function* sendAbsent(action) {
  try {
    const response = yield call(API.sendAbsent, action.payload);
    yield put({ type: SEND_ABSENT_SUCCESS, payload: response.result });
    // Alert.alert("Thông báo", response.message);
    showMessages("Thông báo", response.message);
    NavigationUtil.goBack()
    // alert(JSON.stringify(response))
  } catch (err) {
    yield put({ type: SEND_ABSENT_FAIL, payload: err });
    // alert(err+'lỗi')
  }
}

export function* getListNotify(action) {
  try {
    const response = yield call(API.getNotify, action.payload)
    yield put({ type: GET_LIST_NOTIFICATION_SUCCESS, payload: response.result })
    // alert(JSON.stringify(response))
  } catch (err) {
    // alert(err+"lô")
    yield put({ type: GET_LIST_NOTIFICATION_FAIL, payload: err })

  }
}

export const watchLogin = takeEvery(REQUEST_LOGIN, requestLogin);
export const watchGetListCLass = takeEvery(GET_CLASS_LIST, getListClass);
export const watchGetSalary = takeEvery(GET_SALARY, getSalary);
export const watchAbsentTeacher = takeEvery(REQUEST_ABSENT, absentByTeacher);
export const watchSendAbsent = takeEvery(SEND_ABSENT, sendAbsent);
export const watchGetListNotify = takeEvery(GET_LIST_NOTIFICATION, getListNotify);
