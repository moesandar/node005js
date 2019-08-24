var express = require('express');
var router = express.Router();
var User=require('../model/user');
var isemail=require('isemail');
var passwordValidator=require('password-validator');
var schema=new passwordValidator();
/* GET users listing. */
schema
.is().min(8)
.is().max(100)
.has().uppercase()
.has().lowercase()
.has().digits()
.has().not().spaces()
.is().not().oneOf(['passw0rd','Password123']);
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/useradd',function(req,res){
  res.render('users/user-add');
})
router.post('/useradd',function(req,res){
  var user=new User();
  user.name=req.body.name;
  user.email=req.body.email;
  user.password=req.body.password;
  user.save(function(err,rtn){
    if(err) throw err;
    console.log(rtn);
    res.redirect('/users/userlist');
  });
});

router.post('/duemail',function(req,res){
  console.log(req.body.email);
  User.findOne({email:req.body.email},function(err,rtn){
    if(err) throw err;
    if(req.body.email != ''){
    if(rtn!=null || !isemail.validate(req.body.email)){
      res.json({status:true})
    }
    else{
      res.json({status:false})
    }
  }
  })
})
router.post('/checkp',function(req,res){
  var sta=schema.validate(req.body.password);
  res.json({status:sta});
})

router.get('/userdetail/:id',function(req,res){
  console.log(req.params.id);
    User.findById(req.params.id,function(err,rtn){
      if(err) throw err;
      res.render('users/user-detail',{user:rtn});
  });
});

router.get('/userlist',function(req,res){
  User.find(function(err,rtn){
    if(err) throw err;
  res.render('users/user-list',{users:rtn});
    })
  })

  router.get('/userupdate/:id',function(req,res){
    User.findById(req.params.id,function(err,rtn){
        if(err) throw err;
        res.render('users/user-update',{user:rtn});

    });

  });
  router.post('/userupdate',function(req,res){
    var update={
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    }
    User.findByIdAndUpdate(req.body.id,{$set: update},function(err,rtn){
      if(err) throw err;
      res.redirect('/users/userdetail/'+req.body.id);
    })
  })
  router.get('/userdelete/:id',function(req,res){
    User.findByIdAndRemove(req.params.id,function(err,rtn){
      if(err) throw err;
      res.redirect('/users/userlist');
    });
  });



module.exports = router;
