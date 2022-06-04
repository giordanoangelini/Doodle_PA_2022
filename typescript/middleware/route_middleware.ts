import * as Controller from '../controller';

export function check_null_value_create_event (req: any, res: any, next: any) : void {
    console.log("create_event MW");
    if (req.body.title != null && 
        req.body.owner != null && 
        req.body.gmt != null &&  
        req.body.modality != null && 
        req.body.datetimes != null &&  
        req.body.status != null
        ) {
        console.log('checkNULLValue MW Passed');
        next();
    } else next(new Error("Values cannot be NULL"));
}

export function check_owner_exist_create_event (req: any, res: any, next: any) : void {
    if (Controller.checkUserbyEmail(req.body.email)) {
        console.log('checkOwnerExist MW Passed');
        next();
    } else next(new Error("Owner not exists"));
}

export function show_events (req: any, res: any, next: any) : void {
    console.log("show_events MW");
    next();
}

export function delete_event (req: any, res: any, next: any) : void {
    console.log("delete_event MW");
    next();
}

export function close_event (req: any, res: any, next: any) : void {
    console.log("close_event MW");
    next();
}

export function show_bookings (req: any, res: any, next: any) : void {
    console.log("show_bookings MW");
    next();
}

export function book (req: any, res: any, next: any) : void {
    console.log("book MW");
    next();
}

export function refill (req: any, res: any, next: any) : void {
    console.log("refill MW");
    next();
}