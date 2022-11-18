const Validator = require("fastest-validator");
const v = new Validator();
const prisma = require('../prisma')
const User = prisma.users;
const Note = prisma.note;
const jwt = require('jsonwebtoken');

const getNotes = async (req, res, next) => {
    const notes = await Note.findMany({
      include: { writer: true }
    });
    return res.json({
      status: 200,
      message: "Success get all data",
      data: notes,
    });
  }

const getNote = async (req, res, next) => {
    const id = req.params.id;
    // check id in table note
    let note = await Note.findUnique({
      where: { id: Number(id) },
      include: { writer: true }
    });
    console.log(note);
    if (!note) {
      return res.status(404).json({ status: 404, message: "Data not found" });
    } else {
      return res.json({ status: 200, message: "Success get data", data: note });
    }
  }

const createNote = async (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1]
    if (!token) {
      res.status(200).json({ message: 'Error, token not provided.' })
    }
    const decodedToken = jwt.verify(token, "jwtkey")
    // const id = decodedToken.id
    const user = await prisma.user.findMany({
      where: { id: Number(decodedToken.id) }
    });
    // console.log(user);
    // res.status(200).json({
    //   message: 'Token verified!',
    //   data:{id: decodedToken.id }
    // })

    // validation
    const schema = {
      title: "string",
      description: "string|optional",
      ingredients: "string",
      steps: "string",
    };
    const validate = v.validate(req.body, schema);
    if (validate.length) {
      return res.status(400).json(validate);
    }
    // proses create
    const note = await Note.create({
      data: {
        title: req.body.title,
        description: req.body.description,
        ingredients: req.body.ingredients,
        steps: req.body.steps,
        steps: req.body.steps,
        writerId: decodedToken.id,
      }
    });
    // console.log(note);
    res.json({
      status: 200,
      message: "Token verified! Success create data",
      data: note,
    });
  }

const updateNote = async (req, res, next) => {
    const id = req.params.id;
    let note = await Note.findUnique({
      where: { id: Number(id) },
    });
    if (!note) {
      return res.status(404).json({ status: 404, message: "Data not found" });
    }
    // validation
    const schema = {
      title: "string",
      description: "string|optional",
      ingredients: "string",
      steps: "string",
    };
    const validate = v.validate(req.body, schema);
    if (validate.length) {
      return res.status(400).json(validate);
    }
    // proses update
    note = await Note.update({
      data: {
        title: req.body.title,
        description: req.body.description,
        ingredients: req.body.ingredients,
        steps: req.body.steps,
      },
      where: { id: Number(id) }
    });
    res.json({
      status: 200,
      message: "Success update data",
      data: note,
    });
  }

const deleteNote = async (req, res, next) => {
    const id = req.params.id;
    // check id in table note
    let note = await Note.findUnique({
      where: { id: Number(id) }
    });
    if (!note) {
      return res.status(404).json({ status: 404, message: "Data not found" });
    }
  
    // proses delete data
    note = await Note.delete({
      where: { id: Number(id) }
    });
    res.json({
      status: 200,
      message: "Success delete data",
      data: note,
    });
  }

module.exports = {
    getNotes,
    getNote,
    createNote,
    updateNote,
    deleteNote
}