const { verifyAccessToken } = require("../utils/utils");

const authMiddleware = async(req,res,next)=>{
    let token;
    if (req.headers.authorization) {
        try{
            token = req.headers.authorization.split(' ')[1];
            const decode = verifyAccessToken(token);
            req.user = decode.id;
            next();
        }catch(error){
            return res.status(401).json({error: "Invalid token"});
        }
    }
}

module.exports = authMiddleware;