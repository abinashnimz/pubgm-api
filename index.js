import dotenv from "dotenv";
dotenv.config();

import express from "express";
import axios from "axios";


const PORT = process.env.PORT;

const app = express();
app.use(express.json());


let obsPlayerID = null;
let playerData = {};


const fetchPlayers = async ()=>{
    try{
        console.log("Players fetching started..");
        let response = await axios.get("http:192.168.0.107:10086/gettotalplayerlist");
        response.data.playerInfoList.map((item)=>{
            if(obsPlayerID==item.uId){
                playerData=item;
            }
        })
    }catch(err){
        console.log(err);
    }
}


app.get("/currentPlayer", (req, res)=>{
    res.json(playerData);
})


const startFetching = ()=>{
    console.log("UID fetching started..");
    setInterval(async()=>{
        try{
            let response = await axios.get("https://jsonplaceholder.typicode.com/users");
            obsPlayerID=response.data.observingPlayer[0];
            if(obsPlayerID){
                fetchPlayers();
            }
        }catch(err){
            console.log(err);
        }
    }, 500);
}


app.listen(PORT, async ()=>{
    console.log(`Server running on http://localhost:${PORT}`);
    await startFetching();
})