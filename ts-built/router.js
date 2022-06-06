"use strict";
exports.__esModule = true;
var express = require("express");
var Controller = require("./controller");
var Middleware = require("./middleware/middleware_chains");
var app = express();
app.use(express.json());
// Richiesta che consente di creare un evento (Autenticazione JWT)
app.post('/create-event', Middleware.JWT, Middleware.create_event, function (req, res) {
    Controller.createEvent(req.body, res);
});
// Richiesta che restituisce gli eventi creati da uno specifico utente (Autenticazione JWT)
app.get('/show-events', Middleware.JWT, Middleware.show_events, function (req, res) {
    Controller.showEvents(req.body.owner, res);
});
// Richiesta che permette di chiudere le prenotazioni per un certo evento (Autenticazione JWT)
app.post('/close-event', Middleware.JWT, Middleware.close_event, function (req, res) {
    //Controller.showEvents(req.user.id, res);
});
// Richiesta che permette di effettuare una prenotazione per un certo evento
app.post('/book', Middleware.NONJWT, Middleware.book, function (req, res) {
    //Controller.showEvents(req.user.id, res);
});
// Richiesta che permette ad un utente admin di ricaricare i token di un certo utente (Autenticazione JWT)
app.post('/refill', Middleware.JWT, Middleware.refill, function (req, res) {
    //Controller.showEvents(req.user.id, res);
});
// Richiesta che permette di cancellare un evento per il quale non sono state espresse preferenze (Autenticazione JWT)
app.post('/delete-event', Middleware.JWT, Middleware.delete_event, function (req, res) {
    //Controller.showEvents(req.user.id, res);
});
// Richiesta che restituisce le prenotazioni effettuate per un certo evento (Autenticazione JWT)
app.get('/show-bookings', Middleware.JWT, Middleware.show_bookings, function (req, res) {
    //Controller.showEvents(req.user.id, res);
});
app.listen(8080);
