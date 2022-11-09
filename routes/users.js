var express = require('express');
var router = express.Router();
const Validator = require("fastest-validator");
const v = new Validator();
const db = require("../models");

router.get("/", async (req, res, next) => {
  const users = await db.users.findAll();
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
  let user = await db.users.findByPk(id);
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
  const user = await db.users.create(req.body);
  res.json({
    status: 200,
    message: "Success create user",
    data: user,
  });
});

module.exports = router;
