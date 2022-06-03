"use strict";
exports.__esModule = true;
var express = require("express");
var RequestMiddleware = require("./middleware/request_middleware");
var RouteMiddleware = require("./middleware/route_middleware");
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
// Richiesta che consente di creare un evento (Autenticazione JWT)
app.post('/create-event', JWT, RouteMiddleware.create_event, function (req, res) {
    res.json(req.body);
    //Controller.createEvent(req.user, res);
});
// Richiesta che restituisce gli eventi creati da uno specifico utente (Autenticazione JWT)
app.get('/show-events', JWT, RouteMiddleware.show_events, function (req, res) {
    res.json(req.body);
    //Controller.showEvents(req.user.id, res);
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
