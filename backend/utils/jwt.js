const {sign, verify} = require('jsonwebtoken');


const  generateToken=(payload)=>{
    return sign({payload}, process.env.JWT_SECRET, {
        expiresIn : "1d"
    })
}


module.exports = {generateToken};