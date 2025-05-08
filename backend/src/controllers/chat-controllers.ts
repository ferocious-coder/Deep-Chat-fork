import { NextFunction, Request, Response } from "express";
import User from "../models/User.js";
import { OpenAI } from "openai";
import { ChatCompletionMessageParam } from "openai/src/resources/index.js";

export const generateChatCompletion = async (
    req: Request,
    res: Response, 
    next:NextFunction
) => {
    const { message } = req.body;
    try {
        const user = await User.findById(res.locals.jwtData.id);
        if(!user) 
            return res.status(401).json({message : "User not registered"});
        //grab chats of user
        const chats = user.chats.map(({role,content})=>({role,content})) as ChatCompletionMessageParam[];
        chats.push({content:message, role:"user"});
        user.chats.push({content: message, role:"user"});
    
        //send all chats with new one to OpenAI api
        const openai = new OpenAI({
            baseURL:"https://openrouter.ai/api/v1",
            apiKey:process.env.OPENAI_SECRET
            //organization:process.env.OPENAI_ORGANIZATION
        }
        );
        const chatResponse = await openai.chat.completions.create({
            model:"deepseek/deepseek-r1:free",
            messages: chats,
            max_tokens: 2000,
            temperature:0.7,
            stream:false,
        });
        //get latest response
        const aiMessage = chatResponse.choices[0].message;
        if (aiMessage.content?.trim()) {
            user.chats.push(aiMessage);
        }
        await user.save();
        return res.status(200).json({chats:user.chats});

    } catch (error) {
        console.log(error)
        return res.status(500).json({message:"Something went wrong"});
    }
   
};

export const sendChatsToUser = async(req:Request, res:Response, next:NextFunction) =>{
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
        .json({message:"OK",chats: user.chats});

    } catch (error) {
        console.log(error);
        return res.status(200).json({message:"ERROR", cause:error.message});
    }
};

export const deleteChats = async(req:Request, res:Response, next:NextFunction) =>{
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
        //@ts-ignore
        user.chats = [];
        await user.save();
        return res
        .status(200)
        .json({message:"OK"});

    } catch (error) {
        console.log(error);
        return res.status(200).json({message:"ERROR", cause:error.message});
    }
};