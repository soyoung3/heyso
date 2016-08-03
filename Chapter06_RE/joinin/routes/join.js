var express = require('express');
var router = express.Router();
var repo = require('../public/javascripts/repository');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('join-form', { title: 'Express' });
});

router.post('/', function(req, res){
  repo.insertUser(req.body, res);

  // res.render('join-result', {
  //   username: req.body.txtName,
  //   useremail:req.body.txtEmail,
  //   title:'Express' 
  // });
});

module.exports = router;