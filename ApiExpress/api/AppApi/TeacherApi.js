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
                "message": 'Đổi mật khẩu thành công',
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
                include: [
                    {
                        model: ScheduleClassModel,
                    },
                    {
                        model: SubjectModel,
                        where: {
                            is_active: 1
                        }
                    }],
                where: {
                    status: 1,
                    teacher_id: teacher.rows[0].id,
                    is_active:1
                },
                order: [
                    ['priority', 'DESC'],
                    ['Schedule_classes', 'schedule', 'ASC']
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
const getDetailClass = async (req, res, next) => {
    const { class_id } = req.query
    try {
        //
        const stuInClass = await StudentModel.findAll({
            include: [{
                model: StudentClassModel,
                where: {
                    class_id
                }
            }],
        })
        var arrIdStudent = [];
        for (let index = 0; index < stuInClass.length; index++) {
            arrIdStudent.push(stuInClass[index].id)
        }
        // 
        const absentClass = await AbsentClassModel.findAll({
            where: {
                class_id,
                is_active: 1
            }
        })
        var arrIdAbsentClass = [];
        for (let index = 0; index < absentClass.length; index++) {
            arrIdAbsentClass.push(absentClass[index].id)
        }
        const listStudent = await StudentModel.findAll({
            attributes: ['id', 'first_name', 'last_name', 'mssv', 'phone', 'birthday',
                [sequelize.fn('sum', sequelize.col('Absent_Students.status')), 'count']],
            include: [{
                model: AbsentStudentModel,
                attributes: [],
                where: {
                    absent_class_id: arrIdAbsentClass
                },
                required: false
            }],
            where: {
                id: arrIdStudent
            },
            row: true,
            group: ['Students.id'],
            order: [
                ['last_name', 'ASC']
            ]
        })
        const classes = await ClassModel.findAll({
            include: [{
                model: TeacherModel
            }, {
                model: SubjectModel,
                where: {
                    is_active: 1
                }
            }],
            where: {
                id: class_id
            }
        })
        const countTotalAbsent = await AbsentClassModel.count({
            where: {
                class_id,
                is_active: 1
            }
        })
        res.json({
            "status": 1,
            "code": 200,
            "message": 'thành công',
            "data": {
                listStudent,
                classInfo: classes[0],
                countTotalAbsent
            }
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
                        model: SubjectModel,
                        is_active: 1,
                    }
                ],
                where: {
                    teacher_id: teacher.rows[0].id,
                    status: 1,
                    is_active:1
                },
                order: [
                    ['priority', 'DESC']
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
    const { class_id, gps_latitude, gps_longitude, listNameWifi } = req.body
    console.log(listNameWifi)
    const currentDate = new Date()
    const time_start = currentDate.getHours() + ":" + currentDate.getMinutes() + ":" + "00";
    var time_end;
    if (parseInt(currentDate.getMinutes()) + Constants.TIME_ABSENT > 60) {
        time_end = (parseInt(currentDate.getHours()) + 1).toString() + ":" + (parseInt(currentDate.getMinutes()) + Constants.TIME_ABSENT - 60).toString() + ":" + "00";
    } else if (parseInt(currentDate.getHours()) + 1 > 23) {
        time_end = "00" + ":" + (parseInt(currentDate.getMinutes()) + Constants.TIME_ABSENT).toString() + ":" + "00";
    } else {
        time_end = currentDate.getHours() + ":" + (parseInt(currentDate.getMinutes()) + Constants.TIME_ABSENT).toString() + ":" + "00";
    }


    // console.log(time_end);
    // console.log(time_start);
    // console.log(typeof Constants.TIME_ABSENT);
    try {
        const classAbsent = await ClassModel.findAndCountAll({
            where: {
                id: class_id,
                status: 1,
                is_active:1
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
            await ClassModel.update({
                priority: 0
            }, {
                where: {
                    id: class_id
                }
            })
            NotificationModel.create({
                teacher_id,
                class_id,
                content: "Lớp " + class_code + " đã hủy điểm danh",
                absent_class_id: createAbsentClass.id,
                type: Constants.TYPE_NOTIFICATION.CANCEL_ABSENT
            })
            if (teacher[0].device_id) {
                pushNotificationAppTeacher(teacher[0].device_id, "Lớp " + class_code + " đã hủy điểm danh",
                    {
                        absent_class_id: createAbsentClass.id,
                        class_id,
                        type: Constants.TYPE_NOTIFICATION.CANCEL_ABSENT
                    })
            }
        }
        const createAbsentClass = await AbsentClassModel.create({
            class_id,
            time_start,
            time_end,
            gps_longitude,
            gps_latitude,
            teacher_id,
            list_ssid: listNameWifi ? JSON.stringify(listNameWifi) : "[]"
        })
        await ClassModel.update({
            priority: 1
        }, {
            where: {
                id: class_id
            }
        })
        setTimeout(function () {
            AbsentClassModel.update({
                status: 0,
            }, {
                where: { id: createAbsentClass.id }
            })
            ClassModel.update({
                priority: 0
            }, {
                where: {
                    id: class_id
                }
            })
            NotificationModel.create({
                teacher_id,
                class_id,
                content: "Lớp " + class_code + " đã kết thúc điểm danh",
                absent_class_id: createAbsentClass.id,
                type: Constants.TYPE_NOTIFICATION.ABSENT_CLASS_END
            })

            if (teacher[0].device_id) {
                pushNotificationAppTeacher(teacher[0].device_id, "Lớp " + class_code + "  đã kết thúc điểm danh",
                    {
                        absent_class_id: createAbsentClass.id,
                        class_id,
                        type: Constants.TYPE_NOTIFICATION.ABSENT_CLASS_END
                    })
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
                teacher_id,
            })
            await NotificationModel.create({
                student_id: liststudent.rows[index].id,
                class_id,
                content: "Lớp " + classAbsent.rows[0].class_code + ' đang điểm danh',
                type: Constants.TYPE_NOTIFICATION.ABSENT_STUDENT,
                absent_class_id: createAbsentClass.id
            })
            if (liststudent.rows[index].device_id) {
                pushNotificationAppStudent(liststudent.rows[index].device_id,
                    "Lớp " + classAbsent.rows[0].class_code + ' đang điểm danh',
                    { class_id: class_id })
            }

        }
        // const classes = await ClassModel.findAll({
        //     include: [{
        //         model: SubjectModel
        //     }
        //     ],
        //     where: {
        //         id: class_id
        //     }
        // })
        // console.log(liststudent.count)
        res.json({
            "status": 1,
            "code": 200,
            "message": 'Lớp bắt đầu điểm danh thành công',
            "data": { classAbsent: createAbsentClass }
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
        const absentClass = await AbsentClassModel.findAll({
            where: {
                id: absent_class_id,
                is_active: 1
            }
        })
        if (absentClass.length < 1) {
            res.json({
                "status": 0,
                "code": 404,
                "message": 'Không tìm thấy điểm danh này',
                "data": ''
            })
            return;
        }

        // [sequelize.fn('count', sequelize.col('AbsentStudentModel.student_id')), 'absentCount']
        const getDetailAbsent = await StudentModel.findAndCountAll({
            attributes: ['id', 'first_name', 'last_name', 'phone', 'birthday', 'address', 'email', 'url_avatar',
                'sex', 'mssv'],
            include: [{
                model: AbsentStudentModel,
                attributes: ['id', 'date_absent', 'time_absent', 'status'],
                where: {
                    absent_class_id
                },
            }
            ],
            order: [
                ['last_name', 'ASC']
            ]
        })
        const countAbsent = await AbsentStudentModel.count({
            where: {
                absent_class_id,
                status: 1
            },
        })
        const classes = await ClassModel.findAll({
            include: [{
                model: SubjectModel,
                where: {
                    is_active: 1
                }
            }
            ],
            where: {
                id: absentClass[0].class_id
            }
        })
        res.json({
            "status": 1,
            "code": 200,
            "message": 'thành công',
            "data": {
                absentClass: absentClass[0],
                countAbsent,
                total: getDetailAbsent.count,
                listStudent: getDetailAbsent.rows,
                classes: classes[0]
            }
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
const getAbsentStudent = async (req, res, next) => {
    const { student_id, class_id } = req.query
    console.log(student_id, class_id)
    try {
        const listId = await AbsentClassModel.findAll({
            attributes: ['id'],
            where: {
                class_id,
                is_active: 1
            }
        })
        var listIdAbsentClass = []
        for (let index = 0; index < listId.length; index++) {
            listIdAbsentClass.push(listId[index].id)
        }
        // console.log('listId',typeof listId)
        const getStudent = await StudentModel.findAll({
            attributes: ['id', 'first_name', 'last_name', 'phone', 'birthday', 'address', 'email', 'url_avatar',
                'sex', 'mssv'],
            where: {
                id: student_id
            },

        })
        if (getStudent.length < 0) {
            res.json({
                "status": 0,
                "code": 404,
                "message": 'Không tìm thấy học sinh này',
                "data": ''
            })
            return;
        }
        const listAbsent = await AbsentStudentModel.findAll({
            attributes: ['date_absent', 'time_absent', 'status', 'absent_class_id'],
            where: {
                absent_class_id: listIdAbsentClass,
                student_id
            },
            order: [
                ['date_absent', 'DESC']
            ],
        })

        const countTotalAbsent = await AbsentClassModel.count({
            where: {
                class_id,
                is_active: 1
            }
        })
        // for (let index = 0; index < countTotalAbsent.length; index++) {
        //     arrIdClassAbsent.push(countTotalAbsent[index].id)
        // }
        const countAbsent = await AbsentStudentModel.count({
            where: {
                student_id,
                absent_class_id: listIdAbsentClass,
                status: 1
            }
        })
        res.json({
            "status": 1,
            "code": 200,
            "message": 'thành công',
            "data": {
                countAbsent,
                total: countTotalAbsent,
                student: getStudent[0],
                listAbsent
            }
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
const getNotification = async (req, res, next) => {
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
            const ListNoti = await NotificationModel.findAll({
                attributes: ['id', 'class_id', 'teacher_id', 'absent_class_id', 'content', 'created_date'],
                where: {
                    teacher_id: teacher.rows[0].id
                }, order: [
                    ['created_date', 'DESC']
                ]
            })
            res.json({
                "status": 1,
                "code": 200,
                "message": 'thành công',
                "data": ListNoti
            })
            return;
        }
        res.json({
            "status": 0,
            "code": 403,
            "message": 'Chưa đăng nhập',
            "data": ''
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
const cancelAbsent = async (req, res, next) => {
    const { class_id } = req.body
    console.log(class_id)
    if (class_id == '') {
        res.json({
            "status": 0,
            "code": 404,
            "message": 'thất bại',
            "data": ""
        })
        return;
    }
    try {
        const classAbsent = await AbsentClassModel.findAndCountAll({
            where: {
                class_id,
                status: 1,
                is_active: 1
            }
        })
        // console.log(classAbsent.rows[0].id)
        if (classAbsent.count < 1) {
            res.json({
                "status": 0,
                "code": 404,
                "message": 'Lớp này hiện không điểm danh',
                "data": ''
            })
            return;
        }
        const absentClass = await AbsentClassModel.update({
            status: 0,
            is_active: 0
        }, {
            where: {
                id: classAbsent.rows[0].id
            }
        })
        const liststudent = await StudentModel.findAndCountAll({
            include: [{
                model: StudentClassModel,
                where: {
                    class_id
                }
            }],
            distinct: true
        })
        const classes = await ClassModel.findAll({
            id: class_id
        })
        await ClassModel.update({
            priority: 1
        }, {
            where: {
                id: class_id
            }
        })
        for (let index = 0; index < liststudent.count; index++) {
            await NotificationModel.create({
                student_id: liststudent.rows[index].id,
                class_id,
                content: "Lớp " + classes[0].class_code + ' đã bị hủy điểm danh',
                type: Constants.TYPE_NOTIFICATION.CANCEL_ABSENT,
                absent_class_id: absentClass.id
            })
            if (liststudent.rows[index].device_id) {
                pushNotificationAppStudent(liststudent.rows[index].device_id,
                    "Lớp " + classes[0].class_code + ' đã bị huỷ điểm danh',
                    { class_id: class_id })
            }
        }
        res.json({
            "status": 1,
            "code": 200,
            "message": 'Hủy điểm danh thành công',
            "data": ''
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
// const changePoint = async (req, res, next) => {
//     const { class_id, student_id, mid_semester, end_semester } = req.body
//     // const { token } = req.headers    
//     try {
//         const studentClass = await StudentClassModel.findAll({
//             where: {
//                 class_id,
//                 student_id
//             }
//         })
//         if (studentClass.length < 1) {
//             res.json({
//                 "status": 0,
//                 "code": 404,
//                 "message": 'Lớp không có sinh viên này',
//                 "data": ''
//             })
//             return;
//         }
//         const newStuClas = await StudentClassModel.update({
//             mid_semester,
//             end_semester
//         }, {
//             where: {
//                 id: studentClass[0].id
//             }
//         })
//         res.json({
//             "status": 1,
//             "code": 200,
//             "message": 'thành công',
//             "data": newStuClas
//         })
//         return;
//     } catch (error) {
//         console.log(error)
//         res.json({
//             "status": 0,
//             "code": 404,
//             "message": "Đã có lỗi xảy ra",
//             "data": ''
//         })
//         return;
//     }
// }

const changeAbsentStudent = async (req, res, next) => {
    const { absent_student_id } = req.body
    console.log(absent_student_id)
    const currentDate = new Date()
    const time_absent = currentDate.getHours() + ":" + currentDate.getMinutes() + ":" + "00";
    var dd = String(currentDate.getDate()).padStart(2, '0');
    var mm = String(currentDate.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = currentDate.getFullYear();

    const date_absent = yyyy + '-' + mm + '-' + dd;
    try {
        const absentStudent = await AbsentStudentModel.findAll({
            where: {
                id: absent_student_id
            }
        })
        if (absentStudent.length < 0) {
            res.json({
                "status": 0,
                "code": 404,
                "message": 'Không có điểm danh này',
                "data": ''
            })
        }
        await AbsentStudentModel.update({
            status: absentStudent[0].status == 1 ? 0 : 1,
            date_absent,
            time_absent,
        }, {
            where: {
                id: absent_student_id
            }
        })
        const absentClass = await AbsentClassModel.findAll({
            where: {
                id: absentStudent[0].absent_class_id,
                is_active: 1
            }
        })
        const getDetailAbsent = await StudentModel.findAndCountAll({
            attributes: ['id', 'first_name', 'last_name', 'phone', 'birthday', 'address', 'email', 'url_avatar',
                'sex', 'mssv'],
            include: [{
                model: AbsentStudentModel,
                attributes: ['id', 'date_absent', 'time_absent', 'status'],
                where: {
                    absent_class_id: absentStudent[0].absent_class_id
                },
            }
            ],
            order: [
                ['last_name', 'ASC']
            ]
        })
        const countAbsent = await AbsentStudentModel.count({
            where: {
                absent_class_id: absentStudent[0].absent_class_id,
                status: 1
            },
        })
        const classes = await ClassModel.findAll({
            include: [{
                model: SubjectModel,
                where:{
                    is_active:1
                }
            }
            ],
            where: {
                id: absentStudent[0].class_id
            }
        })
        res.json({
            "status": 1,
            "code": 200,
            "message": 'thành công',
            "data": {
                absentClass: absentClass[0],
                countAbsent,
                total: getDetailAbsent.count,
                listStudent: getDetailAbsent.rows,
                classes: classes[0]
            }
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
    getAbsentStudent,
    getNotification,
    cancelAbsent,
    // changePoint,
    // absentForStudent,
    getDetailClass,
    changeAbsentStudent
}