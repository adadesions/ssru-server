var express = require('express');
var mysql = require('mysql');
var router = express.Router();
var strConn = {
  host     : 'localhost',
  user     : 'root',
  password : '1234',
  database : 'ssrudb'
}


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


router.get('/data', function(req, res, next) {
  let dataset = {
    name: 'Ada',
    mobile: '091-9594945'
  }

  let connection = mysql.createConnection(strConn);
  connection.connect();
  connection.query('SELECT * FROM students', function (error, results, fields) {
    if (error) throw error;
    dataset['result'] = {
      'service': results
    };
  
    connection.end();
    
    res.json(dataset);
  });
});

router.post('/data/create_user', function(req, res, next){
  let body = req.body;
  let firstname = body.firstname;
  let lastname = body.lastname;
  let student_code = body.student_code;

  let strQuery = `INSERT students(firstname, lastname, student_code) VALUES('${firstname}', '${lastname}', '${student_code}')`;

  let connection = mysql.createConnection(strConn);
  connection.connect();
  connection.query(strQuery, function (error, results, fields) {
    if (error) throw error;
  });

  connection.end();

  res.json({
    status: '200 - ok',
    body
  });
});


module.exports = router;
