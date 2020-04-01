const express = require('express');
const router = express.Router();
const testControlller = require('../public/Controllers/testController')
const Teacher = require('../public/Models/TeacherModel')
const Absent = require('../public/Models/AbsentModel')
/* GET home page. */
router.post('/', async (req, res, next) => {
    let { name, phone, password, email } = req.body
    try {
        let newTeacher = await Teacher.create({
            name,
            phone,
            password,
            email,
            // birthday,
            // address,
            // created_date:new Date().getDate(),
            // is_active:1,
            // subject_id:1
        }, {
            feilds: ['name', 'phone', 'password', 'email']
        })
        if (newTeacher) {
            res.json({
                result: 'thanh cong',
                data: newTeacher
            })
        } else {
            res.json({
                result: 'that bai',
                data: {},
                message:'Insert new Teacher failed'
            })
        }
    } catch (error) {
        console.log(error)
        res.json({
            result: 'that bai',
            data: {},
            error:error
        })
    }
    // res.json({
    //     message: 'You are index page'
    // })
});
module.exports = router;
