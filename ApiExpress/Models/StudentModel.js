
import Sequelize from 'sequelize'
import {sequelize,Op} from '../connectData/Database'
import StudentClass from './StudentClassModel';

const Student= sequelize.define('Students', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: Sequelize.STRING
    },
    phone: {
        type: Sequelize.STRING,
        unique: 'compositeIndex'
    },
    password: {
        type: Sequelize.STRING
    },
    birthday: {
        type: Sequelize.DATE
    },
    address: {
        type: Sequelize.STRING
    },
    email: {
        type: Sequelize.STRING,
        unique: 'compositeIndex'
    },
    device_id: {
        type: Sequelize.STRING
    },
    token: {
        type: Sequelize.STRING
    },
    url_avatar: {
        type: Sequelize.STRING
    },
    sex: {
        type: Sequelize.INTEGER
    },
    mssv: {
        type: Sequelize.STRING
    }
   
},{
    //
    timestamps:false,   
    freezeTableName: true ,
})
Student.hasMany(StudentClass,{foreignKey:'student_id',sourceKey:'id'});
StudentClass.belongsTo(Student,{foreignKey:'student_id',targetKey:'id'})
export default Student