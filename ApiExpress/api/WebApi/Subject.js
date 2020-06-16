import { Op } from 'sequelize'
import sequelize from 'sequelize'
import Constants from '../../constants/Constants'
import SubjectModel from '../../models/SubjectModel'
import pug from 'pug'
import { getArrayPages, PageCount } from '../../constants/Funtions'
import ClassModel from '../../models/ClassModel'
import xlsx from 'xlsx'
const getSubject = async (req, res, next) => {
    const { currentPage } = req.body
    try {
        const subject = await SubjectModel.findAndCountAll({
            offset: Constants.PER_PAGE * (currentPage - 1),
            limit: Constants.PER_PAGE,
            where: {
                is_active: 1
            },
            order: [
                ['subject_name', 'ASC']
            ]
        })
        // console.log(subject.count)
        const pageCount = PageCount(subject.count)
        var urlTable = `${process.cwd()}/table/TableSubject.pug`;
        var htmlTable = await pug.renderFile(urlTable, {
            subject: subject.rows,
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
const searchSubject = async (req, res, next) => {
    const { subject_name, subject_code, currentPage } = req.body
    // console.log(currentPage)
    try {
        const subject = await SubjectModel.findAndCountAll({
            where: {
                [Op.and]: [
                    sequelize.where(sequelize.fn('lower', sequelize.col('subject_name')), {
                        [Op.like]: '%' + subject_name + '%'
                    }),
                    sequelize.where(sequelize.fn("lower", sequelize.col("subject_code")), {
                        [Op.like]: '%' + subject_code + '%'
                    }),
                    {
                        is_active: 1
                    }
                ]
            },
            offset: Constants.PER_PAGE * (currentPage - 1),
            limit: Constants.PER_PAGE,
            order: [
                ['subject_name', 'ASC']
            ]

        })
        // console.log(subject.count)
        const urlTable = `${process.cwd()}/table/TableSubject.pug`;
        const pageCount = PageCount(subject.count)
        const htmlTable = await pug.renderFile(urlTable, {
            subject: subject.rows,
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
const addSubject = async (req, res, next) => {
    const {
        subject_name,
        subject_code,
        credit_hour,
        coefficient,
        time
    } = req.body
    try {
        const countCode = await SubjectModel.count({
            where: {
                subject_code,
                is_active: 1
            }
        })
        if (countCode > 0) {
            res.send({ result: 0 })
            return;
        }
        const newSubject = await SubjectModel.create({
            subject_name,
            subject_code,
            credit_hour,
            coefficient,
            time
        })
        // console.log(newStudent)
        res.send({
            result: 1
        })
        return;
    } catch (error) {
        // console.log(error)
        res.status(404).send()
        return;
    }
}
const deleteSubject = async (req, res, next) => {
    const id = parseInt(req.body.id)
    // console.log(id)
    try {
        const subject = await SubjectModel.findAll({
            where: {
                id,
                is_active: 1
            }
        })
        // console.log(students.length)
        if (subject.length > 0) {
            // await ClassModel.destroy({
            //     where:{
            //         subject_id:id
            //     }
            // })
            await SubjectModel.destroy({
                is_active: 0
            }, {
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
const editSubject = async (req, res, next) => {
    const id = parseInt(req.body.id)
    const urlModalEdit = `${process.cwd()}/modals/EditSubjectModal.pug`;
    // console.log(typeof id)
    try {
        const subject = await SubjectModel.findAll({
            where: {
                id,
                is_active: 1
            }
        })
        if (subject.length > 0) {
            const htmlModalEdit = await pug.renderFile(urlModalEdit, {
                subject: subject[0]
            })
            res.send({
                result: 1,
                htmlModalEdit
            })
            return;
        } else {
            res.send({
                result: 0
            })
            return;
        }

    } catch (error) {
        console.log(error)
        res.status(404).send()
        return;
    }

}
const saveSubject = async (req, res, next) => {
    const {
        subject_name,
        subject_code,
        credit_hour,
        coefficient,
        time,
        id
    } = req.body
    // console.log(id)
    try {
        const subject = await SubjectModel.findAll({
            where: {
                id,
                is_active: 1
            }
        })

        if (subject_code != subject[0].subject_code.trim()) {
            const countSubCode = await SubjectModel.count({
                where: {
                    subject_code,
                    is_active: 1
                }
            })
            if (countSubCode > 0) {
                res.send({ result: 0 })
                return;
            }
        }
        await SubjectModel.update({
            subject_name,
            subject_code,
            credit_hour,
            coefficient,
            time
        }, {
            where: {
                id
            }
        })
        res.send({ result: 1 })
        return;

    } catch (error) {
        console.log(error)
        res.status(404).send()
        return;
    }
}
const importSubject = async (req, res, next) => {
    const { namefile } = req.body
    var workbook = xlsx.readFile(__dirname.slice(0, __dirname.length - 10) + 'public/upload/' + namefile,
        { cellDates: true });
    const sheet_name_list = workbook.SheetNames;
    const list_subject = xlsx.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);
    if (list_subject.length < 1) {
        res.send({
            result: 0
        })
        return;
    }
    // console.log(list_subject[0])
    try {
        for (let index = 0; index < list_subject.length; index++) {
            if (!list_subject[index].subject_code) {
                res.send({
                    result: 2
                })
                return;
            }
        }
        //    console.log(list_student.length)
        for (let index = 0; index < list_subject.length; index++) {
            var countSub = await SubjectModel.count({
                where: {
                    subject_code: list_subject[index].subject_code
                }
            })
          
            if (countSub > 0) {
                await SubjectModel.update({
                   subject_name:list_subject[index].subject_name,
                   credit_hour:list_subject[index].credit_hour,
                   time:list_subject[index].time,
                   coefficient:list_subject[index].coefficient,
                }, {
                    where: {
                        subject_code: list_subject[index].subject_code
                    }
                })
                console.log(1)
            } else {
                await SubjectModel.create({
                    subject_name:list_subject[index].subject_name,
                    credit_hour:list_subject[index].credit_hour,
                    time:list_subject[index].time,
                    coefficient:list_subject[index].coefficient,
                    subject_code:list_subject[index].subject_code,
                })
                console.log(2)
            }
        }
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
    getSubject,
    searchSubject,
    addSubject,
    deleteSubject,
    editSubject,
    saveSubject,
    importSubject
}