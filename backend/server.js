import http from "http";
import app from "./app.js"
import connectDB from "./db/db.js";

const server=http.createServer(app);
const port=process.env.PORT || 3001;

server.listen(port,()=>{
    console.log(`Server is running on port ${port} successfully`);
    connectDB();
})