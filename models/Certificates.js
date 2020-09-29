var mongoose = require("mongoose");

var certificateSchema = new mongoose.Schema({
    companyName : {
        type : String,
        trim : true,
        required: true
    },
    address : {
        type : String,
        trim : true,
        required : true 
    },
    scope : {
        type :String,
        trim : true,
        required : true
    },
    standard : {
        type: String,
        trim : true,
        required : true
    },
    certificateNo : {
        type : String,
        trim : true,
        required : true
    },
    initialDate : {
        type : Date,
        required : true
    },
    expiryDate : {
        type : Date,
        required : true
    }
}, {timestamps : true});

module.exports = mongoose.model("Certificates", certificateSchema);