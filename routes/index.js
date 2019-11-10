var express = require('express');
var mysql = require('mysql');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


router.get('/data', function(req, res, next) {
  let dataset = {
    name: 'Ada',
    mobile: '091-9594945'
  }

  var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '1234',
    database : 'ssrudb'
  });

  connection.connect();
  connection.query('SELECT * FROM students', function (error, results, fields) {
    if (error) throw error;
    dataset['result'] = {
      'service': results
    };
  
    connection.end();
    
    res.json(dataset);
  });
  // JSON => JavaScript Object Notation
});

module.exports = router;
