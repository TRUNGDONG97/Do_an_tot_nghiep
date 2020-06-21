import TeacherModel from '../../models/TeacherModel'
import ClassModel from '../../models/ClassModel'
// import RoomModel from '../../models/RoomModel'
import ScheduleClassModel from '../../models/ScheduleClassModel'
import SubjectModel from '../../models/SubjectModel'
import StudentModel from '../../models/StudentModel'
import StudentClassModel from '../../models/StudentClassModel'
import pug from 'pug'
import { getArrayPages, PageCount, pushNotificationAppStudent, getDistance } from '../../constants/Funtions'
import { Op } from 'sequelize'
import sequelize from 'sequelize'
import md5 from 'md5';
import crypto from 'crypto-js';
import AbsentClassModel from '../../models/AbsentClassModel'
import AbsentStudentModel from '../../models/AbsentStudentModel'
import NotificationModel from '../../models/NotificationModel'
import Constants from '../../constants/Constants'
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
        const student = await StudentModel.findAndCountAll({
            where: {
                token
            }
        })
        if (student.count > 0) {

            const listClass = await ClassModel.findAndCountAll({
                include: [{
                    model: StudentClassModel,
                    where: {
                        student_id: student.rows[0].id
                    }
                },
                {
                    model: ScheduleClassModel,
                }, {
                    model: SubjectModel
                }],
                where: {
                    status: 1,
                    is_active: 1
                },
                order: [
                    ['Schedule_classes', 'schedule', 'ASC'],
                    ['status', 'DESC'],
                ],
                // distinct: true
            })
            // pushNotificationAppStudent('b372222c-146d-4710-a9c0-92e5e780f991','hell')
            res.json({
                "status": 1,
                "code": 200,
                "message": 'thành công',
                "data": listClass.rows
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
        const student = await StudentModel.findAndCountAll({
            where: {
                token
            }
        })
        if (student.count > 0) {
            const data = student.rows[0]
            // console.log(result[0].birthday.toString().split("-").reverse().join("/"))
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
                    sex: data.sex, mssv: data.mssv
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
    // console.log(phone)
    // console.log(address)
    // console.log(sex)
    // console.log(birthday)
    // console.log(password)
    // console.log(email)
    try {
        const count = await StudentModel.count({
            where: {
                token
            }
        })
        if (count > 0) {
            const updateStu = await StudentModel.update(
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
            const result = await StudentModel.findAll({
                where: {
                    token
                }
            })
            // console.log(result[0].birthday.split("-").reverse().join("/"))
            var data = result[0]
            // data.birthday= data.birthday.split("-").reverse().join("/")
            // console.log(data)
            res.json({
                "status": 1,
                "code": 200,
                "message": 'Thay đổi thông tin thành công',
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
                    sex: data.sex, mssv: data.mssv
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
        const student = await StudentModel.findAndCountAll({
            where: {
                token
            }
        })
        if (student.count > 0) {
            if (student.rows[0].password.trim() != md5(oldPassword.trim())) {
                res.json({
                    "status": 0,
                    "code": 404,
                    "message": 'Mật khẩu cũ không đúng',
                    "data": {}
                })
                return;
            }
            const updatePass = await StudentModel.update(
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
const ListAbsentClass = async (req, res, next) => {
    const { token } = req.headers
    // console.log(token)
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
        const student = await StudentModel.findAll({
            where: {
                token
            }
        })
        // console.log(student.count)
        if (student.length > 0) {
            const listClass = await ClassModel.findAll({
                include: [{
                    model: StudentClassModel,
                    attributes: ['student_id'],
                    where: {
                        student_id: student[0].id
                    },
                    required: false
                }, {
                    model: SubjectModel,
                    attributes: ['subject_name', 'subject_code']
                }, {
                    model: AbsentClassModel,
                    attributes: ['date_absent', 'time_start'],
                    include: [{
                        model: AbsentStudentModel,
                        attributes: ['time_absent', 'status'],
                        where: { student_id: student[0].id },
                        required: false
                    }],
                    required: false,
                    where: {
                        is_active: 1
                    }
                }],
                where: {
                    status: 1,
                    is_active: 1
                }
                // distinct: true
            });
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
const DetailClass = async (req, res, next) => {
    const { class_id } = req.query;
    if (class_id == '') {
        res.json({
            "status": 0,
            "code": 404,
            "message": 'Đã có lỗi xảy ra',
            "data": ""
        })
        return;
    }
    try {
        const classes = await ClassModel.findAll({
            attributes: ['class_code', 'status'],
            include: [{
                model: TeacherModel,
                attributes: ['id', 'name', 'phone', 'email', 'url_avatar'],
                required: false
            },
            {
                model: ScheduleClassModel,
            }, {
                model: SubjectModel
            }],
            where: {
                id: class_id
            },

        })
        res.json({
            "status": 1,
            "code": 200,
            "message": 'thành công',
            "data": classes[0]
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
const notification = async (req, res, next) => {
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
        const student = await StudentModel.findAndCountAll({
            where: {
                token
            }
        })
        if (student.count > 0) {
            const ListNoti = await NotificationModel.findAll({
                attributes: ['id', 'class_id', 'student_id', 'absent_class_id', 'content', 'created_date'],
                where: {
                    student_id: student.rows[0].id
                },
                order: [
                    ['created_date', 'DESC']
                ]
            })
            // pushNotificationAppStudent('d4194038-1130-4ba4-8e09-9ae44b14cc00',
            //     ' dang điểm danh',
            //     { class_id: 4 })
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
const absentStudent = async (req, res, next) => {
    const { class_id, gps_longitude, gps_latitude, list_ssid_stu, platform } = req.body;
    const { token } = req.headers;
    const currentDate = new Date()
    const time_absent = currentDate.getHours() + ":" + currentDate.getMinutes() + ":" + "00";
    var dd = String(currentDate.getDate()).padStart(2, '0');
    var mm = String(currentDate.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = currentDate.getFullYear();

    const date_absent = yyyy + '-' + mm + '-' + dd;
    // console.log('date_absent',date_absent)
    // console.log('token',token)
    // console.log('class_id',class_id)
    // console.log('gps_longitude',gps_longitude)
    // console.log('gps_latitude',gps_latitude)
    // console.log('time_absent',time_absent)
    // console.log('list_ssid_stu',list_ssid_stu)
    console.log('platform', platform)
    try {
        const student = await StudentModel.findAll({
            where: {
                token
            }
        })
        if (student.length < 1) {
            res.json({
                "status": 0,
                "code": 403,
                "message": 'Chưa đăng nhập',
                "data": ''
            })
            return;
        }
        const absentClass = await AbsentClassModel.findAll({
            where: {
                is_active: 1,
                status: 1,
                class_id
            }
        })
        if (absentClass.length < 1) {
            res.json({
                "status": 0,
                "code": 404,
                "message": "Lớp này hiện không điểm danh",
                "data": ''
            })
            return;
        }

        const absentOfStudent = await AbsentStudentModel.findAll({
            where: {
                absent_class_id: absentClass[0].id,
                student_id: student[0].id
            }
        })
        // 

        if (absentOfStudent.length < 1) {
            res.json({
                "status": 0,
                "code": 404,
                "message": "Bạn không trong danh sách điểm danh",
                "data": ''
            })
            return;
        }
        if (absentOfStudent[0].status == 1) {
            res.json({
                "status": 0,
                "code": 404,
                "message": "Bạn đã điểm danh",
                "data": ''
            })
            return;
        }
        const checkDeviceId = await AbsentStudentModel.findAll({
            where: {
                absent_class_id: absentClass[0].id,
                device_id: student[0].device_id
            }
        })
        // console.log(student[0].device_id)
        // console.log(checkDeviceId.length)

        if (checkDeviceId.length > 0) {
            res.json({
                "status": 0,
                "code": 404,
                "message": "Thiết bị này đã điểm danh",
                "data": ''
            })
            return;
        }

        const list_ssid = JSON.parse(absentClass[0].list_ssid)
        var checkSsid = false;
        if (platform === "ios") {
            checkSsid = true
            return;
        } else {
            if (list_ssid.length == 0 && list_ssid_stu.length == 0) {
                checkSsid = true
                return;
            } else {
                for (let index = 0; index < list_ssid_stu.length; index++) {
                    var checkStringInList = (list_ssid.indexOf(list_ssid_stu[index]) > -1);
                    if (checkStringInList) {
                        checkSsid = true;
                        break;
                    }
                }
            }
        }
        console.log(checkSsid, 'checkSsid')
        // // console.log(absentOfStudent.length)
        // // const checkToken=        
        const distance = await getDistance(
            absentClass[0].gps_latitude,
            absentClass[0].gps_longitude,
            gps_latitude,
            gps_longitude
        )
        // console.log(distance)
        if (distance > Constants.DISTANCE || !checkSsid) {
            res.json({
                "status": 0,
                "code": 404,
                "message": "Bạn không đang ở trong lớp",
                "data": ''
            })
            return;
        }
        // const StringListSsidStu= JSON.stringify(list_ssid_stu);
        // console.log(student[0].device_id)
        const updateAbsentOfStu = await AbsentStudentModel.update({
            status: 1,
            gps_latitude,
            gps_longitude,
            date_absent,
            time_absent,
            list_ssid_stu: JSON.stringify(list_ssid_stu),
            device_id: student[0].device_id
        }, {
            where: {
                id: absentOfStudent[0].id
            }
        })
        res.json({
            "status": 1,
            "code": 200,
            "message": 'Điểm danh thành công',
            "data": "updateAbsentOfStu"
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
    changePass,
    ListAbsentClass,
    DetailClass,
    notification,
    absentStudent
}