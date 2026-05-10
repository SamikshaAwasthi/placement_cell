const pool = require("../db/dbconnection")

async function createstudentable() {
    await pool.query(`
        CREATE TABLE IF NOT EXISTS students(
        stu_id SERIAL PRIMARY KEY,
        user_id INT REFERENCES users(id) ON DELETE CASCADE,

         cgpa DECIMAL(3,2),

         experience INT DEFAULT 0,

         skills TEXT[],

         personal_email VARCHAR(255),

         college_email VARCHAR(255),

         phone VARCHAR(20),

         branch VARCHAR(100),

         passing_year INT,

         github_link TEXT,

         linkedin_link TEXT,

         portfolio_link TEXT,

         profile_image TEXT,

         resume TEXT,

         address TEXT,

         bio TEXT,

         placement_status VARCHAR(50) DEFAULT 'pending',

         selected_company VARCHAR(255),

         package DECIMAL(10,2),

         is_verified BOOLEAN DEFAULT false,

         remarks TEXT
        )
        `)
        console.log("✅ students table created")
}



module.exports = createstudentable