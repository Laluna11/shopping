const { decodeToken } = require("../utils/token.js");

module.exports = {
    async auth(req, res, next, roles) {
        try {
            const auth = req.header('authorization');
            if(! auth) return res.status(401).json({
                message : "Forbidden"
            });
            
            const token = auth.split(" ")[1];
        
            // token doesn't exist
            if(!token) return res.status(401).json({
                message : "No Token Found"
            })

            // Ask for refresh token
            if(token.exp < new Date()) return res.status(401).json({
                message : "Need the refresh token"
            })
            
            const data = decodeToken(token);
            const role = data.role
        
            if(!roles.includes(role)) return res.status(403).json({
                message : "This logger is not authorized to do this action"
            });
        
            next();
        
        } catch (error) {
            return res.status(401).json({
                message : error
            })
        }
    }
}