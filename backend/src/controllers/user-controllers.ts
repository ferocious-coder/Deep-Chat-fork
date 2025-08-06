import { NextFunction, Request, Response } from "express";
import User from "../models/User.js";
import {hash, compare} from 'bcrypt'
import { createToken } from "../utils/jwt-token.js";
import { cookie_name } from "../utils/constants.js";
export const getAllUsers = async(req:Request,res:Response,next:NextFunction) =>{
    //get all user from the db
    try {
        const users = await User.find();
        return res.status(200).json({message:"OK",users});
    } catch (error) {
        console.log(error);
        return res.status(200).json({message:"ERROR", cause:error.message});
    }
};

export const userSignup = async(req:Request,res:Response,next:NextFunction) =>{
    //user signup
    try {
        const {name, email, password}  =req.body;
        const existingUser = await User.findOne({email});
        if(existingUser) return res.status(401).send("User already registered");
        const hashedPassword = await hash(password,10);
        const user = new User({name,email,password: hashedPassword});
        await user.save();

        //store cookie and jwt token
        res.clearCookie(cookie_name,{
            path: "/", 
            httpOnly:true,
            domain:process.env.HOST ,
            signed:true,
        })

        const token = createToken(user._id.toString(),user.email,"7d")
        
        const expires =new Date();
        expires.setDate(expires.getDate()+7);

        res.cookie(cookie_name,token,{
            path: "/", 
            domain:process.env.HOST,
            httpOnly:true,
            signed:true,
            expires
        });

        return res.status(201).json({message:"OK",id:user._id.toString()});
    } catch (error) {
        console.log(error);
        return res.status(200).json({message:"ERROR", cause:error.message});
    }
};

export const userLogin = async(req:Request, res:Response, next:NextFunction) =>{
    //user login
    try {
        const {email, password}  =req.body;
        const user = await User.findOne({ email });
        if(!user){
            return res.status(401).send("User not registered");
        }

        const isPasswordCorrect = await compare(password, user.password);
        if(!isPasswordCorrect){return res.status(401).send("Incorrect Password");}

        //store cookie and jwt token
        res.clearCookie(cookie_name,{
            path: "/", 
            httpOnly:true,
            domain:process.env.HOST,
            signed:true,
        });

        const token = createToken(user._id.toString(),user.email,"7d");
        
        const expires =new Date();
        expires.setDate(expires.getDate()+7);

        res.cookie(cookie_name,token,{
            path: "/", 
            domain:process.env.HOST,
            httpOnly:true,
            signed:true,
            expires
        });

        return res.status(200).json({message:"OK",name: user.name, email: user.email});

    } catch (error) {
        console.log(error);
        return res.status(200).json({message:"ERROR", cause:error.message});
    }
};

export const verifyUser = async(req:Request, res:Response, next:NextFunction) =>{
    //user token check
    try {
        const {email, password}  =req.body;
        const user = await User.findById(res.locals.jwtData.id);
        if(!user){
            return res.status(401).send("User not registered OR Token malfunctioned");
        }
        if(user._id.toString()!==res.locals.jwtData.id){
            return res.status(401).send("Permissions didn't match");
        }

        return res
        .status(200)
        .json({message:"OK",name: user.name, email: user.email});

    } catch (error) {
        console.log(error);
        return res.status(200).json({message:"ERROR", cause:error.message});
    }
};

export const userLogout = async(req:Request, res:Response, next:NextFunction) =>{
    //user token check
    try {
        const {email, password}  =req.body;
        const user = await User.findById(res.locals.jwtData.id);
        if(!user){
            return res.status(401).send("User not registered OR Token malfunctioned");
        }
        if(user._id.toString()!==res.locals.jwtData.id){
            return res.status(401).send("Permissions didn't match");
        }
        res.clearCookie(cookie_name,{
            path: "/", 
            httpOnly:true,
            domain:process.env.HOST,
            signed:true,
        });
        return res
        .status(200)
        .json({message:"OK",name: user.name, email: user.email});

    } catch (error) {
        console.log(error);
        return res.status(200).json({message:"ERROR", cause:error.message});
    }
};
