import express from 'express' 
import TeacherControlller from'../controllers/TeacherController'
const router = express.Router();
/* GET home page. */
router.post('/', TeacherControlller.addTeacher);
export default router;