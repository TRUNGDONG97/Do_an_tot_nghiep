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

const getClass = async(req, res, next) => {
    
    res.render('ClassView');
}
const detailClass = async(req, res, next) => {
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
                        model: StudentModel
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

        // console.log(classes[0].Teacher) 
        // console.log(classes.length)
        if (classes.length < 1) {
            res.redirect('/admin/class')
            return;
        }
        res.render('DetailClassView', {
            class_code: id,
            classes: classes[0],
            student_classes: classes[0].Student_classes
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