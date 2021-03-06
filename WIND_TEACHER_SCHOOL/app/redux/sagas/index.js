import { 
  watchGetListCLass,
  // watchGetSalary,
  watchAbsentTeacher,
  // watchSendAbsent,
  watchGetListNotify,
  watchGetUserInfo,
  watchUpdateUser,
  watchGetListAbsent,
  watchGetDetailAbsent,
  watchGetStudentAbsent,
  watchGetDetailClass,
  watchChangeAbsentStudent
} from './NetworkSaga'


export default function* rootSaga() {
  yield watchGetListCLass
  // yield watchGetSalary
  yield watchAbsentTeacher
  // yield watchSendAbsent
  yield watchGetListNotify
  yield watchGetUserInfo
  yield watchUpdateUser
  yield watchGetListAbsent
  yield watchGetDetailAbsent
  yield watchGetStudentAbsent
  yield watchGetDetailClass
  yield watchChangeAbsentStudent
}