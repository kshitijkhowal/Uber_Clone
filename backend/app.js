import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import userRoutes from "./routes/user.routes.js";
import captainRoutes from "./routes/captain.routes.js";
import cookieParser from "cookie-parser";

dotenv.config();
const app=express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());





app.get("/",(req,res)=>{
    res.send("hello");
});
app.use('/users',userRoutes);
app.use('/captains',captainRoutes);

export default app;