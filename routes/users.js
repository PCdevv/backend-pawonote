var express = require('express');
var router = express.Router();
const Validator = require("fastest-validator");
const v = new Validator();
const db = require("../models");
const User = db.users;
const Note = db.notes;

router.get("/", async (req, res, next) => {
  const users = await User.findAll();
  return res.json({
    status: 200,
    message: "Success get all users",
    data: users,
  });
});

//Get all notes
router.get("/notes", async (req, res, next) => {
  const users = await User.findAll({
    include: [{
      model: Note,
      as: 'note'
    }],
    where: { id: 2 }
  });
  return res.json({
    status: 200,
    message: "Success get all users",
    data: users,
  });
});

// GET DATA BY ID
router.get("/:id", async (req, res, next) => {
  const id = req.params.id;
  // check id in table user
  let user = await User.findByPk(id);
  if (!user) {
    return res.status(404).json({ status: 404, message: "User not found" });
  } else {
    return res.json({ status: 200, message: "Success get user", data: user });
  }
});

// POST
router.post("/", async (req, res, next) => {
  // validation
  const schema = {
    username: "string",
    password: "string|optional",
  };
  const validate = v.validate(req.body, schema);
  if (validate.length) {
    return res.status(400).json(validate);
  }
  // proses create
  const user = await User.create(req.body);
  res.json({
    status: 200,
    message: "Success create user",
    data: user,
  });
});

module.exports = router;
