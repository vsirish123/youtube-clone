import User from "../models/User.js";
import jwt from "jsonwebtoken";

const JWT_TOKEN="MY_SUPER_SECRET_KEY";

export const registerUser=async(req,res)=>{
    try{
        const {username,email,password}=req.body;

        const userExists=await User.findOne({email});

        if(userExists)
        {
            return res.status(400).json({message:"user already exits"});
        }

        const newUser=new User({
            username,
            email,
            password
        })

        await newUser.save();
        res.json({message:"user registration successfull"});
    }
    catch(err)
    {
        return res.status(500).json({err:err.message})
    }
}
