
import Sequelize from 'sequelize'
import {sequelize,Op} from '../connectData/Database'
const Teacher = sequelize.define('Teacher', {
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
    status: {
        type: Sequelize.INTEGER
    },
    salary: {
        type: Sequelize.INTEGER
    },
    is_active:{
        type:Sequelize.INTEGER
    }
},{
    //
    timestamps:false,   
    freezeTableName: true ,
})
// Teacher.hasMany(Absent,{foreignKey:'teacher_id',sourceKey:'id'})
// Absent.belongsTo(Teacher,{foreignKey:'teacher_id',targetKey:'id'})
export default Teacher