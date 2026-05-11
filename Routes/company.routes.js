const express = require("express");

const router = express.Router();

const verifyToken = require("../middleware/authmiddleware")

const checkrole = require("../middleware/rolemiddleware")

const {createcompany} = require("../Controller/company.controller")

router.post("/",verifyToken,checkrole("admin"),createcompany);

module.exports = router;