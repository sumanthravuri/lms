import {User} from "../models/usermodel.js"

import bycryptjs from "bcryptjs"
import dotenv from "dotenv"
import { generateToken } from "../utils/generateToken.js"
export const register=async(req,res)=>{
    try {
        const {name,email,password}=req.body
    if(!name||!email||!password){
       return  res.status(400).json({
            message:"All fileds are required"
        })
    }
    const user= await User.findOne({email});
    if(user){
        return res.status(400).json(
            {
                message:"user already exists"
            }
        )
    }
    const hashedpassword=await bycryptjs.hash(password,10)
    await User.create({
        name,email,password:hashedpassword
    })

    } catch (error) {
        console.log("error unable to register",error)
    }
    

}
export const login=async(req,res)=>{
    try {
        const {email,password}=req.body
    if(!email||!password){
        res.status(400).json({
            message:"All fileds are required"
        })
    }
    const user= await User.findOne({email});
    if(!user){
        res.status(400).json(
            {
                message:"incorrect email or password"
            }
        )
    }
    const compare= await bycryptjs.compare(password,user.password)
    if(!compare){
        res.status(400).json(
            {
                message:"incorrect email or password"
            }
        )
    }
    generateToken(res,user,`hi user${user.username}`)

    } catch (error) {
        console.log("login error",error)
    }
    

}