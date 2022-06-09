import * as Message from "./string_messages";

interface  SuccessObj {
    getSuccObj(): { status : number,  msg : string };
}

class EventCreated implements SuccessObj {
    getSuccObj(): { status : number,  msg : string } {
        return {
            status: 201,
            msg: Message.eventCreated_message
        }
    }
}

class ShowEvents implements SuccessObj {
    getSuccObj(): { status : number,  msg : string } {
        return {
            status: 200,
            msg: Message.showEvents_message
        }
    }
}

class EventDeleted implements SuccessObj {
    getSuccObj(): { status : number,  msg : string } {
        return {
            status: 200,
            msg: Message.eventDeleted_message
        }
    }
}

class EventClosed implements SuccessObj {
    getSuccObj(): { status : number,  msg : string } {
        return {
            status: 200,
            msg: Message.successEventClosed_message
        }
    }
}

class ShowBookings implements SuccessObj {
    getSuccObj(): { status : number,  msg : string } {
        return {
            status: 200,
            msg: Message.showBookings_message
        }
    }
}

class TokenRefill implements SuccessObj {
    getSuccObj(): { status : number,  msg : string } {
        return {
            status: 200,
            msg: Message.tokenRefill_message
        }
    }
}

class BookingCompleted implements SuccessObj {
    getSuccObj(): { status : number,  msg : string } {
        return {
            status: 200,
            msg: Message.bookingCompleted_message
        }
    }
}

export enum SuccessEnum {
    // 200
    ShowEvents,
    EventDeleted,
    EventClosed,
    ShowBookings,
    TokenRefill,
    // 201
    EventCreated,
    BookingCompleted
}

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