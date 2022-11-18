require("dotenv").config();
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
// const basicAuth = require('express-basic-auth')
const helmet = require('helmet')
const cors = require('cors')

var app = express();

app.use(helmet());

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
// app.options("*", cors({
//     origin: 'http://127.0.0.1:3000',
//     optionsSuccessStatus: 200
// }))
app.use(
    cors({
        origin: 'http://localhost:3000',
        optionsSuccessStatus: 200
    })
)
// app.use(basicAuth({
//     users: {
//         'admin': 'supersecret',
//         'puteri': 'adminbilekbet5991',
//         'citra': 'citra123'
//     },
//     unauthorizedResponse: getUnauthorizedResponse
// }))

// function getUnauthorizedResponse(req) {
//     return req.auth
//     ? ('Credentials ' + req.auth.user + ':' + req.auth.password + ' rejected')
//     : 'No credentials provided'
// }

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var notesRouter = require("./routes/notes");
var authRouter = require("./routes/auth");

app.use("/api", indexRouter);
app.use("/api/users", usersRouter);
app.use("/api/notes", notesRouter);
app.use("/api/auth", authRouter);

module.exports = app;
