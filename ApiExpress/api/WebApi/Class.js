import TeacherModel from '../../models/TeacherModel'
import ClassModel from '../../models/ClassModel'
// import RoomModel from '../../models/RoomModel'
import ScheduleClassModel from '../../models/ScheduleClassModel'
import SubjectModel from '../../models/SubjectModel'
import StudentModel from '../../models/StudentModel'
import StudentClassModel from '../../models/StudentClassModel'
import Constants from '../../constants/Constants'
import pug from 'pug'
import { getArrayPages, PageCount } from '../../constants/Funtions'
import { Op } from 'sequelize'
import sequelize from 'sequelize'

const getClass = async(req, res, next) => {
    const { currentPage } = req.body
    try {
        const classes = await ClassModel.findAndCountAll({
                include: [{
                        model: StudentClassModel,
                        include: [{
                            model: StudentModel
                        }]
                    },
                    {
                        model: SubjectModel
                    },
                    {
                        model: ScheduleClassModel,
                        // required: true
                    },
                ],
                offset: Constants.PER_PAGE * (currentPage - 1),
                limit: Constants.PER_PAGE,
                order: [
                    ['Schedule_classes', 'day_of_week', 'ASC']
                ],
                distinct: true
            })
            // const count = await ClassModel.count()
            // console.log(classes.rows.length)
            // console.log(classes.count)
            // console.log(classes.count)
        const pageCount = PageCount(classes.count)
        var urlTable = `${process.cwd()}/table/TableClass.pug`;
        var htmlTable = await pug.renderFile(urlTable, {
            classes: classes.rows,
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
const searchClass = async(req, res, next) => {
    const {
        subCode,
        claStatus,
        claCode,
        currentPage
    } = req.body

    try {
        var classes;
        // var count;
        if (claStatus == '') {
            classes = await ClassModel.findAndCountAll({
                include: [{
                        model: StudentClassModel,
                        include: [{
                            model: StudentModel
                        }]
                    },
                    {
                        model: SubjectModel,
                        where: sequelize.where(sequelize.fn('lower', sequelize.col('subject_code')), {
                            [Op.like]: '%' + subCode + '%'
                        }),
                    },
                    {
                        model: TeacherModel
                    },
                    {
                        model: ScheduleClassModel,
                    },
                ],
                offset: Constants.PER_PAGE * (currentPage - 1),
                limit: Constants.PER_PAGE,
                order: [
                    ['Schedule_classes', 'day_of_week', 'ASC']
                ],
                where: sequelize.where(sequelize.fn('lower', sequelize.col('class_code')), {
                    [Op.like]: '%' + claCode + '%'
                }),
                distinct: true
            });
        } else {
            classes = await ClassModel.findAndCountAll({
                include: [{
                        model: StudentClassModel,
                        include: [{
                            model: StudentModel
                        }]
                    },
                    {
                        model: SubjectModel,
                        where: sequelize.where(sequelize.fn('lower', sequelize.col('subject_code')), {
                            [Op.like]: '%' + subCode + '%'
                        })
                    },
                    {
                        model: TeacherModel
                    },
                    {
                        model: ScheduleClassModel
                    },
                ],
                offset: Constants.PER_PAGE * (currentPage - 1),
                limit: Constants.PER_PAGE,
                order: [
                    ['Schedule_classes', 'day_of_week', 'ASC']
                ],
                where: {
                    [Op.and]: [
                        sequelize.where(sequelize.fn('lower', sequelize.col('class_code')), {
                            [Op.like]: '%' + claCode + '%'
                        }), {
                            status: parseInt(claStatus)
                        }
                    ]
                },
                distinct: true
            });
        }
        // console.log(classes.rows.length)
        // console.log(classes.count)
        const pageCount = PageCount(classes.count)
        var urlTable = `${process.cwd()}/table/TableClass.pug`;
        var htmlTable = await pug.renderFile(urlTable, {
            classes: classes.rows,
            STT: (currentPage - 1) * Constants.PER_PAGE,
            currentPage,
            pageCount: pageCount,
            search: true,
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
const addClass = async(req, res, next) => {
    const {
        subCode,
        claCode,
        room1,
        room2,
        teaPhone,
        day1,
        timeStart1,
        timeEnd1,
        day2,
        timeStart2,
        timeEnd2
    } = req.body
    try {
        const classes = await ClassModel.findAndCountAll({
            where: {
                class_code: claCode
            }
        })
        const teacher = await TeacherModel.findAndCountAll({
            where: {
                phone: teaPhone
            }
        })
        const subject = await SubjectModel.findAndCountAll({
            where: {
                subject_code: subCode
            }
        })
        if (classes.count > 0 && (teacher.count < 0 || subject.count < 0)) {
            res.send({
                result: 0
            })
            return;
        }

        if (teacher.count < 1) {
            res.send({
                result: 1
            })
            return;
        }

        if (subject.count < 1) {
            res.send({
                result: 2
            })
            return;
        }
        if (classes.count > 0 && teacher.count > 0 && subject.count > 0) {
            const countScheduleClass = await ScheduleClassModel.count({
                where: {
                    class_id: classes.rows[0].id
                }
            })
            if (countScheduleClass >= 2) {
                res.send({
                    result: 5
                })
                return;
            }
            console.log(countScheduleClass, 'đá')
            if (day1 == '' || timeStart1 == '' || timeEnd1 == '' || room1 == '') {
                await ScheduleClassModel.create({
                    class_id: classes.row[0].id,
                    day_of_week: day2,
                    time_start: timeStart2,
                    time_end: timeEnd2,
                    room_name: room2
                })
            }
            if (day2 == '' || timeStart2 == '' || timeEnd2 == '' || room2 == '') {
                await ScheduleClassModel.create({
                    class_id: classes.rows[0].id,
                    day_of_week: day1,
                    time_start: timeStart1,
                    time_end: timeEnd1,
                    room_name: room1
                })
            }
            res.send({
                result: 3,
                class_code: claCode
            })
            return;
        }
        // console.log(teacher.rows[0])
        // console.log(subject.rows[0])
        const newClass = await ClassModel.create({
            class_code: claCode,
            teacher_id: teacher.rows[0].id,
            status: 1, // đang học
            subject_id: subject.rows[0].id
        })
        if (day1 == '' || timeStart1 == '' || timeEnd1 == '' || room1 == '') {
            await ScheduleClassModel.create({
                class_id: newClass.id,
                day_of_week: day2,
                time_start: timeStart2,
                time_end: timeEnd2,
                room_name: room2
            })
        }
        if (day2 == '' || timeStart2 == '' || timeEnd2 == '' || room2 == '') {
            await ScheduleClassModel.create({
                class_id: newClass.id,
                day_of_week: day1,
                time_start: timeStart1,
                time_end: timeEnd1,
                room_name: room1
            })
        }
        res.send({
            result: 4
        })
        return;
    } catch (error) {
        console.log(error)
        res.status(404).send()
        return;
    }
}
const addStuInclass = async(req, res, next) => {
    const { mssv, class_id } = req.body
        // console.log(mssv)
        // console.log(class_id)
    try {
        const student = await StudentModel.findAndCountAll({
            where: {
                mssv
            }
        })
        console.log(student.count)
        if (student.count < 1) {
            res.send({
                result: 0
            })
            return;
        }
        const class_student = await ClassModel.findAndCountAll({
            include: [{
                model: StudentClassModel,
                include: [{
                    model: StudentModel,
                    where: {
                        mssv
                    }
                }],
            }],
            where: {
                id: class_id
            },
            distinct: true
        })

        if (class_student.rows[0].Student_classes.length > 0) {
            res.send({
                result: 1
            })
            return;
        }
        await StudentClassModel.create({
            student_id: student.rows[0].id,
            class_id
        })
        const new_class_stu = await ClassModel.findAll({
                include: [{
                    model: StudentClassModel,
                    include: [{
                        model: StudentModel
                    }]
                }],
                where: {
                    id: class_id
                },

            })
            // console.log(new_class_stu[0].Student_classes.length)
        var urlTable = `${process.cwd()}/table/TableDetailClass.pug`;
        var htmlTable = await pug.renderFile(urlTable, {
            student_classes: new_class_stu[0].Student_classes
        });
        // console.log(htmlTable)
        res.send({
            result: 2,
            htmlTable
        })
        return;
    } catch (error) {
        // console.log(error)
        res.status(404).send()
        return;
    }

}
const searchStuInclass = async(req, res, next) => {
    const { mssv, name, class_id } = req.body
    try {
        const class_student = await ClassModel.findAll({
            include: [{
                model: StudentClassModel,
                include: [{
                    model: StudentModel,
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
                }],
            }],
            where: {
                id: class_id
            }
        })
        var urlTable = `${process.cwd()}/table/TableDetailClass.pug`;
        var htmlTable = await pug.renderFile(urlTable, {
            student_classes: class_student[0].Student_classes
        });
        res.send({
            htmlTable
        })
    } catch (error) {
        // console.log(error)
        res.status(404).send()
        return;
    }
}
const editClass = async(req, res, next) => {
    const id = parseInt(req.body.id)
    const urlModalEditClass = `${process.cwd()}/modals/EditClassModal.pug`;
    try {
        const classes = await ClassModel.findAll({
                include: [{
                        model: SubjectModel
                    },
                    {
                        model: ScheduleClassModel,
                        // required: true
                    }, {
                        model: TeacherModel
                    }
                ],
                where: {
                    id
                }
            })
            // console.log(classes[0].Subject.subject_code)
        if (classes.length > 0) {
            const htmlModalEditClass = await pug.renderFile(urlModalEditClass, {
                classes: classes[0]
            })
            res.send({
                result: 1,
                htmlModalEditClass
            })
        } else {
            res.send({
                result: 0 //Notfound
            })
        }
        return;
    } catch (error) {
        console.log(error)
        res.status(404).send()
        return;
    }
}
const saveClass = async(req, res, next) => {
    const {
        class_id,
        class_status,
        subCode,
        room1,
        room2,
        teaPhone,
        day1,
        timeStart1,
        timeEnd1,
        day2,
        timeStart2,
        timeEnd2
    } = req.body
    try {

        const classes = await ClassModel.findAll({
            include: [{
                model: ScheduleClassModel
            }],
            where: {
                id: class_id
            }
        })
        const countScheduleClass = classes[0].Schedule_classes.length
            // console.log(classes[0].Schedule_classes.length)
        const countTeacher = await TeacherModel.count({
            where: {
                phone: teaPhone
            }
        })
        if (countTeacher < 0) {
            res.send({
                result: 0
            })
        }
        const countSubject = await SubjectModel.count({
            where: {
                subject_code: subCode
            }
        })
        if (countSubject < 0) {
            res.send({
                result: 1
            })
            return;
        }
        if (countScheduleClass == 1) {
            if (checkSchedule(room1, room2, day1, timeStart1, timeEnd1, day2, timeStart2, timeEnd2) == 1) {
                await updateSchedule(classes[0].Schedule_classes[0].id, class_id, day1, timeStart1, timeEnd1, room1)
            }
            if (checkSchedule(room1, room2, day1, timeStart1, timeEnd1, day2, timeStart2, timeEnd2) == 2) {
                await updateSchedule(classes[0].Schedule_classes[0].id, class_id, day2, timeStart2, timeEnd2, room2)
            }
            await updateSchedule(classes[0].Schedule_classes[0].id, class_id, day1, timeStart1, timeEnd1, room1)
            await createSchedule(class_id, day2, timeStart2, timeEnd2, room2)
        } else {
            if (checkSchedule(room1, room2, day1, timeStart1, timeEnd1, day2, timeStart2, timeEnd2) == 1) {
                await updateSchedule(classes[0].Schedule_classes[0].id, class_id, day1, timeStart1, timeEnd1, room1)
                await destroySchedule(classes[0].Schedule_classes[1].id)
            }
            if (checkSchedule(room1, room2, day1, timeStart1, timeEnd1, day2, timeStart2, timeEnd2) == 2) {
                await updateSchedule(classes[0].Schedule_classes[0].id, class_id, day2, timeStart2, timeEnd2, room2)
                await destroySchedule(classes[0].Schedule_classes[1].id)
            }
            await updateSchedule(classes[0].Schedule_classes[0].id, class_id, day1, timeStart1, timeEnd1, room1)
            await updateSchedule(classes[0].Schedule_classes[1].id, class_id, day2, timeStart2, timeEnd2, room2)

        }

        res.send({
            result: 2,
        })
        return;
    } catch (error) {
        console.log(error)
        res.status(404).send()
        return;
    }
}
const checkSchedule = (room1, room2, day1, timeStart1, timeEnd1, day2, timeStart2, timeEnd2) => {
    if (day1 == '' || timeStart1 == '' || timeEnd1 == '' || room1 == '') {
        return 1;
    }
    if (day2 == '' || timeStart2 == '' || timeEnd2 == '' || room2 == '') {
        return 2;
    }
    return 3
}
const updateSchedule = (id, class_id, day, timeStart, timeEnd, room) => {
    ScheduleClassModel.update({
        class_id: class_id,
        day_of_week: day,
        time_start: timeStart,
        time_end: timeEnd,
        room_name: room
    }, {
        where: {
            id
        }
    })
}
const destroySchedule = (id) => {
    ScheduleClassModel.destroy({
        where: {
            id
        }
    })
}
const createSchedule = (class_id, day, timeStart, timeEnd, room) => {
    ScheduleClassModel.create({
        class_id: class_id,
        day_of_week: day,
        time_start: timeStart,
        time_end: timeEnd,
        room_name: room
    })
}
export default {
    getClass,
    searchClass,
    addClass,
    addStuInclass,
    searchStuInclass,
    editClass,
    saveClass,
}