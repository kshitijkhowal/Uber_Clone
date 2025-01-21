import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import userRoutes from "./routes/user.routes.js";

dotenv.config();
const app=express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));





app.get("/",(req,res)=>{
    res.send("hello");
});
app.use('/users',userRoutes);

export default app;