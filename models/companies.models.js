const pool = require("../db/dbconnection")

async function CreateCompaniesTable() {
    await pool.query(`

        CREATE TABLE IF NOT EXISTS COMPANIES (
        ID SERIAL PRIMARY KEY,
        NAME VARCHAR(100),
        LOCATION VARCHAR(100)
        )     
 `)
 await pool.query(`

    ALTER TABLE companies

    ADD COLUMN  IF NOT EXISTS industry VARCHAR(100),

    ADD COLUMN IF NOT EXISTS website VARCHAR(200),

    ADD COLUMN IF NOT EXISTS hr_name VARCHAR(100),

    ADD COLUMN IF NOT EXISTS hr_email VARCHAR(100),

    ADD COLUMN IF NOT EXISTS contact_number VARCHAR(20),

    ADD COLUMN IF NOT EXISTS package DECIMAL,

    ADD COLUMN IF NOT EXISTS eligibility_cgpa DECIMAL,

    ADD COLUMN IF NOT EXISTS description TEXT,

    ADD COLUMN IF NOT EXISTS created_by INT REFERENCES users(id),

    ADD COLUMN IF NOT EXISTS created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  `)
 console.log("✅ companies table created/updated")
}

module.exports = CreateCompaniesTable