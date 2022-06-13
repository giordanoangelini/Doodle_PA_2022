import { ErrorEnum, getError } from './factory/error';
import { SuccessEnum, getSuccess } from './factory/success';
import { User, Event, Preference } from './model/model';
import { Sequelize } from 'sequelize';

let hashDecreaseToken: Map<number, number> = new Map();
hashDecreaseToken.set(1,1); 
hashDecreaseToken.set(2,2); 
hashDecreaseToken.set(3,4); 

/**
 * Funzione 'checkUserExistence'
 * 
 * Funzione che si occupa di controllare che un utente esista data la sua email.
 * 
 * @param email L'email dell'utente
 * @param res La risposta da parte del server
 * @returns True se l'utente esiste, False altrimenti
 */
export async function checkUserExistence(email: string, res: any): Promise<boolean>{
    let result: any;
    try{
        result = await User.findByPk(email, {raw: true});
    }catch(error){
        controllerErrors(ErrorEnum.InternalServer, error, res);
    }
    return result;
}

/**
 * Funzione 'checkBalance'
 * 
 * Funzione che si occupa di controllare che un utente, data la sua mail, abbia una quantità di token 
 * sufficienti a creare l'evento con la modalità specificata. 
 * Si avvale della Mappa {@link hashDecreaseToken} per associare modalità a costo (in token).
 * 
 * @param email L'email dell'utente
 * @param modality La modalità dell'evento
 * @param res La risposta da parte del server
 * @returns True se l'utente ha abbastanza token, False altrimenti
 */
export async function checkBalance(email: string, modality: number, res: any): Promise<boolean>{
    let result: any;
    try{
        result = await User.findByPk(email, {raw: true});
    }catch(error){
        controllerErrors(ErrorEnum.InternalServer, error, res);
    }
    if(result.token >= hashDecreaseToken.get(modality)) return true;
    else return false;
}

/**
 * Funzione 'createEvent'
 * 
 * Funzione che si occupa di creare un evento date le sue specifiche.
 * Se la creazione va a buon fine vengono decrementati i token dell'owner in base ai costi definiti
 * nella mappa {@link hashDecreaseToken}.
 * 
 * @param event L'oggetto che contiene le specifiche dell'evento da creare
 * @param res La risposta da parte del server
 */
export function createEvent(event: any, res: any): void{
    Event.create(event).then((item) => {
        User.decrement(['token'], {by: hashDecreaseToken.get(event.modality), where: { email: event.owner } });
        const new_res = getSuccess(SuccessEnum.EventCreated).getSuccessObj();
        res.status(new_res.status).json({message:new_res.msg,event:item});
    }).catch((error) => {
        controllerErrors(ErrorEnum.InternalServer, error, res);
    });
}

/**
 * Funzione 'showEvents'
 * 
 * Funzione che si occupa di mostare l'elenco degli eventi che abbiano come owner l'utente specificato
 * dalla mail, dividendo eventi con prenotazioni aperte e chiuse.
 * 
 * @param email L'email dell'utente, owner degli eventi da mandare nella risposta
 * @param res La risposta da parte del server
 */
export function showEvents(email: string, res: any): void{
    Event.findAll({where: { owner : email }, raw: true}).then((items: object[]) => {
        const active: object[] = items.filter((element: any) => element.status == 1);
        const inactive: object[] = items.filter((element: any) => element.status == 0);
        const new_res = getSuccess(SuccessEnum.ShowEvents).getSuccessObj();
        res.status(new_res.status).json({message:new_res.msg,active_events:active,inactive_events:inactive});
    }).catch((error) => {
        controllerErrors(ErrorEnum.InternalServer, error, res);
    });
}

/**
 * Funzione 'checkEventExistence'
 * 
 * Funzione che si occupa di controllare che un evento esista, dato l'id.
 * 
 * @param event_id L'id dell'evento
 * @param res La risposta da parte del server
 * @returns True se l'evento esiste, False altrimenti
 */
 export async function checkEventExistence(event_id: number, res: any): Promise<boolean> {
    let result: any;
    try{
        result = await Event.findByPk(event_id, {raw: true});
    }catch(error){
        controllerErrors(ErrorEnum.InternalServer, error, res);
    }
    return result;
}

