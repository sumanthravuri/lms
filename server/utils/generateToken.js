import jwt from "jsonwebtoken"
import dotenv from "dotenv"
export const generateToken=(res,user,message)=>{
    const token=jwt.sign({userId:user._id},process.env.SECRET_KEY,{expiresIn:'1d'});
    return res.status(200).cookie("token",token,{httpOnly:true}).json({success:true,message,user});
}