const User = require("../models/User");
const {check, validationResult} = require("express-validator");
var jwt = require("jsonwebtoken");
var expressJwt = require("express-jwt");
const express = require("express");

const app=express();

app.use("/api", expressJwt({ secret: "Hello", algorithms: ['RS256']}));

exports.signUp = (req, res)=>{
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(422).json({
            error : errors.array()[0].msg
        });
    }

    const user = new User(req.body);
    user.save((err,user)=>{
        if(err){
            return res.status(400).json({
                error : "Not able to save User in DB"
            });

        }
        res.json({
            name: user.fullname,
            email : user.email,
            id : user._id
        });
    });
}



exports.signIn =(req,res)=>{
    const errors = validationResult(req);
    const {email, password} = req.body;
    if(!errors.isEmpty()){
        return res.status(422).json({
            error : errors.array()[0].msg
        });
    }

    User.findOne({email},(err, user)=>{
        if(err || !user){
            return res.status(400).json({
                error:"User does not exists"
            });
        }

        if(!user.authenticate(password)){
            return res.status(400).json({
                error : "Email and Password does not matched."
            });

        }

        const token = jwt.sign({_id:user._id}, process.env.SECRETCODE);

        res.cookie("token", token, {expire:new Date()+9999});

        const {_id, fullname, email,role} = user;
       
        return res.json({
            token, 
            user:{
                _id, fullname, email, role 
            }
        });
    });

};

exports.signOut =(req, res)=>{
    res.clearCookie("token");
    res.json({
        message : "Signed out successfully."
    });
};

  exports.isSigned = expressJwt({
    secret : "Hello",
    algorithms: ['RS256'],
    userProperty: "auth"
});

exports.isAuthenticate=(req, res, next)=>{ 
    
    let checker = req.profile && req.auth && req.profile._id == req.auth._id;

    if(!checker){
        return res.status(403).json({
            error : `Access Denied`
        });
    }
    next();
}

exports.isAdmin = (req,res,next)=>{
    if(req.profile.role != 0){
        return res.status(403).json({
            error : `Your'e Not Admin, Access Denied ${req.profile.role}`
        });
    }
    next();
}