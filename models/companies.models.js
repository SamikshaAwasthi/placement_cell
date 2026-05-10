const pool = require("../db/dbconnection")

async function CreateCompaniesTable() {
    await pool.query(`

        CREATE TABLE IF NOT EXISTS COMPANIES (
        ID SERIAL PRIMARY KEY,
        NAME VARCHAR(100),
        LOCATION VARCHAR(100)
        )     
 `)
 console.log("✅ companies table created")
}

module.exports = CreateCompaniesTable