import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { cookie_name } from "./constants.js";
export const createToken = (id:string, email:string, expiresIn) =>{
    const payload = {id, email};
    const token = jwt.sign(payload,process.env.JWT_SECRET, {expiresIn});
    return token;
};

export const verifyToken = async (req:Request, res:Response, next:NextFunction)=>{
    const token = req.signedCookies[`${cookie_name}`];
    if(!token || token.trim()==""){
        return res.status(401).json({message: "Token Not Received"})
    }
    return new Promise<void>((resolve, reject) => {
    return jwt.verify(
        token, 
        process.env.JWT_SECRET as string, 
        (err: jwt.VerifyErrors | null, success: jwt.JwtPayload | string | undefined) => {
            if (err) {
                reject(err.message);
                return res.status(401).json({ message: "Token Expired" });
            } else {
                resolve();
                res.locals.jwtData = success;
                return next();
            }
        }
    );
    })
};