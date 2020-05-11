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
    }

}, {
    //
    timestamps: false,
    freezeTableName: true,
})
export default StudentClass