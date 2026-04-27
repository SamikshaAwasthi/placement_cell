
const pool = require("../db/dbconnection")
const bcrypt = require("bcrypt")
const {insert} = require("../utility/quries")

const registerUser = async (req,res)=>{
    try {
        const {name,email,password,role} = req.body

         if (!name || !email || !password || !role) {
      return res.status(400).json({ message: "All fields are required" })
    }

    if (!["admin", "user"].includes(role)) {
      return res.status(400).json({ message: "Invalid role" })
    }
        // password hash
    const hashedPassword = await bcrypt.hash(password, 10)
    
    const userdata = {
        name,
        email,
        password:hashedPassword,
        role
    }
    
    const newUser = await insert("users", userdata)

    if(!newUser){
        return res.status(400).json({
        success: false,
        message: "User not created"
      })
    }
     res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: newUser
    })
    } catch (error) {
        console.log("error", error)

    res.status(500).json({
      success: false,
      message: error.message
    })
    }
}

const loginUser = async (req,res)=>{
    try {
        const {email,password} = req.body;

        if(!email || !password){
            res.status(400).json({
        success: false,
        message: "Email and password required"
      })
    }
    const result = await pool.query(`SELECT * FROM users WHERE email = $1`,[email])

    const user = result.rows[0]

    if(!user){
        return res.status(400).json({
        success: false,
        message: "User not found"
      })
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if(!isMatch)
        return res.status(400).json({
        success: false,
        message: "Invalid credentials"
      })
      res.json({
        success:true,
        message:"Login Sucessfully",
        user:{
            id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
        }
      })
    } catch (error) {
        console.log(error)
    res.status(500).json({
      success: false,
      message: "Server error"
    })
    }
}
module.exports = { registerUser,loginUser }