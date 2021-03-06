import express from "express";
import mongoose from "mongoose";
import Data from "./data.js";
import Videos from "./dbModel.js"
//___________________________________________ Config ___________________________________________________________/

const app = express();
const port = process.env.PORT||12830;




//__________________________________________middlwares_______________________________________________________/
app.use(express.json())
app.use((req,res,next)=>{
    res.setHeader('Access-Control-Allow-Origin','*'),
    res.setHeader('Access-Control-Allow-Headers','*'),
    next();
});



//_________________________________________Monge DataBase__________________________________________________/


const connection_url="For Security, db keys not adding Github"
mongoose.connect(connection_url,{useNewUrlParser:true,
                                useCreateIndex:true,
                                useUnifiedTopology:true});


//______________________________________________API________________________________________________________/

app.get("/",(req,res)=>res.status(200).send("hello word"));

app.get("/data",(req,res)=>res.status(200).send(Data));

app.get("/post/video",(req,res)=>{       
        Videos.find({},(err,data)=>{        
        if(err){
            res.status(500).send(err)
        }else{
            res.status(200).send(data)}
        })
    })
    

app.post("/post/video",(req,res)=>{
    const dbVideos= req.body       
    Videos.create(dbVideos,(err,data)=>{
        if(err){
            res.status(500).send(err)
        }else{
            res.status(201).send(data)
        } 
    });
});


//_____________________________________________listen_____________________________________________________/
app.listen(port,()=>{
    console.log(`localhost are online port:${port}`)});



