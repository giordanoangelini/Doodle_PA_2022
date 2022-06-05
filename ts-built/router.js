"use strict";
exports.__esModule = true;
var express = require("express");
var RequestMiddleware = require("./middleware/request_middleware");
var RouteMiddleware = require("./middleware/route_middleware");
var Controller = require("./controller");
var app = express();
var JWT = [
    RequestMiddleware.checkAuthHeader,
    RequestMiddleware.checkToken,
    RequestMiddleware.verifyAndAuthenticate,
    RequestMiddleware.logErrors,
    RequestMiddleware.errorHandler
];
var NONJWT = [
    express.json(),
    RequestMiddleware.checkPayloadHeader,
    RequestMiddleware.checkPayload,
    RequestMiddleware.logErrors,
    RequestMiddleware.errorHandler
];
var create_event = [
    RouteMiddleware.check_null_value_create_event,
    RouteMiddleware.check_owner_exist
];
// Richiesta che consente di creare un evento (Autenticazione JWT)
app.post('/create-event', JWT, create_event, function (req, res) {
    Controller.createEvent(req.body, res).then(function (result) {
        if (result) {
            Controller.decreaseToken(req.body);
            res.json("Event created successfully");
        }
    });
});
// Richiesta che restituisce gli eventi creati da uno specifico utente (Autenticazione JWT)
app.get('/show-events', JWT, RouteMiddleware.check_owner_exist, function (req, res) {
    Controller.showEvents(req.body.owner).then(function (result) {
        res.json(result);
    });
});
// Richiesta che permette di cancellare un evento per il quale non sono state espresse preferenze (Autenticazione JWT)
app.post('/delete-event', JWT, RouteMiddleware.delete_event, function (req, res) {
    res.json(req.body);
    //Controller.showEvents(req.user.id, res);
});
// Richiesta che permette di chiudere le prenotazioni per un certo evento (Autenticazione JWT)
app.post('/close-event', JWT, RouteMiddleware.close_event, function (req, res) {
    res.json(req.body);
    //Controller.showEvents(req.user.id, res);
});
// Richiesta che restituisce le prenotazioni effettuate per un certo evento (Autenticazione JWT)
app.get('/show-bookings', JWT, RouteMiddleware.show_bookings, function (req, res) {
    res.json(req.body);
    //Controller.showEvents(req.user.id, res);
});
// Richiesta che permette di effettuare una prenotazione per un certo evento
app.post('/book', NONJWT, RouteMiddleware.book, function (req, res) {
    res.json(req.body);
    //Controller.showEvents(req.user.id, res);
});
// Richiesta che permette ad un utente admin di ricaricare i token di un certo utente (Autenticazione JWT)
app.post('/refill', JWT, RouteMiddleware.refill, function (req, res) {
    res.json(req.body);
    //Controller.showEvents(req.user.id, res);
});
app.listen(8080);
