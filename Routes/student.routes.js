const express = require("express");
const router = express.Router()
const verifyToken = require("../middleware/authmiddleware");
const checkrole = require("../middleware/rolemiddleware");
checkrole()
console.log(verifyToken);
console.log(checkrole);


const {createstudentprofile,getstudentprofile,getallstudent,getstudentbyid} = require("../Controller/student.controller");

router.post("/",verifyToken,checkrole("user"),createstudentprofile
)
router.get('/profile',verifyToken,checkrole("user"),getstudentprofile)
router.get('/',verifyToken,checkrole("admin"),getallstudent)
router.get('/:id',verifyToken,checkrole("admin"),getstudentbyid)

module.exports = router