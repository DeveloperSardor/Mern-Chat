const jwt = require('jsonwebtoken');
const User = require('../models/userModel.js');
const asyncHandler = require('express-async-handler')


const protect = asyncHandler(async (req, res, next)=>{
    let token;
    if(
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
        ){
            try {
                token = req.headers.authorization.split(' ')[1]
                const decoded = await jwt.verify(token, process.env.JWT_SECRET);
                // console.log(await decoded);
                req.user = await User.findById(decoded.payload).select('-password');
               
            next();
        } catch (error) {
           res.status(401).send({
            message : `Not authorized, token failed`
           })
        }
    }
    if(!token){
        res.send({msg : "Not authorized, no token"}).status(401)
    }
})


module.exports = {protect};