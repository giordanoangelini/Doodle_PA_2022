import * as Controller from '../controller';
import { ErrorEnum } from '../factory/error';

/**
 * Middleware 'checkPayload'
 * 
 * Controlla che la richiesta di creazione di un evento riporti nel corpo dei dati ben formati.
 * In particolare, titolo e link (se inserito) devono essere stringhe; le coordinate vengono
 * validate dall'apposita funzione {@link checkCoordinates}; la modalità può avere valori 1, 2 o 3.
 * 
 * @param req La richiesta da parte del client
 * @param res La risposta da parte del server
 * @param next Il riferimento al middleware successivo
 */
export function checkPayload(req: any, res: any, next: any) : void {
    if (typeof req.body.title == 'string' && 
        (typeof req.body.link == 'string' || (!req.body.link && req.body.link != 0)) &&
        checkCoordinates(req.body.latitude, req.body.longitude) &&
        [1,2,3].includes(req.body.modality)) {
        next();
    } else next(ErrorEnum.MalformedPayload);
}
/**
 * Funzione 'checkCoordinates'
 * 
 * Viene invocata dal middleware {@link checkPayload} e si occupa di validare i due valori
 * (latitudine e longitudine) che compongono le coordinate presso le quai si svolge l'evento.
 * In particolare, esse possono essere entrambe nulle o entrambe con valore numerico che non
 * ecceda i reali limiti di latitudine e longitudine.
 * 
 * @param latitude La latitudine inserita dall'utente
 * @param longitude La longitudine inserita dall'utente
 * @returns True se le coordinate sono valide, False altrimenti
 */
function checkCoordinates(latitude: number, longitude: number): boolean {
    if(latitude && !longitude || !latitude && longitude) return false;
    if(latitude == null && longitude == null) return true;
    return (latitude <= 90 && latitude >= -90) && (longitude <= 180 && longitude >= -180);
}

/**
 * Middleware 'checkDatetimes'
 * 
 * Controlla che la richiesta di creazione di un evento riporti nel corpo un vettore di datetimes
 * (stringhe contenenti data, orario e fuso per ognuno degli slot disposti allo svolgimento dell'evento)
 * le quali devono rispettare un pattern prestabilito. Si avvale della funzione {@link checkDatetime}.
 * Inoltre, controlla che nel vettore non ci siano datetime duplicati; per far ciò crea un Set a partire
 * dal vettore e valuta le dimensioni delle due strutture, se quest'ultime non coincidono si evince
 * che nell'array di partenza sono presenti duplicati in quanto un Set non accetta 'doppioni'.
 * 
 * @param req La richiesta da parte del client
 * @param res La risposta da parte del server
 * @param next Il riferimento al middleware successivo
 */
export function checkDatetimes(req: any, res: any, next: any) : void {
    const array: string[] = req.body.datetimes.filter(checkDatetime);
    if (array.length == 0) {
        if(new Set(req.body.datetimes).size !== req.body.datetimes.length) next(ErrorEnum.DuplicateDatetimes);
        else next();
    }
    else next(ErrorEnum.MalformedPayload);
}
/**
 * Funzione 'checkDatetime'
 * 
 * Invocata dal middleware {@link checkDatetimes}, si occupa di validare la stringa datetime, 
 * quest'ultima deve rispettare il pattern descritto tramite Regular Expression ed essere convertibile
 * in un oggetto di tipo Date.
 * 
 * @param datetime La stringa di cui valutare la correttezza
 * @returns True se la stringa rappresenta un datetime valido, False altrimenti
 */
function checkDatetime(datetime: string): boolean {
    const check = new RegExp(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}[+-]\d{2}:\d{2}$/);
    return (!check.test(datetime) || !Date.parse(datetime));
}

/**
 * Middleware 'checkUserExistence'
 * 
 * Controlla che l'utente (user/owner) specificato nella richiesta del client esista effettivamente.
 * Per farlo invoca la funzione {@link checkUserExistence} del Controller.
 * 
 * @param req La richiesta da parte del client
 * @param res La risposta da parte del server
 * @param next Il riferimento al middleware successivo
 */
export function checkUserExistence(req: any, res: any, next: any) : void {
    Controller.checkUserExistence(req.body.owner, res).then((check) => {
        if(check) next();
        else next(ErrorEnum.UserNotFound);
    });
}

/**
 * Middleware 'checkUserBalance'
 * 
 * Controlla che l'utente (owner) specificato nella richiesta di creazione di un evento abbia una
 * quantità di token sufficienti a completare l'inserimento
 * Per farlo invoca la funzione {@link checkUserBalance} del Controller.
 * 
 * @param req La richiesta da parte del client
 * @param res La risposta da parte del server
 * @param next Il riferimento al middleware successivo
 */
export function checkUserBalance(req: any, res: any, next: any): void {
    Controller.checkBalance(req.body.owner, req.body.modality, res).then((check) => {
        if(check) next();
        else next(ErrorEnum.InsufficientBalance);
    })
}

