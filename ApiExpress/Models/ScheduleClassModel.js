import Sequelize from 'sequelize'
import { sequelize, Op } from '../connectData/Database'
const Scheduleclass = sequelize.define('Schedule_class', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    class_id: {
        type: Sequelize.INTEGER
    },
    schedule: {
        type: Sequelize.STRING
    }
}, {
    //
    timestamps: false,
    freezeTableName: true,
})

export default Scheduleclass