import Sequelize from 'sequelize'
import {sequelize,Op} from '../connectData/Database'
const Absent_Student = sequelize.define('Absent_Student', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    date_absent: {
        type: Sequelize.DATE
    },
    status: {
        type: Sequelize.INTEGER
    },
    class_id: {
        type: Sequelize.INTEGER
    },
    student_id: {
        type: Sequelize.INTEGER
    },
    teacher_id: {
        type: Sequelize.INTEGER
    },
    absent_class_id: {
        type: Sequelize.INTEGER
    },
    time_absent:{
        type:Sequelize.TIME
    },
    gps_latitude: {
        type: Sequelize.FLOAT
    },
    gps_longitude: {
        type: Sequelize.FLOAT
    }

}, {
    //
    timestamps: false,
    freezeTableName: true ,
})
export default Absent_Student