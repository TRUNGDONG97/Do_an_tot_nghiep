import Sequelize from 'sequelize'
import {sequelize,Op} from '../connectData/Database'
const Notification = sequelize.define('Notification', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    created_date: {
        type: Sequelize.DATE
    },
    type: {
        type: Sequelize.INTEGER
    },
    teacher_id: {
        type: Sequelize.INTEGER
    },
    student_id: {
        type: Sequelize.INTEGER
    },
    class_id: {
        type: Sequelize.INTEGER
    },
    user_id:{
        type:Sequelize.INTEGER
    },
    content: {
        type: Sequelize.STRING
    }

}, {
    //
    timestamps: false,
    freezeTableName: true ,
})
export default Notification