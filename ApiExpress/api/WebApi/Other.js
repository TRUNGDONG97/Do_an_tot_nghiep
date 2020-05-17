import { Op } from 'sequelize'
import sequelize from 'sequelize'
import md5 from 'md5'
import Constants from '../../constants/Constants'
import UserModel from '../../models/UserModel'
import StudentModel from '../../models/StudentModel'
import ClassModel from '../../models/ClassModel'
import SubjectModel from '../../models/SubjectModel'
import TeacherModel from '../../models/TeacherModel'
import pug from 'pug'
// import { getArrayPages, PageCount } from '../../constants/Funtions'
import formidable from 'formidable'
import fs from 'fs'
const uploadAvatar = async(req, res, next) => {
    var form = new formidable.IncomingForm();
    form.maxFieldsSize = 10 * 1024 * 1024; // file size 15mb
    form.uploadDir = "./public/upload/avatarStudent/"
    form.parse(req);
    form.once('error', function(error) {
        res.send({
            result: 1,
        })
        return;
    });
    form.on('file', function(field, file) {
        //rename the incoming file to the file's name
        fs.rename(file.path, form.uploadDir + "/" + file.name, () => {
            // console.log("\nFile Renamed!\n");
        });
    });
    form.once('end', () => {
        res.send({
            result: 1,
        })
        return;
    });

}

const changePass = async(req, res, next) => {
    var { CurrentPassword, NewPassword } = req.body
    var user_name = req.signedCookies.username
    var password = md5(CurrentPassword)
    try {
        const users = await UserModel.findAll({
            attribute: ["id", "password"],
            where: {
                user_name,
                password
            }
        })
        if (users.length == 0) {
            res.send({ result: 0 })
        } else {
            await UserModel.update({
                password: md5(NewPassword)
            }, {
                where: {
                    id: users[0].id
                }
            })
            res.cookie('password', users[0].password, Constants.OPTION)
            res.send({ result: 1 })
        }
        return;
    } catch (error) {
        res.status(404).send();
        // console.log(error)
        return;
    }
}
const getCountStudent = async(req, res, next) => {
    try {
        const countStudent = await StudentModel.count()
        res.send({
            countStudent
        })
        return;
    } catch (error) {
        res.status(404).send();
        return;
    }
}
const getCountTeacher = async(req, res, next) => {
    try {
        const countTeacher = await TeacherModel.count()
        res.send({
            countTeacher
        })
        return;
    } catch (error) {
        res.status(404).send();
        return;
    }
}
const getCountClass = async(req, res, next) => {
    try {
        const countClass = await ClassModel.count()
        res.send({
            countClass
        })
        return;
    } catch (error) {
        res.status(404).send
        return;
    }
}
const getCountSubject = async(req, res, next) => {
    try {
        const countSubject = await SubjectModel.count()
        res.send({
            countSubject
        })
        return;
    } catch (error) {
        res.status(404).send
        return;
    }
}
export default {
    changePass,
    getCountStudent,
    getCountTeacher,
    getCountClass,
    getCountSubject,
    uploadAvatar
}