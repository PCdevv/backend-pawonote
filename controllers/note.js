const Validator = require('fastest-validator');
const v = new Validator();
const model = require("../models/index");
const controller = {};

// GET
controller.getNotes = async (req, res, next) => {
    const notes = await model.note.findAll();
    return res.json({
        status: 200,
        message: "Get all data suksess",
        data: notes,
    });
};

// GET by id
controller.getNote = async (req, res, next) => {
    const id = req.params.id;
    let note = await model.note.findByPk(id);
    if (!note) {
        return res.status(404).json({status: 404, message: "Data not found"})
    } else {
        return res.json({
        status: 200,
        message: "Get data by id suksess",
        data: note,
        });
    }
};

// POST
controller.createNote = async (req, res, next) => {
    // validation
    const schema = {
        title: "string",
        description: "string|optional",
        ingredients: "string",
        steps: "string"
    };
    const validate = v.validate(req.body, schema);
    if (validate.length) {
        return res.status(400).json(validate);
    }

    // CREATE
    const note = await model.note.create(req.body);
    res.json({
        status: 200,
        message: "Create data suksess",
        data: note,
    });
};

// UPDATE
controller.updateNote = async (req, res, next) => {
    const id = req.params.id;
    let note = await model.note.findByPk(id);
    if (!note) {
        return res.status(404).json({status: 404, message: "Data not found"})
    }
    // validation
    const schema = {
        title: "string|optional",
        description: "string|optional",
        ingredients: "string",
        steps: "string"
    };
    const validate = v.validate(req.body, schema);
    if (validate.length) {
        return res.status(400).json(validate);
    }
    //proses
    note = await note.update(req.body);
    res.json({
        status: 200,
        message: "Update data suksess",
        data: note,
    });
};

// DELETE
controller.deleteNote = async (req, res, next) => {
    const id = req.params.id;
    let note = await model.note.findByPk(id);
    if (!note) {
        return res.status(404).json({status: 404, message: "Data not found"})
    }

    //proses
    await note.destroy();
    res.json({
        status: 200,
        message: "Delete data suksess",
        data: note,
    });
};

module.exports = controller;