/**
 * Funzione 'checkEventOwner'
 * 
 * Funzione che si occupa di controllare che un evento (dato l'id) abbia come owner un certo utente, 
 * data la mail di quest'ultimo.
 * 
 * @param event_id L'id dell'evento del quale controllare l'owner
 * @param owner La mail dell'utente da comparare con l'owner dell'evento
 * @param res La risposta da parte del server
 * @returns True se l'utente è l'owner dell'evento, False altrimenti
 */
export async function checkEventOwner(event_id: number, owner: string, res: any): Promise<boolean> {
    let result: any;
    try{
        result= await Event.findByPk(event_id, {raw: true});
    }catch(error){
        controllerErrors(ErrorEnum.InternalServer, error, res);
    }
    return result.owner == owner;
}

/**
 * Funzione 'getEventModality'
 * 
 * Funzione che si occupa di ritornare la modalità dell'evento, dato l'id.
 * 
 * @param event_id L'id dell'evento
 * @param res La risposta da parte del server
 * @returns La modalità dell'evento
 */
export async function getEventModality(event_id: number, res: any): Promise<number> {
    let result: any;
    try{
        result = await Event.findByPk(event_id, {raw: true});
    }catch(error){
        controllerErrors(ErrorEnum.InternalServer, error, res);
    }
    return result.modality;
}

/**
 * Funzione 'getEventStatus'
 * 
 * Funzione che si occupa di ritornare lo stato, attivo (1) o inattivo (0), dell'evento dato l'id.
 * 
 * @param event_id L'id dell'evento
 * @param res La risposta da parte del server
 * @returns Lo stato dell'evento
 */
export async function getEventStatus(event_id: number, res: any): Promise<number> {
    let result: any;
    try{
        result = await Event.findByPk(event_id, {raw: true});
    }catch(error){
        controllerErrors(ErrorEnum.InternalServer, error, res);
    }
    return result.status;
}

/**
 * Funzione 'getEventDatetimes'
 * 
 * Funzione che si occupa di ritornare un array di datetime (slot temporali) di un evento, dato l'id.
 * 
 * @param event_id L'id dell'evento
 * @param res La risposta da parte del server
 * @returns L'array di datetime
 */
export async function getEventDatetimes(event_id: number, res: any): Promise<any> {
    let result: any;
    try{
        result = await Event.findByPk(event_id, {raw: true});
    }catch(error){
        controllerErrors(ErrorEnum.InternalServer, error, res);
    }
    return JSON.parse(result.datetimes);
}

/**
 * Funzione 'getEventBookings'
 * 
 * Funzione che si occupa di ritornare un array di prenotazioni associate a un evento, 
 * dato l'id di quest'ultimo.
 * 
 * @param event_id L'id dell'evento
 * @param res La risposta da parte del server
 * @returns L'array di prenotazioni
 */
export async function getEventBookings(event_id: number, res: any): Promise<object> {
    let result: any;
    try{
        result = await Preference.findAll({where: { event_id: event_id}, raw: true});
    }catch(error){
        controllerErrors(ErrorEnum.InternalServer, error, res);
    }
    return result;
}

/**
 * Funzione 'deleteEvent'
 * 
 * Funzione che si occupa di eliminare un evento, dato l'id.
 * 
 * @param event_id L'id dell'evento
 * @param res La risposta da parte del server
 */
export function deleteEvent(event_id: number, res: any): void {
    Event.destroy({where: {id: event_id}}).then(() => {
        const new_res = getSuccess(SuccessEnum.EventDeleted).getSuccessObj();
        res.status(new_res.status).json({message:new_res.msg});
    }).catch((error) => {
        controllerErrors(ErrorEnum.InternalServer, error, res);
    });
}

/**
 * Funzione 'closeEvent'
 * 
 * Funzione che si occupa di chiudere le prenotazioni di un evento (impostare lo stato a 0), dato l'id.
 * 
 * @param event_id L'id dell'evento
 * @param res La risposta da parte del server
 */
