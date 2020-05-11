
import Sequelize from 'sequelize'
import {sequelize,Op} from '../connectData/Database'
import Scheduleclass from './ScheduleClassModel';
const Room = sequelize.define('Room', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: Sequelize.STRING
    },
    
},{
    //
    timestamps:false,   
    freezeTableName: true ,
})
Room.hasMany(Scheduleclass,{foreignKey:'room_id',sourceKey:'id'});
Scheduleclass.belongsTo(Room,{foreignKey:'room_id',targetKey:'id'})
export default Room