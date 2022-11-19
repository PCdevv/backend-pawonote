const Validator = require("fastest-validator");
const v = new Validator();
const prisma = require('../prisma');
const User = prisma.user;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { serialize } = require('cookie')

const register = async (req, res) => {
    const username = req.body.username;
    // check id in table user
    let users = await User.findMany({
    where: { username: String(username) },
  });
  if (users.length) return res.status(409).json("User already exists!");

  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(req.body.password, salt);
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
  const user = await User.create({
    data: {
      username: req.body.username,
      password: hash,
    },
  });
  res.json({
    status: 200,
    message: "Success create user",
    data: user,
  });
}

const login = async (req, res) => {
  const username = req.body.username;
  // check id in table user
  let user = await User.findMany({
    where: { username: String(username) }
  });
  if (user.length === 0) console.log(user);;
  if (user.length === 0) return res.status(404).json("User not found!");

  // Check password
  const isPasswordCorrect = bcrypt.compareSync(
    req.body.password,
    user[0].password
  );

  if (!isPasswordCorrect)
    return res.status(400).json("Wrong username or password!");

  const maxAge = 3 * 24 * 60 * 60;
  const token = jwt.sign({ id: user[0].id }, "jwtkey", {expiresIn: maxAge});
  const { password, ...data } = user[0];

  // const serialised = serialize("auth", token, {
  //   httpOnly: true,
  //   secure: process.env.NODE_ENV !== "development",
  //   sameSite: "none",
  //   maxAge: maxAge,
  //   path: "/",
  // });
  res.status(200).json({ data, token });
}

const logout = (req, res) => {
  res.clearCookie("access_token",{
    SameSite: 'none',
    secure: true
  }).status(200).json("User has been logged out.")
}

module.exports = {
    register,
    login,
    logout,
}