const User = require('../models/User');
const { generateAccessToken } = require('../utils/utils');


const signup = async(req,res)=>{
    try {
        const {name,email,password}=req.body;
        const user = new User({
            name,
            email,
            password
        });
        const newUser = await user.save();
        const token = generateAccessToken(newUser._id);
        res.status(200).json({message:"User signed up successfully",token});
    } catch (error) {
        console.log(error);
        res.status(400).json({message:"Error while signing up"});
    }
    
}

const login = async(req,res)=>{
    try {
        const {email,password}=req.body;
        const user = await User.findOne({email});
        if(!user ||!(await user.validatePassword(password))){
            return res.status(401).json({message:"Invalid email or password"});
        }
        const token = generateAccessToken(user._id);
        res.status(200).json({message:"User logged in successfully",token});
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Error while logging in"});
    }
 
}

module.exports = {
    signup,
    login
}