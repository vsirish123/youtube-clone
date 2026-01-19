import jwt from "jsonwebtoken";

const JWT_TOKEN="MY_SUPER_SECRET_KEY";

export const protect=(req,res,next)=>
{
    try{
        const authHeader=req.headers.authorization;

        if(!authHeader)
        {
            return res.status(401).json({message:"No Authorization Header"})
        }

        if(!authHeader.startswith("Bearer "))
        {
            return res.status(401).json({message:"Invalid token format"})
        }

        const token=authHeader.split(" ")[1];

        const decoded=jwt.verify(token,JWT_TOKEN);

        req.user=decoded;

    }

    catch(err)
    {
        return res.status(403).json({message:"Token Invalid or expired",err:err.message});
    }

}