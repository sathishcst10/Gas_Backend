var mongoose = require("mongoose");
const crypto = require("crypto");
const {v4:uuidv4 } = require('uuid');

var userSchema = new mongoose.Schema({
    fullname :{
        type:String,
        trim : true,
        maxlength : 32,
        required : true,
    },
    email:{
        type : String,
        trim : true,
        maxlength : 32,
        required : true,
        unique : true        
    },
    userinfo : {
        type : String,
        trim : true
    },
    encry_Password : {
        type : String,
        required : false
    },
    salt : String,
    role : {
        type : Number,
        default : 0
    }
}, {timestamps : true});

userSchema
    .virtual("password")
    .set(function(password){
        this._password = password;
        this.salt = uuidv4();
        this.encry_Password = this.securePassword(password);
    })
    .get(function(){
        return this._password;
});

userSchema.methods={
    authenticate : function(plainPassword){
        return this.securePassword(plainPassword) === this.encry_Password;        
    },
    securePassword: function(plainPassword){
        if(!plainPassword) return '';

        try {

            return crypto
            .createHmac("sha256", this.salt)
            .update(plainPassword)
            .digest("hex");

        } catch (error) {
            return '';
        }
    }   
}

module.exports = mongoose.model("User", userSchema);