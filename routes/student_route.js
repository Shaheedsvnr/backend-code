const express = require('express');
const router = express.Router();
const Teacher = require('../middlewear/teacher');
const { Insert , GetStudent , Delete , Update ,View } = require("../controller/student_controller.js")
router.post("/insert", Teacher ,  Insert);
router.get("/get_student",Teacher ,GetStudent);
router.delete("/delete_student/:id",Delete);
router.put("/update_student/:id",Update);
router.get("/view_student/:id",View);
module.exports = router