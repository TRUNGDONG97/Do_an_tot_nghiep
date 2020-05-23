import { Op } from 'sequelize'
import sequelize from 'sequelize'
import Constants from '../../constants/Constants'
import StudentModel from '../../models/StudentModel'
import pug from 'pug'
import { getArrayPages, PageCount } from '../../constants/Funtions'
import xlsx from 'xlsx'
import StudentClassModel from '../../models/StudentClassModel';
import md5 from 'md5'
const getStudent = async(req, res, next) => {

    try {
        const { currentPage } = req.body
        const { count, rows } = await StudentModel.findAndCountAll({
                offset: Constants.PER_PAGE * (currentPage - 1),
                limit: Constants.PER_PAGE,
                order: [
                    ['name', 'ASC']
                ]
            })
            // console.log(count)
        const pageCount = PageCount(count)
            // console.log(students.length)
        var urlTable = `${process.cwd()}/table/TableStudent.pug`;
        var htmlTable = await pug.renderFile(urlTable, {
            students: rows,
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
        console.log(error)
        res.status(404).send()
        return;
    }
}
const searchStudent = async(req, res, next) => {
    const { name, mssv, currentPage } = req.body
        // console.log(currentPage)
    var students = []
    var count = 0
    try {
        if (mssv == "") {
            students = await StudentModel.findAll({
                where: sequelize.where(sequelize.fn("lower", sequelize.col("name")), {
                    [Op.like]: '%' + name + '%'
                }),
                offset: Constants.PER_PAGE * (currentPage - 1),
                limit: Constants.PER_PAGE
            })
            count = await StudentModel.count({
                where: sequelize.where(sequelize.fn("lower", sequelize.col("name")), {
                    [Op.like]: '%' + name + '%'
                })
            })
        } else if (name == "") {
            students = await StudentModel.findAll({
                where: sequelize.where(sequelize.fn("lower", sequelize.col("mssv")), {
                    [Op.like]: '%' + mssv + '%'
                }),
                offset: Constants.PER_PAGE * (currentPage - 1),
                limit: Constants.PER_PAGE
            })
            count = await StudentModel.count({
                where: sequelize.where(sequelize.fn("lower", sequelize.col("mssv")), {
                    [Op.like]: '%' + mssv + '%'
                })
            })
        } else {
            students = await StudentModel.findAll({
                where: {
                    [Op.and]: [
                        sequelize.where(sequelize.fn('lower', sequelize.col('name')), {
                            [Op.like]: '%' + name + '%'
                        }),
                        sequelize.where(sequelize.fn("lower", sequelize.col("mssv")), {
                            [Op.like]: '%' + mssv + '%'
                        })
                    ]
                },
                offset: Constants.PER_PAGE * (currentPage - 1),
                limit: Constants.PER_PAGE
            })
            count = await StudentModel.count({
                where: {
                    [Op.and]: [
                        sequelize.where(sequelize.fn('lower', sequelize.col('name')), {
                            [Op.like]: '%' + name + '%'
                        }),
                        sequelize.where(sequelize.fn("lower", sequelize.col("mssv")), {
                            [Op.like]: '%' + mssv + '%'
                        })
                    ]
                }
            })

        }
        // console.log(count)
        const urlTable = `${process.cwd()}/table/TableStudent.pug`;
        const pageCount = PageCount(count)
        const htmlTable = await pug.renderFile(urlTable, {
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
const deleteStudent = async(req, res, next) => {
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
            await StudentClassModel.destroy({
                where:{
                    student_id:id
                }
            })
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
const addStudent = async(req, res, next) => {
    const {
        name,
        phone,
        mssv,
        birthday,
        address,
        email,
        sex,
        url_avatar
    } = req.body
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
                password: md5(mssv),
                birthday,
                address,
                email,
                mssv,
                sex,
                url_avatar
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
const editStudent = async(req, res, next) => {
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


const saveStudent = async(req, res, next) => {
    const {
        id,
        name,
        phone,
        mssv,
        birthday,
        address,
        email,
        sex,
        url_avatar
    } = req.body

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
            sex,
            url_avatar
        }, {
            where: {
                id
            }
        })
        console.log(updateStudent)
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
const resetPass = async(req, res, next) => {
    const { id } = req.body;
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
                password: md5(student[0].mssv)
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
const detailStudent = async(req, res, next) => {
    const id = parseInt(req.body.id)
    const urlModalEditStudent = `${process.cwd()}/modals/DetailStudentModal.pug`;
    try {
        const student = await StudentModel.findAll({
                where: {
                    id
                }
            })
            // console.log(student)
        if (student.length > 0) {
            const htmlModalDetailStudent = await pug.renderFile(urlModalEditStudent, {
                student: student[0]
            })
            res.send({
                result: 1,
                htmlModalDetailStudent
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
const importStudent = async(req, res, next) => {
    const { formData } = req.body
    try {
        var reader = new FileReader();
        reader.readAsArrayBuffer(formData);
        var data = new Uint8Array(reader.result);
        var wb = xlsx.read(data, { type: 'array' });
        console.log(wb)
        res.send({
            result: 1
        })

    } catch (error) {
        console.log(error)
        res.status(404).send()
        return;
    }

}
export default {
    searchStudent,
    deleteStudent,
    getStudent,
    addStudent,
    editStudent,
    saveStudent,
    resetPass,
    detailStudent,
    importStudent
}