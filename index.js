const express = require("express");
const app = express();
require("dotenv").config()
const port = process.env.PORT;
app.use(express.json())

const createUserTable = require("./models/user.models")
createUserTable();
const authRoutes = require("./Routes/auth.routes")
app.get("/", (req,res)=>{
  res.send("API running")
})
app.use("/api/auth", authRoutes)
app.listen(port,()=>{
    console.log(`server is running at port ${port}`)
})