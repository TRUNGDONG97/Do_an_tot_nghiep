import express from 'express'
import AuthController from '../controllers/AuthController'
import ClassController from '../controllers/ClassController'
import HomeController from '../controllers/HomeController'
import StudentController from '../controllers/StudentController'
import TeacherController from '../controllers/TeacherController'
import SubjectController from '../controllers/SubjectController'
const router = express.Router();

router.get('/home', HomeController.home);
router.get('/student', StudentController.getStudent);
router.get('/teacher', TeacherController.getTeacher);
// router.get('/teacher/class', TeacherController.getTeacherClass);
router.get('/subject', SubjectController.getSubject);
router.get('/class', ClassController.getClass);
router.get('/class/detail', ClassController.detailClass);
module.exports = router;