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

    ADD COLUMN industry VARCHAR(100),

    ADD COLUMN website VARCHAR(200),

    ADD COLUMN hr_name VARCHAR(100),

    ADD COLUMN hr_email VARCHAR(100),

    ADD COLUMN contact_number VARCHAR(20),

    ADD COLUMN package DECIMAL,

    ADD COLUMN eligibility_cgpa DECIMAL,

    ADD COLUMN description TEXT,

    ADD COLUMN created_by INT REFERENCES users(id),

    ADD COLUMN created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  `)
 console.log("✅ companies table created/updated")
}

module.exports = CreateCompaniesTable