export function closeEvent(event_id: number, res: any): void {
    Event.update({status: 0}, {where: {id: event_id}}).then(() => {
        const new_res = getSuccess(SuccessEnum.EventClosed).getSuccessObj();
        res.status(new_res.status).json({message:new_res.msg});
    }).catch((error) => {
        controllerErrors(ErrorEnum.InternalServer, error, res);
    });
}

/**
 * Funzione 'showBookings'
 * 
 * Funzione che si occupa di mandare in risposta l'elenco di prenotazioni associate a un evento, dato l'id.
 * Nel caso di modalità 1 si ritornano gli N slot temporali più gettonati, con N definito dal limite.
 * 
 * @param event_id L'id dell'evento
 * @param limit Il numero massimo di prenotazioni da visualizzare (modalità 1)
 * @param res La risposta da parte del server
 */
export function showBookings(event_id: number, limit: number, res: any): void {
    if(limit){
        Preference.findAll({
            where: {event_id: event_id},
            group: ['datetime'],
            attributes: ['datetime', [Sequelize.fn('count', Sequelize.col('*')), 'occurrences']],
            order: [[Sequelize.col('occurrences'), 'DESC']],
            limit: limit,
            raw: true
        }).then((result: any) => {
            const new_res = getSuccess(SuccessEnum.ShowBookings).getSuccessObj();
            res.status(new_res.status).json({message:new_res.msg, bookings:result});
        });
        } else {
        getEventBookings(event_id, res).then((items) => {
            const new_res = getSuccess(SuccessEnum.ShowBookings).getSuccessObj();
            res.status(new_res.status).json({message:new_res.msg, bookings:items});
        }).catch((error) => {
            controllerErrors(ErrorEnum.InternalServer, error, res);
        });
    }
}

/**
 * Funzione 'book'
 * 
 * funzione che si occupa di inserire una nuova prenotazione per ognuna delle preferenze inserite in 
 * input.
 * 
 * @param preference Oggetto contenente le specifiche della/delle prenotazioni da inserire
 * @param res La risposta da parte del server
 */
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
    const new_res = getSuccess(SuccessEnum.BookingCompleted).getSuccessObj();
    res.status(new_res.status).json({message:new_res.msg});
}

/**
 * Funzione 'getRole'
 * 
 * Funzione che si occupa di ritornare il ruolo di un utente, data la mail.
 * 
 * @param email L'email dell'utente
 * @param res La risposta da parte del server
 * @returns Il ruolo dell'utente
 */
 export async function getRole(email: string, res: any): Promise<string> {
    let result: any;
    try{
        result = await User.findByPk(email, {raw: true});
    }catch(error){
        controllerErrors(ErrorEnum.InternalServer, error, res);
    }
    return result.role;
}

/**
 * Funzione 'refill'
 * 
 * Funzione che si occupa di ricaricare i token di un utente data la mail, assegnando loro
 * un nuovo valore.
 * 
 * @param owner L'email dell'utente
 * @param token La nuova quantità di token da assegnare
 * @param res La risposta da parte del server
 * @returns Il ruolo dell'utente
 */
export function refill(owner: string, token: number, res: any): void {
    User.update({token: token}, {where: {email: owner}}).then(() => {
        const new_res = getSuccess(SuccessEnum.TokenRefill).getSuccessObj();
        res.status(new_res.status).json({message:new_res.msg});
    }).catch((error) => {
        controllerErrors(ErrorEnum.InternalServer, error, res);
    });
}

/**
 * Funzione 'controllerErrors'
 * 
 * Funzione invocata dai metodi del Controller in caso di errori e che si occupa di invocare
 * il metodo {@link getError} della Factory di errori per costruire oggetti da ritornare al client
 * nel corpo della risposta.
 * 
 * @param enum_error Il tipo di errore da costruire
 * @param err L'effettivo errore sollevato
 * @param res La risposta da parte del server
 */
function controllerErrors(enum_error: ErrorEnum, err: Error, res: any) {
    const new_err = getError(enum_error).getErrorObj();
    console.log(err);
    res.status(new_err.status).json(new_err.msg);
}