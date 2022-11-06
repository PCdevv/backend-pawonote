require("dotenv").config();
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const basicAuth = require('express-basic-auth')
const helmet = require('helmet')


var app = express();

app.use(helmet());

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(basicAuth({
    users: {
        'admin': 'supersecret',
        'puteri': 'adminbilekbet5991',
        'citra': 'citra123'
    },
    unauthorizedResponse: getUnauthorizedResponse
}))

function getUnauthorizedResponse(req) {
    return req.auth
    ? ('Credentials ' + req.auth.user + ':' + req.auth.password + ' rejected')
    : 'No credentials provided'
}

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var notesRouter = require("./routes/notes");

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/notes", notesRouter);

module.exports = app;
