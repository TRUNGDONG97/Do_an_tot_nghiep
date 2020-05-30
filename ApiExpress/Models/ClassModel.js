import Sequelize from 'sequelize'
import { sequelize, Op } from '../connectData/Database'
import StudentClass from './StudentClassModel'
import Subject from './SubjectModel';
import Teacher from './TeacherModel';
import Scheduleclass from './ScheduleClassModel';
import AbsentClassModel from './AbsentClassModel';
const Class = sequelize.define('Class', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    class_code: {
        type: Sequelize.STRING
    },
    teacher_id: {
        type: Sequelize.INTEGER
    },
    subject_id: {
        type: Sequelize.INTEGER
    },
    status: {
        type: Sequelize.INTEGER
    }
}, {
    //
    timestamps: false,
    freezeTableName: true,
})
Class.hasMany(StudentClass, { foreignKey: 'class_id', sourceKey: 'id' });
StudentClass.belongsTo(Class, { foreignKey: 'class_id', targetKey: 'id' });
Class.belongsTo(Subject, { foreignKey: 'subject_id', targetKey: 'id' });
Class.belongsTo(Teacher, { foreignKey: 'teacher_id', targetKey: 'id' });
Class.hasMany(Scheduleclass, { foreignKey: 'class_id', sourceKey: 'id' });
Scheduleclass.belongsTo(Class, { foreignKey: 'class_id', targetKey: 'id' });
Class.hasMany(AbsentClassModel, { foreignKey: 'class_id', sourceKey: 'id' });
AbsentClassModel.belongsTo(Class, { foreignKey: 'class_id', targetKey: 'id' });
export default Class