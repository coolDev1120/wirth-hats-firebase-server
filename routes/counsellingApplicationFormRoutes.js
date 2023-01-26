const express = require("express");
const {
  addInfo,
  getAllInfo,
  getInfo,
  updateInfo,
  deleteInfo
} = require("../controllers/counsellingApplicationFormController");

const router = express.Router();

// http://localhost:3000/api/addInfo
router.post("/addinfo", addInfo);

// http://localhost:3000/api/getAllInfo
router.get("/getAllInfo", getAllInfo);

// http://localhost:3000/api/getInfo/xxxx_info_id
router.get("/getInfo/:id", getInfo);

// http://localhost:3000/api/updateInfo/xxxx_info_id
router.post("/updateInfo/:id", updateInfo);

// http://localhost:3000/api/deleteInfo/xxxx_info_id
router.delete("/deleteInfo/:id", deleteInfo);

module.exports = router;
