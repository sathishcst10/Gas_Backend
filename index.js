require("dotenv").config();

import { connect } from "mongoose";
import express from "express";
import { json } from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import expressJwt from "express-jwt";

var Port = process.env.PORT || 8000;
const app = express();

//app.use(expressJwt({ secret: process.env.SECRETCODE, algorithms: ['RS256']}));
//Write Routers
import authRouter from "./routes/Auth";
import certificateRouter from "./routes/Certificates";

//Middlewares
app.use(json());
app.use(cookieParser());
app.use(cors());



app.use("/api", authRouter);
app.use("/api", certificateRouter);


app.listen(Port, (req, res)=>{
    // res.send("Welcome");
    console.log(`App started with Port: ${Port}`)
});

//DB Connection

connect(process.env.DATABASE_URL,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useCreateIndex:true
}).then(()=>{
    console.log("DB Connected");
})

