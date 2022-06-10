import * as Controller from '../controller';
import { ErrorEnum } from '../factory/error';

// Controlla che i valori contenuti nel payload siano compatibili
export function checkPayload(req: any, res: any, next: any) : void {
    if (typeof req.body.title == 'string' && 
        (typeof req.body.link == 'string' || (!req.body.link && req.body.link != 0)) &&
        checkCoordinates(req.body.latitude, req.body.longitude) &&
        [1,2,3].includes(req.body.modality)) {
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
    if(req.body.limit || req.body.limit == 0){
        if(typeof req.body.limit == 'number' && req.body.limit > 0) next();
        else next(ErrorEnum.MalformedPayload);
    } else next();
}

export function adjustLimit(req: any, res: any, next: any): void {
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

export function checkEventStatus(req: any, res: any, next: any): void {
    Controller.getEventStatus(req.body.event_id, res).then((result: number) => {
        if(result == 0) next(ErrorEnum.EventClosed);
        else next();
    })
}

export function getEventModality(req: any, res: any, next: any): void {
    Controller.getEventModality(req.body.event_id, res).then((modality) => {
        req.body.modality = modality;
        next();
    });
}

export function checkBookingExistence(req: any, res: any, next: any): void {
    Controller.getEventBookings(req.body.event_id, res).then((bookings: any) => {
        let duplicates: any[] = bookings.filter((elem: any) => 
            elem.email == req.body.email &&
            elem.datetime == req.body.datetime &&
            elem.event_id == req.body.event_id);
        if(duplicates.length != 0) next(ErrorEnum.DuplicateDatetimes);
        else next();
    })
}

export function checkDatetimesExistence(req: any, res: any, next: any): void {
    Controller.getEventDatetimes(req.body.event_id, res).then((event_datetimes: any) => {
        let array: string[] = req.body.datetimes.filter((element: string) => !event_datetimes.includes(element));
        if(array.length != 0) next(ErrorEnum.UnplannedDatetimes)
        else next();
    });
}

export function checkBookingSecondModality(req: any, res: any, next: any): void {   
    if (req.body.modality == 2 || req.body.modality == 3) {
        Controller.getEventBookings(req.body.event_id, res).then((result: any) => {   
        let duplicates: any = result.filter((elem: any) => req.body.datetimes.includes(elem.datetime));
            if (duplicates.length != 0) next(ErrorEnum.AlreadyBookedDatetime);
            else next();
        });
    } else next();              
}

export function checkBookingThirdModality(req: any, res: any, next: any): void {
    if(req.body.modality == 3) {
        if (req.body.datetimes.length != 1) next(ErrorEnum.OnlyOneBooking);
        else {
            Controller.getEventBookings(req.body.event_id, res).then((result: any) => {
                let duplicates: any = result.filter((elem: any) => elem.email == req.body.email);
                if(duplicates.length != 0) next(ErrorEnum.AlreadyBookedEvent);
                else next();
            })
        }
    } else next();
}

export function checkRefill(req: any, res: any, next: any): void {
    if (typeof req.body.token != 'number' || req.body.token <= 0) next(ErrorEnum.MalformedPayload);
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