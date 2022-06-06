"use strict";
exports.__esModule = true;
exports.refill = exports.book = exports.show_bookings = exports.close_event = exports.delete_event = exports.check_owner_exist = exports.check_value_create_event = void 0;
var Controller = require("../controller");
function check_value_create_event(req, res, next) {
    if (req.body.title != null &&
        req.body.owner != null &&
        req.body.gmt != null &&
        req.body.modality != null &&
        req.body.datetimes != null &&
        req.body.status != null &&
        [1, 2, 3].includes(req.body.modality)) {
        console.log('CheckValue MW Passed');
        next();
    }
    else
        next(new Error("Invalid attributes"));
}
exports.check_value_create_event = check_value_create_event;
function check_owner_exist(req, res, next) {
    Controller.checkUserbyEmail(req.body.owner).then(function (check) {
        if (check) {
            console.log('CheckOwnerExist MW Passed');
            next();
        }
        else
            next(new Error("Owner does not exist"));
    });
}
exports.check_owner_exist = check_owner_exist;
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
