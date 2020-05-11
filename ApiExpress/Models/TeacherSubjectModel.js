import Sequelize from 'sequelize'
import { sequelize, Op } from '../connectData/Database'
const TeacherSubject = sequelize.define('Teacher_subject', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    teacher_id: {
        type: Sequelize.INTEGER
    },
    subject_id: {
        type: Sequelize.INTEGER
    }

}, {
    //
    timestamps: false,
    freezeTableName: true,
})
export default TeacherSubject