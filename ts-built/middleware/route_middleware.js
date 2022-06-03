"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.show_events = exports.create_event = void 0;
function create_event(req, res, next) {
    console.log("CreateEvent MW");
    next();
}
exports.create_event = create_event;
function show_events(req, res, next) {
    console.log("ShowEvents MW");
    next();
}
exports.show_events = show_events;
