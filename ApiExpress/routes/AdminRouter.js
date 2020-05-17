import express from 'express'
import AuthController from '../controllers/AuthController'
import ClassController from '../controllers/ClassController'
import HomeController from '../controllers/HomeController'
import StudentController from '../controllers/StudentController'
import TeacherController from '../controllers/TeacherController'
import SubjectController from '../controllers/SubjectController'
const router = express.Router();

router.get('/home/index', HomeController.home);
router.get('/student/index', StudentController.getStudent);
router.get('/teacher/index', TeacherController.getTeacher);
router.get('/subject/index', SubjectController.getSubject);
router.get('/class/index', ClassController.getClass);
router.get('/class/detail', ClassController.detailClass);
module.exports = router;