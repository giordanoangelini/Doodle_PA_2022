"use strict";
exports.__esModule = true;
exports.errorHandler = exports.logErrors = exports.verifyAndAuthenticate = exports.checkToken = exports.checkHeader = exports.requestTime = void 0;
require('dotenv').config();
var jwt = require("jsonwebtoken");
// Aggiunge nel corpo della richiesta il timestamp 
function requestTime(req, res, next) {
    req.requestTime = Date.now();
    next();
}
exports.requestTime = requestTime;
// Controlla che la richiesta HTTP abbia un header
function checkHeader(req, res, next) {
    var authHeader = req.headers.authorization;
    if (authHeader) {
        next();
    }
    else {
        var err = new Error("No authorization header");
        next(err);
    }
}
exports.checkHeader = checkHeader;
// Controlla che nell'header compaia il TOKEN
function checkToken(req, res, next) {
    var bearerHeader = req.headers.authorization;
    if (typeof bearerHeader !== 'undefined') {
        var bearerToken = bearerHeader.split(' ')[1];
        req.token = bearerToken;
        next();
    }
    else {
        res.sendStatus(403);
    }
}
exports.checkToken = checkToken;
// Verifica la chiave segreta del TOKEN
function verifyAndAuthenticate(req, res, next) {
    var decoded = jwt.verify(req.token, process.env.KEY);
    if (decoded !== null)
        req.user = decoded;
    console.log('LOGGED');
    next();
}
exports.verifyAndAuthenticate = verifyAndAuthenticate;
// Stampa gli errori sulla consol
function logErrors(err, req, res, next) {
    console.error(err.stack);
    next(err);
}
exports.logErrors = logErrors;
// Ritorna nella response l'errore sollevato
function errorHandler(err, req, res, next) {
    res.status(500).send({ "Error": err.message });
}
exports.errorHandler = errorHandler;
