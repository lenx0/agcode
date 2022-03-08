// Importing the packages that we need

const express = require("express");
const app = express();
const bp = require("body-parser");
//const http = require('http');
const https = require('https');
const fs = require('fs');
const cors = require('cors'); // npm install --save cors

require('dotenv').config();

// Using the ejs (Embedded JavaScript templates) as our template engine
// and call the body parser  - middleware for parsing bodies from URL
//                           - middleware for parsing json objects

app.set("view engine", "ejs");
app.use(bp.urlencoded({ extended: false }));
app.use(bp.json());
app.use(cors());

// Controllers

const contollerLogin = require("./controllers/login.controller.js");
const contollerCode = require("./controllers/code.controller.js");

// Simple routing to the index.js file

app.get("/", (req, res) => res.render("code"));
app.get("/login", (req, res) => res.render("login"));
app.post("/login", (req, res) => contollerLogin.login(req, res));
app.post("/logout", (req, res) => contollerLogin.logout(req, res));
app.post("/scan", /*contollerLogin.valide,*/ (req, res) => contollerCode.genQrCode(req, res, "scan"));
app.get("/code", /*contollerLogin.valide,*/ async (req, res) => contollerCode.getQrCode(req, res));
app.get("/code/:ref", /*contollerLogin.valide,*/ async (req, res) => contollerCode.getQrCode(req, res));

// Setting up the port for listening requests

//const port = process.env.PORT | 5000;
//const port_http = process.env.PORT_HTTP | 5000;
const port_https = process.env.PORT_HTTPS | 5001;

const path_cert = process.env.PATH_CERT;

const httpsOptions = {
    key: fs.readFileSync(`${path_cert}/privkey1.pem`),
    cert: fs.readFileSync(`${path_cert}/cert1.pem`),
    ca: fs.readFileSync(`${path_cert}/certca1.pem`),
    passphrase: '7154' /*readFileSync(`${path_cert}/phrase1.pem`)*/
};

//app.listen(port, () => console.log(`Server at ${port}`));

//var httpServer = http.createServer(app);
var httpsServer = https.createServer(httpsOptions, app);

//httpServer.listen(port_http);
httpsServer.listen(port_https);

//console.log(`Server at ${port_http}`);
console.log(`Server at ${port_https}`);