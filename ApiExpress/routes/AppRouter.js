import express from 'express'
import Auth from '../api/AppApi/AuthApi'
import Student from '../api/AppApi/StudentApi'
import Teacher from '../api/AppApi/TeacherApi'
const router = express.Router();
router.post('/login', Auth.login)
router.get('/logout', Auth.logout)

router.get('/student/getClass', Student.getClass)
router.get('/student/getUserInfo', Student.getUserInfo)
router.post('/student/changeUserInfo', Student.changeUserInfo)
router.post('/student/changePass', Student.changePass)

router.get('/teacher/getClass', Teacher.getClass)
router.get('/teacher/getUserInfo', Teacher.getUserInfo)
router.post('/teacher/changeUserInfo', Teacher.changeUserInfo)
router.post('/teacher/changePass', Teacher.changePass)
router.post('/teacher/createAbsent', Teacher.createAbsent)
router.get('/teacher/getListAbsent', Teacher.getListAbsent)
router.get('/teacher/getDetailAbsent', Teacher.getDetailAbsent)

module.exports = router;