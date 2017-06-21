var express = require( 'express' );
var router = express.Router();
var path = require( 'path' );
var bodyParser = require('body-parser');
var user = require('../user');
var bcrypt = require('bcrypt');

router.use( bodyParser.urlencoded( { extended: true } ) );
router.use( bodyParser.json() );

router.get( '/', function( req, res ){
  console.log( 'base url hit' );
  res.sendFile( path.resolve( 'public/views/index.html' ) );
});

router.post('/', function(req, res){
  console.log('base url post hit', req.body);
  user.findOne({ username: req.body.username }, function(err, user){
    if(err){
      console.log('find user error', err);
      res.sendStatus(400);
    } else{
      if (user != undefined ){
        bcrypt.compare(req.body.password, user.password, function(err, isMatch){
          if(err){
            console.log('compare err', err);
            res.sendStatus(400);
          } else{
            console.log('found u');
            if (isMatch){
              res.send('yeeeee')
            } else{
              res.send('bummer boi')
            }
          }//end else in compare
        });//end compare
      }//end if
    }//end else
  })//end looking for user
});//end post

module.exports = router;
