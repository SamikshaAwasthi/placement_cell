const pool = require("../db/dbconnection")
const { insert, selectquery } = require("../utility/quries");

const createstudentprofile = async (req, res) => {
    try {

        const user_id = req.user.id
        console.log(user_id);


        const {
            cgpa,
            experience,
            skills,
            personal_email,
            college_email,
            phone,
            branch,
            passing_year,
            github_link,
            linkedin_link,
            portfolio_link,
            profile_image,
            resume,
            address,
            bio
        } = req.body;

        const studentData = {
            user_id,
            cgpa,
            experience,
            skills,
            personal_email,
            college_email,
            phone,
            branch,
            passing_year,
            github_link,
            linkedin_link,
            portfolio_link,
            profile_image,
            resume,
            address,
            bio
        }

        console.log(studentData);


        const newStudent = await insert(
            "students",
            studentData
        )
        res.status(201).json({
            success: true,
            message: "Student profile created",
            data: newStudent
        })
    } catch (error) {
        console.log(error);

        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

const getstudentprofile = async (req, res) => {
    try {
        // token se user id

        const user_id = req.user.id;

        //where clause

        const whereclause = [
            {
                feild: "user_id",
                value: user_id
            }
        ]

        const sql = await selectquery(['*'], 'students', whereclause)
        console.log(sql);


        const result = await pool.query(sql);

        res.status(200).json({

            success: true,

            data: result.rows[0]
        })

    } catch (error) {
        console.log(error)

        return res.status(500).json({

            success: false,

            message: error.message
        })
    }
}

const getallstudent = async (req, res) => {
    try {
        // const user_id = req.user.id;

        const sql = await selectquery(['*'], 'students')

        const result = await pool.query(sql);


        res.status(200).json({
            success: true,
            data: result.rows
        })

    } catch (error) {
        console.log(error)

        return res.status(500).json({

            success: false,

            message: error.message
        })
    }
}

const getstudentbyid = async (req,res) => {
    try {
        const stu_id = req.params.id;

        const whereclause = [
            {
                feild: "stu_id",
                value: stu_id
            }

        ]

        const sql = await selectquery(['*'],'students',whereclause)
        console.log(sql);

        const result = await pool.query(sql);

        if(result.rows.length === 0){
            return res.status(404).json({
                success:false,
                message:"student not found"
            })
        }

        res.status(200).json({
            success:true,
            message:result.rows[0]
        })
        
    } catch (error) {
        console.log(error)

        return res.status(500).json({

            success: false,

            message: error.message
        })
    }
}

module.exports =
    { createstudentprofile, getstudentprofile, getallstudent,getstudentbyid }
