const pool = require("../db/dbconnection")

async function createApplicationsTable() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS applications (
      id SERIAL PRIMARY KEY,
      student_id INT REFERENCES students(stu_id) ON DELETE CASCADE,
      job_id INT REFERENCES jobs(id) ON DELETE CASCADE,
      status VARCHAR(20) DEFAULT 'applied'
    )
  `)

  console.log("✅ applications table created")
}

module.exports = createApplicationsTable