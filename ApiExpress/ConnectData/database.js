import Sequelize from 'sequelize';
const sequelize = new Sequelize({
        database: 'ManagerAbsent', //database name,
        username: 'postgres', //username,
        password: 'admin', //pass
        dialect: 'postgres',
        host: 'localhost',
        operatorAliases: false,
        pool: {
            max: 5,
            min: 0,
            require: 30000,
            idle: 10000
        }
    })
    // sequelize.authenticate()
    // .then(()=>console.log("true"))
    // .catch(err=>console.log(err))
const Op = sequelize.Op;
export {
    sequelize,
    Op
}