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
            include: [{
                model: StudentClassModel,
                include: [{
                    model: StudentModel,
                    // include:[{
                    //     model:AbsentStudentModel,
                    //     attributes:[[sequelize.fn('count', sequelize.col('Absent_Student.studen_id')), 'count']],
                    //     where:{
                    //         class_id:id,
                    //         status:1
                    //     },
                    //     group:['Absent_Student.student_id']
                    // }]
                }]
            },
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
            where: {
                class_code: id
            }
        })
        const absentClass = await AbsentClassModel.findAll({
            where: {
                class_id: classes[0].id,
                is_active: 1
            }
        })
        // const listStudent =await StudentModel.findAll({

        // })
        
        // console.log(classes.length)
        if (classes.length < 1) {
            res.redirect('/admin/class')
            return;
        }
        res.render('DetailClassView', {
            class_code: id,
            classes: classes[0],
            student_classes: classes[0].Student_classes,
            countAbsent:absentClass.length
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