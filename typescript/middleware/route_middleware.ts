import * as Controller from '../controller';
import { ErrorEnum } from '../factory/error';

// Controlla che i valori contenuti nel payload siano compatibili
export function checkPayload(req: any, res: any, next: any) : void {
    if (typeof req.body.title == 'string' && 
        typeof req.body.link == 'string' &&
        [1,2,3].includes(req.body.modality) &&
        checkDatetimes(req.body.datetimes) &&
        checkCoordinates(req.body.latitude, req.body.longitude)) {
        next();
    } else next(ErrorEnum.MalformedPayload);
}

function checkDatetime(datetime: string): boolean {
    const check = new RegExp(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}[+-]\d{2}:\d{2}$/);
    return (!check.test(datetime) || !Date.parse(datetime));
}

function checkDatetimes(datetime: string[]): boolean {
    const array: string[] = datetime.filter(checkDatetime);
    console.log(array);
    return array.length == 0;
}

function checkCoordinates(latitude: number, longitude: number): boolean {
    if(latitude && !longitude || !latitude && longitude) return false;
    if(latitude == null && longitude == null) return true;
    return (latitude <= 90 && latitude >= -90) && (longitude <= 180 && longitude >= -180);
}

export function checkUserExistence(req: any, res: any, next: any) : void {
    Controller.checkUserExistence(req.body.owner).then((check) => {
        if(check) next();
        else next(ErrorEnum.NotFound);
    });
}

export function checkUserBalance(req: any, res: any, next: any): void {
    Controller.checkBalance(req.body.owner,req.body.modality).then((check) => {
        if(check) next();
        else next(ErrorEnum.Unauthorized);
    })
}

export function checkEventExistence(req: any, res: any, next: any): void {
    Controller.checkEventExistence(req.body.event_id).then((check) => {
        if(check) next();
        else next(ErrorEnum.NotFound);
    })
}

export function checkEventOwner(req: any, res: any, next: any): void {
    Controller.checkEventOwner(req.body.event_id, req.body.sender_id).then((check) => {
        if(check) next();
        else next(ErrorEnum.Unauthorized);
    })
}

export function checkEventBookings(req: any, res: any, next: any): void {
    Controller.getEventBookings(req.body.event_id).then((check: any) => {
        if(check.length == 0) next();
        else next(ErrorEnum.Forbidden);
    })
}

export function checkAdmin(req: any, res: any, next: any): void {
    if(req.body.sender_role == 'admin') next();
    else next(ErrorEnum.Unauthorized);
}

export function checkUserExistence_REFILL(req: any, res: any, next: any) : void {
    Controller.checkUserExistence(req.body.email).then((check) => {
        if(check) next();
        else next(ErrorEnum.NotFound);
    });
}