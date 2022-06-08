import { request } from 'express';
import * as Controller from '../controller';
import { ErrorEnum } from '../factory/error';
import { any_other, book } from './middleware_chain';

// Controlla che i valori contenuti nel payload siano compatibili
export function checkPayload(req: any, res: any, next: any) : void {
    if (typeof req.body.title == 'string' && 
        typeof req.body.link == 'string' &&
        [1,2,3].includes(req.body.modality) &&
        checkCoordinates(req.body.latitude, req.body.longitude)) {
        next();
    } else next(ErrorEnum.MalformedPayload);
}
function checkCoordinates(latitude: number, longitude: number): boolean {
    if(latitude && !longitude || !latitude && longitude) return false;
    if(latitude == null && longitude == null) return true;
    return (latitude <= 90 && latitude >= -90) && (longitude <= 180 && longitude >= -180);
}

export function checkDatetimes(req: any, res: any, next: any) : void{
    const array: string[] = req.body.datetimes.filter(checkDatetime);
    if (array.length == 0) {
        if(new Set(req.body.datetimes).size !== req.body.datetimes.length) next(ErrorEnum.DuplicateDatetimes);
        else next();
    }
    else next(ErrorEnum.MalformedPayload);
}
function checkDatetime(datetime: string): boolean {
    const check = new RegExp(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}[+-]\d{2}:\d{2}$/);
    return (!check.test(datetime) || !Date.parse(datetime));
}

export function checkUserExistence(req: any, res: any, next: any) : void {
    Controller.checkUserExistence(req.body.owner, res).then((check) => {
        if(check) next();
        else next(ErrorEnum.UserNotFound);
    });
}

export function checkUserBalance(req: any, res: any, next: any): void {
    Controller.checkBalance(req.body.owner, req.body.modality, res).then((check) => {
        if(check) next();
        else next(ErrorEnum.InsufficientBalance);
    })
}

export function checkEventExistence(req: any, res: any, next: any): void {
    Controller.checkEventExistence(req.body.event_id, res).then((check) => {
        if(check) next();
        else next(ErrorEnum.EventNotFound);
    })
}

export function checkEventOwner(req: any, res: any, next: any): void {
    Controller.checkEventOwner(req.body.event_id, req.body.sender_id, res).then((check) => {
        if(check) next();
        else next(ErrorEnum.Unauthorized);
    })
}

export function checkEventBookings(req: any, res: any, next: any): void {
    Controller.getEventBookings(req.body.event_id, res).then((check: any) => {
        if(check.length == 0) next();
        else next(ErrorEnum.BookedEvent);
    })
}

export function checkLimit(req: any, res: any, next: any): void {
    if(req.body.limit){
        if(typeof req.body.limit == 'number' && req.body.limit > 0) next();
        else next(ErrorEnum.MalformedPayload);
    } else next();
}

export function checkEventStatus(req: any, res: any, next: any): void {
    Controller.getEventStatus(req.body.event_id, res).then((result: number) => {
        if(result == 0) next(ErrorEnum.EventClosed);
        else next();
    })
}

export function checkModality(req: any, res: any, next: any): void {
    Controller.getEventModality(req.body.event_id, res).then((modality) => {
        if(!req.body.limit && modality == 1) {
            req.body.limit = 10;
            next();
        } else if(req.body.limit && modality == 1) next();
        else {
            req.body.limit = null;
            next();
        }
    });
}

export function checkBookingExistence(req: any, res: any, next: any): void {
    req.body.datetimes.forEach((elem: string) => {
        Controller.checkBookingExistence(req.body.event_id, elem, req.body.email, res).then((result: any) =>{
            if(result) next(ErrorEnum.DuplicateDatetimes);
            else next();
        })
    });
}

export function checkDatetimesExistence(req: any, res: any, next: any): void {
    Controller.getEventDatetimes(req.body.event_id, res).then((event_datetimes: any) => {
        let array: string[] = req.body.datetimes.filter((element: string) => !event_datetimes.includes(element));
        if(array.length != 0) next(ErrorEnum.UnplannedDatetimes)
        else next();
    });
}

export function checkBookingSecondModality(req: any, res: any, next: any): void {
    Controller.getEventModality(req.body.event_id, res).then((modality) => {
        if (modality == 2 || modality == 3) {
            Controller.getEventBookings(req.body.event_id, res).then((result: any) => {
                let bookings: string[] = result.map((elem: any) => elem.datetime);
                req.body.datetimes.forEach((elem: string) => {
                    if (bookings.includes(elem)) next(ErrorEnum.AlreadyBookedDatetime);
                    else next();
                });
            });
        } else next();
    });
}

export function checkBookingThirdModality(req: any, res: any, next: any): void {
    Controller.getEventModality(req.body.event_id, res).then((modality) => {
        if(modality == 3) {
            if (req.body.datetimes.length != 1) next(ErrorEnum.AlreadyBookedEvent);
            else {
                Controller.getEventBookings(req.body.event_id, res).then((result: any) => {
                    let bookings: any = result.filter((elem: any) => elem.email == req.body.email);
                    if(bookings.length != 0) next(ErrorEnum.BadRequest);
                    else next();
                });
            }
        } else next();
    });
}

export function checkRefill(req: any, res: any, next: any): void {
    if (req.body.token <= 0) next(ErrorEnum.MalformedPayload);
    else next();
}

export function checkAdmin(req: any, res: any, next: any): void {
    Controller.checkUserExistence(req.body.sender_id, res).then((check) => {
        if(check) {
            Controller.getRole(req.body.sender_id, res).then((role: string) => {
                if(role == 'admin' && req.body.sender_role == 'admin') next()
                else next(ErrorEnum.Unauthorized);
            });
        } else next(ErrorEnum.UserNotFound);
    });
}