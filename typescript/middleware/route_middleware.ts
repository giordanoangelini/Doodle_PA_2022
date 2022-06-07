import * as Controller from '../controller';
import { ErrorEnum } from '../factory/error';

// Controlla 
export function checkPayload_CreateEvent(req: any, res: any, next: any) : void {
    if (typeof req.body.title == 'string' && 
        typeof req.body.owner == 'string' && 
        typeof req.body.gmt == 'string' && // ^(UTC){1}[+]{1}[0-9]{1}$|^(UTC){1}[+]{1}1{1}[0-4]{1}$|^(UTC){1}[-]{1}[0-9]{1}$|^(UTC){1}[-]{1}1{1}[0-2]{1}$
        [1,2,3].includes(req.body.modality) &&
        checkDatetimes(req.body.datetimes) &&  
        [0,1].includes(req.body.status)) {
        next();
    } else next(ErrorEnum.MalformedPayload);
}

function checkDatetime(datetime: string): boolean {
    const check = new RegExp(/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/);
    return (!check.test(datetime) || !Date.parse(datetime));
}

function checkDatetimes(datetime: string[]): boolean {
    const array: string[] = datetime.filter(checkDatetime);
    console.log(array);
    return array.length == 0;
}

export function checkOwner(req: any, res: any, next: any) : void {
    Controller.checkUserbyEmail(req.body.owner).then((check) => {
        if(check) next();
        else next(new Error("Owner does not exist"));
    });
}

export function checkBalance(req: any, res: any, next: any) : void {
    Controller.checkBalance(req.body.owner,req.body.modality).then((check) => {
        if(check) next();
        else next(ErrorEnum.Unauthorized);
    })
}

export function delete_event (req: any, res: any, next: any) : void {
    next();
}

export function close_event (req: any, res: any, next: any) : void {
    next();
}

export function show_bookings (req: any, res: any, next: any) : void {
    next();
}

export function book (req: any, res: any, next: any) : void {
    next();
}

export function refill (req: any, res: any, next: any) : void {
    next();
}