/**
 * Middleware 'checkEventExistence'
 * 
 * Controlla che l'evento specificato nella richiesta del client esista effettivamente.
 * Per farlo invoca la funzione {@link checkEventExistence} del Controller.
 * 
 * @param req La richiesta da parte del client
 * @param res La risposta da parte del server
 * @param next Il riferimento al middleware successivo
 */
export function checkEventExistence(req: any, res: any, next: any): void {
    Controller.checkEventExistence(req.body.event_id, res).then((check) => {
        if(check) next();
        else next(ErrorEnum.EventNotFound);
    })
}

/**
 * Middleware 'checkEventOwner'
 * 
 * Controlla che l'utente (user/owner) specificato nella richiesta del sia effettivamente l'owner
 * dell'evento sul quale si vuole operare (ad esempio per la cancellazione dello stesso o per la 
 * chiusura delle prenotazioni).
 * Per farlo invoca la funzione {@link checkEventOwner} del Controller.
 * 
 * @param req La richiesta da parte del client
 * @param res La risposta da parte del server
 * @param next Il riferimento al middleware successivo
 */
export function checkEventOwner(req: any, res: any, next: any): void {
    Controller.checkEventOwner(req.body.event_id, req.body.sender_id, res).then((check) => {
        if(check) next();
        else next(ErrorEnum.Unauthorized);
    })
}

/**
 * Middleware 'checkEventBookings'
 * 
 * Controlla che l'evento specificato nella richiesta abbia, o meno, prenotazioni ad esso associate.
 * Utile per evitare che si cancelli un evento per il quale sono già state espresse preferenze.
 * Per farlo invoca la funzione {@link getEventBookings} del Controller, la quale ritorna un vettore
 * di prenotazioni associate all'evento; se la lunghezza di quest'ultimo è pari a zero allora si può
 * procedere all'eliminazione.
 * 
 * @param req La richiesta da parte del client
 * @param res La risposta da parte del server
 * @param next Il riferimento al middleware successivo
 */
export function checkEventBookings(req: any, res: any, next: any): void {
    Controller.getEventBookings(req.body.event_id, res).then((check: any) => {
        if(check.length == 0) next();
        else next(ErrorEnum.BookedEvent);
    })
}

/**
 * Middleware 'checkLimit'
 * 
 * Controlla che il limite (numero di datetimes più gettonati da visualizzare per un dato evento 
 * nel caso di modalità 1), se specificato, abbia effettivamente un valore numerico e diverso da 0.
 * 
 * @param req La richiesta da parte del client
 * @param res La risposta da parte del server
 * @param next Il riferimento al middleware successivo
 */
export function checkLimit(req: any, res: any, next: any): void {
    if(req.body.limit){
        if(typeof req.body.limit == 'number' && req.body.limit > 0) next();
        else next(ErrorEnum.MalformedPayload);
    } else next();
}

/**
 * Middleware 'adjustLimit'
 * 
 * Si occupa di impostare il limite (numero di datetimes più gettonati da visualizzare per un dato evento)
 * in base alla modalità dell'evento. Se quest'ultima è 1, il limite è lo stesso specificato dall'utente o
 * 10 se non è stata espressa alcuna preferenza in merito; nel caso la modalità fosse 2 o 3, il limite è
 * impostato a null in quanto ininfluente.
 * Invoca la funzione {@link getEventModality} del Controller.
 * 
 * @param req La richiesta da parte del client
 * @param res La risposta da parte del server
 * @param next Il riferimento al middleware successivo
 */
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

/**
 * Middleware 'checkEventStatus'
 * 
 * Controlla che lo stato dell'evento specificato nella richiesta sia 1 (iscrizioni aperte) o 0
 * (iscrizioni chiuse), utile per impedire di prenotare un evento che abbia già chiuso le iscrizioni.
 * Per farlo invoca la funzione {@link getEventStatus} del Controller.
 * 
 * @param req La richiesta da parte del client
 * @param res La risposta da parte del server
 * @param next Il riferimento al middleware successivo
 */
export function checkEventStatus(req: any, res: any, next: any): void {
    Controller.getEventStatus(req.body.event_id, res).then((result: number) => {
        if(result == 0) next(ErrorEnum.EventClosed);
        else next();
    })
}

/**
 * Middleware 'getEventModality'
 * 
 * Si occupa di valorizzare il campo 'modality' del corpo della richiesta, utile per ridurre il carico
 * di lavoro dei middleware successivi.
 * Per farlo invoca la funzione {@link getEventModality} del Controller.
 * 
 * @param req La richiesta da parte del client
 * @param res La risposta da parte del server
 * @param next Il riferimento al middleware successivo
 */
export function getEventModality(req: any, res: any, next: any): void {
    Controller.getEventModality(req.body.event_id, res).then((modality) => {
        req.body.modality = modality;
        next();
    });
}

