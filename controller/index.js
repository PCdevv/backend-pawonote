const notes = require('./notesController')
const users = require('./usersController')
const auth = require('./authController')
const controller = {}

controller.notes = notes
controller.users = users
controller.auth = auth

module.exports = controller