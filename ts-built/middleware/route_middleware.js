"use strict";
exports.__esModule = true;
exports.refill = exports.book = exports.show_bookings = exports.close_event = exports.delete_event = exports.show_events = exports.check_owner_exist_create_event = exports.check_null_value_create_event = void 0;
var Controller = require("../controller");
function check_null_value_create_event(req, res, next) {
    console.log("create_event MW");
    if (req.body.title != null &&
        req.body.owner != null &&
        req.body.gmt != null &&
        req.body.modality != null &&
        req.body.datetimes != null &&
        req.body.status != null) {
        console.log('checkNULLValue MW Passed');
        next();
    }
    else
        next(new Error("Values cannot be NULL"));
}
exports.check_null_value_create_event = check_null_value_create_event;
function check_owner_exist_create_event(req, res, next) {
    Controller.checkUserbyEmail(req.body.owner).then(function (check) {
        if (check) {
            console.log('checkOwnerExist MW Passed');
            next();
        }
        else
            next(new Error("Owner not exists"));
    });
}
exports.check_owner_exist_create_event = check_owner_exist_create_event;
function show_events(req, res, next) {
    console.log("show_events MW");
    next();
}
exports.show_events = show_events;
function delete_event(req, res, next) {
    console.log("delete_event MW");
    next();
}
exports.delete_event = delete_event;
function close_event(req, res, next) {
    console.log("close_event MW");
    next();
}
exports.close_event = close_event;
function show_bookings(req, res, next) {
    console.log("show_bookings MW");
    next();
}
exports.show_bookings = show_bookings;
function book(req, res, next) {
    console.log("book MW");
    next();
}
exports.book = book;
function refill(req, res, next) {
    console.log("refill MW");
    next();
}
exports.refill = refill;
