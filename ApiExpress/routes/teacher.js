import express from 'express' 
import TeacherControlller from'../Controllers/TeacherController'
// const Teacher = require('../public/Models/TeacherModel')
// const Absent = require('../public/Models/AbsentModel')
const router = express.Router();
/* GET home page. */
router.post('/', TeacherControlller.AddTeacher);
export default router;