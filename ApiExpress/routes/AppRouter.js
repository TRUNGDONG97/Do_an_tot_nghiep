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
router.get('/teacher/getClass', Teacher.getClass)
router.get('/teacher/getUserInfo', Teacher.getUserInfo)
router.post('/teacher/changeUserInfo', Teacher.changeUserInfo)

module.exports = router;