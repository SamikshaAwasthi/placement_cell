
const pool = require("../db/dbconnection")
const bcrypt = require("bcrypt")
const {insert,selectquery} = require("../utility/quries")

// 🔐 REGISTER
const registerUser = async (req, res) => {
  try {

    const { name, email, password, role } = req.body

    if (!name || !email || !password || !role) {
      return res.status(400).json({
        success: false,
        message: "All fields are required"
      })
    }

    if (!["admin", "user"].includes(role)) {
      return res.status(400).json({
        success: false,
        message: "Invalid role"
      })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const userdata = {
      name,
      email,
      password: hashedPassword,
      role
    }

    // 🔥 insert utility use
    const newUser = await insert("users", userdata)

    if (!newUser) {
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

    if (error.code === "23505") {
      return res.status(400).json({
        success: false,
        message: "Email already exists"
      })
    }

    console.log(error)

    res.status(500).json({
      success: false,
      message: error.message
    })
  }
}



const loginUser = async (req, res) => {
  try {

    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password required"
      })
    }

    // 🔥 dynamic whereclause
    const whereclause = [
      {
        feild: "email",
        value: email
      }
    ]

    // 🔥 selectquery use
    const sql = await selectquery(['*'], 'users', whereclause)

    console.log("SQL:", sql)

    const result = await pool.query(sql)

    const user = result.rows[0]

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found"
      })
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials"
      })
    }

    res.json({
      success: true,
      message: "Login Successfully",
      user: {
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
 module.exports ={registerUser,loginUser}