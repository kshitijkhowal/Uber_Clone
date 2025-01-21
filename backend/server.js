import http from "http";
import app from "./app.js"

const server=http.createServer(app);
const port=process.env.PORT || 3001;

server.listen(port,()=>{
    console.log(`Server is running on port ${port} successfully`);
})