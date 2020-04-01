// var Connection = require('tedious').Connection;
// var Request = require('tedious').Request;
// var TYPES = require('tedious').TYPES
// const sql = require('mssql')
// var config = {
//     server: 'localhost',
//     port:1433,
//     authentication: {
//         type: 'default',
//         options: {
//             userName: 'sa',
//             password: 'admin'
//         }
//     },
//     options: {
//         database: 'ManagerAbsent1',
//         instanceName: 'SQLEXPRESS',
//         rowCollectionOnDone: true,
//         useColumnNames: false,
//         rustServerCertificate:true
//     }
//   }
//   var connection = new Connection(config);
//   connection.on('connect', function (err) {
//     if (err) {
//       console.log(err);
//     } else {
//       console.log('Connected');
//     }
//   });

// const dbConfig = {
//     user: 'sa',
//     password: 'admin',
//     server: 'localhost',
//     database: 'ManagerAbsent1',
//     options: {
//         instanceName: 'SQLEXPRESS'
//     }
// };
// const executeQuery = function (res, query) {
//     sql.connect(dbConfig, function (err) {
//         if (err) {
//             console.log("Error while connecting database :- " + err);
//             res.send(err);
//         }
//         else {
//             // create Request object
//             var request = new sql.Request();
//             // query to the database
//             request.query(query, function (err, res) {
//                 if (err) {
//                     console.log("Error while querying database :- " + err);
//                     res.send(err);
//                 }
//                 else {
//                     res.send(res);
//                 }
//             });
//         }
//     });
// }
// module.exports = {
//     executeQuery
// } 

const Sequelize = require('sequelize')
const sequelize = new Sequelize({
        database: 'ManagerAbsent',//database name,
        username:'postgres',//username,
        password:'admin',//pass
        dialect:'postgres',
        host:'localhost',
        operatorAliases:false,
        pool:{
            max:5,
            min:0,
            require:30000,
            idle:10000
        }
    }
)
// sequelize.authenticate()
// .then(()=>console.log("true"))
// .catch(err=>console.log(err))
const Op=sequelize.Op;
module.exports={
    sequelize,
    Op
}