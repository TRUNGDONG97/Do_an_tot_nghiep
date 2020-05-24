import {
  watchLogin,
  watchListAbsent,
  watchGetListClass,
  watchGetListNotify,
  watchGetListFee
} from './NetworkSaga'


export default function* rootSaga() {
  yield watchLogin
  yield watchListAbsent
  yield watchGetListClass
  yield watchGetListNotify
  yield watchGetListFee
}