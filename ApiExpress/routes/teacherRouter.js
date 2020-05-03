import express from 'express'
import TeacherController from '../controllers/TeacherController'
const router = express.Router();
/* GET home page. */

router.get('/index', TeacherController.getTeacher);
module.exports = router;