const express = require("express")

const router = express.Router()

const verifyToken =
require("../middleware/authmiddleware")

const checkrole =
require("../middleware/rolemiddleware")

const {
  createJob
} = require("../Controller/jobs.controller")


// 🔥 CREATE JOB
router.post(
  "/",
  verifyToken,
  checkrole("admin"),
  createJob
)

module.exports = router