/**
 * Middleware 'checkBookingExistence'
 * 
 * Si occupa di controllare che nel corpo della richiesta di prenotazione di uno slot temporale
 * non compaiano preferenze che condividano id dell'evento, email di chi ha effettuato la prenotazione
 * e datetime con prenotazioni già presenti nel database; la compresenza di tali istanze non è possibile
 * in quanto questi tre valori rappresentano una chiave composta. 
 * Invoca la funzione {@link getEventBookings} del Controller che ritorna un vettore contenente
 * tutte le prenotazioni associate all'evento dato, l'array viene filtrato con le condizioni sopra indicate
 * al fine di generare una struttura di prenotazioni duplicate. Se la dimensione di quest'ultima è
 * diversa da zero viene generato un errore.
 * 
 * @param req La richiesta da parte del client
 * @param res La risposta da parte del server
 * @param next Il riferimento al middleware successivo
 */
export function checkBookingExistence(req: any, res: any, next: any): void {
    Controller.getEventBookings(req.body.event_id, res).then((bookings: any) => {
        let duplicates: any[] = bookings.filter((elem: any) => 
            elem.email == req.body.email &&
            req.body.datetimes.includes(elem.datetime) &&
            elem.event_id == req.body.event_id);
        if(duplicates.length != 0) next(ErrorEnum.DuplicateDatetimes);
        else next();
    })
}

/**
 * Middleware 'checkDatetimesExistence'
 * 
 * Si occupa di controllare che nel corpo della richiesta di prenotazione di uno slot temporale
 * non compaiano valori che non sono stati dichiarati come datetime opzionabili dall'owner dell'evento.
 * Invoca la funzione {@link getEventDatetimes} del Controller che ritorna un vettore contenente
 * tutti i datetime predisposti dall'owner, l'array viene filtrato alla ricerca di datetime non presenti
 * tra le opzioni dell'evento.
 * 
 * @param req La richiesta da parte del client
 * @param res La risposta da parte del server
 * @param next Il riferimento al middleware successivo
 */
export function checkDatetimesExistence(req: any, res: any, next: any): void {
    Controller.getEventDatetimes(req.body.event_id, res).then((event_datetimes: any) => {
        let array: string[] = req.body.datetimes.filter((element: string) => !event_datetimes.includes(element));
        if(array.length != 0) next(ErrorEnum.UnplannedDatetimes)
        else next();
    });
}

/**
 * Middleware 'checkBookingSecondModality'
 * 
 * Si occupa di controllare che, con modalità dell'evento uguale a 2 o 3, nel corpo della richiesta 
 * di prenotazione di uno slot temporale non compaiano datetime già prenotati da altri.
 * Invoca la funzione {@link getEventBookings} del Controller che ritorna un vettore contenente
 * tutte le prenotazioni associate all'evento dato, l'array viene filtrato alla ricerca di datetime
 * duplicati.
 * 
 * @param req La richiesta da parte del client
 * @param res La risposta da parte del server
 * @param next Il riferimento al middleware successivo
 */
export function checkBookingSecondModality(req: any, res: any, next: any): void {   
    if (req.body.modality == 2 || req.body.modality == 3) {
        Controller.getEventBookings(req.body.event_id, res).then((result: any) => {   
        let duplicates: any = result.filter((elem: any) => req.body.datetimes.includes(elem.datetime));
            if (duplicates.length != 0) next(ErrorEnum.AlreadyBookedDatetime);
            else next();
        });
    } else next();              
}

/**
 * Middleware 'checkBookingThirdModality'
 * 
 * Si occupa di controllare che, con modalità dell'evento uguale a 3, la richiesta non venga effettuata
 * da un utente che abbia già espresso una preferenza per l'evento in questione.
 * Invoca la funzione {@link getEventBookings} del Controller che ritorna un vettore contenente
 * tutte le prenotazioni associate all'evento dato, l'array viene filtrato alla ricerca di prenotazioni
 * effettuate dall'utente che ha effettuato la richiesta.
 * 
 * @param req La richiesta da parte del client
 * @param res La risposta da parte del server
 * @param next Il riferimento al middleware successivo
 */
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

/**
 * Middleware 'checkRefill'
 * 
 * Controlla che il valore di token che un admin deve riassegnare a un utente abbia effettivamente
 * un valore numerico e maggiore di 0.
 * 
 * @param req La richiesta da parte del client
 * @param res La risposta da parte del server
 * @param next Il riferimento al middleware successivo
 */
export function checkRefill(req: any, res: any, next: any): void {
    if (typeof req.body.token != 'number' || req.body.token <= 0) next(ErrorEnum.MalformedPayload);
    else next();
}

/**
 * Middleware 'checkAdmin'
 * 
 * Controlla che l'utente che effettua la chiamata sia effettivamente registrato come admin all'interno
 * del database.
 * Per farlo invoca le funzioni {@link checkUserExistence} e {@link getRole} del Controller.
 * 
 * @param req La richiesta da parte del client
 * @param res La risposta da parte del server
 * @param next Il riferimento al middleware successivo
 */
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