require("dotenv").config();

const mongoose = require("mongoose");
const express = require("express")
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
var expressJwt = require("express-jwt");

var Port = process.env.PORT || 8000;
const app = express();

app.use("/api", expressJwt({ secret: process.env.SECRETCODE, algorithms: ['RS256']}));
//Write Routers
var authRouter = require("./routes/Auth");
var certificateRouter = require("./routes/Certificates");

//Middlewares
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());



app.use("/api", authRouter);
app.use("/api", certificateRouter);


app.listen(Port, (req, res)=>{
    // res.send("Welcome");
    console.log(`App started with Port: ${Port}`)
});

//DB Connection

mongoose.connect(process.env.DATABASE_URL,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useCreateIndex:true
}).then(()=>{
    console.log("DB Connected");
})

