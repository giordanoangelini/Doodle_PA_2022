"use strict";
exports.__esModule = true;
exports.checkUserExistence_REFILL = exports.checkAdmin = exports.checkEventBookings = exports.checkEventOwner = exports.checkEventExistence = exports.checkUserBalance = exports.checkUserExistence = exports.checkPayload = void 0;
var Controller = require("../controller");
var error_1 = require("../factory/error");
// Controlla che i valori contenuti nel payload siano compatibili
function checkPayload(req, res, next) {
    if (typeof req.body.title == 'string' &&
        typeof req.body.link == 'string' &&
        [1, 2, 3].includes(req.body.modality) &&
        checkDatetimes(req.body.datetimes) &&
        checkCoordinates(req.body.latitude, req.body.longitude)) {
        next();
    }
    else
        next(error_1.ErrorEnum.MalformedPayload);
}
exports.checkPayload = checkPayload;
function checkDatetime(datetime) {
    var check = new RegExp(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}[+-]\d{2}:\d{2}$/);
    return (!check.test(datetime) || !Date.parse(datetime));
}
function checkDatetimes(datetime) {
    var array = datetime.filter(checkDatetime);
    console.log(array);
    return array.length == 0;
}
function checkCoordinates(latitude, longitude) {
    if (latitude && !longitude || !latitude && longitude)
        return false;
    if (latitude == null && longitude == null)
        return true;
    return (latitude <= 90 && latitude >= -90) && (longitude <= 180 && longitude >= -180);
}
function checkUserExistence(req, res, next) {
    Controller.checkUserExistence(req.body.owner).then(function (check) {
        if (check)
            next();
        else
            next(error_1.ErrorEnum.NotFound);
    });
}
exports.checkUserExistence = checkUserExistence;
function checkUserBalance(req, res, next) {
    Controller.checkBalance(req.body.owner, req.body.modality).then(function (check) {
        if (check)
            next();
        else
            next(error_1.ErrorEnum.Unauthorized);
    });
}
exports.checkUserBalance = checkUserBalance;
function checkEventExistence(req, res, next) {
    Controller.checkEventExistence(req.body.event_id).then(function (check) {
        if (check)
            next();
        else
            next(error_1.ErrorEnum.NotFound);
    });
}
exports.checkEventExistence = checkEventExistence;
function checkEventOwner(req, res, next) {
    Controller.checkEventOwner(req.body.event_id, req.body.sender_id).then(function (check) {
        if (check)
            next();
        else
            next(error_1.ErrorEnum.Unauthorized);
    });
}
exports.checkEventOwner = checkEventOwner;
function checkEventBookings(req, res, next) {
    Controller.getEventBookings(req.body.event_id).then(function (check) {
        if (check.length == 0)
            next();
        else
            next(error_1.ErrorEnum.Forbidden);
    });
}
exports.checkEventBookings = checkEventBookings;
function checkAdmin(req, res, next) {
    if (req.body.sender_role == 'admin')
        next();
    else
        next(error_1.ErrorEnum.Unauthorized);
}
exports.checkAdmin = checkAdmin;
function checkUserExistence_REFILL(req, res, next) {
    Controller.checkUserExistence(req.body.email).then(function (check) {
        if (check)
            next();
        else
            next(error_1.ErrorEnum.NotFound);
    });
}
exports.checkUserExistence_REFILL = checkUserExistence_REFILL;
