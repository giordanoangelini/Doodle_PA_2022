import { Sequelize } from 'sequelize';
import { ErrorEnum, getError } from './factory/error';
import { SuccessEnum, getSuccess } from './factory/success';
import { User, Event, Preference } from './model';
import { SequelizeSingleton } from './singleton/sequelize';

const sequelize: Sequelize = SequelizeSingleton.getConnection();

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
        controllerErrors(ErrorEnum.InternalServer, res);
    }
    return result;
}

// Funzione che controlla che un utente abbia la quantità di token sufficienti a creare l'evento 
export async function checkBalance(email: string, modality: number, res: any): Promise<boolean>{
    let result: any;
    try{
    result = await User.findByPk(email,{raw: true});
    }catch(error){
        controllerErrors(ErrorEnum.InternalServer, res);
    }
    if(result.token >= hashDecreaseToken.get(modality)) return true;
    return false;
}

// Funzione che crea l'evento e lo inserisce nel database
export function createEvent(event: any, res: any): void{
    Event.create(event).then((item) => {
        User.decrement(['token'], {by: hashDecreaseToken.get(event.modality), where: { email: event.owner } });
        const new_res = getSuccess(SuccessEnum.EventCreated).getSuccObj();
        res.status(new_res.status).json({"message":new_res.msg,"event":item});
    }).catch(() => {
        controllerErrors(ErrorEnum.InternalServer, res);
    });
}

export function showEvents(email: string, res: any): void{
    Event.findAll({raw: true, where: { owner : email }}).then((items: object[]) => {
        const active: object[] = items.filter((element: any) => element.status == 1);
        const inactive: object[] = items.filter((element: any) => element.status == 0);
        const new_res = getSuccess(SuccessEnum.ShowEvents).getSuccObj();
        res.status(new_res.status).json({"message":new_res.msg,"active_events":active,"inactive_events":inactive});
    }).catch(() => {
        controllerErrors(ErrorEnum.InternalServer, res);
    });
}

export async function checkEventOwner(event_id: number, owner: string, res: any): Promise<boolean> {
    let result: any;
    try{
        result= await Event.findByPk(event_id,{raw:true});
    }catch(error){
        controllerErrors(ErrorEnum.InternalServer, res);
    }
    return result.owner == owner;
}

export async function checkEventExistence(event_id: number, res: any): Promise<boolean> {
    let result: any;
    try{
    result = await Event.findByPk(event_id);
    }catch(error){
        controllerErrors(ErrorEnum.InternalServer, res);
    }
    return result;
}

export async function getEventModality(event_id: number, res: any): Promise<number> {
    let result: any;
    try{
    result = await Event.findByPk(event_id, {raw: true});
    }catch(error){
        controllerErrors(ErrorEnum.InternalServer, res);
    }
    return result.modality;
}

export async function getEventBookings(event_id: number, res: any): Promise<object> {
    let result: any;
    try{
    result = await Preference.findAll({raw: true, where: { event_id: event_id}});
    }catch(error){
        controllerErrors(ErrorEnum.InternalServer, res);
    }
    return result;
}

export function deleteEvent(event_id: number, res: any): void {
    Event.destroy({where: {id: event_id}}).then(() => {
        const new_res = getSuccess(SuccessEnum.EventDeleted).getSuccObj();
        res.status(new_res.status).json({"message":new_res.msg});
    }).catch(() => {
        controllerErrors(ErrorEnum.InternalServer, res);
    });
}

export function closeEvent(event_id: number, res: any): void {
    Event.update({status: 0}, {where: {id: event_id}}).then(() => {
        const new_res = getSuccess(SuccessEnum.EventClosed).getSuccObj();
        res.status(new_res.status).json({"message":new_res.msg});
    }).catch(() => {
        controllerErrors(ErrorEnum.InternalServer, res);
    });
}

export function showBookings(event_id: number, limit: number, res: any): void {
    if(limit){
        sequelize.query(`SELECT datetime, COUNT(*) as occurrences FROM preference WHERE event_id = ${event_id} GROUP BY datetime ORDER BY occurrences DESC LIMIT ${limit}`).then((items) => {
            const new_res = getSuccess(SuccessEnum.ShowBookings).getSuccObj();
            res.status(new_res.status).json({"message":new_res.msg, "bookings":items[0]});
        }).catch(() => {
            controllerErrors(ErrorEnum.InternalServer, res);
        });
    } else {
        getEventBookings(event_id, res).then((items) => {
            const new_res = getSuccess(SuccessEnum.ShowBookings).getSuccObj();
            res.status(new_res.status).json({"message":new_res.msg, "bookings":items});
        }).catch(() => {
            controllerErrors(ErrorEnum.InternalServer, res);
        });
    }
}

export async function getRole(email: string, res: any): Promise<string> {
    let result: any;
    try{
    result = await User.findByPk(email,{raw: true});
    }catch(error){
        controllerErrors(ErrorEnum.InternalServer, res);
    }
    return result.role;
}

export function refill(refill: any, res: any): void {
    User.update({token: refill.token}, {where: {email: refill.owner}}).then(() => {
        const new_res = getSuccess(SuccessEnum.TokenRefill).getSuccObj();
        res.status(new_res.status).json({"message":new_res.msg});
    }).catch(() => {
        controllerErrors(ErrorEnum.InternalServer, res);
    });
}

export async function checkBookExistence(event_id: number, datetime: string, email: string, res: any): Promise<boolean> {
    let result: any;
    try{
    result = await Preference.findAll(
        {where: {
            event_id: event_id,
            datetime: datetime,
            email: email,
        }});
    }catch(error){
        controllerErrors(ErrorEnum.InternalServer, res);
    }
    return (result.length != 0);
}

export function book(req: any, res: any) : void {
    let response: object[];
    req.datetimes.forEach((elem: any) => {
        Preference.create({
            event_id: req.event_id,
            datetime: elem,
            email: req.email,
            name: req.name,
            surname: req.surname
        }).then((result: any) => {
            response.push(result);
        }).catch(() => {
            controllerErrors(ErrorEnum.InternalServer, res);
        });
    });
    console.log(response);
}

function controllerErrors(err: ErrorEnum, res: any) {
    const new_err = getError(err).getErrorObj();
    console.log(new_err);
    res.status(new_err.status).json(new_err.msg);
}
    