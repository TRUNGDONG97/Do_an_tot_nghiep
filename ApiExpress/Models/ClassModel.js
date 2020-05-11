import Sequelize from 'sequelize'
import {sequelize,Op} from '../connectData/Database'
import StudentClass from './StudentClassModel'
import Subject from './SubjectModel';
import Teacher from './TeacherModel';
import Scheduleclass from './ScheduleClassModel';
const Class = sequelize.define('Class', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: Sequelize.STRING
    },
    class_code:{
        type: Sequelize.STRING
    },
    teacher_id:{
        type:Sequelize.INTEGER
    }
},{
    //
    timestamps:false,   
    freezeTableName: true ,
})
Class.hasMany(StudentClass,{foreignKey:'class_id',sourceKey:'id'});
StudentClass.belongsTo(Class,{foreignKey:'class_id',targetKey:'id'});
Class.belongsTo(Subject,{foreignKey:'subject_id',targetKey:'id'});
Class.belongsTo(Teacher,{foreignKey:'teacher_id',targetKey:'id'});
Class.hasMany(Scheduleclass,{foreignKey:'class_id',sourceKey:'id'});
Scheduleclass.belongsTo(Class,{foreignKey:'class_id',targetKey:'id'});
export default Class