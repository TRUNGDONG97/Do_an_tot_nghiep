import Sequelize from 'sequelize'
import {sequelize,Op} from '../ConnectData/database'
const Absent = sequelize.define('absent', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    create_date: {
        type: Sequelize.DATE,
    },
    status: {
        type: Sequelize.INTEGER,
    },
    teacher_id: {
        type: Sequelize.INTEGER,
    },
    user_update_id: {
        type: Sequelize.INTEGER,
    },
    schedule_class_id: {
        type: Sequelize.INTEGER,
    },

}, {
    //
    timestamps: false,
    freezeTableName: true ,
})
export default Absent