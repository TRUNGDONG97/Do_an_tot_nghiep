// import sequelize from 'sequelize'
import { Op } from 'sequelize'
import sequelize from 'sequelize'
import md5 from 'md5'
import Constants from '../constants/Constants'
import UserModel from '../Models/UserModel'
import StudentModel from '../Models/StudentModel'
import ClassModel from '../Models/ClassModel'
import TeacherModel from '../Models/TeacherModel'
import pug from 'pug'
import paginate from 'express-paginate'
import { getArrayPages } from '../constants/funtions'
// import ReactDOMServer from 'react-dom/server';

const changePass = async (req, res, next) => {
    // console.log(req.body)
    var { CurrentPassword, NewPassword } = req.body
    // var password = req.body.CurrentPassword
    var user_name = req.signedCookies.username
    // console.log(CurrentPassword,"CurrentPassword")
    // console.log(NewPassword,"NewPassword")
    // console.log(user_name,"user_name")
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
            res.send({ type: "WRONG_PASSWORD" })
        } else {
            await UserModel.update({
                password: md5(NewPassword)
            }, {
                where: {
                    id: users[0].id
                }
            })
            res.cookie('password', users[0].password, Constants.OPTION)
            res.send({ type: 'SUCCESS' })
        }
    } catch (error) {
        res.status(404).send();
        console.log(error)
    }
}
const getCountStudent = async (req, res, next) => {
    try {
        const countStudent = await StudentModel.count()
        res.send({
            countStudent
        })
    } catch (error) {
        // res.send({
        //     students:[]
        // })
        res.status(404).send();
    }
}
const getCountTeacher = async (req, res, next) => {
    try {
        const countTeacher = await TeacherModel.count()
        // console.log(c,"teachers")
        res.send({
            countTeacher
        })
    } catch (error) {
        // res.send({
        //     teachers:[]
        // })

        res.status(404).send();
    }
}
const getCountClass = async (req, res, next) => {
    try {
        const countClass = await ClassModel.count()
        // console.log(classes.length,"classes")
        res.send({
            countClass
        })
    } catch (error) {
        // res.send({
        //     classes:[]
        // })
        res.status(404).send
    }
}
const getStudent = async (req, res, next) => {
    const { currentPage } = req.body
    try {
        const count = await StudentModel.count()
        const pageCount = count % Constants.PER_PAGE == 0 ? Math.floor(count / Constants.PER_PAGE) : Math.floor(count / Constants.PER_PAGE) + 1
        const students = await StudentModel.findAll({ offset: Constants.PER_PAGE * (currentPage - 1), limit: Constants.PER_PAGE })
        // console.log(students.length)
        var urlTable = `${process.cwd()}/views/table/tableStudent.pug`;
        var htmlTable = await pug.renderFile(urlTable,
            {
                students,
                STT: (currentPage-1)*Constants.PER_PAGE,
                currentPage,
                pageCount,
                search: false,
                pages: getArrayPages(req)(pageCount, currentPage)
            });
        res.send({
            htmlTable,
            // htmlPaginate
        })
    } catch (error) {
        console.log(error)
        res.status(404).send()
    }
}
const searchStudent = async (req, res, next) => {
    const { name, mssv, currentPage } = req.body
    // console.log(currentPage)
    var students = []
    var count=0
    try {
        if (mssv == "") {
            students = await StudentModel.findAll({
                where: sequelize.where(sequelize.fn("lower", sequelize.col("name")), { [Op.like]: '%' + name + '%' }),
                offset: Constants.PER_PAGE * (currentPage - 1), limit: Constants.PER_PAGE
            })
            count = await StudentModel.count({
                where: sequelize.where(sequelize.fn("lower", sequelize.col("name")), { [Op.like]: '%' + name + '%' })
            })
        } else if (name == "") {
            students = await StudentModel.findAll({
                where: sequelize.where(sequelize.fn("lower", sequelize.col("mssv")), { [Op.like]: '%' + mssv + '%' }),
                offset: Constants.PER_PAGE * (currentPage - 1), limit: Constants.PER_PAGE
            })
            count = await StudentModel.count({
                where: sequelize.where(sequelize.fn("lower", sequelize.col("mssv")), { [Op.like]: '%' + mssv + '%' })
            })
        } else {
            students = await StudentModel.findAll({
                where: {
                    [Op.and]: [
                        sequelize.where(sequelize.fn('lower', sequelize.col('name')), { [Op.like]: '%' + name + '%' }),
                        sequelize.where(sequelize.fn("lower", sequelize.col("mssv")), { [Op.like]: '%' + mssv + '%' })
                    ]
                },
                offset: Constants.PER_PAGE * (currentPage - 1), limit: Constants.PER_PAGE
            })
            count = await StudentModel.count({
                where: {
                    [Op.and]: [
                        sequelize.where(sequelize.fn('lower', sequelize.col('name')), { [Op.like]: '%' + name + '%' }),
                        sequelize.where(sequelize.fn("lower", sequelize.col("mssv")), { [Op.like]: '%' + mssv + '%' })
                    ]
                }
            })
            
        }
        // console.log(count)
        const urlTable = `${process.cwd()}/views/table/tableStudent.pug`;
        const pageCount = count %Constants.PER_PAGE  == 0 ? Math.floor(count / Constants.PER_PAGE) : Math.floor(count/ Constants.PER_PAGE) + 1
        const htmlTable = await pug.renderFile(urlTable,
            {
                students,
                STT: 0,
                currentPage,
                pageCount,
                search: true,
                pages: getArrayPages(req)(pageCount, currentPage)
            });

        res.send({
            htmlTable
            // htmlPaginate
        })
    } catch (error) {
        // console.log(error)
        res.status(404).send()
    }
}
const deleteStudent = async (req, res, next) => {
    const id = req.body.id
    console.log(id)
    res.send('delete')

    // try {

    // } catch (error) {

    // }
}
export default {
    changePass,
    getCountStudent,
    getCountTeacher,
    getCountClass,
    searchStudent,
    deleteStudent,
    getStudent,
}