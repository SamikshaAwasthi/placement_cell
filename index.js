const express = require("express");
const app = express();
require("dotenv").config()
const port = process.env.PORT;
app.use(express.json())

const createUserTable = require("./models/user.models")
const createStudentTable = require("./models/students.models");
const createCompanyTable = require("./models/companies.models");
const createJobTable = require("./models/jobs.models");
const createApplicationTable = require("./models/application.models");


// 🔥 CREATE ALL TABLES
async function initDB() {
  try {

    await createUserTable();
    await createStudentTable();
    await createCompanyTable();
    await createJobTable();
    await createApplicationTable();

    console.log("✅ All tables created successfully");

  } catch (error) {
    console.log("DB Error:", error);
  }
}

initDB();


const authRoutes = require("./Routes/auth.routes")
const studentRoutes = require("./Routes/student.routes")
const companyRoutes = require("./Routes/company.routes")
const jobRoutes = require("./Routes/job.routes")
app.use("/api/auth", authRoutes)
app.use('/api/students',studentRoutes)
app.use('/api/company',companyRoutes)
app.use('/api/job',jobRoutes)
app.get("/", (req,res)=>{
  res.send("API running")
})
app.listen(port,()=>{
    console.log(`server is running at port ${port}`)
})