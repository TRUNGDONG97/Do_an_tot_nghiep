import express from 'express'
import WebApi from '../api/WebApi'

const router = express.Router();
/* GET home page. */
// router.post('/', testControlller.AddTeacher);

router.get('/', function(req, res, next) {
    res.render('IndexView');
});
router.post('/user/changePass',WebApi.changePass)
router.get('/getCountStudent',WebApi.getCountStudent)
router.get('/getCountTeacher',WebApi.getCountTeacher)
router.get('/getCountClass',WebApi.getCountClass)
router.post('/getStudent',WebApi.getStudent)
router.post('/student/search',WebApi.searchStudent)
router.post('/student/delete',WebApi.deleteStudent)
router.post('/student/add',WebApi.addStudent)
router.post('/student/edit',WebApi.editStudent)
router.post('/student/save',WebApi.saveStudent)
router.post('/student/resetPass',WebApi.resetPass)
module.exports = router;