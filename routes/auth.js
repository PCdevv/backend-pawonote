var express = require('express');
var router = express.Router();
const { auth } = require('../controller/index')

router.post('/register', auth.register)
router.post('/login', auth.login)
router.post('/logout', auth.logout)

// router.post("/login", async (req, res, next) => {
//   // validation
//   const schema = {
//     username: "string",
//     password: "string|optional",
//   };
//   const validate = v.validate(req.body, schema);
//   if (validate.length) {
//     return res.status(400).json(validate);
//   }
//   // proses create
//   const user = await User.create(req.body);
//   res.json({
//     status: 200,
//     message: "Success create user",
//     data: user,
//   });
// });

// router.post("/logout", async (req, res, next) => {
//   // validation
//   const schema = {
//     username: "string",
//     password: "string|optional",
//   };
//   const validate = v.validate(req.body, schema);
//   if (validate.length) {
//     return res.status(400).json(validate);
//   }
//   // proses create
//   const user = await User.create(req.body);
//   res.json({
//     status: 200,
//     message: "Success create user",
//     data: user,
//   });
// });

module.exports = router;
