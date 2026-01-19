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
        res.status(500).json({err:err.message})
    }
}

export const loginUser=async(req,res)=>{
    try{
        const {email,password}=req.body;

        const user=await User.findOne({email});

        if(!user)
        {
            return res.status(400).json({message:"Invalid email or password "});
        }

        if(password!=user.password)
        {
            return res.status(400).json({message:"Invalid email or password"});
        }

        const token=jwt.sign(
            {id:user._id,email:user.email},
            JWT_TOKEN,
            {expiresIn:"7d"}
        )

        res.json(
            {
                message:"Login successfull",
                token,
                user:{
                    id:user._id,
                    username:user.username,
                    email:user.email
                }
            }
        )
    }
    catch(err)
    {
        res.status(500).json({err:err.message});
    }
}
