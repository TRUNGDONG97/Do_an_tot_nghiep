import Sequelize from 'sequelize'
import { sequelize, Op } from '../connectData/Database'
const Subject = sequelize.define('Subject', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: Sequelize.STRING
    }

}, {
    //
    timestamps: false,
    freezeTableName: true,
})
export default Subject