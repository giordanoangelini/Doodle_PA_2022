"use strict";
exports.__esModule = true;
exports.error_handling = exports.refill = exports.book = exports.show_bookings = exports.close_event = exports.delete_event = exports.show_events = exports.create_event = exports.NONJWT = exports.JWT = void 0;
var RequestMiddleware = require("./request_middleware");
var RouteMiddleware = require("./route_middleware");
exports.JWT = [
    RequestMiddleware.checkAuthHeader,
    RequestMiddleware.checkToken,
    RequestMiddleware.verifyAndAuthenticate
];
exports.NONJWT = [
    RequestMiddleware.checkPayloadHeader,
    RequestMiddleware.checkJSONPayload
];
exports.create_event = [
    RouteMiddleware.checkPayload,
    RouteMiddleware.checkUserExistence,
    RouteMiddleware.checkUserBalance
];
exports.show_events = [
    RouteMiddleware.checkUserExistence
];
exports.delete_event = [
    RouteMiddleware.checkEventExistence,
    RouteMiddleware.checkEventOwner,
    RouteMiddleware.checkEventBookings
];
exports.close_event = [
    RouteMiddleware.checkEventExistence,
    RouteMiddleware.checkEventOwner
];
exports.show_bookings = [
    RouteMiddleware.checkEventExistence,
    RouteMiddleware.checkEventOwner
];
exports.book = [];
exports.refill = [
    RouteMiddleware.checkAdmin,
    RouteMiddleware.checkUserExistence_REFILL
];
exports.error_handling = [
    RequestMiddleware.logErrors,
    RequestMiddleware.errorHandler
];
