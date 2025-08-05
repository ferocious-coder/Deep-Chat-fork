import express from "express"
import {config} from "dotenv";
import morgan from "morgan";
import appRouter from "./routes/index.js";
import cookieparser from "cookie-parser"
import cors from "cors";

config();

const app= express();

//middleware
app.use(cors({origin:process.env.FRONTEND_URL, credentials:true}))
app.use(express.json());
app.use(cookieparser(process.env.COOKEY));

//not needed in production
if (process.env.NODE_ENV !== 'production'){
    app.use(morgan("dev"));
}


app.use("/api/v1", appRouter);

export default app;