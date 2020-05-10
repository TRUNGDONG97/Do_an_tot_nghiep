import express from 'express'
import WebApi from '../api/WebApi'


const router = express.Router();

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
router.post('/student/detail',WebApi.detailStudent)
router.post('/student/save',WebApi.saveStudent)
router.post('/student/resetPass',WebApi.resetPass)
router.post('/getTeacher',WebApi.getTeacher)
router.post('/teacher/search',WebApi.searchTeacher)
router.post('/uploadAvatar',WebApi.uploadAvatar)
router.post('/teacher/add',WebApi.addTeacher)
router.post('/teacher/delete',WebApi.deleteTeacher)
router.post('/teacher/edit',WebApi.editTeacher)
router.post('/teacher/resetPass',WebApi.resetPassTeacher)
router.post('/teacher/save',WebApi.saveTeacher)

module.exports = router;