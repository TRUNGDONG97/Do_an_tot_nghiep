import TeacherModel from '../../models/TeacherModel'
import ClassModel from '../../models/ClassModel'
import AbsentClassModel from '../../models/AbsentClassModel'
import AbsentStudentModel from '../../models/AbsentStudentModel'
import ScheduleClassModel from '../../models/ScheduleClassModel'
import SubjectModel from '../../models/SubjectModel'
import StudentModel from '../../models/StudentModel'
import StudentClassModel from '../../models/StudentClassModel'
import pug from 'pug'
import { pushNotificationAppStudent, pushNotificationAppTeacher } from '../../constants/Funtions'
import { Op } from 'sequelize'
import sequelize from 'sequelize'
import md5 from 'md5';
import crypto from 'crypto-js';
import request from 'request'
import Constants from '../../constants/Constants'
import NotificationModel from '../../models/NotificationModel'
const getUserInfo = async (req, res, next) => {
    const { token } = req.headers
    if (token == '') {
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
            const data = teacher.rows[0]
            res.json({
                "status": 1,
                "code": 200,
                "message": 'thành công',
                "data": {
                    id: data.id,
                    name: data.name,
                    phone: data.phone,
                    birthday: data.birthday.split("-").reverse().join("/"),
                    address: data.address,
                    email: data.email,
                    device_id: data.device_id,
                    token: data.token,
                    url_avatar: data.url_avatar,
                    sex: data.sex,
                    status: data.status,
                    salary: data.salary
                }
            })
            return;
        }
        res.json({
            "status": 0,
            "code": 403,
            "message": 'Chưa đăng nhập',
            "data": ""
        })
        return;
    } catch (error) {
        console.log(error)
        res.json({
            "status": 0,
            "code": 404,
            "message": "Đã có lỗi xảy ra",
            "data": ''
        })
        return;
    }
}
const changeUserInfo = async (req, res, next) => {
    const { token } = req.headers
    if (token == '') {
        res.json({
            "status": 0,
            "code": 404,
            "message": 'thất bại',
            "data": ""
        })
        return;
    }
    const { phone, address, sex, birthday, email } = req.body
    // console.log(abc)
    // console.log(address)
    // console.log(sex)
    // console.log(birthday)
    // console.log(password)
    // console.log(email)
    try {
        const count = await TeacherModel.count({
            where: {
                token
            }
        })
        if (count > 0) {
            const updateTea = await TeacherModel.update(
                {
                    phone,
                    address,
                    sex,
                    birthday: birthday.split("/").reverse().join("-"),
                    // password: md5(password),
                    email
                }, {
                where: {
                    token
                }
            })
            const result = await TeacherModel.findAll({
                where: {
                    token
                }
            })
            // console.log(updateTea)
            // console.log(result[0].birthday.split("-").reverse().join("/"))
            var data = result[0]
            // data.birthday= data.birthday.split("-").reverse().join("/")
            // console.log(data)
            res.json({
                "status": 1,
                "code": 200,
                "message": 'thành công',
                "data": {
                    id: data.id,
                    name: data.name,
                    phone: data.phone,
                    birthday: data.birthday.split("-").reverse().join("/"),
                    address: data.address,
                    email: data.email,
                    device_id: data.device_id,
                    token: data.token,
                    url_avatar: data.url_avatar,
                    sex: data.sex,
                    status: data.status,
                    salary: data.salary
                }
            })
            return;
        }
        res.json({
            "status": 0,
            "code": 403,
            "message": 'Chưa đăng nhập',
            "data": ""
        })
        return;
    } catch (error) {
        console.log(error)
        res.json({
            "status": 0,
            "code": 404,
            "message": "Đã có lỗi xảy ra",
            "data": ''
        })
        return;

    }
}
const changePass = async (req, res, next) => {
    const { token } = req.headers;
    if (token == '') {
        res.json({
            "status": 0,
            "code": 404,
            "message": 'thất bại',
            "data": ""
        })
        return;
    }
    const { oldPassword, newPassword } = req.body
    try {
        const teacher = await TeacherModel.findAndCountAll({
            where: {
                token
            }
        })
        if (teacher.count > 0) {
            if (teacher.rows[0].password.trim() != md5(oldPassword.trim())) {
                res.json({
                    "status": 0,
                    "code": 404,
                    "message": 'Mật khẩu cũ không đúng',
                    "data": {}
                })
                return;
            }
            const updatePass = await TeacherModel.update(
                {
                    password: md5(newPassword),
                }, {
                where: {
                    token
                }
            })
            res.json({
                "status": 1,
                "code": 200,
                "message": 'thành công',
                "data": {}
            })
            return;
        }
        res.json({
            "status": 0,
            "code": 403,
            "message": 'Chưa đăng nhập',
            "data": ""
        })
        return;
    } catch (error) {
        // console.log(error)
        res.json({
            "status": 0,
            "code": 404,
            "message": "Đã có lỗi xảy ra",
            "data": ''
        })
        return;
    }
}
const getClass = async (req, res, next) => {
    const { token } = req.headers
    if (token == '') {
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
            const listClass = await ClassModel.findAndCountAll({
                include: [{
                    model: StudentClassModel,
                    include: [{
                        model: StudentModel
                    }]
                },
                {
                    model: ScheduleClassModel,
                },
                {
                    model: SubjectModel
                }],
                where: {
                    status: 1,
                    teacher_id: teacher.rows[0].id
                },
                order: [
                    ['Schedule_classes', 'day_of_week', 'ASC']
                ],
                // distinct: true
            })
            res.json({
                "status": 1,
                "code": 200,
                "message": 'thành công',
                "data": listClass.rows
            })
            return;
        }
        res.json({
            "status": 0,
            "code": 403,
            "message": 'Chưa đăng nhập',
            "data": ""
        })
        return;

    } catch (error) {
        // console.log(error)
        res.json({
            "status": 0,
            "code": 404,
            "message": "Đã có lỗi xảy ra",
            "data": ''
        })
        return;
    }

}
const getListAbsent = async (req, res, next) => {
    const { token } = req.headers
    if (token == '') {
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
            const listClass = await ClassModel.findAll({
                include: [
                    {
                        model: AbsentClassModel,
                        where: {
                            is_active: 1
                        },
                        // paranoid: false,
                        required: false
                    },
                    {
                        model: SubjectModel
                    }
                ],
                where: {
                    teacher_id: teacher.rows[0].id,
                    status: 1
                },
                order: [
                    ['id', 'ASC']
                ],
                //  paranoid: false
            })
            // const listAbsent = await AbsentClassModel.findAll({
            //     where: {
            //         teacher_id: teacher.rows[0].id
            //     }
            // })
            
            res.json({
                "status": 1,
                "code": 200,
                "message": 'thành công',
                "data": listClass
            })
            return;
        }
        res.json({
            "status": 0,
            "code": 403,
            "message": 'Chưa đăng nhập',
            "data": ""
        })
        return;
    } catch (error) {
        console.log(error)
        res.json({
            "status": 0,
            "code": 404,
            "message": "Đã có lỗi xảy ra",
            "data": ''
        })
        return;
    }
}
const createAbsent = async (req, res, next) => {
    const { class_id, gps_latitude, gps_longitude } = req.body
    const currentDate = new Date()
    const time_start = currentDate.getHours() + ":" + currentDate.getMinutes() + ":" + "00";
    var time_end;
    if (parseInt(currentDate.getMinutes()) + Constants.TIME_ABSENT > 60) {
        time_end = (parseInt(currentDate.getHours()) + 1).toString() + ":" + (parseInt(currentDate.getMinutes()) + Constants.TIME_ABSENT - 60).toString() + ":" + "00";
    } else {
        time_end = currentDate.getHours() + ":" + (parseInt(currentDate.getMinutes()) + Constants.TIME_ABSENT).toString() + ":" + "00";
    }
    // console.log(time_end);
    // console.log(time_start);
    // console.log(typeof Constants.TIME_ABSENT);
    try {
        const classAbsent = await ClassModel.findAndCountAll({
            where: {
                id: class_id
            }
        })
        const teacher_id = classAbsent.rows[0].teacher_id;
        const class_code = classAbsent.rows[0].class_code;
        // console.log(classAbsent.row[0].teacher_id)
        const teacher = await TeacherModel.findAll({
            where: {
                id: teacher_id
            }
        })

        if (classAbsent.count < 1) {
            res.json({
                "status": 0,
                "code": 404,
                "message": 'Không tìm thấy lớp này',
                "data": ''
            })
            return;
        }
        const preAbsenClass = await AbsentClassModel.findAndCountAll({
            where: {
                class_id,
                status: 1,
                is_active: 1
            }
        })
        if (preAbsenClass.count > 0) {
            await AbsentClassModel.update({
                status: 0,
                is_active: 0
            }, {
                where: { id: preAbsenClass.rows[0].id }
            })
        }
        const createAbsentClass = await AbsentClassModel.create({
            class_id,
            time_start,
            time_end,
            gps_longitude,
            gps_latitude,
            teacher_id
        })
        setTimeout(function () {
            AbsentClassModel.update({
                status: 0,
            }, {
                where: { id: createAbsentClass.id }
            })
            NotificationModel.create({
                teacher_id,
                class_id,
                content: "Lớp " + class_code + ' đã kết thúc điểm danh'
            })
            if (teacher.device_id) {
                pushNotificationAppStudent(teacher.device_id, "Lớp " + class_code + ' dang điểm danh', { class_id: class_id })
            }
        }, Constants.TIME_ABSENT * 60 * 1000);
        const liststudent = await StudentModel.findAndCountAll({
            include: [{
                model: StudentClassModel,
                where: {
                    class_id
                }
            }],
            distinct: true
        })
        for (let index = 0; index < liststudent.count; index++) {
            await AbsentStudentModel.create({
                student_id: liststudent.rows[index].id,
                absent_class_id: createAbsentClass.id,
                class_id: parseInt(class_id),
                teacher_id
            })
            await NotificationModel.create({
                student_id: liststudent.rows[index].id,
                class_id,
                content: "Lớp " + classAbsent.rows[0].class_code + ' dang điểm danh'
            })
            if (liststudent.rows[index].device_id) {
                pushNotificationAppStudent(liststudent.rows[index].device_id, "Lớp " + classAbsent.rows[0].class_code + ' dang điểm danh', { class_id: class_id })
            }

        }
        const listAbsentClass = await AbsentClassModel.findAll({
            where: {
                is_active: 1,
                class_id
            }
        })
        // console.log(liststudent.count)
        res.json({
            "status": 1,
            "code": 200,
            "message": 'thành công',
            "data": listAbsentClass
        })
        return;
    } catch (error) {
        console.log(error)
        res.json({
            "status": 0,
            "code": 404,
            "message": "Đã có lỗi xảy ra",
            "data": ''
        })
        return;
    }
}
const getDetailAbsent = async (req, res, next) => {
    const { absent_class_id } = req.query;
    console.log(absent_class_id)
    try {
        const count = await AbsentClassModel.count({
            where: {
                id: absent_class_id,
                is_active:1
            }
        })
        if (count < 1) {
            res.json({
                "status": 0,
                "code": 404,
                "message": 'Không tìm thấy điểm danh này',
                "data": ''
            })
            return;
        }

        // [sequelize.fn('count', sequelize.col('AbsentStudentModel.student_id')), 'absentCount']
        const getDetailAbsent = await StudentModel.findAll({
            attributes: ['id', 'name', 'phone', 'birthday', 'address', 'email', 'url_avatar',
                'sex', 'mssv'],
            include: [{
                model: AbsentStudentModel,
                attributes: ['date_absent', 'time_absent', 'status'],
                where: {
                    absent_class_id
                },

            }
            ],
        })
        const  countAbsent = await AbsentStudentModel.count({
            where: {
                absent_class_id,
                status:1
            },
        })
        // const countAbsent = await AbsentStudentModel.findAll({
        //     attributes: ['student_id', [sequelize.fn('count', sequelize.col('student_id')), 'count']],
        //     group: ['student_id'],
        //     where: {
        //         status: 1,
        //         class_id
        //     },
        //     order: [
        //         ['student_id', 'ASC'],
        //     ],
        // });
        // for (let index = 0; index < studentInClass.length; index++) {
        //     studentInClass.countAbsent=countAbsent.count
        // }
        // console.log(typeof studentInClass)
        res.json({
            "status": 1,
            "code": 200,
            "message": 'thành công',
            "data":{countAbsent ,listStudent:getDetailAbsent}
        })
        return;
    } catch (error) {
        console.log(error)
        res.json({
            "status": 0,
            "code": 404,
            "message": "Đã có lỗi xảy ra",
            "data": ''
        })
        return;
    }
}
export default {
    getClass,
    getUserInfo,
    changeUserInfo,
    createAbsent,
    changePass,
    getListAbsent,
    getDetailAbsent,
}