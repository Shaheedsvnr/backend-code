const { response } = require('express');
var jwt = require('jsonwebtoken');
const JWT_SECRET = "hello";

const fetchteacher = ( req, res, next)=>{
    const token = req.header('auth-token');
    if(!token){
        res.status(401).send({error : "You missed to mention token, Please authenticate using a valid token!"})
    }
    try{
        const data = jwt.verify(token, JWT_SECRET);
        console.log(data);
        req.teacher=data.teacher;
        next();
    }
    catch{
        res.status(401).send({error : "Please authenticate using a valid token!" });
    }
}
module.exports =fetchteacher;