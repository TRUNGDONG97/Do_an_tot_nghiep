import Sequelize from 'sequelize'
import { sequelize, Op } from '../connectData/Database'
const Subject = sequelize.define('Subject', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    subject_name: {
        type: Sequelize.STRING,
    },
    subject_code: {
        type: Sequelize.STRING
    },
    credit_hour: {
        type: Sequelize.STRING
    },
    coefficient: {
        type: Sequelize.STRING
    },
    time: {
        type: Sequelize.STRING
    }

}, {
    //
    timestamps: false,
    freezeTableName: true,
})
export default Subject