var sql = require('mssql');

var config = {
  user:'makemeha2',
  password:'jsyvsjsy!',
  server:'makemeha2db.cee8vybsbams.ap-northeast-2.rds.amazonaws.com',
  database: 'makemeha2db'
}

var mssqlUtil = module.exports = {
  insertUser: function(user, res) {
    var connection = new sql.Connection(config, function(err){
      var request = new sql.Request(connection);
      request.query('select 1 as number', function(err, recordset) {
        res.send('respond with a resource|' + recordset[0].number);
        console.dir(recordset);

      });
      

    });
    // sql.connection(config, function(err){
    //   var request = new sql.Request();
    //   request.query('select 1 as number, ', function(err, recordset){
    //     console.dir(recordset);
    //   });
    // });
  }
}
