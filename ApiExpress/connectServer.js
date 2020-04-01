const sql = require('mssql')

const dbConfig = {
    user: 'sa',
    password: 'admin',
    server: 'localhost',
    database: 'ManagerAbsent1',
    options: {
        instanceName: 'SQLEXPRESS'
    }
};

// const executeQuery = (query) => {
//     sql.connect(dbConfig, function (err) {
//         if (err) {
//             console.log("Error while connecting database :- " + err);
//             // res.send(err);
//             return err
//         }
//         else {
//             // create Request object
//             var request = new sql.Request();
//             // query to the database
//             request.query(query, function (err, res) {
//                 if (err) {
//                     console.log("Error while querying database :- " + err);
//                     //  res.send(err);
//                     return err
//                 }
//                 else {
//                     //   res.send(res);
//                     // console.log(res,'res')
//                     return res
                    
//                 }
//             });
//         }
//     });
// }
module.exports = {
    dbConfig
} 