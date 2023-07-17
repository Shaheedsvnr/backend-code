const express = require('express');
const route = express.Router();

route.get('/test', (req,res)=>{
    res.send("This is test from route folder...");
})

route.get('/test2', (req,res)=>{
    res.send("This is test2 from route folder...");
})

module.exports = route;