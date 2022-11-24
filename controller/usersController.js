const Validator = require("fastest-validator");
const v = new Validator();
const prisma = require('../prisma');
const User = prisma.user;
const Note = prisma.note;

const getUsers = async (req, res, next) => {
    const users = await User.findMany();
    return res.json({
      status: 200,
      message: "Success get all users",
      data: users,
    });
  }

const getUser = async (req, res, next) => {
  const id = req.params.id;
  // check id in table user
  let user = await User.findUnique({
    where: { id: Number(id) },
  });
  if (!user) {
    return res.status(404).json({ status: 404, message: "User not found" });
  } else {
    return res.json({ status: 200, message: "Success get user", data: user });
  }
}

// const createUser = async (req, res, next) => {
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
//   const user = await User.create({
//     data: {
//       username: req.body.username,
//       password: req.body.password,
//     },
//   });
//   res.json({
//     status: 200,
//     message: "Success create user",
//     data: user,
//   });
// }

const updateUser = async (req, res, next) => {
  const id = req.params.id;
  const user = await User.findUnique({
    where: { id: Number(id) },
  });
  if (!user) {
    return res.status(404).json({ status: 404, message: "User not found" });
  }
  // validation
  const schema = {
    username: "string",
  };
  const validate = v.validate(req.body, schema);
  if (validate.length) {
    return res.status(400).json(validate);
  }
  // proses update
  user = await User.update({
    data: {
      username: req.body.username,
    },
    where: { id: Number(id) }
  });
  res.json({
    status: 200,
    message: "Success update user",
    data: user,
  });
}

const deleteUser = async (req, res, next) => {
  const id = req.params.id;
  // check id in table note
  let user = await User.findUnique({
    where: { id: Number(id) }
  });
  if (!user) {
    return res.status(404).json({ status: 404, message: "User not found" });
  }

  // proses delete data
  user = await User.delete({
    where: { id: Number(id) }
  });
  res.json({
    status: 200,
    message: "Success delete user",
    data: user,
  });
}

module.exports = {
  getUsers,
  getUser,
  updateUser,
  deleteUser
  // createUser
}