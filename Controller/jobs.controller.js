const pool = require("../db/dbconnection")
const { insert } = require("../utility/quries")

const createJob = async (req, res) => {
    try {
 const user_id = req.user.id
        const { company_id,

            title,

            description,

            min_cgpa,

            required_skills,

            min_experience,

            location,

            salary_package,

            job_type,

            mode,

            vacancies,

            last_date } = req.body

        const jobData = {
            company_id,

            title,

            description,

            min_cgpa,

            required_skills,

            min_experience,

            location,

            salary_package,

            job_type,

            mode,

            vacancies,

            last_date,
            // 🔥 admin id
            created_by: req.user.id
        }

        const newJob = await insert(
            "jobs",
            jobData
        )

        res.status(201).json({
            success: true,
            messsage: "job added in db",
            data: newJob
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({

            success: false,

            message: error.message
        })
    }
}

module.exports = {createJob}