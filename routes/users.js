var express = require('express');
var router = express.Router();
const { users } = require('../controller/index')

// GET ALL USERS
router.get("/", users.getUsers);

// GET DATA BY ID
router.get("/:id", users.getUser);

// POST
// router.post("/", users.createUser);

module.exports = router;
