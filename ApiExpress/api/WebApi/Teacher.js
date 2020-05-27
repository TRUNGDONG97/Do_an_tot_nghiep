import { Op } from 'sequelize'
import sequelize from 'sequelize'
import Constants from '../../constants/Constants'
import TeacherModel from '../../models/TeacherModel'
import pug from 'pug'
import { getArrayPages, PageCount } from '../../constants/Funtions'
import md5 from 'md5'


const getTeacherID=async(req, res, next) => {
    const { id } = req.body
    try {
      
        const teachers = await TeacherModel.findAll({
            where:{
                id
            }
        })
        res.send({
            teacher:teachers[0],
        })
        return;
    } catch (error) {
        // console.log(error)
        res.status(404).send()
        return;
    }
}
const getTeacher = async(req, res, next) => {
    const { currentPage } = req.body
    try {
        const count = await TeacherModel.count()
        const pageCount = PageCount(count)
        const teachers = await TeacherModel.findAll({
            offset: Constants.PER_PAGE * (currentPage - 1),
            limit: Constants.PER_PAGE,
            order: [
                ['name', 'ASC']
            ]
        })
        var urlTable = `${process.cwd()}/table/TableTeacher.pug`;
        var htmlTable = await pug.renderFile(urlTable, {
            teachers,
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
const searchTeacher = async(req, res, next) => {
    const { currentPage, name, phone, status } = req.body
    var teachers = []
    var count = 0
        // console.log(status,"status")
    try {
        if (status == '') {
            teachers = await TeacherModel.findAll({
                where: {
                    [Op.and]: [
                        sequelize.where(sequelize.fn('lower', sequelize.col('name')), {
                            [Op.like]: '%' + name + '%'
                        }),
                        sequelize.where(sequelize.fn("lower", sequelize.col("phone")), {
                            [Op.like]: '%' + phone + '%'
                        })
                    ]
                },
                offset: Constants.PER_PAGE * (currentPage - 1),
                limit: Constants.PER_PAGE,
                order: [
                    ['name', 'ASC']
                ]
            })
            count = await TeacherModel.count({
                where: {
                    [Op.and]: [
                        sequelize.where(sequelize.fn('lower', sequelize.col('name')), {
                            [Op.like]: '%' + name + '%'
                        }),
                        sequelize.where(sequelize.fn("lower", sequelize.col("phone")), {
                            [Op.like]: '%' + phone + '%'
                        })
                    ]
                }
            })
        } else {
            teachers = await TeacherModel.findAll({
                where: {
                    [Op.and]: [
                        sequelize.where(sequelize.fn('lower', sequelize.col('name')), {
                            [Op.like]: '%' + name + '%'
                        }),
                        sequelize.where(sequelize.fn("lower", sequelize.col("phone")), {
                            [Op.like]: '%' + phone + '%'
                        }),
                        { status }
                    ]
                },
                offset: Constants.PER_PAGE * (currentPage - 1),
                limit: Constants.PER_PAGE,
                order: [
                    ['name', 'ASC']
                ]
            })
            count = await TeacherModel.count({
                where: {
                    [Op.and]: [
                        sequelize.where(sequelize.fn('lower', sequelize.col('name')), {
                            [Op.like]: '%' + name + '%'
                        }),
                        sequelize.where(sequelize.fn("lower", sequelize.col("phone")), {
                            [Op.like]: '%' + phone + '%'
                        })
                    ]
                }
            })
        }
        const urlTable = `${process.cwd()}/table/TableTeacher.pug`;
        const pageCount = PageCount(count)
        const htmlTable = await pug.renderFile(urlTable, {
            teachers,
            STT: 0,
            currentPage,
            pageCount,
            search: true,
            pages: getArrayPages(req)(pageCount, currentPage)
        });

        res.send({
            htmlTable
        })
        return;
    } catch (error) {
        // console.log(error)
        res.status(404).send()
        return;
    }
}
const addTeacher = async(req, res, next) => {
    const {
        name,
        phone,
        birthday,
        address,
        email,
        sex,
        status,
        url_avatar,
        salary
    } = req.body
    try {
        const countPhone = await TeacherModel.count({
            where: {
                phone
            }
        })
        if (countPhone > 0) {
            res.send({ result: 0 })
            return;
        }
        const countEmail = await TeacherModel.count({
            where: {
                email
            }
        })
        if (countEmail > 0) {
            res.send({ result: 1 })
            return;
        }
        const newTeacher = await TeacherModel.create({
                name,
                phone,
                password: md5(phone),
                birthday,
                address,
                email,
                sex,
                url_avatar,
                status,
                salary
            })
            // console.log(newStudent)
        res.send({
            result: 2
        })
        return;
    } catch (error) {
        // console.log(error)
        res.status(404).send()
        return;
    }
}
const deleteTeacher = async(req, res, next) => {
    const id = parseInt(req.body.id)
        // console.log(id)
    try {
        const teachers = await TeacherModel.findAll({
                where: {
                    id
                }
            })
            // console.log(students.length)
        if (teachers.length > 0) {
            await TeacherModel.destroy({
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
const editTeacher = async(req, res, next) => {
    const id = parseInt(req.body.id)
    const urlModalEditTeacher = `${process.cwd()}/modals/EditTeacherModal.pug`;
    try {
        const teachers = await TeacherModel.findAll({
                where: {
                    id
                }
            })
            // console.log(student)
        if (teachers.length > 0) {
            const htmlModalEditTeacher = await pug.renderFile(urlModalEditTeacher, {
                teacher: teachers[0]
            })
            res.send({
                result: 1,
                htmlModalEditTeacher
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
const saveTeacher = async(req, res, next) => {
    const {
        id,
        name,
        phone,
        birthday,
        address,
        email,
        sex,
        url_avatar,
        salary,
        status
    } = req.body
        // console.log(id)
        // console.log(name)
        // console.log(phone)
        // console.log(birthday)
        // console.log(address)
        // console.log(email)
        // console.log(sex)
        // console.log(url_avatar)
        // console.log(salary)
        // console.log(status)
    try {
        const teacher = await TeacherModel.findAll({
            where: {
                id
            }
        })
        if (phone != teacher[0].phone.trim()) {
            const countPhone = await TeacherModel.count({
                where: {
                    phone
                }
            })
            if (countPhone > 0) {
                res.send({ result: 0 })
                return;
            }
        }
        if (email != teacher[0].email) {
            const countEmail = await TeacherModel.count({
                where: {
                    email
                }
            })
            if (countEmail > 0) {
                res.send({ result: 1 })
                return;
            }
        }
        await TeacherModel.update({
            name,
            phone,
            password: phone,
            birthday,
            address,
            email,
            sex,
            url_avatar,
            salary,
            status
        }, {
            where: {
                id
            }
        })
        res.send({
            result: 2
        })
        return;
    } catch (error) {
        // console.log(error)
        res.status(404).send()
        return;
    }

}
const resetPassTeacher = async(req, res, next) => {
    const { id } = req.body;
    try {
        const teacher = await TeacherModel.findAll({
            where: {
                id
            }
        })
        if (teacher.length < 1) {
            res.send({
                result: 0
            })
            return;
        } else {
            const updatePass = await TeacherModel.update({
                password: md5(teacher[0].phone)
            }, {
                where: {
                    id
                }
            })
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
    getTeacher,
    searchTeacher,
    addTeacher,
    deleteTeacher,
    editTeacher,
    resetPassTeacher,
    saveTeacher,
    getTeacherID
}