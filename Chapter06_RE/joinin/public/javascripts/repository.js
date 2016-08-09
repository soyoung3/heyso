var sql = require('mssql');

var config = {
  user:'makemeha2',
  password:'dusqhd1djr!',
  server:'ms1201.gabiadb.com',
  database: 'makemeha2db'
}

var mssqlUtil = module.exports = {
  insertUser: function(user, res) {
    var connection = new sql.Connection(config, function(err){
      var request = new sql.Request(connection);
      var insertSql = "INSERT INTO Members(Email, Name) VALUES('" + user.txtEmail + "', '"+ user.txtName +"')";
      request.query(insertSql, function(err) {
        if(err) throw err;
        
        var selectSql = "SELECT * FROM Members WHERE Name = '" + user.txtName + "'";
        request.query(selectSql, function(err, recordset) {
          //console.log(recordset);
          res.render('join-result', {
            username: recordset[0].Name
          });
        }); 
      });
    });
  },
  hasNameAndEmail: function(user, res){
    var connection = new sql.Connection(config, function(err){
      var request = new sql.Request(connection);
      var query = "SELECT * FROM Members WHERE Email = '"+ user.txtEmail +"'";
      request.query(query, function(err, recordset) {
        if(err) throw err;

        if(recordset.length > 0) {
          res.render('join-fail', {
            title: 'Express'
          });
        } else {
          mssqlUtil.insertUser(user, res);
        }
      });
    });  
  }
}
