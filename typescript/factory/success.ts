import * as Message from "./string_messages";

/**
 * Interfaccia 'SuccessObj'
 * 
 * Dichiara il metodo {@link getSuccessObj} che viene implementato dalle classi successive.
 * Ogni classe si occupa di costruire un oggetto che riporterà i campi 'status' (status code
 * della risposta HTTP) e 'msg' (messaggio da ritornare al client nel corpo della risposta).
 *
 * @returns Oggetto da ritornare nel corpo della risposta
 */
interface  SuccessObj {
    getSuccessObj(): { status : number,  msg : string };
}

class EventCreated implements SuccessObj {
    getSuccessObj(): { status : number,  msg : string } {
        return {
            status: 201,
            msg: Message.eventCreated_message
        }
    }
}

class ShowEvents implements SuccessObj {
    getSuccessObj(): { status : number,  msg : string } {
        return {
            status: 200,
            msg: Message.showEvents_message
        }
    }
}

class EventDeleted implements SuccessObj {
    getSuccessObj(): { status : number,  msg : string } {
        return {
            status: 200,
            msg: Message.eventDeleted_message
        }
    }
}

class EventClosed implements SuccessObj {
    getSuccessObj(): { status : number,  msg : string } {
        return {
            status: 200,
            msg: Message.successEventClosed_message
        }
    }
}

class ShowBookings implements SuccessObj {
    getSuccessObj(): { status : number,  msg : string } {
        return {
            status: 200,
            msg: Message.showBookings_message
        }
    }
}

class TokenRefill implements SuccessObj {
    getSuccessObj(): { status : number,  msg : string } {
        return {
            status: 200,
            msg: Message.tokenRefill_message
        }
    }
}

class BookingCompleted implements SuccessObj {
    getSuccessObj(): { status : number,  msg : string } {
        return {
            status: 200,
            msg: Message.bookingCompleted_message
        }
    }
}

export enum SuccessEnum {
    ShowEvents,
    EventDeleted,
    EventClosed,
    ShowBookings,
    TokenRefill,
    EventCreated,
    BookingCompleted
}

/**
 * Funzione 'getSuccess'
 * 
 * Funzione che viene invocata dal controller nel momento in cui si conclude un'azione con successo.
 *
 * @param type Il tipo di 'successo' ottenuto dal Controller
 * @returns Un oggetto diverso dell'interfaccia {@link SuccessObj} a seconda del parametro in input
 */
export function getSuccess(type: SuccessEnum): SuccessObj{
    let retval: SuccessObj = null;
    switch (type){
        case SuccessEnum.EventCreated:
            retval = new EventCreated();
            break;
        case SuccessEnum.ShowEvents:
            retval = new ShowEvents();  
            break; 
        case SuccessEnum.EventDeleted:
            retval = new EventDeleted();
            break;
        case SuccessEnum.EventClosed:
            retval = new EventClosed();
            break;
        case SuccessEnum.ShowBookings:
            retval = new ShowBookings();
            break;
        case SuccessEnum.TokenRefill:
            retval = new TokenRefill();
            break;
        case SuccessEnum.BookingCompleted:
            retval = new BookingCompleted();
            break;
    }
    return retval;
}