const express=require("express");
const connection=require("./DataBase/DB");
const cors=require("cors");
const contact=require("./controllers/Contact");
const user=require("./controllers/User");
const cookieParser=require("cookie-parser");
const port=3000;
const app=express();

//Middleware
app.use(cors());
app.use(cookieParser());
app.use(express.json());

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