const OPTION = {
    maxAge: 1000 * 60 * 30, // would expire after 30 minutes
    httpOnly: true, // The cookie only accessible by the web server
    signed: true,
}
const PER_PAGE = 20;
const PAGE_SIZE = 10;
// const TYPE_LOGIN = {
//     STUDENT: 1,
//     TEACHER: 2
// }
const TIME_ABSENT = 5;
const TYPE_NOTIFICATION={
    ABSENT_CLASS_END:1,
    CANCEL_ABSENT:2,
    ABSENT_STUDENT:3
}
const DISTANCE=250
export default {
    OPTION,
    PER_PAGE,
    PAGE_SIZE,
    TIME_ABSENT,
    TYPE_NOTIFICATION,
    DISTANCE
}