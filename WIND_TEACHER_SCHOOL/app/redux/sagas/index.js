import { 
  watchGetListCLass,
  // watchGetSalary,
  watchAbsentTeacher,
  watchSendAbsent,
  watchGetListNotify,
  watchGetUserInfo,
  watchUpdateUser
} from './NetworkSaga'


export default function* rootSaga() {
  yield watchGetListCLass
  // yield watchGetSalary
  yield watchAbsentTeacher
  yield watchSendAbsent
  yield watchGetListNotify
  yield watchGetUserInfo
  yield watchUpdateUser
}