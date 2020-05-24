import { 
  watchLogin,
  watchGetListCLass,
  watchGetSalary,
  watchAbsentTeacher,
  watchSendAbsent,
  watchGetListNotify
} from './NetworkSaga'


export default function* rootSaga() {
  yield watchLogin
  yield watchGetListCLass
  yield watchGetSalary,
  yield watchAbsentTeacher,
  yield watchSendAbsent,
  yield watchGetListNotify
}