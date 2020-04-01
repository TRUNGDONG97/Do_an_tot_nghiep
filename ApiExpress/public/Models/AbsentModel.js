const Sequelize = require('sequelize');
const sequelize = require('../Database/database').sequelize;
const Op = require('../Database/database').Op;
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
module.exports = Absent