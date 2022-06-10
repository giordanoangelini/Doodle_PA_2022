import { ErrorEnum, getError } from './factory/error';
import { SuccessEnum, getSuccess } from './factory/success';
import { User, Event, Preference } from './model/model';
import { countOccurences } from './model/raw_queries';

let hashDecreaseToken: Map<number, number> = new Map();
hashDecreaseToken.set(1,1); 
hashDecreaseToken.set(2,2); 
hashDecreaseToken.set(3,4); 

// Funzione che controlla se un utente esiste data la sua email
export async function checkUserExistence(email: string, res: any): Promise<boolean>{
    let result: any;
    try{
        result= await User.findByPk(email);
    }catch(error){
        controllerErrors(ErrorEnum.InternalServer, error, res);
    }
    return result;
}

// Funzione che controlla che un utente abbia la quantità di token sufficienti a creare l'evento 
export async function checkBalance(email: string, modality: number, res: any): Promise<boolean>{
    let result: any;
    try{
        result = await User.findByPk(email,{raw: true});
    }catch(error){
        controllerErrors(ErrorEnum.InternalServer, error, res);
    }
    if(result.token >= hashDecreaseToken.get(modality)) return true;
    else return false;
}

// Funzione che crea l'evento e lo inserisce nel database
export function createEvent(event: any, res: any): void{
    Event.create(event).then((item) => {
        User.decrement(['token'], {by: hashDecreaseToken.get(event.modality), where: { email: event.owner } });
        const new_res = getSuccess(SuccessEnum.EventCreated).getSuccObj();
        res.status(new_res.status).json({message:new_res.msg,event:item});
    }).catch((error) => {
        controllerErrors(ErrorEnum.InternalServer, error, res);
    });
}

export function showEvents(email: string, res: any): void{
    Event.findAll({raw: true, where: { owner : email }}).then((items: object[]) => {
        const active: object[] = items.filter((element: any) => element.status == 1);
        const inactive: object[] = items.filter((element: any) => element.status == 0);
        const new_res = getSuccess(SuccessEnum.ShowEvents).getSuccObj();
        res.status(new_res.status).json({message:new_res.msg,active_events:active,inactive_events:inactive});
    }).catch((error) => {
        controllerErrors(ErrorEnum.InternalServer, error, res);
    });
}

export async function checkEventOwner(event_id: number, owner: string, res: any): Promise<boolean> {
    let result: any;
    try{
        result= await Event.findByPk(event_id,{raw:true});
    }catch(error){
        controllerErrors(ErrorEnum.InternalServer, error, res);
    }
    return result.owner == owner;
}

export async function checkEventExistence(event_id: number, res: any): Promise<boolean> {
    let result: any;
    try{
        result = await Event.findByPk(event_id);
    }catch(error){
        controllerErrors(ErrorEnum.InternalServer, error, res);
    }
    return result;
}

export async function getEventModality(event_id: number, res: any): Promise<number> {
    let result: any;
    try{
        result = await Event.findByPk(event_id, {raw: true});
    }catch(error){
        controllerErrors(ErrorEnum.InternalServer, error, res);
    }
    return result.modality;
}

export async function getEventStatus(event_id: number, res: any): Promise<number> {
    let result: any;
    try{
        result = await Event.findByPk(event_id, {raw: true});
    }catch(error){
        controllerErrors(ErrorEnum.InternalServer, error, res);
    }
    return result.status;
}

export async function getEventDatetimes(event_id: number, res: any): Promise<any> {
    let result: any;
    try{
        result = await Event.findByPk(event_id, {raw: true});
    }catch(error){
        controllerErrors(ErrorEnum.InternalServer, error, res);
    }
    return JSON.parse(result.datetimes);
}

export async function getEventBookings(event_id: number, res: any): Promise<object> {
    let result: any;
    try{
        result = await Preference.findAll({raw: true, where: { event_id: event_id}});
    }catch(error){
        controllerErrors(ErrorEnum.InternalServer, error, res);
    }
    return result;
}

export function deleteEvent(event_id: number, res: any): void {
    Event.destroy({where: {id: event_id}}).then(() => {
        const new_res = getSuccess(SuccessEnum.EventDeleted).getSuccObj();
        res.status(new_res.status).json({message:new_res.msg});
    }).catch((error) => {
        controllerErrors(ErrorEnum.InternalServer, error, res);
    });
}

export function closeEvent(event_id: number, res: any): void {
    Event.update({status: 0}, {where: {id: event_id}}).then(() => {
        const new_res = getSuccess(SuccessEnum.EventClosed).getSuccObj();
        res.status(new_res.status).json({message:new_res.msg});
    }).catch((error) => {
        controllerErrors(ErrorEnum.InternalServer, error, res);
    });
}

export function showBookings(event_id: number, limit: number, res: any): void {
    if(limit){
        countOccurences(event_id, limit).then((result: any) => {
            if(result.error_flag) controllerErrors(ErrorEnum.InternalServer, result.result_body, res);
            else {
                const new_res = getSuccess(SuccessEnum.ShowBookings).getSuccObj();
                res.status(new_res.status).json({message:new_res.msg, bookings:result.result_body[0]});
            }
        });
        } else {
        getEventBookings(event_id, res).then((items) => {
            const new_res = getSuccess(SuccessEnum.ShowBookings).getSuccObj();
            res.status(new_res.status).json({message:new_res.msg, bookings:items});
        }).catch((error) => {
            controllerErrors(ErrorEnum.InternalServer, error, res);
        });
    }
}

export async function getRole(email: string, res: any): Promise<string> {
    let result: any;
    try{
        result = await User.findByPk(email,{raw: true});
    }catch(error){
        controllerErrors(ErrorEnum.InternalServer, error, res);
    }
    return result.role;
}

export function refill(refill: any, res: any): void {
    User.update({token: refill.token}, {where: {email: refill.owner}}).then(() => {
        const new_res = getSuccess(SuccessEnum.TokenRefill).getSuccObj();
        res.status(new_res.status).json({message:new_res.msg});
    }).catch((error) => {
        controllerErrors(ErrorEnum.InternalServer, error, res);
    });
}

export async function checkBookingExistence(event_id: number, datetime: string, email: string, res: any): Promise<boolean> {
    let result: any;
    try{
    result = await Preference.findAll(
        {where: {
            event_id: event_id,
            datetime: datetime,
            email: email,
        }});
    }catch(error){
        controllerErrors(ErrorEnum.InternalServer, error, res);
    }
    return (result.length != 0);
}

export function book(preference: any, res: any) : void {
    for(const element of preference.datetimes) {
        Preference.create({
            event_id: preference.event_id,
            datetime: element,
            email: preference.email,
            name: preference.name,
            surname: preference.surname
        }).catch((error) => {
            controllerErrors(ErrorEnum.InternalServer, error, res);
        });  
    }
    const new_res = getSuccess(SuccessEnum.BookingCompleted).getSuccObj();
    res.status(new_res.status).json({message:new_res.msg});
}

function controllerErrors(enum_error: ErrorEnum, err: Error, res: any) {
    const new_err = getError(enum_error).getErrorObj();
    console.log(err);
    res.status(new_err.status).json(new_err.msg);
}
    