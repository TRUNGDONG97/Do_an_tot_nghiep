import md5 from 'md5'
import Constants from '../constants/Constants'
import UserModel from '../Models/UserModel'
import StudentModel from '../Models/StudentModel'
import ClassModel from '../Models/ClassModel'
import TeacherModel from '../Models/TeacherModel'
const changePass = async (req, res, next) => {
    // console.log(req.body)
    var {CurrentPassword,NewPassword}=req.body
    // var password = req.body.CurrentPassword
    var user_name = req.signedCookies.username
    // console.log(CurrentPassword,"CurrentPassword")
    // console.log(NewPassword,"NewPassword")
    // console.log(user_name,"user_name")
    var password=md5(CurrentPassword)
    try {
        const users = await UserModel.findAll({
            attribute: ["id","password"],
            where: {
                user_name,
                password
            }
        })
        if (users.length == 0) {
            res.send({type:"WRONG_PASSWORD"})
        } else {
            await UserModel.update({
                password:md5(NewPassword)
            },{
                where:{
                    id:users[0].id
                }
            })
            res.cookie('password', users[0].password, Constants.OPTION)
            res.send({type:'SUCCESS'})
        }
    } catch (error) {
        res.send({type:"error"})
        console.log(error)
    }
}
const getStudent=async (req,res,next)=>{
    try {
        // const students= StudentModel.findAll({
        //     attribute:['id','name','phone','birthday','password','address','email','sex','mssv']
        // })
        const students=await StudentModel.findAll()
        // console.log(students.length,"students")
        res.send({
            students:students
        })
    } catch (error) {
        res.send({
            students:[]
        })
    }
}
const getTeacher=async (req,res,next)=>{
    try {
        const teachers=await TeacherModel.findAll()
        // console.log(teachers.length,"teachers")
        res.send({
            teachers:teachers
        })
    } catch (error) {
        res.send({
            teachers:[]
        })
    }
}
const getClass=async (req,res,next)=>{
    try {
        const classes=await ClassModel.findAll()
        // console.log(classes.length,"classes")
        res.send({
            classes:classes
        })
    } catch (error) {
        res.send({
            classes:[]
        })
    }
}


export default{
    changePass,
    getStudent,
    getTeacher,
    getClass
}