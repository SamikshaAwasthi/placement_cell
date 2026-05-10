const jwt = require("jsonwebtoken");
const verifyToken = (req,res,next)=>{
    try{
        const token = req.headers.authorization
        // .split(" ")[1]
        console.log(token)
        // console.log(req.headers.authorization?.split(" ")[1]);
        
        // token missing
        if(!token){
            return res.status(401).json({
                success:false,
                message:"Token missing"
            })
        }

        // verify Token
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET_KEY
        )    
        req.user = decoded
        next()
    }
    catch(error){
        return res.status(401).json({
            success:false,
            message:"invalid Token"
        })
    }
}

module.exports = verifyToken