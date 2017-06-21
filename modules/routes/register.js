var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var user = require('../user');
var bcrypt = require('bcrypt');

router.use(bodyParser.urlencoded({extended: true}));
router.use(bodyParser.json());

router.post('/', function(req, res){
  console.log('in regeister post:', req.body);

  bcrypt.genSalt(12, function(err, salt){
    if(err){
      console.log('err', err);
      res.sendStatus( 400 );
    }
    else{
      console.log('salt', salt);
      bcrypt.hash(req.body.password, salt, function(err, hash){
        if(err){
          console.log('hass err', err);
          res.sendStatus( 400 );
        }else{
          console.log('hash', hash);
          var newUser = {
            userName: req.body.username,
            password: hash
          }
          console.log('saving user:', newUser);
          user(newUser).save();
          res.sendStatus(201);
        }
      });
    }
  });//end bcrypt
});//end post

  module.exports = router;
