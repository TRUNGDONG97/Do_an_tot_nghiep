import {
  watchLogin,
  watchListAbsent,
  watchGetListClass,
  watchGetListNotify,
  watchGetListFee,
  watchGetUserInfo,
  watchUpdateUser,
  // watchGetDetailClass
} from './NetworkSaga'


export default function* rootSaga() {
  yield watchLogin
  yield watchListAbsent
  yield watchGetListClass
  yield watchGetListNotify
  yield watchGetListFee
  yield watchGetUserInfo
  yield watchUpdateUser
  // yield watchGetDetailClass
}