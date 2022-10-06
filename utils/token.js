const jwt = require("jsonwebtoken");


module.exports = {

    createToken (data) {
        const key = process.env.ACCESS_TOKEN_SECRET
        const expireTime = "30m";
        const token = jwt.sign(data, key, { expiresIn: expireTime });
        return token;
    },
    
    decodeToken (token) {
        const key = process.env.ACCESS_TOKEN_SECRET
        const decodedToken = jwt.verify(token, key);
        return decodedToken;
    },
    
}
