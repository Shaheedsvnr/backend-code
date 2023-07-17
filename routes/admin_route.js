const express = require('express');
const router = express.Router();
const { Insert , GetAdmin , Delete , Update} =require("../controller/admin_controller.js");
//inserting
router.post("/insert",  Insert);
router.get("/get_admin",GetAdmin);
router.delete("/delete_admin/:id",Delete);
router.put("/update_admin/:id",Update);

module.exports = router;