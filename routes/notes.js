var express = require('express');
var router = express.Router();
const controller = require('../controllers/index')

//const Validator = require('fastest-validator');
//const v = new Validator();
//const {Note} = require("../models/note.js");

// GET
router.get("/", controller.note.getNotes);

// GET by id
router.get("/:id", controller.note.getNote);

// POST
router.post("/", async (req, res, next) => {
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
    const note = await Notes.create(req.body);
    res.json({
        status: 200,
        message: "Create data suksess",
        data: note,
    });
});

// UPDATE
router.put("/:id", async (req, res, next) => {
    const id = req.params.id;
    let note = await Notes.findByPk(id);
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
});

// DELETE
router.delete("/:id", async (req, res, next) => {
    const id = req.params.id;
    let note = await Notes.findByPk(id);
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
});

module.exports = router;