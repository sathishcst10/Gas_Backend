require("dotenv").config();

const mongoose = require("mongoose");
const express = require("express")
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const CryptoJS = require("crypto-js");



var Port = process.env.PORT || 8000;
const app = express();

//app.use(expressJwt({ secret: process.env.SECRETCODE, algorithms: ['RS256']}));
//Write Routers
var authRouter = require("./routes/Auth");
var certificateRouter = require("./routes/Certificates");

//Middlewares
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());



app.use("/api", authRouter);
app.use("/api", certificateRouter);

// const encryptionValue=(value, secretCode)=>{
//     var cipherText = CryptoJS.AES.encrypt(value, secretCode).toString();
//     return cipherText;
// }


const decryptionValue = (value, secretCode)=>{
    var byteText = CryptoJS.AES.decrypt(value, secretCode);
    var decryptedValue = byteText.toString(CryptoJS.enc.Utf8);
    return decryptedValue;
};
 
app.listen(Port, (req, res)=>{
    console.log(`App started with Port: ${Port}`)
});

//DB Connection

mongoose.connect(decryptionValue(`${process.env.DATABASE_URL_ENCRY}`, `${process.env.SECRETCODE}`),
{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useCreateIndex:true
}).then(()=>{
    console.log("DB Connected");
});