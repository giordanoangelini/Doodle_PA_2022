"use strict";
exports.__esModule = true;
exports.refill = exports.book = exports.show_bookings = exports.close_event = exports.delete_event = exports.checkBalance = exports.checkOwner = exports.checkPayload_CreateEvent = void 0;
var Controller = require("../controller");
var error_1 = require("../factory/error");
// Controlla 
function checkPayload_CreateEvent(req, res, next) {
    if (typeof req.body.title == 'string' &&
        typeof req.body.owner == 'string' &&
        typeof req.body.gmt == 'string' && // ^(UTC){1}[+]{1}[0-9]{1}$|^(UTC){1}[+]{1}1{1}[0-4]{1}$|^(UTC){1}[-]{1}[0-9]{1}$|^(UTC){1}[-]{1}1{1}[0-2]{1}$
        [1, 2, 3].includes(req.body.modality) &&
        checkDatetimes(req.body.datetimes) &&
        [0, 1].includes(req.body.status)) {
        next();
    }
    else
        next(error_1.ErrorEnum.MalformedPayload);
}
exports.checkPayload_CreateEvent = checkPayload_CreateEvent;
function checkDatetime(datetime) {
    var check = new RegExp(/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/);
    return (!check.test(datetime) || !Date.parse(datetime));
}
function checkDatetimes(datetime) {
    var array = datetime.filter(checkDatetime);
    console.log(array);
    return array.length == 0;
}
function checkOwner(req, res, next) {
    Controller.checkUserbyEmail(req.body.owner).then(function (check) {
        if (check)
            next();
        else
            next(new Error("Owner does not exist"));
    });
}
exports.checkOwner = checkOwner;
function checkBalance(req, res, next) {
    Controller.checkBalance(req.body.owner, req.body.modality).then(function (check) {
        if (check)
            next();
        else
            next(error_1.ErrorEnum.Unauthorized);
    });
}
exports.checkBalance = checkBalance;
function delete_event(req, res, next) {
    next();
}
exports.delete_event = delete_event;
function close_event(req, res, next) {
    next();
}
exports.close_event = close_event;
function show_bookings(req, res, next) {
    next();
}
exports.show_bookings = show_bookings;
function book(req, res, next) {
    next();
}
exports.book = book;
function refill(req, res, next) {
    next();
}
exports.refill = refill;
