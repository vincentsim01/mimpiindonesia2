const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('../config');
const User = require('../model/userSchema');
const router = express.Router();

router.use(bodyParser.urlencoded({extended:true}));
router.use(bodyParser.json());

router.get('/users',(req,res) => {
    User.find({}).then(function (users) {
        res.send(users);
        });
})


router.post('/register',(req,res) => {
    let hashpassword = bcrypt.hashSync(req.body.password,8);
    User.create({
        name:req.body.name,
        email:req.body.email,
        password:hashpassword,
        phone:req.body.phone
    })
    .then(function (users) {
        res.send(users);
        });
})


router.post('/login',(req,res) => {
    User.findOne({email:req.body.email})

    .then((user)=>{
        if(!user)
        { 
            return res.status(201).send({auth:false,token:'No User Found Register First'})
        }
        else{
            const passIsvalid = bcrypt.compareSync(req.body.password,user.password);
            if(!passIsvalid) return res.status(201).send({auth:false,token:'Invalid Password'});
            let token = jwt.sign({id:user._id},config.secret,{expiresIn:86400})
            return res.status(200).send({auth:true,token, user});

        }

    })
    .catch((err)=>{
        return res.status(500).send({auth:false,token:'There is problem while login'});
    });

})




router.get('/userInfo',(req,res) => {
    let token = req.headers['x-access-token'];
        if(!token) {
            return res.status(201).send({auth:false,token:'No Token Provided'});
        }
        else{
            jwt.verify(token,config.secret,(err, data) => {
                if (err) {
                  console.log(err);
                  return res.status(201).send({auth:false,token:'Invalid Token'});
                }else{
                    User.findById(data.id)
                        .then((user) => {res.send(user)});
                }
        }
            )
    }
        

})


module.exports = router;