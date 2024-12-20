import "./database/db.js"
import dotenv from "dotenv"
import express from "express"
import connectdb from "./database/db.js"
import cookieParser from "cookie-parser"
import userRoute from "./routes/user.route.js"
import cors from "cors"
const password="UkwQGwiy8vv0sPkX"
dotenv.config({})
connectdb();
const app=express()
const port=process.env.PORT||3000

//deafult middlewares
app.use(express.json())
app.use(cookieParser)
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))
//apis
app.use("/api/v1/user",userRoute)
app.listen(port,()=>{
    console.log(`app listeninig on port ${port}`)
})