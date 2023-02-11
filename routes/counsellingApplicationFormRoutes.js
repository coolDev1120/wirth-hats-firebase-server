const express = require("express");
const {
  addInfo,
  getAllInfo,
  getInfo,
  updateInfo,
  deleteInfo,
  uploadfile
} = require("../controllers/counsellingApplicationFormController");

const router = express.Router();

const multer = require('multer')
const path = require('path')
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/counselling')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
  }
});
var upload = multer({ storage: storage })

router.post('/uploadfile', upload.single('photo'), uploadfile)

// http://localhost:3000/api/addInfo
router.post("/addinfo", addInfo);

// http://localhost:3000/api/getAllInfo
router.get("/getAllInfo", getAllInfo);

// http://localhost:3000/api/getInfo/xxxx_info_id
router.get("/getInfo/:id", getInfo);

// http://localhost:3000/api/updateInfo/xxxx_info_id
router.post("/updateInfo/:id", updateInfo);

// http://localhost:3000/api/deleteInfo/xxxx_info_id
router.get("/deleteInfo/:id", deleteInfo);

module.exports = router;
