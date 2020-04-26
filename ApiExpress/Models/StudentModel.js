
import Sequelize from 'sequelize'
import {sequelize,Op} from '../ConnectData/database'
// import Absent from './AbsentModel'
const Students = sequelize.define('Students', {
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
    },
    mark1: {
        type: Sequelize.INTEGER
    },
    mark2: {
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

export default Students