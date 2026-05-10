const pool = require("../db/dbconnection")
async function createJobsTable() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS jobs (
      id SERIAL PRIMARY KEY,
      company_id INT REFERENCES companies(id) ON DELETE CASCADE,
      title VARCHAR(100),
      description TEXT,
      min_cgpa DECIMAL(3,2),
      required_skills TEXT[],
      min_experience INT
    )
  `)

  console.log("✅ jobs table created")
}

module.exports = createJobsTable