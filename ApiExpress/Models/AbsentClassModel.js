import Sequelize from 'sequelize'
import {sequelize,Op} from '../connectData/Database'
import AbsentStudentModel from './AbsentStudentModel'
const Absent_Class = sequelize.define('Absent_Class', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    create_date: {
        type: Sequelize.DATE
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
    teacher_id: {
        type: Sequelize.INTEGER
    },
    time_start:{
        type:Sequelize.TIME
    },
    time_end:{
        type:Sequelize.TIME
    },
    gps_latitude: {
        type: Sequelize.FLOAT
    },
    gps_longitude: {
        type: Sequelize.FLOAT
    },
    is_active:{
        type:Sequelize.INTEGER
    },
    list_ssid:{
        type:Sequelize.STRING
    }
}, {
    //
    timestamps: false,
    freezeTableName: true ,
})
Absent_Class.hasMany(AbsentStudentModel,{foreignKey:'absent_class_id',sourceKey:'id'});
AbsentStudentModel.belongsTo(Absent_Class,{foreignKey:'absent_class_id',targetKey:'id'});
export default Absent_Class
