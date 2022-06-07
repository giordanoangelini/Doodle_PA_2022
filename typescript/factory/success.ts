interface  SuccessObj {
    getSuccObj(): { status : number,  msg : string };
}

class EventCreated implements SuccessObj {
    getSuccObj(): { status : number,  msg : string } {
        return {
            status: 201,
            msg: "SUCCESS - Event created succesfully"
        }
    }
}

class ShowEvents implements SuccessObj {
    getSuccObj(): { status : number,  msg : string } {
        return {
            status: 200,
            msg: "SUCCESS - Events displayed succesfully"
        }
    }
}

class EventDeleted implements SuccessObj {
    getSuccObj(): { status : number,  msg : string } {
        return {
            status: 200,
            msg: "SUCCESS - Event deleted succesfully"
        }
    }
}

class EventClosed implements SuccessObj {
    getSuccObj(): { status : number,  msg : string } {
        return {
            status: 200,
            msg: "SUCCESS - Event bookings closed succesfully"
        }
    }
}

class ShowBookings implements SuccessObj {
    getSuccObj(): { status : number,  msg : string } {
        return {
            status: 200,
            msg: "SUCCESS - Event bookings displayed succesfully"
        }
    }
}

class TokenRefill implements SuccessObj {
    getSuccObj(): { status : number,  msg : string } {
        return {
            status: 200,
            msg: "SUCCESS - Tokens refilled succesfully"
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
    EventCreated
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
    }
    return retval;
}