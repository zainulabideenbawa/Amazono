
const router = require('express').Router();
const jwt = require('jsonwebtoken'); //install first
const config = require('../config');
const checkJWT = require('../middlewares/check-jwt');
const user = require('../modals/user');

router.post('/signup', (req, res, next) => {
    let user = new user;
    user.name = req.body.name;
    user.email = req.body.email;
    user.password = req.body.password;
    user.picture = user.gravatar();
    user.isSellar = req.body.isSellar;

user.findOne({email:req.body.email}, (err,existuser)=>{
    if(existuser){
        res.json({
        success: false,
        message:'user with that email already exists'

    });
}
    else{
        user.save();
        var token = jwt.sign({
            user: user
        },
    config.secret,{
        expiresIn: '7d'
    });
    res.json({
        success: true,
        message:'Enjoy your token',
        token: token
    })
    }
})

});

router.post('/login', (req, res, next) =>{
    user.findOne({email: req.body.email}, (err, existuser)=>{
        if(err) throw err;
        if(!user) {
            res.json({
                success:false,
                message: 'Authentication failed user not found'
        });

        }
        else if(user){
            var validPassword = user.comparePassword(req.body.password);
            if(!validPassword){
                res.json({
                    success: false,
                    message: 'Authentication failed wrong password'
                })
            }
            else{
                user.save();
                var token = jwt.sign({
                    user: user
                },
            config.secret,{
                expiresIn: '7d'
            });
            res.json({
                success: true,
                message:'Enjoy your token',
                token: token
            })
            }
        }
    });
});

router.route('/profile')
.get(checkJWT, (req,res, next) =>{
    user.findOne({_id:req.decoded.user.id},(err,user)=>{
        res.json({
            success: true,
            user: user,
            message: 'Successful'
        });
    });
})
.post(checkJWT, (req, res,next)=>{
    user.findOne({_id: req.decoded.user.id}, (err, user)=>{
        if(err) return next(err);
        if(req.body.name) user.name = req.body.name;
        if(req.body.email) user.email = req.body.email;
        if(req.body.password) user.password = req.body.password;

        user.isSellar = req.body.isSellar;

        user.save();
        res.json({
            success: true,
            message: 'successfully edited your profile'
        });
    });
})

router.route('/address')
.get(checkJWT, (req,res, next) =>{
    user.findOne({_id: req.decoded.user.id}, (err, user) =>{
        res.json({
        success: true,
        address: user.address,
        message: 'Successful'
        });
    });
})
.post(checkJWT, (req,res, next) =>{
    user.findOne({_id: re.decoded.user.id}, (err, user)=>{
        if(err) return next(err);

        if(req.body.addr1) user.address.addr1 = req.body.addr1;
        if(req.body.addr2) user.address.addr2 = req.body.addr2;
        if(req.body.city) user.address.city = req.body.city;
        if(req.body.state) user.address.state = req.body.state;
        if(req.body.country) user.address.country = req.body.country;
        if(req.body.ostalCode) user.address.postalCode = req.body.postalCode;

        user.save();
        res.json({
            success: true,
            message: 'successfully edited your profile'
        });
    });
});

module.exports = router;