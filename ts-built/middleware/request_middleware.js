"use strict";
exports.__esModule = true;
exports.errorHandler = exports.logErrors = exports.checkJSONPayload = exports.verifyAndAuthenticate = exports.checkToken = exports.checkPayloadHeader = exports.checkAuthHeader = void 0;
require('dotenv').config();
var jwt = require("jsonwebtoken");
var error_1 = require("../factory/error");
// Controlla che la richiesta HTTP abbia un Authorization Header
function checkAuthHeader(req, res, next) {
    if (req.headers.authorization)
        next();
    else
        next(error_1.ErrorEnum.NoAuthHeader);
}
exports.checkAuthHeader = checkAuthHeader;
/* Controlla che la richiesta HTTP abbia un Content Header che specifichi
 * il tipo di contenuto 'application/json' */
function checkPayloadHeader(req, res, next) {
    if (req.headers["content-type"] == 'application/json')
        next();
    else
        next(error_1.ErrorEnum.NoPayloadHeader);
}
exports.checkPayloadHeader = checkPayloadHeader;
// Controlla che nell'header compaia il TOKEN
function checkToken(req, res, next) {
    var bearerHeader = req.headers.authorization;
    if (typeof bearerHeader !== 'undefined') {
        var bearerToken = bearerHeader.split(' ')[1];
        req.token = bearerToken;
        next();
    }
    else
        next(error_1.ErrorEnum.Forbidden);
}
exports.checkToken = checkToken;
// Verifica la chiave segreta del TOKEN
function verifyAndAuthenticate(req, res, next) {
    try {
        var decoded = jwt.verify(req.token, process.env.KEY);
        if (decoded != null) {
            req.body = decoded;
            next();
        }
    }
    catch (error) {
        next(error_1.ErrorEnum.Forbidden);
    }
}
exports.verifyAndAuthenticate = verifyAndAuthenticate;
// Controlla che la richiesta HTTP abbia un JSON ben formattato nel body
function checkJSONPayload(req, res, next) {
    try {
        req.body = JSON.parse(JSON.stringify(req.body));
        next();
    }
    catch (error) {
        next(error_1.ErrorEnum.MalformedPayload);
    }
}
exports.checkJSONPayload = checkJSONPayload;
// Stampa gli errori sulla console
function logErrors(err, req, res, next) {
    var new_err = (0, error_1.getError)(err).getErrorObj();
    console.log(new_err);
    next(new_err);
}
exports.logErrors = logErrors;
// Ritorna nella response l'errore sollevato
function errorHandler(err, req, res, next) {
    res.status(err.status).send(err.msg);
}
exports.errorHandler = errorHandler;
