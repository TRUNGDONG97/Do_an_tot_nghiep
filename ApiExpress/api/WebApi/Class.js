import TeacherModel from '../../models/TeacherModel'
import ClassModel from '../../models/ClassModel'
// import RoomModel from '../../models/RoomModel'
import ScheduleClassModel from '../../models/ScheduleClassModel'
import SubjectModel from '../../models/SubjectModel'
import StudentModel from '../../models/StudentModel'
import AbsentStudentModel from '../../models/AbsentStudentModel'
import StudentClassModel from '../../models/StudentClassModel'
import AbsentClassModel from '../../models/AbsentClassModel'
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
import excel from 'exceljs'

const getClass = async (req, res, next) => {
    const { currentPage } = req.body
    try {
        const classes = await ClassModel.findAndCountAll({
            include: [{
                model: StudentClassModel,
                include: [{
                    model: StudentModel
                }],
                require: false
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
                    is_active: 1
                }
            }
            ],
            where: {
                is_active: 1
            },
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
    const { phone } = req.body
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
                    phone: phone
                }
            }
            ],
            where: {
                status: 1,
                is_active: 1
            },
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
                    }],
                    require: false
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
                    model: TeacherModel,
                    where: {
                        is_active: 1
                    }
                },
                {
                    model: ScheduleClassModel,
                },
                ],
                offset: Constants.PER_PAGE * (currentPage - 1),
                limit: Constants.PER_PAGE,
                where: {
                    [Op.and]: [
                        sequelize.where(sequelize.fn('lower', sequelize.col('class_code')), {
                            [Op.like]: '%' + claCode + '%'
                        }),
                        {
                            is_active: 1
                        }
                    ]
                },
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
                    model: TeacherModel,
                    where: {
                        is_active: 1
                    }
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
                            status: parseInt(claStatus),
                            is_active: 1
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
                class_code: claCode,
                status: 1,
                is_active: 1
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
                    phone: teaPhone,
                    is_active: 1
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
        const student = await StudentModel.findAll({
            where: {
                mssv
            }
        })
        // console.log(student.count)
        if (student.length < 1) {
            res.send({
                result: 0
            })
            return;
        }
        const class_student = await StudentClassModel.findAll({
            where: {
                class_id,
                student_id: student[0].id
            },
        })

        if (class_student.length > 0) {
            res.send({
                result: 1
            })
            return;
        }
        await StudentClassModel.create({
            student_id: student[0].id,
            class_id
        })

        res.send({
            result: 2,
            // htmlTable
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
            group: ['Students.id'],
            order: [
                ['last_name', 'ASC']
            ]
        })
        var urlTable = `${process.cwd()}/table/TableDetailClass.pug`;
        var htmlTable = await pug.renderFile(urlTable, {
            student_classes: listStudent
        });
        res.send({
            htmlTable
        })
    } catch (error) {
        console.log(error)
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
                model: TeacherModel,
                where: {
                    is_active: 1
                }
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
                    phone: teaPhone,
                    is_active: 1
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
        const stuInClass = await StudentClassModel.findAll({
            where: {
                student_id,
                class_id
            }
        })
        if (stuInClass.length > 0) {
            await StudentClassModel.destroy({
                where: {
                    id: stuInClass[0].id
                }
            })

            res.send({
                result: 1,
                // htmlTable
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
        console.log(error)
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
                || !list_class[index].courseid
                || !list_class[index].phone_teacher) {
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
                    model: ScheduleClassModel,
                    require: false,
                }],
                where: {
                    class_code: list_class[index].classid.toString(),
                    status: 1,
                    is_active:1
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
            var countTeacher = await TeacherModel.findAll({
                where: {
                    phone: "0" + list_class[index].phone_teacher.toString(),
                    status: [1, 2],
                    is_active: 1
                }
            })
            console.log(countSubject.length, 'countSubject')
            console.log(countStudent.length, 'countStudent')
            console.log(countClass.length, 'countClass')
            console.log(countTeacher.length, 'countTeacher')
            if (countClass.length > 0) {
                console.log('có lớp học')
                await addStudentInClass(countStudent,
                    countClass[0].id,
                    list_class[index].first_name,
                    list_class[index].last_name,
                    list_class[index].StudentID,
                    list_class[index].birthdate,
                    list_class[index].sex,
                    list_class[index].mail
                )

            } else {
                console.log('ko có lớp học')
                var subject_id;
                var teacher_id;
                if (countSubject.length > 0) {
                    subject_id = countSubject[0].id;
                } else {
                    const newSubject = await createSubject(list_class[index].courseid, list_class[index].subject_name);
                    subject_id = newSubject.id
                }
                if (countTeacher.length > 0) {
                    teacher_id = countTeacher[0].id
                } else {
                    const newTeacher = await createTeacher(list_class[index].name_teacher,
                        "0" + list_class[index].phone_teacher.toString(),
                        list_class[index].gender_teacher,
                        list_class[index].mail_teacher
                    )
                    teacher_id = newTeacher.id
                }
                const newClass = await createClass(list_class[index].classid, subject_id, teacher_id)
                console.log(newClass.id)
                await createSchedule(newClass.id, list_class[index].schedule1)
                if (list_class[index].schedule2) {
                    await createSchedule(newClass.id, list_class[index].schedule2)
                }
                await addStudentInClass(countStudent,
                    newClass.id,
                    list_class[index].first_name,
                    list_class[index].last_name,
                    list_class[index].StudentID,
                    list_class[index].birthdate,
                    list_class[index].sex,
                    list_class[index].mail
                )
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
const exportFile = async (req, res, next) => {
    const { class_code } = req.query
    // console.log(class_code)
    try {
        const classes = await ClassModel.findAll({
            where: {
                class_code,
                status: 1,
                is_active:1
            }
        })
        const absentClass = await AbsentClassModel.findAll({
            where: {
                class_id: classes[0].id,
                is_active: 1
            }
        })
        var arrIdAbsentClass = [];
        for (let index = 0; index < absentClass.length; index++) {
            arrIdAbsentClass.push(absentClass[index].id)
        }
        const stuInClass = await StudentModel.findAll({
            include: [{
                model: StudentClassModel,
                where: {
                    class_id: classes[0].id
                }
            }],
        })
        var arrIdStudent = [];
        for (let index = 0; index < stuInClass.length; index++) {
            arrIdStudent.push(stuInClass[index].id)
        }
        // console.log(arrIdStudent,'arrIdStudent')
        const listStudent = await StudentModel.findAll({
            attributes: ['id', 'first_name', 'last_name', 'mssv', 'birthday', 'sex',
                [sequelize.fn('sum', sequelize.col('Absent_Students.status')), 'count']],
            include: [{
                model: AbsentStudentModel,
                attributes: [],
                where: {
                    // class_id: classes[0].id,
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

        var student = [];
        for (let index = 0; index < listStudent.length; index++) {
            // student[index].id = index;
            // student[index].name=li
            student.push({
                stt: index + 1,
                name: listStudent[index].first_name + " " + listStudent[index].last_name,
                mssv: listStudent[index].mssv,
                birthday: listStudent[index].birthday.split("-").reverse().join("/"),
                sex: listStudent[index].sex == 1 ? "nam" : "nữ",
                absent: listStudent[index].get('count')
            })
        }
        // res.send({
        //     result: student
        // })
        let workbook = new excel.Workbook(); //creating workbook
        let worksheet = workbook.addWorksheet('Students'); //creating worksheet

        //  WorkSheet Header
        worksheet.columns = [
            { header: 'STT', key: 'stt', width: 10 },
            { header: 'Họ và tên', key: 'name', width: 30 },
            { header: 'Mssv', key: 'mssv', width: 15 },
            { header: 'Ngày sinh', key: 'birthday', width: 20 },
            { header: 'Giới tính', key: 'sex', width: 15 },
            { header: 'Số điểm danh', key: 'absent', width: 15, }
        ];

        // Add Array Rows
        worksheet.addRows(student);

        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.setHeader('Content-Disposition', 'attachment; filename=' + 'student.xlsx');
        return workbook.xlsx.write(res)
            .then(function () {
                res.status(200).end();
            });
    } catch (error) {
        console.log(error)
        res.status(404).send()
        return;
    }

}
// const getSchedule = (TimeTable) => {
//     return TimeTable ? TimeTable.slice(TimeTable.indexOf("TG"), TimeTable.length) : "chưa có";
// }
const createTeacher = async (name, phone, sex, email) => {
    const newTeacher = await TeacherModel.create({
        name,
        phone,
        sex: sex == 'nam' ? 1 : 0,
        email,
        password: md5(phone)
        // name: list_class[index].name_teacher,
        // phone: list_class[index].phone_teacher,
        // sex: list_class[index].gender_teacher == 'nam' ? 1 : 0,
        // email: list_class[index].mail_teacher,
        // password: md5(list_class[index].phone_teacher)
    })
    return newTeacher;
}
const createClass = async (class_code, subject_id, teacher_id) => {
    var newClass = await ClassModel.create({
        class_code,
        subject_id,
        status: 1,
        teacher_id
    })
    return newClass;
}
const createSubject = async (subject_code, subject_name) => {
    var newSubject = await SubjectModel.create({
        subject_code,
        subject_name
    })
    return newSubject;
}
const addStudentInClass = async (countStudent, class_id, first_name,
    last_name, StudentID, birthday, sex, email) => {
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
            first_name,
            last_name,
            sex: sex == 'nam' ? 1 : 0,
            mssv: StudentID.toString(),
            birthday: birthday ? DateUtil.formatInputDate(birthday) : "2020-05-21",
            password: md5(StudentID.toString()),
            email
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
const createSchedule = async (class_id, schedule) => {
    await ScheduleClassModel.create({
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
    importClass,
    exportFile,
}