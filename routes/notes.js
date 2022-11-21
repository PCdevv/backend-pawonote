var express = require("express");
var router = express.Router();
const { notes } = require('../controller/index')
const multer  = require('multer')

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './tmp/uploads/')
  },
  filename: (req, file, cb) => {
    // const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    // cb(null, file.fieldname + '-' + uniqueSuffix)
    cb(null, file.originalname)
  }
})

const upload = multer({ storage: storage })

// GET
router.get("/", notes.getNotes);

// GET DATA BY ID
router.get("/:id", notes.getNote);

// POST
router.post("/", upload.single('img_url'), notes.createNote);

// PUT
router.put("/:id", notes.updateNote);

// DELETE
router.delete("/:id", notes.deleteNote);

module.exports = router;
