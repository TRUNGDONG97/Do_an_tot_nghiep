import express from 'express'
import Other from '../api/WebApi/Other'
import Student from '../api/WebApi/Student'
import Teacher from '../api/WebApi/Teacher'
import Class from '../api/WebApi/Class'
import Subject from '../api/WebApi/Subject'

const router = express.Router();

router.get('/', function(req, res, next) {
    res.render('IndexView');
});
router.post('/user/changePass', Other.changePass)
router.get('/getCountStudent', Other.getCountStudent)
router.get('/getCountTeacher', Other.getCountTeacher)
router.get('/getCountClass', Other.getCountClass)
router.get('/getCountSubject', Other.getCountSubject)
router.post('/uploadAvatar', Other.uploadAvatar)

router.post('/getStudent', Student.getStudent)
router.post('/student/search', Student.searchStudent)
router.post('/student/delete', Student.deleteStudent)
router.post('/student/add', Student.addStudent)
router.post('/student/edit', Student.editStudent)
router.post('/student/detail', Student.detailStudent)
router.post('/student/save', Student.saveStudent)
router.post('/student/resetPass', Student.resetPass)

router.post('/getTeacher', Teacher.getTeacher)
router.post('/teacher/search', Teacher.searchTeacher)
router.post('/teacher/add', Teacher.addTeacher)
router.post('/teacher/delete', Teacher.deleteTeacher)
router.post('/teacher/edit', Teacher.editTeacher)
router.post('/teacher/resetPass', Teacher.resetPassTeacher)
router.post('/teacher/save', Teacher.saveTeacher)

router.post('/getClass', Class.getClass)
router.post('/class/search', Class.searchClass)
router.post('/class/add', Class.addClass)
router.post('/class/addStuInclass', Class.addStuInclass)
router.post('/class/searchStuInclass', Class.searchStuInclass)
router.post('/class/edit', Class.editClass)
router.post('/class/save', Class.saveClass)

router.post('/getSubject', Subject.getSubject)
router.post('/subject/search', Subject.searchSubject)
router.post('/subject/add', Subject.addSubject)
router.post('/subject/delete', Subject.deleteSubject)
router.post('/subject/edit', Subject.editSubject)
router.post('/subject/save', Subject.saveSubject)
module.exports = router;