import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import cors from 'cors'
import mongoose  from 'mongoose';
import users from './routes/users.js';
const app = express()
dotenv.config();
app.use(cors())
app.use(bodyParser.json({limit:"30mb",extended:true}))
app.use(bodyParser.urlencoded({limit:"30mb",extended:true}))
app.use('/users',users);
app.get('/',(req,res)=>{
    res.send('Welcome to guvi Assessment')
})
const MONGOURL = process.env.MONGO_DB_URL
const PORT = process.env.port||5235

mongoose.set("strictQuery", false);
mongoose.connect(MONGOURL)
.then(()=>{
    console.log("Database Connected...")
    app.listen(PORT,()=>{
        console.log(`Server is Running... ${PORT}`)
    })
})
.catch((err)=>{
   console.log(`Some error occurs = ${err}`)
})
