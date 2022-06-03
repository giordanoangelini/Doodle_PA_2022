"use strict";
exports.__esModule = true;
exports.errorHandler = exports.logErrors = exports.checkPayload = exports.verifyAndAuthenticate = exports.checkToken = exports.checkPayloadHeader = exports.checkAuthHeader = void 0;
require('dotenv').config();
var jwt = require("jsonwebtoken");
// Controlla che la richiesta HTTP abbia un Authorization Header
function checkAuthHeader(req, res, next) {
    if (req.headers.authorization) {
        console.log('checkAuthHeader MW Passed');
        next();
    }
    else
        next(new Error("No Authorization Header"));
}
exports.checkAuthHeader = checkAuthHeader;
/* Controlla che la richiesta HTTP abbia un Content Header che specifichi
 * il tipo di contenuto 'application/json' */
function checkPayloadHeader(req, res, next) {
    if (req.headers["content-type"] == 'application/json') {
        console.log('checkPayloadHeader MW Passed');
        next();
    }
    else
        next(new Error("No JSON Payload Header"));
}
exports.checkPayloadHeader = checkPayloadHeader;
// Controlla che nell'header compaia il TOKEN
function checkToken(req, res, next) {
    var bearerHeader = req.headers.authorization;
    if (typeof bearerHeader !== 'undefined') {
        var bearerToken = bearerHeader.split(' ')[1];
        req.token = bearerToken;
        console.log('checkToken MW Passed');
        next();
    }
    else
        res.send(403);
}
exports.checkToken = checkToken;
// Verifica la chiave segreta del TOKEN
function verifyAndAuthenticate(req, res, next) {
    try {
        var decoded = jwt.verify(req.token, process.env.KEY);
        if (decoded != null) {
            req.body = decoded;
            console.log('verifyAndAuthenticate MW Passed');
            next();
        }
    }
    catch (error) {
        next(error);
    }
}
exports.verifyAndAuthenticate = verifyAndAuthenticate;
// Controlla che la richiesta HTTP abbia un JSON ben formattato nel body
function checkPayload(req, res, next) {
    try {
        req.body = JSON.parse(JSON.stringify(req.body));
        console.log('checkPayload MW Passed');
        next();
    }
    catch (error) {
        next(error);
    }
}
exports.checkPayload = checkPayload;
// Stampa gli errori sulla console
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
