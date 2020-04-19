import express from 'express'
import WebApi from '../Api/WebApi'

const router = express.Router();
/* GET home page. */
// router.post('/', testControlller.AddTeacher);

router.get('/', function(req, res, next) {
    res.render('index', { name: 'John' });
});
router.post('/user/changePass',WebApi.changePass)
router.get('/getStudent',WebApi.getStudent)
router.get('/getTeacher',WebApi.getTeacher)
router.get('/getClass',WebApi.getClass)
module.exports = router;