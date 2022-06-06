"use strict";
exports.__esModule = true;
exports.error_handling = exports.show_bookings = exports.delete_event = exports.refill = exports.book = exports.close_event = exports.show_events = exports.create_event = exports.NONJWT = exports.JWT = void 0;
var RequestMiddleware = require("./request_middleware");
var RouteMiddleware = require("./route_middleware");
exports.JWT = [
    RequestMiddleware.checkAuthHeader,
    RequestMiddleware.checkToken,
    RequestMiddleware.verifyAndAuthenticate
];
exports.NONJWT = [
    RequestMiddleware.checkPayloadHeader,
    RequestMiddleware.checkPayload
];
exports.create_event = [
    RouteMiddleware.check_value_create_event,
    RouteMiddleware.check_owner_exist
];
exports.show_events = [
    RouteMiddleware.check_owner_exist
];
exports.close_event = [];
exports.book = [];
exports.refill = [];
exports.delete_event = [];
exports.show_bookings = [];
exports.error_handling = [
    RequestMiddleware.logErrors,
    RequestMiddleware.errorHandler
];
