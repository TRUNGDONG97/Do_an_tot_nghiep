// import sequelize from 'sequelize'
import { Op } from 'sequelize'
import sequelize from 'sequelize'
import md5 from 'md5'
import Constants from '../constants/Constants'
import UserModel from '../models/UserModel'
import StudentModel from '../models/StudentModel'
import ClassModel from '../models/ClassModel'
import TeacherModel from '../models/TeacherModel'
import pug from 'pug'
import { getArrayPages } from '../constants/Funtions'

const changePass = async (req, res, next) => {
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
const getCountStudent = async (req, res, next) => {
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
const getCountTeacher = async (req, res, next) => {
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
const getCountClass = async (req, res, next) => {
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
const getStudent = async (req, res, next) => {
    const { currentPage } = req.body
    try {
        const count = await StudentModel.count()
        const pageCount = count % Constants.PER_PAGE == 0 ? Math.floor(count / Constants.PER_PAGE) : Math.floor(count / Constants.PER_PAGE) + 1
        const students = await StudentModel.findAll({ offset: Constants.PER_PAGE * (currentPage - 1), limit: Constants.PER_PAGE })
        // console.log(students.length)
        var urlTable = `${process.cwd()}/table/TableStudent.pug`;
        var htmlTable = await pug.renderFile(urlTable,
            {
                students,
                STT: (currentPage - 1) * Constants.PER_PAGE,
                currentPage,
                pageCount: pageCount,
                search: false,
                pages: getArrayPages(req)(pageCount, currentPage)
            });
        res.send({
            htmlTable,
        })
        return;
    } catch (error) {
        // console.log(error)
        res.status(404).send()
        return;
    }
}
const searchStudent = async (req, res, next) => {
    const { name, mssv, currentPage } = req.body
    // console.log(currentPage)
    var students = []
    var count = 0
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
        const urlTable = `${process.cwd()}/table/TableStudent.pug`;
        const pageCount = count % Constants.PER_PAGE == 0 ? Math.floor(count / Constants.PER_PAGE) : Math.floor(count / Constants.PER_PAGE) + 1
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
        return;
    } catch (error) {
        // console.log(error)
        res.status(404).send()
        return;
    }
}
const deleteStudent = async (req, res, next) => {
    const id = parseInt(req.body.id)
    // console.log(id)
    try {
        const students = await StudentModel.findAll({
            where: {
                id
            }
        })
        // console.log(students.length)
        if (students.length > 0) {
            await StudentModel.destroy({
                where: {
                    id
                }
            })
            res.send({
                result: 1
            })
        } else {
            res.send({
                result: 0 //Notfound
            })
        }
        return;
    } catch (error) {
        res.status(404).send()
        return;
    }
}
const addStudent = async (req, res, next) => {
    const { name,
        phone,
        mssv,
        birthday,
        address,
        email,
        sex } = req.body
    // console.log(birthday,'birthday')
    try {
        const countMssv = await StudentModel.count({
            where: {
                mssv
            }
        })
        if (countMssv > 0) {
            res.send({ result: 0 })
            return;
        }
        const countPhone = await StudentModel.count({
            where: {
                phone
            }
        })
        if (countPhone > 0) {
            res.send({ result: 1 })
            return;
        }
        const countEmail = await StudentModel.count({
            where: {
                email
            }
        })
        if (countEmail > 0) {
            res.send({ result: 2 })
            return;
        }
        const newStudent = await StudentModel.create({
            name,
            phone,
            password: mssv,
            birthday,
            address,
            email,
            mssv,
            sex
        })
        // console.log(newStudent)
        res.send({
            result: 3
        })
        return;
    } catch (error) {
        // console.log(error)
        res.status(404).send()
        return;
    }
}
const editStudent = async (req, res, next) => {
    const id = parseInt(req.body.id)
    const urlModalEditStudent = `${process.cwd()}/modals/EditStudentModal.pug`;
    try {
        const student = await StudentModel.findAll({
            where: {
                id
            }
        })
        // console.log(student)
        if (student.length > 0) {
            const htmlModalEditStudent = await pug.renderFile(urlModalEditStudent, {
                student: student[0]
            })
            res.send({
                result: 1,
                htmlModalEditStudent
            })
        } else {
            res.send({
                result: 0 //Notfound
            })
        }
        return;
    } catch (error) {
        // console.log(error)
        res.status(404).send()
        return;
    }
}


const saveStudent = async (req, res, next) => {
    const {
        id,
        name,
        phone,
        mssv,
        birthday,
        address,
        email,
        sex } = req.body

    try {
        const student = await StudentModel.findAll({
            where: {
                id
            }
        })
        if (mssv != student[0].mssv) {
            var countMssv = await StudentModel.count({
                where: {
                    mssv
                }
            })
            // console.log(typeof countMssv)
            if (countMssv > 0) {
                res.send({ result: 0 })
                return;
            }

        }
        if (phone != student[0].phone.trim()) {
            const countPhone = await StudentModel.count({
                where: {
                    phone
                }
            })
            if (countPhone > 0) {
                res.send({ result: 1 })
                return;
            }
        }
        if (email != student[0].email) {
            const countEmail = await StudentModel.count({
                where: {
                    email
                }
            })
            if (countEmail > 0) {
                res.send({ result: 2 })
                return;
            }
        }
        const updateStudent = await StudentModel.update({
            name,
            phone,
            password: mssv,
            birthday,
            address,
            email,
            mssv,
            sex
        },
            {
                where: {
                    id
                }
            }
        )
        // console.log(updateStudent)
        res.send({
            result: 3
        })
        return;
    } catch (error) {
        // console.log(error)
        res.status(404).send()
        return;
    }

}
const resetPass = async (req, res, next) => {
    const {id} = req.body;
    try {
        const student = await StudentModel.findAll({
            where: {
                id
            }
        })
        if (student.length < 1) {
            res.send({
                result: 0
            })
            return;
        } else {
            const updatePass = await StudentModel.update({
                password:student[0].mssv
            },
                {
                    where: {
                        id
                    }
                }
            )
            res.send({
                result: 1
            })
            return;
        }
    } catch (error) {
        // console.log(error)
        res.status(404).send()
        return;
    }
}
export default {
    changePass,
    getCountStudent,
    getCountTeacher,
    getCountClass,
    searchStudent,
    deleteStudent,
    getStudent,
    addStudent,
    editStudent,
    saveStudent,
    resetPass
}