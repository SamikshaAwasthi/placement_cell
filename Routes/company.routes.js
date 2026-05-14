const express = require("express");

const router = express.Router();

const verifyToken = require("../middleware/authmiddleware")

const checkrole = require("../middleware/rolemiddleware")

const {createcompany,getAllCompanies,getCompanyByID} = require("../Controller/company.controller")

router.post("/",verifyToken,checkrole("admin"),createcompany);
router.get("/",verifyToken,getAllCompanies)
router.get("/:id",getCompanyByID)
module.exports = router;