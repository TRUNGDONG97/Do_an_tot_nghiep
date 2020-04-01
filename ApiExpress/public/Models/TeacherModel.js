const Sequelize = require('sequelize');
const sequelize = require('../Database/database').sequelize;
const Op = require('../Database/database').Op;
const Absent=require('./AbsentModel')
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
        type: Sequelize.STRING
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
        type: Sequelize.STRING
    },
    created_date: {
        type: Sequelize.DATE
    },
    is_active: {
        type: Sequelize.INTEGER
    },
    subject_id: {
        type: Sequelize.INTEGER
    },
    note: {
        type: Sequelize.STRING
    },
    deviceid: {
        type: Sequelize.STRING
    },
    tocken: {
        type: Sequelize.STRING
    },
    url_avatar: {
        type: Sequelize.STRING
    },
    sex: {
        type: Sequelize.INTEGER
    }
},{
    //
    timestamps:false,   
    freezeTableName: true ,
})
Teacher.hasMany(Absent,{foreignKey:'teacher_id',sourceKey:'id'})
Absent.belongsTo(Teacher,{foreignKey:'teacher_id',targetKey:'id'})
module.exports=Teacher