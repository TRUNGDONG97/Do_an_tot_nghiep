import Sequelize from 'sequelize'
import { sequelize, Op } from '../connectData/Database'
const StudentClass = sequelize.define('Student_class', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    student_id: {
        type: Sequelize.INTEGER
    },
    class_id: {
        type: Sequelize.INTEGER
    },
    mid_semester: {
        type: Sequelize.FLOAT
    },
    end_semester: {
        type: Sequelize.FLOAT
    }

}, {
    //
    timestamps: false,
    freezeTableName: true,
})
export default StudentClass