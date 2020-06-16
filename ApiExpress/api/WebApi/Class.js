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
import formidable from 'formidable'
import fs from 'fs'
import xlsx from 'xlsx'
import DateUtil from '../../constants/DateUtil'
import md5 from 'md5'
const getClass = async (req, res, next) => {
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
                model: SubjectModel,
                where: {
                    is_active: 1
                }
            },
            {
                model: ScheduleClassModel,
                // required: true
            },
            {
                model: TeacherModel
            }
            ],
            offset: Constants.PER_PAGE * (currentPage - 1),
            limit: Constants.PER_PAGE,
            distinct: true
        })
        const pageCount = PageCount(classes.count)
        var urlTable = `${process.cwd()}/table/TableClass.pug`;
        var htmlTable = await pug.renderFile(urlTable, {
            classes: classes.rows,
            STT: (currentPage - 1) * Constants.PER_PAGE,
            currentPage,
            pageCount: pageCount,
            search: false,
            pages: getArrayPages(req)(pageCount, currentPage),
            notPa: true
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
const getClassTeacher = async (req, res, next) => {
    const { nameTeacher } = req.body
    try {
        const classes = await ClassModel.findAndCountAll({
            include: [{
                model: StudentClassModel,
                include: [{
                    model: StudentModel
                }]
            },
            {
                model: SubjectModel,
                where: {
                    is_active: 1
                }
            },
            {
                model: ScheduleClassModel,
                // required: true
            },
            {
                model: TeacherModel,
                where: {
                    name: nameTeacher
                }
            }
            ],
            offset: Constants.PER_PAGE * (1 - 1),
            limit: Constants.PER_PAGE,
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
            STT: (1 - 1) * Constants.PER_PAGE,
            currentPage: 1,
            pageCount: pageCount,
            search: false,
            pages: getArrayPages(req)(pageCount, 1),
            notPa: false,
        });
        res.send({
            htmlTable
        })
        return;
    } catch (error) {
        console.log(error)
        res.status(404).send()
        return;
    }

}

const searchClass = async (req, res, next) => {
    const {
        subCode,
        claStatus,
        claCode,
        currentPage,
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
                    where: {
                        [Op.and]: [
                            sequelize.where(sequelize.fn('lower', sequelize.col('subject_code')), {
                                [Op.like]: '%' + subCode + '%'
                            }),
                            {
                                is_active: 1
                            }
                        ]
                    }
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
                    where: {
                        [Op.and]: [
                            sequelize.where(sequelize.fn('lower', sequelize.col('subject_code')), {
                                [Op.like]: '%' + subCode + '%'
                            }),
                            {
                                is_active: 1
                            }
                        ]
                    }
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
            pages: getArrayPages(req)(pageCount, currentPage),
            notPa: true
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
const addClass = async (req, res, next) => {
    const {
        subCode,
        claCode,
        teaPhone,
        schedule1,
        schedule2
    } = req.body
    try {
        var teacher;
        const classes = await ClassModel.findAndCountAll({
            where: {
                class_code: claCode
            }
        })
        // console.log(classes.rows[0].id)

        const subject = await SubjectModel.findAndCountAll({
            where: {
                subject_code: subCode,
                is_active: 1
            }
        })
        if (classes.count > 0 && subject.count < 0) {
            res.send({
                result: 0
            })
            return;
        }
        if (teaPhone != '') {
            teacher = await TeacherModel.findAndCountAll({
                where: {
                    phone: teaPhone
                }
            })
            if (teacher.count < 1) {
                res.send({
                    result: 1
                })
                return;
            }
        }


        if (subject.count < 1) {
            res.send({
                result: 2
            })
            return;
        }
        if (classes.count > 0 && subject.count > 0) {
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
            // console.log(countScheduleClass, 'đá')
            if (schedule1 != '') {
                await ScheduleClassModel.create({
                    class_id: classes.rows[0].id,
                    schedule: schedule1
                })
            }
            if (schedule2 != '') {
                await ScheduleClassModel.create({
                    class_id: classes.rows[0].id,
                    schedule: schedule2
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
            teacher_id: teacher ? teacher.rows[0].id : null,
            status: 1, // đang học
            subject_id: subject.rows[0].id
        })
        if (schedule1 != '') {
            await ScheduleClassModel.create({
                class_id: newClass.id,
                schedule: schedule1
            })
        }
        if (schedule2 != '') {
            await ScheduleClassModel.create({
                class_id: newClass.id,
                schedule: schedule2
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
const addStuInclass = async (req, res, next) => {
    const { mssv, class_id } = req.body
    // console.log(mssv)
    // console.log(class_id)
    try {
        const student = await StudentModel.findAndCountAll({
            where: {
                mssv
            }
        })
        // console.log(student.count)
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
        // console.log(new_class_stu[0].Student_classes[0].class_id)
        var urlTable = `${process.cwd()}/table/TableDetailClass.pug`;
        var htmlTable = await pug.renderFile(urlTable, {
            student_classes: new_class_stu[0].Student_classes
        });
        // console.log(new_class_stu[0].Schedule_classes[0])
        res.send({
            result: 2,
            htmlTable
        })
        return;
    } catch (error) {
        console.log(error)
        res.status(404).send()
        return;
    }

}
const searchStuInclass = async (req, res, next) => {
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
const editClass = async (req, res, next) => {
    const id = parseInt(req.body.id)
    const urlModalEditClass = `${process.cwd()}/modals/EditClassModal.pug`;
    try {
        const classes = await ClassModel.findAll({
            include: [{
                model: SubjectModel,
                is_active: 1
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
const saveClass = async (req, res, next) => {
    const {
        class_id,
        status,
        subCode,
        schedule1,
        schedule2,
        teaPhone,

    } = req.body
    try {
        var teacher;
        const classes = await ClassModel.findAll({
            include: [{
                model: ScheduleClassModel
            }],
            where: {
                id: class_id
            }
        })
        const countScheduleClass = classes[0].Schedule_classes.length;

        if (teaPhone != '') {
            teacher = await TeacherModel.findAndCountAll({
                where: {
                    phone: teaPhone
                }
            })
            if (teacher.count < 0) {
                res.send({
                    result: 0
                })
            }
        }

        const subject = await SubjectModel.findAndCountAll({
            where: {
                subject_code: subCode,
                is_active: 1
            }
        })
        if (subject.count < 0) {
            res.send({
                result: 1
            })
            return;
        }
        // console.log(countScheduleClass, 'countScheduleClass')
        // console.log(checkSchedule(room1, room2, day1, timeStart1, timeEnd1, day2, timeStart2, timeEnd2), 'check')
        if (countScheduleClass == 1) {
            if (checkSchedule(schedule1, schedule2) == 1) {
                console.log(1)
                await updateSchedule(classes[0].Schedule_classes[0].id, class_id, schedule2)
            } else if (checkSchedule(schedule1, schedule2) == 2) {
                // console.log(2)
                await updateSchedule(classes[0].Schedule_classes[0].id, class_id, schedule1)
            } else {
                // console.log(3)
                await updateSchedule(classes[0].Schedule_classes[0].id, class_id, schedule1)
                await createSchedule(class_id, schedule2)
            }
        } else {
            if (checkSchedule(schedule1, schedule2) == 1) {
                await updateSchedule(classes[0].Schedule_classes[0].id, class_id, schedule2)
                await destroySchedule(classes[0].Schedule_classes[1].id)
                // console.log(4)
            } else if (checkSchedule(schedule1, schedule2) == 2) {
                await updateSchedule(classes[0].Schedule_classes[0].id, class_id, schedule1)
                await destroySchedule(classes[0].Schedule_classes[1].id)
                // console.log(5)
            } else {
                // console.log(6)
                await updateSchedule(classes[0].Schedule_classes[0].id, class_id, schedule1)
                await updateSchedule(classes[0].Schedule_classes[1].id, class_id, schedule2)
            }
        }
        await ClassModel.update({
            // class_code:class_code,
            teacher_id: teacher ? teacher.rows[0].id : null,
            subject_id: subject.rows[0].id,
            status
        }, {
            where: {
                id: class_id
            }
        })
        res.send({
            result: 2,
        })
        return;
    } catch (error) {
        // console.log(error)
        res.status(404).send()
        return;
    }
}

const deleteStuInclass = async (req, res, next) => {
    const { student_id, class_id } = req.body

    try {
        const stuInClass = await StudentClassModel.findAndCountAll({
            where: {
                student_id,
                class_id
            }
        })
        if (stuInClass.count > 0) {
            await StudentClassModel.destroy({
                where: {
                    id: stuInClass.rows[0].id
                }
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
            // console.log(new_class_stu[0].Student_classes[0].class_id)
            var urlTable = `${process.cwd()}/table/TableDetailClass.pug`;
            var htmlTable = await pug.renderFile(urlTable, {
                student_classes: new_class_stu[0].Student_classes
            });
            res.send({
                result: 1,
                htmlTable
            })
        } else {
            res.send({
                result: 0
            })
        }

    } catch (error) {
        console.log(error)
        res.status(404).send()
        return;
    }
}

const deleteClass = async (req, res, next) => {
    const id = parseInt(req.body.id)
    // console.log(id)
    try {
        const classes = await ClassModel.findAll({
            where: {
                id
            }
        })
        // console.log(students.length)
        if (classes.length > 0) {

            await ClassModel.update({
                status: 0
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
const updateAllStatusClass = async (req, res, next) => {
    try {
        await ClassModel.update({
            status: 2
        }, {
            where: {
                is_active: 1,
                status: 1
            }
        })
        res.send({
            result: 1
        })
    } catch (error) {
        res.status(404).send()
        return;
    }
}
const importClass = async (req, res, next) => {
    const { namefile } = req.body
    console.log(namefile)
    var workbook = xlsx.readFile(__dirname.slice(0, __dirname.length - 10) + 'public/upload/' + namefile,
        { cellDates: true });
    const sheet_name_list = workbook.SheetNames;
    const list_class = xlsx.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);
    if (list_class.length < 1) {
        res.send({
            result: 0
        })
        return;
    }

    try {
        for (let index = 0; index < list_class.length; index++) {
            if (!list_class[index].classid
                || !list_class[index].StudentID
                || !list_class[index].courseid) {
                console.log(list_class[index].classid)
                console.log(list_class[index].StudentID)
                console.log(list_class[index].courseid)
                res.send({
                    result: 2
                })

                return;
            }
        }
        for (let index = 0; index < list_class.length; index++) {

            // console.log(list_class[index].courseid)
            var countClass = await ClassModel.findAll({
                include: [{
                    model: ScheduleClassModel
                }],
                where: {
                    class_code: list_class[index].classid.toString(),
                }
            })
            var countStudent = await StudentModel.findAll({
                where: {
                    mssv: list_class[index].StudentID
                }
            })
            var countSubject = await SubjectModel.findAll({
                where: {
                    subject_code: list_class[index].courseid,
                    is_active: 1
                }
            })
            console.log(countSubject.length, 'countSubject')
            console.log(countStudent.length, 'countStudent')
            console.log(countClass.length, 'countClass')
            if (countClass.length > 0) {
                console.log('có lơp học')
                addStudentInClass(countStudent, countClass[0].id,
                    list_class[index].studentname, list_class[index].StudentID, list_class[index].birthdate)
                if (getSchedule(list_class[index].TimeTable) != countClass[0].Schedule_classes[0].schedule
                    && countClass[0].Schedule_classes.length < 2) {
                    await ScheduleClassModel.create({
                        class_id: countClass[0].id,
                        schedule: getSchedule(list_class[index].TimeTable)
                    })
                    console.log('thêm lịch học')
                }
            } else {
                console.log('ko có lớp học')
                if (countSubject.length > 0) {
                    var classes = await ClassModel.create({
                        class_code: list_class[index].classid.toString(),
                        subject_id: countSubject[0].id
                    })
                    await ScheduleClassModel.create({
                        class_id: classes.id,
                        schedule: getSchedule(list_class[index].TimeTable)
                    })
                    addStudentInClass(countStudent, classes.id,
                        list_class[index].studentname, list_class[index].StudentID, list_class[index].birthdate)

                    console.log('có  môn học')
                } else {
                    var subject = await SubjectModel.create({
                        subject_code: list_class[index].courseid,
                        subject_name: list_class[index].name
                    })

                    var classes = await ClassModel.create({
                        class_code: list_class[index].classid.toString(),
                        subject_id: subject.id,
                        status: 1,

                    })
                    await ScheduleClassModel.create({
                        class_id: classes.id,
                        schedule: getSchedule(list_class[index].TimeTable)
                    })
                    addStudentInClass(countStudent, classes.id,
                        list_class[index].studentname, list_class[index].StudentID, list_class[index].birthdate)
                }

            }
        }
        res.send({
            result: 1,
        })
        return;
        // });
    } catch (error) {
        console.log(error)
        res.status(404).send()
        return;
    }
}
const getSchedule = (TimeTable) => {
    return TimeTable ? TimeTable.slice(TimeTable.indexOf("TG"), TimeTable.length) : "chưa có";
}
const addStudentInClass = async (countStudent, class_id, studentname, StudentID, birthday) => {
    if (countStudent.length > 0) {
        var studentInclas = await StudentClassModel.findAll({
            where: {
                class_id,
                student_id: countStudent[0].id
            }
        })
        if (studentInclas.length < 1) {
            await StudentClassModel.create({
                student_id: countStudent[0].id,
                class_id,
            })
        }

    } else {
        var student = await StudentModel.create({
            name: studentname,
            mssv: StudentID.toString(),
            birthday: birthday ? DateUtil.formatInputDate(birthday) : "2020-05-21",
            password: md5(StudentID.toString())
        })
        await StudentClassModel.create({
            student_id: student.id,
            class_id
        })
    }
}

const checkSchedule = (schedule1, schedule2) => {
    if (schedule1 == '') {
        return 1;
    } else if (schedule2 == '') {
        return 2;
    } else {
        return 3
    }

}
const updateSchedule = (id, class_id, schedule) => {
    ScheduleClassModel.update({
        class_id: class_id,
        schedule
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
const createSchedule = (class_id, schedule) => {
    ScheduleClassModel.create({
        class_id: class_id,
        schedule
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
    deleteStuInclass,
    deleteClass,
    getClassTeacher,
    updateAllStatusClass,
    importClass
}