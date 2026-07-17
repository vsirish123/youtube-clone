import User from "../models/User.js";
import jwt from "jsonwebtoken";
// secret key
const JWT_TOKEN="MY_SUPER_SECRET_KEY";
// resgistration
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
// login
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
            {id:user._id,},
            JWT_TOKEN,
            {expiresIn:"30d"}
        )
        res.status(201).json({
        _id: user._id,
        username: user.username,
        email: user.email,
        token,
        });


    }
    catch(err)
    {
        res.status(500).json({err:err.message});
    }
}
