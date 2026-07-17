import jwt from "jsonwebtoken";
import User from "../models/User.js"
const JWT_TOKEN="MY_SUPER_SECRET_KEY";
// Middle ware function using for function
export const protect=async(req,res,next)=>
{
    try{
        let token;
        const authHeader=req.headers.authorization;

        if(authHeader&&authHeader.startsWith("Bearer "))
        {
            token=authHeader.split(" ")[1];
        }
        if(!token)
        {
            return res.status(401).json({message:"no token provided"})
        }
        const decoded=jwt.verify(token,JWT_TOKEN);
        const user=await User.findById(decoded.id).select("-password");
        if(!user)
        {
            return res.status(401).json({message:"user not found"});
        }
        req.user=user;
        next();
    }

    catch(err)
    {
        console.log("Auth Error:",err.message);
        return res.status(403).json({message:"Token Invalid or expired",err:err.message});
    }

}