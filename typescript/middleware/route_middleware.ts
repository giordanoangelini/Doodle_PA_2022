import * as Controller from '../controller';

export function check_value_create_event (req: any, res: any, next: any) : void {
    if (req.body.title != null && 
        req.body.owner != null && 
        req.body.gmt != null &&  
        req.body.modality != null && 
        req.body.datetimes != null &&  
        req.body.status != null &&
        [1,2,3].includes(req.body.modality)
        ) {
        console.log('CheckValue MW Passed');
        next();
    } else next(new Error("Invalid attributes"));
}

export function check_owner_exist(req: any, res: any, next: any) : void {
    Controller.checkUserbyEmail(req.body.owner).then((check) => {
        if (check) {
            console.log('CheckOwnerExist MW Passed');
            next();
        } else next(new Error("Owner does not exist"));
    });
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