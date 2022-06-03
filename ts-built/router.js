"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var RequestMiddleware = require("./middleware/request_middleware");
var RouteMiddleware = require("./middleware/route_middleware");
var Controller = require("./controller");
var app = express();
app.use(RequestMiddleware.requestTime);
app.use(RequestMiddleware.checkHeader);
app.use(RequestMiddleware.checkToken);
app.use(RequestMiddleware.verifyAndAuthenticate);
app.use(RequestMiddleware.logErrors);
app.use(RequestMiddleware.errorHandler);
app.post('/create-event', RouteMiddleware.create_event, function (req, res) {
    console.log(req.user);
    Controller.createEvent(req.user, res);
});
app.get('/show-events', RouteMiddleware.show_events, function (req, res) {
    console.log(req.user);
    Controller.showEvents(req.user.id, res);
});
app.listen(3000);
