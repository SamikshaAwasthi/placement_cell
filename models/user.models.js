const pool = require("../db/dbconnection")

const createUserTable = async () => {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS users(
      id SERIAL PRIMARY KEY,
      name VARCHAR(100),
      email VARCHAR(100) UNIQUE,
      password TEXT,
      role VARCHAR(20) CHECK(role IN ('admin','user'))
    )
  `)

  console.log("✅ Users table created")
}

module.exports = createUserTable