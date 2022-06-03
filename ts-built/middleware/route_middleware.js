"use strict";
exports.__esModule = true;
exports.refill = exports.book = exports.show_bookings = exports.close_event = exports.delete_event = exports.show_events = exports.create_event = void 0;
function create_event(req, res, next) {
    console.log("create_event MW");
    next();
}
exports.create_event = create_event;
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
