
import Sequelize from 'sequelize'
import {sequelize,Op} from '../ConnectData/database'
// import Absent from './AbsentModel'
const Class = sequelize.define('Class', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
   
},{
    //
    timestamps:false,   
    freezeTableName: true ,
})

export default Class