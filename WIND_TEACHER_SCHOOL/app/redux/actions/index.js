import {
  REQUEST_LOGIN,
  GET_CLASS_LIST,
  GET_CLASS_LIST_SUCCESS,
  GET_CLASS_LIST_FAIL,
  GET_SALARY,
  REQUEST_ABSENT,
  CHANGE_STATUS,
  SEND_ABSENT,
  GET_LIST_NOTIFICATION
} from "./type";

export const requestLogin = (username, password, deviceID) => ({
  type: REQUEST_LOGIN,
  payload: {
    phone: username,
    password: password,
    deviceID: deviceID
  }
});

export const getListClass = () => ({
  type: GET_CLASS_LIST,
  payload: {}
});

export const getSalary = month => ({
  type: GET_SALARY,
  payload: { month: month }
});

export const AbsentByTeacher = (classID, absentID, long, lati) => ({
  type: REQUEST_ABSENT,
  payload: {
    classID: classID,
    absentID: absentID,
    long: long,
    lati: lati
  }
});

export const changeStatusStudent = listStudent => ({
  type: CHANGE_STATUS,
  payload: {
    listStudent: listStudent
  }
});

//
export const sendAbsent = (
  absentID,
  classID,
  absentType,
  note,
  dayLate,
  listabsentDetail,
  is_absent,
  scheduleID
) => ({
  type: SEND_ABSENT,
  payload: {
    absentID: absentID,
    classID: classID,
    absentType: absentType,
    absentStatus: 1,
    note: note,
    dayLate: dayLate,
    listabsentDetail: listabsentDetail,
    is_absent: is_absent,
    scheduleID: scheduleID
  }
});


export const getListNotifyAction = (checkFirst) => ({
  type: GET_LIST_NOTIFICATION,
  payload: {
    notiID: 0,
  },
  checkFirst:checkFirst
});
