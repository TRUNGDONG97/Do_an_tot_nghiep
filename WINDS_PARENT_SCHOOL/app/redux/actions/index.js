import { REQUEST_LOGIN, GET_LIST_ABSENT, GET_LIST_CLASS, GET_LIST_NOTIFICATION, GET_LIST_FEE } from "./type";

export const getUserInfo = (username, password) => ({
  type: REQUEST_LOGIN,
  payload: {
    username: username,
    password: password
  }
});

export const getListAbsentAction = (month, classID, className, typeLoading) => ({
  type: GET_LIST_ABSENT,
  payload: {
    Month: month,
    ClassID: classID,
    ClassName: className
  },
  typeLoading: typeLoading
});

export const getListClassAction = (deviceID) => ({
  type: GET_LIST_CLASS,
  payload: { deviceID: deviceID }
});

export const getListNotifyAction = () => ({
  type: GET_LIST_NOTIFICATION,
  payload: {
    notiID: 0
  }
});

export const getListFeeAction = (dateTime) => ({
  type: GET_LIST_FEE,
  payload: {
    dateTime: dateTime
  }
});
