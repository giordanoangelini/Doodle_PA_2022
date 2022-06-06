import * as RequestMiddleware from './request_middleware';
import * as RouteMiddleware from './route_middleware';

export const JWT = [
    RequestMiddleware.checkAuthHeader, 
    RequestMiddleware.checkToken, 
    RequestMiddleware.verifyAndAuthenticate
];

export const NONJWT = [
    RequestMiddleware.checkPayloadHeader,
    RequestMiddleware.checkPayload
];

export const create_event = [
    RouteMiddleware.check_value_create_event,
    RouteMiddleware.check_owner_exist
];

export const show_events = [
    RouteMiddleware.check_owner_exist
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
