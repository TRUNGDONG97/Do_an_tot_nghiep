import Sequelize from 'sequelize'
import { sequelize, Op } from '../ConnectData/database'
const User = sequelize.define('User', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        user_name: {
            type: Sequelize.STRING
        },
        password: {
            type: Sequelize.STRING
        },
        email: {
            type: Sequelize.STRING,
            unique: 'compositeIndex'
        },
        created_date: {
            type: Sequelize.DATE
        },
        is_active: {
            type: Sequelize.INTEGER
        },
        name: {
            type: Sequelize.STRING
        },
        token: {
            type: Sequelize.STRING
        },

    }, {
        //
        timestamps: false,
        freezeTableName: true,
    })
    // Teacher.hasMany(Absent,{foreignKey:'teacher_id',sourceKey:'id'})
    // Absent.belongsTo(Teacher,{foreignKey:'teacher_id',targetKey:'id'})
export default User