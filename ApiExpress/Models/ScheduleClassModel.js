
import Sequelize from 'sequelize'
import {sequelize,Op} from '../connectData/Database'
const Scheduleclass = sequelize.define('Schedule_class', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    class_id: {
        type: Sequelize.INTEGER
    },
    room_id: {
        type: Sequelize.INTEGER
    },
    day_of_week: {
        type: Sequelize.INTEGER
    },
    time_start: {
        type: Sequelize.INTEGER
    },
    time_end: {
        type: Sequelize.INTEGER
    }
},{
    //
    timestamps:false,   
    freezeTableName: true ,
})

export default Scheduleclass