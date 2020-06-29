import TeacherModel from '../models/TeacherModel'
import ClassModel from '../models/ClassModel'
import ScheduleClassModel from '../models/ScheduleClassModel'
import SubjectModel from '../models/SubjectModel'
import StudentModel from '../models/StudentModel'
import StudentClassModel from '../models/StudentClassModel'
import Constants from '../constants/Constants'
import pug from 'pug'
import { getArrayPages, PageCount } from '../constants/Funtions'
import { Op } from 'sequelize'
import sequelize from 'sequelize'
import AbsentStudentModel from '../models/AbsentStudentModel'
import AbsentClassModel from '../models/AbsentClassModel'
import { where } from 'sequelize'

const getClass = async (req, res, next) => {

    res.render('ClassView');
}
const detailClass = async (req, res, next) => {
    const id = req.query.id
    if (!id) {
        res.redirect('/admin/class')
        return;
    }
    try {
        const classes = await ClassModel.findAll({
            include: [
                {
                    model: SubjectModel
                },
                {
                    model: TeacherModel
                },
                {
                    model: ScheduleClassModel
                },
            ],
            // group:['Absent_Student.student_id'],
            where: {
                class_code: id,
                is_active:1
            }
        })
        if (classes.length < 1) {
            res.redirect('/admin/class')
            return;
        }
        const absentClass = await AbsentClassModel.findAll({
            where: {
                class_id: classes[0].id,
                is_active: 1
            }
        })
        var arrIdAbsentClass=[];
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
        const listStudent = await StudentModel.findAll({
            attributes: ['id', 'first_name','last_name', 'mssv', 'phone', 'birthday',
                [sequelize.fn('sum', sequelize.col('Absent_Students.status')), 'count']],
            include: [{
                model: AbsentStudentModel,
                attributes: [],
                where: {
                    // class_id: classes[0].id,
                    absent_class_id:arrIdAbsentClass
                },
                required:false
            }],
            where: {
                id: arrIdStudent
            },
            row:true,
            group: ['Students.id'],
            order: [
                ['last_name', 'ASC']
            ]
        })

        // console.log(listStudent[0].get('count'));
        res.render('DetailClassView', {
            class_code: id,
            classes: classes[0],
            student_classes: listStudent,
            countAbsent: absentClass.length
        });
        return;
    } catch (error) {
        res.render('ErrorView', {
            error
        })
        return;
    }

}
// const getClassTeacher=async()=>{

// }
export default {
    getClass,
    detailClass,
    // getClassTeacher
}