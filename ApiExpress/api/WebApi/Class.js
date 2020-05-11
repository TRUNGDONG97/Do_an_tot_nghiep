import TeacherModel from '../../models/TeacherModel'
import ClassModel from '../../models/ClassModel'
import RoomModel from '../../models/RoomModel'
import ScheduleClassModel from '../../models/ScheduleClassModel'
import SubjectModel from '../../models/SubjectModel'
import TeacherSubjectModel from '../../models/TeacherSubjectModel'
import StudentModel from '../../models/StudentModel'
import StudentClassModel from '../../models/StudentClassModel'
import Constants from '../../constants/Constants'
import pug from 'pug'
import { getArrayPages, PageCount } from '../../constants/Funtions'


module.exports.getClass = async (req, res, next) => {
    const { currentPage } = req.body
    try {
        const { count, rows } = await ClassModel.findAndCountAll({
            include: [
                {
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
                    model: ScheduleClassModel,
                    include: [{
                        model: RoomModel
                    }]
                },
            ],
            offset: Constants.PER_PAGE * (currentPage - 1),
            limit: Constants.PER_PAGE,
            order: [['Schedule_classes','day_of_week', 'ASC']]
        })
        // console.log(classes[0].Student_classes[0].Student)
        // console.log(rows[0].Subject)
        const pageCount = PageCount(count)
        // console.log(students.length)
        var urlTable = `${process.cwd()}/table/TableClass.pug`;
        var htmlTable = await pug.renderFile(urlTable,
            {
                classes:rows,
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
