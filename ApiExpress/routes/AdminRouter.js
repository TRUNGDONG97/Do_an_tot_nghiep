import express from 'express'
import AuthController from '../controllers/AuthController'
import ClassController from '../controllers/ClassController'
import HomeController from '../controllers/HomeController'
import StudentController from '../controllers/StudentController'
import TeacherController from '../controllers/TeacherController'
const router = express.Router();

// router.get('/login', AuthController.login);
// router.post('/login', AuthController.postLogin);
router.get('/class/index', ClassController.getClass);
router.get('/home/index', HomeController.home);
// router.get('/logout', AuthController.logout);
router.get('/student/index', StudentController.getStudent);
router.get('/teacher/index', TeacherController.getTeacher);
module.exports = router;