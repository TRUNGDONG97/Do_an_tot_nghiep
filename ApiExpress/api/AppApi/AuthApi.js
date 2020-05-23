import TeacherModel from '../../models/TeacherModel'
import ClassModel from '../../models/ClassModel'
// import RoomModel from '../../models/RoomModel'
import ScheduleClassModel from '../../models/ScheduleClassModel'
import SubjectModel from '../../models/SubjectModel'
import StudentModel from '../../models/StudentModel'
import StudentClassModel from '../../models/StudentClassModel'
import pug from 'pug'
import { getArrayPages, PageCount } from '../../constants/Funtions'
import { Op } from 'sequelize'
import sequelize from 'sequelize'
import md5 from 'md5';
import crypto from 'crypto-js';
const login = async (req, res, next) => {
    const { user, password, type, deviceID } = req.body;
    // console.log(user);
    // console.log(password);
    // console.log(type == 1);


    if (user == '' || password == '' || (type != 1 && type != 2)) {
        res.json({
            "status": 0,
            "code": 400,
            "message": "Kiểm tra dữ liệu đầu vào",
            "data": ""
        })
        return;
    }
    try {
        if (type == 1) {
            const student = await StudentModel.findAndCountAll({
                attributes: ['id', 'name', 'phone', 'birthday', 'address', 'email', 'device_id', 'token', 'url_avatar', 'sex', 'mssv'],
                where: {
                    mssv: user,
                    password: md5(password)
                }
            })
            if (student.count < 1) {
                res.json({
                    "status": 0,
                    "code": 513,
                    "message": "Sai tài khoản hoặc mật khẩu",
                    "data": ""
                })
                return;
            } else {
                var timeNow = new Date().getTime()
                var token = crypto.AES.encrypt(timeNow.toString(), password).toString();
                // console.log(token)
                await StudentModel.update({
                    token,
                    device_id: deviceID
                }, {
                    where: {
                        id: student.rows[0].id
                    }
                })
                student.rows[0].token = token
                student.rows[0].device_id = deviceID
                student.rows[0].birthday= student.rows[0].birthday.toString().split("-").reverse().join("/")
                res.json({
                    "status": 1,
                    "code": 200,
                    "message": "",
                    "data": student.rows[0]
                })
                return;
            }
        }
        if (type == 2) {
            const teacher = await TeacherModel.findAndCountAll({
                attributes: ['id', 'name', 'phone', 'birthday', 'address', 'email', 'device_id', 'token', 'url_avatar', 'sex', 'status', 'salary'],
                where: {
                    phone: user,
                    password: md5(password)
                }
            })

            // console.log(teacher.count)
            if (teacher.count < 1) {
                res.json({
                    "status": 0,
                    "code": 513,
                    "message": "Sai tài khoản hoặc mật khẩu",
                    "data": ""
                })
                return;
            } else {
                var timeNow = new Date().getTime()
                var token = crypto.AES.encrypt(timeNow.toString(), password).toString();
                // console.log(token)
                await TeacherModel.update({
                    token,
                    device_id: deviceID
                }, {
                    where: {
                        id: teacher.rows[0].id
                    }
                })
                teacher.rows[0].token = token
                teacher.rows[0].device_id = deviceID

                res.json({
                    "status": 1,
                    "code": 200,
                    "message": "",
                    "data": teacher.rows[0]
                })
                return;
            }
        }
    } catch (error) {
        res.json({
            "status": 0,
            "code": 404,
            "message": "Đã có lỗi xảy ra",
            "data": error
        })
        return;
    }


}
const logout = async (req, res, next) => {
    const { token } = req.headers
    // console.log(token)
    if(token==''){
        res.json({
            "status": 0,
            "code": 404,
            "message": 'thất bại',
            "data": ""
        })
        return;
    }
    try {
        const teacher = await TeacherModel.findAndCountAll({
            where: {
                token
            }
        })
        if (teacher.count > 0) {
            await TeacherModel.update({
                token: null
            }, {
                where: {
                    id: teacher.rows[0].id
                }
            })
            res.json({
                "status": 1,
                "code": 200,
                "message": 'thành công',
                "data": ""
            })
            return;
        }
        const student = await StudentModel.findAndCountAll({
            where: {
                token
            }
        })
        if (student.count > 0) {
            await StudentModel.update({
                token: null
            }, {
                where: {
                    id: student.rows[0].id
                }
            })
            res.json({
                "status": 1,
                "code": 200,
                "message": 'thành công',
                "data": ""
            })
            return;
        }
        // if (teacher.count < 0 && student < 0){
        res.json({
            "status": 0,
            "code": 403,
            "message": 'Chưa đăng nhập',
            "data": ""
        })
        return;

    } catch (error) {
        res.json({
            "status": 0,
            "code": 404,
            "message": "Đã có lỗi xảy ra",
            "data": ''
        })
        return;
    }
}

// const getListClass=async(req,res,next)=>{

// }

export default {
    login,
    logout,
    // getListClass
}