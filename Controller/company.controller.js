const pool = require("../db/dbconnection");
const { insert,selectquery } = require("../utility/quries")

const createcompany = async (req,res) => {
    try {

        const {
            name, location, industry, website, hr_email, hr_name, contact_number, package, eligibility_cgpa, description
        } = req.body

        const companyData = {
            name, location, industry, website, hr_email, hr_name, contact_number, package, eligibility_cgpa, description
        }
        console.log(companyData);

        const newcompanyData = await insert(
            "companies",
            companyData
        )

        res.status(200).json
        ({
            success:true,
            message: "company added",
            data:newcompanyData
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success:false,
            message:error.message
        })
        
    }
}

const getAllCompanies = async (req,res)=>{
    try {
        
        const sql = await selectquery(['*'],"companies");

        console.log(sql);

        const result = await pool.query(sql);
        
        res.status(201).json({
            success:true,
            total: result.rows.length,
            data:result.rows
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success:false,
            message:error.message
        })
        
    }
}

const getCompanyByID = async (req,res)=>{
    try {
        const id= req.params.id
        const whereclause =[
            {feild:"id",
            value:id}
        ]
        const sql = await selectquery(['*'],"companies",whereclause);

        console.log(sql);

        const result = await pool.query(sql);
        
        res.status(201).json({
            success:true,
            total: result.rows.length,
            data:result.rows
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success:false,
            message:error.message
        })
        
    }
}
module.exports = { createcompany,getAllCompanies ,getCompanyByID}