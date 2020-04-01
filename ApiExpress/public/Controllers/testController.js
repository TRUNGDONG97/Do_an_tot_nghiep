const sql = require('mssql')
const dbConfig = require('../../connectServer').dbConfig
// const result = require('../../connectServer').result
const executeQuery = () => {
    sql.connect(dbConfig, function (err) {
        if (err) {
            console.log("Error while connecting database :- " + err);
            // res.send(err);
            return err
        }
        else {
            // create Request object
            var request = new sql.Request();
            // query to the database
            var query = "SELECT *FROM TEACHER";
            request.query(query, function (err, res) {
                if (err) {
                    console.log("Error while querying database :- " + err);
                    //  res.send(err);
                    return err
                }
                else {
                    //   res.send(res);
                    // console.log(res,'res')
                    return res
                    
                }
            });
        }
    });
}
// var query = "SELECT *FROM TEACHER";

const Test = (req, res, index) => {
    console.log(executeQuery(   ))
    res.status(200).json({
        result:'re'
    })
}
module.exports = {
    test: Test
}
