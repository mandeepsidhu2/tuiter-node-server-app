// const express = require('express')
import HelloController from "./controllers/hello-controller.js"
import UserController from "./users/users-controller.js";
import TuitsController from "./controllers/tuits/tuits-controller.js";
import express from 'express';
import cors from 'cors'
import session from "express-session";
import AuthController from "./users/auth-controller.js";


const app = express()
app.use( cors({
    credentials: true,
    origin: "https://cheery-speculoos-b3e88c.netlify.app",
  
  })
 )
app.use(express.json());
app.use( session({
    secret: "any string",
    resave: false,
    saveUninitialized: true,
  })
 )
TuitsController(app);
HelloController(app)
AuthController(app)
UserController(app)

app.listen(process.env.PORT||4000)



