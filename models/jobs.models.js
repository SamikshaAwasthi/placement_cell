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

  await pool.query(`

  ALTER TABLE jobs

  ADD COLUMN IF NOT EXISTS location VARCHAR(100),

  ADD COLUMN IF NOT EXISTS salary_package DECIMAL,

  ADD COLUMN IF NOT EXISTS job_type VARCHAR(50),

  ADD COLUMN IF NOT EXISTS mode VARCHAR(50),

  ADD COLUMN IF NOT EXISTS vacancies INT,

  ADD COLUMN IF NOT EXISTS last_date DATE,

  ADD COLUMN IF NOT EXISTS status VARCHAR(50) DEFAULT 'open',

  ADD COLUMN IF NOT EXISTS created_by INT REFERENCES users(id),

  ADD COLUMN IF NOT EXISTS created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
`)

  console.log("✅ jobs table created")
}

module.exports = createJobsTable