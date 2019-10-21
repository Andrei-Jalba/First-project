var express = require('express');
var mongoose = require('mongoose');
var _ = require('lodash');
var app = express();
var bodyParser = require('body-parser')
var cors = require('cors');
var jwt = require('jsonwebtoken');
var md5 = require('md5');

const UNSAFE_configs = {
  secret: 'Hello_World_!!!' 
};

app.use(cors());

// pt Content-type application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
  extended: true
}));

// pt Content-type application/json
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/my-website', { useNewUrlParser: true })

var Schema = mongoose.Schema;
var UserModel = mongoose.model('users', new Schema({ 
   name: String,
   surname: String,
   username: String,
   password: String,
   email: String
}));

var ForumModel = mongoose.model('forum', new Schema({
  topic: String,
  description: String,
  username: String,
}));

var modelAdaptor = (rawUserData) => ({
  name: rawUserData.nameId,
  surname: rawUserData.surnameId,
  username: rawUserData.usernameId,  
  password: md5(rawUserData.passwordId),
  email: rawUserData.emailId, 
});

const verifyToken = (req, res, next) => {
  let token = req.headers['authorization'];
  if (token.startsWith('Bearer ')) {
    token = token.slice(7, token.length);
  }
  if (token) {
    jwt.verify(token, UNSAFE_configs.secret, (err, decoded) => {
      if (err) {
        res.status(403).send({ success: false, message: 'Token is not valid!' });
        next(false);
      } else {
        next(decoded); 
      }
    });
  } else {
    res.status(400).send({ success: false, message: 'Token not provided!' });  
    next(false);
  }
}
  
app.get('/forum', function (req, res) {
  ForumModel.find({}, function (err, forumData) {
    if (_.isEmpty(err)) {
      res.status(200).send({ forumData });          
    } else {
      res.send(500, err);
    }
  });
});

app.post('/forum', function (req, res) {
  verifyToken(req, res, (tokenData) => {
    if (tokenData !== false) {
        console.log(tokenData);
      
      ForumModel.create({
          description: req.body.description,
          topic: req.body.topic,
          username: tokenData.username,
        }, 
        function (err, forumData) {
          if (_.isEmpty(err)) {
            res.status(200).send({ forumData, message: 'Forum entry added' });
          } else {
            res.send(500, 'Internal mongoDB error!!');
          }
        }
      );
    }
  });

});

app.post('/register', function (req, res) {
  if (_.isEmpty(req.body)) {
    res.send(400, 'Bad register request, body data empty !!!');
    return;
  }
  UserModel.findOne({
    email: req.body && req.body.emailId,
    username: req.body && req.body.usernameId
  }, (err, userData) => {
    if (_.isEmpty(userData)) {
      UserModel.create(modelAdaptor(req.body), 
        function (err, data) {
          if (!_.isEmpty(data)) {
            var token = jwt.sign({ id: req.body.emailId, username: req.body.usernameId }, UNSAFE_configs.secret, {
              expiresIn: 86400 // expires in 24 hours
            });        
            res.status(200).send({ auth: true, token, message: 'User successfully registered' });          
          } else {
            res.send(500, 'Internal mongoDB error!!');
          }
        }
      );    
    } else {
      res.send(400, 'User already registered');
    }
  })
});

app.post('/login', function (req, res) {
  UserModel.findOne({
    email: req.body && req.body.emailId,
  }, (err, userData) => {
    if (_.isEmpty(userData)) {
      res.send(401, 'Invalid email!');    
    } else {
      const hashedPass = md5(req.body.passwordId);
      if (userData.password !== hashedPass) {
        res.send(401, 'Invalid password!');
      } else {
        var token = jwt.sign({ id: req.body.emailId, email: req.body.emailId, username: userData.username }, UNSAFE_configs.secret, {
          expiresIn: 86400 // expires in 24 hours
        });
        res.status(200).send({ auth: true, token, userData, message: 'User successfully authenticated' });
      }
    }
  })  
});

var server = app.listen(8081, function () {
   var host = server.address().address
   var port = server.address().port

   console.log("Example app listening at http://%s:%s", host, port)
})
