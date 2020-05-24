import { put, takeEvery, call } from 'redux-saga/effects'

import {
  REQUEST_LOGIN_SUCCESS,
  REQUEST_LOGIN_FAIL,
  REQUEST_LOGIN,
  GET_LIST_ABSENT_SUCCESS,
  GET_LIST_ABSENT_FAIL,
  GET_LIST_ABSENT,
  GET_LIST_CLASS_SUCCESS,
  GET_LIST_CLASS_FAIL,
  GET_LIST_CLASS,
  GET_LIST_NOTIFICATION_SUCCESS,
  GET_LIST_NOTIFICATION_FAIL,
  GET_LIST_NOTIFICATION,
  GET_LIST_FEE,
  GET_LIST_FEE_SUCCESS,
  GET_LIST_FEE_FAIL

} from '../actions/type';

import * as API from '../../constants/Api'
import reactotron from 'reactotron-react-native';

export function* requestLogin(payload) {
  try {
    const response = yield call(API.requestLogin, payload)
    yield put({ type: REQUEST_LOGIN_SUCCESS, payload: response.result })
  } catch (err) {
    yield put({ type: REQUEST_LOGIN_FAIL, payload: err })
  }
}

export function* getListAbsent(action) {
  try {
    const response = yield call(API.getListAbsent, action.payload)
    yield put({ type: GET_LIST_ABSENT_SUCCESS, payload: response.result })
    // alert(JSON.stringify(response))
  } catch (err) {
    yield put({ type: GET_LIST_ABSENT_FAIL, payload: err })
    // alert(err)
  }
}

export function* getListClass(action) {
  try {
    const response = yield call(API.getListClass)
    yield put({ type: GET_LIST_CLASS_SUCCESS, payload: response.result })
    // alert(JSON.stringify(response))
  } catch (err) {
    yield put({ type: GET_LIST_CLASS_FAIL, payload: err })
    // alert(err)
  }
}


export function* getListNotify(action) {
  try {
    const response = yield call(API.getListNotification, action.payload)
    yield put({ type: GET_LIST_NOTIFICATION_SUCCESS, payload: response.result })
    // alert(JSON.stringify(response))
  } catch (err) {
    yield put({ type: GET_LIST_NOTIFICATION_FAIL, payload: err })
    // alert(err)
  }
}

export function* getListFee(action) {
  try {
    const response = yield call(API.getListFee, action.payload)
    yield put({ type: GET_LIST_FEE_SUCCESS, payload: response.result })
    // alert(JSON.stringify(response))
  } catch (err) {
    yield put({ type: GET_LIST_FEE_FAIL, payload: err })
    // alert(err)
  }
}

export const watchLogin = takeEvery(REQUEST_LOGIN, requestLogin);
export const watchListAbsent = takeEvery(GET_LIST_ABSENT, getListAbsent);
export const watchGetListClass = takeEvery(GET_LIST_CLASS, getListClass);
export const watchGetListNotify = takeEvery(GET_LIST_NOTIFICATION, getListNotify);
export const watchGetListFee = takeEvery(GET_LIST_FEE, getListFee);