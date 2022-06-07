import * as express from 'express';
import * as Controller from './controller';
import * as Middleware from './middleware/middleware_chain'
import { getError, ErrorEnum } from './factory/error';

const app = express();
app.use(express.json());

// Richiesta che consente di creare un evento (Autenticazione JWT)
app.post('/create-event', Middleware.JWT , Middleware.create_event, Middleware.error_handling, function (req: any, res: any) {    
    Controller.createEvent(req.body, res);
});

// Richiesta che restituisce gli eventi creati da uno specifico utente (Autenticazione JWT)
app.get('/show-events', Middleware.JWT, Middleware.show_events, Middleware.error_handling, function (req: any, res: any) {
    Controller.showEvents(req.body.owner, res);
});

// Richiesta che permette di cancellare un evento per il quale non sono state espresse preferenze (Autenticazione JWT)
app.post('/delete-event', Middleware.JWT, Middleware.delete_event, Middleware.error_handling, function (req: any, res: any) {
    Controller.deleteEvent(req.body.event_id, res);
});

// Richiesta che permette di chiudere le prenotazioni per un certo evento (Autenticazione JWT)
app.post('/close-event', Middleware.JWT, Middleware.close_event, Middleware.error_handling, function (req: any, res: any) {
    Controller.closeEvent(req.body.event_id, res);
});

// Richiesta che restituisce le prenotazioni effettuate per un certo evento (Autenticazione JWT)
app.get('/show-bookings', Middleware.JWT, Middleware.show_bookings, Middleware.error_handling, function (req: any, res: any) {
    Controller.showBookings(req.body.event_id, res);
});

// Richiesta che permette di effettuare una prenotazione per un certo evento
app.post('/book', Middleware.NONJWT, Middleware.book, Middleware.error_handling, function (req: any, res: any) {
    //Controller.showEvents(req.user.id, res);
});

// Richiesta che permette ad un utente admin di ricaricare i token di un certo utente (Autenticazione JWT)
app.post('/refill', Middleware.JWT, Middleware.refill, Middleware.error_handling, function (req: any, res: any) {
    Controller.refill(req.body, res);
});

// Gestione delle rotte non previste
app.get('*', Middleware.any_other, Middleware.error_handling);
app.post('*', Middleware.any_other, Middleware.error_handling);

app.listen(8080);