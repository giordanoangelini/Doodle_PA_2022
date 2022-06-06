import * as RequestMiddleware from './request_middleware';
import * as RouteMiddleware from './route_middleware';

export const JWT = [
    RequestMiddleware.checkAuthHeader, 
    RequestMiddleware.checkToken, 
    RequestMiddleware.verifyAndAuthenticate
];

export const NONJWT = [
    RequestMiddleware.checkPayloadHeader,
    RequestMiddleware.checkJSONPayload
];

export const create_event = [
    RouteMiddleware.checkPayload,
    RouteMiddleware.checkOwner,
    RouteMiddleware.checkBalance
];

export const show_events = [
    RouteMiddleware.checkOwner
];

export const close_event = [
];

export const book = [
];

export const refill = [
];

export const delete_event = [
];

export const show_bookings = [
];

export const error_handling =[
    RequestMiddleware.logErrors,
    RequestMiddleware.errorHandler
] ;
