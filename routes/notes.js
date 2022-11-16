var express = require("express");
var router = express.Router();
const { notes } = require('../controller/index')

// GET
router.get("/", notes.getNotes);

// GET User's Notes
/*router.get("/user/:id", async (req, res, next) => {
  const notes = await Note.findMany({
    include: [{
      model: User,
      as: 'user'
    }],
    where: { id: req.params.id }
  });
  return res.json({
    status: 200,
    message: "Success get all data",
    data: notes,
  });
});*/

// GET DATA BY ID
router.get("/:id", notes.getNote);

// POST
router.post("/", notes.createNote);

// PUT
router.put("/:id", notes.updateNote);

// DELETE
router.delete("/:id", notes.deleteNote);

module.exports = router;
