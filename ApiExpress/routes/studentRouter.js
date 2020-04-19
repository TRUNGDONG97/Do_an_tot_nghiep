import express from 'express'
import StudentController from '../Controllers/StudentController'
const router = express.Router();
/* GET home page. */

router.get('/index', StudentController.getStudent);
module.exports = router;