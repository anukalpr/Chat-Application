const express=require("express");
const connection=require("./DataBase/DB");
const cors=require("cors");
const contact=require("./controllers/Message");
const user=require("./controllers/User");
const cookieParser=require("cookie-parser");
const port=3000;
const app=express();

//Middleware
app.use(
    cors({
      origin: "http://localhost:5173", 
      credentials: true               
    })
  );
  
app.use(express.json());
app.use(cookieParser());

//Database Connection
connection();

//api
app.use('/api',contact);
app.use('/api',user);

//Server Health
app.get('/',(req,res)=>{
    res.send("Running");
})
app.listen(port,()=>{
    console.log(`The Server is Running on Port: http://localhost${port}`);
})