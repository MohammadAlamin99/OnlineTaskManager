const jwt = require("jsonwebtoken");

module.exports = (req,res,next)=>{
    let token = req.headers['token'];
    if(!token){
        token = req.cookies['token']; //token from web
    }
    jwt.verify(token, "bcd123",function(err, decoded){
        if(err){
            return res.status(201).json({status:"unathurized"})
        }
        else{
            let email=decoded['data'];
            req.headers.email=email;
            next();
        }
    })
}