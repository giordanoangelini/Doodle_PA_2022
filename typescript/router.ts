import * as express from 'express';
import * as RequestMiddleware from './middleware/request_middleware';
import * as RouteMiddleware from './middleware/route_middleware';
import * as Controller from './controller';

const app = express();

app.use(RequestMiddleware.requestTime);
app.use(RequestMiddleware.checkHeader);
app.use(RequestMiddleware.checkToken);
app.use(RequestMiddleware.verifyAndAuthenticate);
app.use(RequestMiddleware.logErrors);
app.use(RequestMiddleware.errorHandler);

app.post('/create-event', RouteMiddleware.create_event, function (req: any, res: any) {
    console.log(req.user);
    Controller.createEvent(req.user, res);
})

app.get('/show-events', RouteMiddleware.show_events, function (req: any, res: any) {
    console.log(req.user);
    Controller.showEvents(req.user.id, res);
})

app.listen(3000);