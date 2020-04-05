import Teacher from '../Models/TeacherModel'
import { isNumeric, isEmty } from 'validator'
import Absent from '../Models/AbsentModel'
const AddTeacher = async (req, res, next) => {
    let { name, phone, password, email } = req.body
    if (name.isEmty) {
        res.json({
            result: 'faile',
            data: {},
            message: 'tên không thể trống'
        })
        return;
    }

    try {
        
        let newTeacher = await Teacher.create({
            name,
            phone,
            password,
            email,
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
                message: 'Insert new Teacher failed'
            })
        }
    } catch (error) {
        console.log(error)
        res.json({
            result: 'that bai',
            data: {},
            error: error
        })
    }
   
}
export default {
    AddTeacher: AddTeacher
}