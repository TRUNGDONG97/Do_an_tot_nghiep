import express from 'express'
import WebApi from '../Api/WebApi'

const router = express.Router();
/* GET home page. */
// router.post('/', testControlller.AddTeacher);

router.get('/', function(req, res, next) {
    res.render('index', { name: 'John' });
});
router.post('/user/changePass',WebApi.changePass)
router.get('/getCountStudent',WebApi.getCountStudent)
router.get('/getCountTeacher',WebApi.getCountTeacher)
router.get('/getCountClass',WebApi.getCountClass)
router.post('/getStudent',WebApi.getStudent)
router.post('/student/search',WebApi.searchStudent)
router.post('/student/delete',WebApi.deleteStudent)
module.exports = router;