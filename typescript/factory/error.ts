import * as Message from "./string_messages";

interface  ErrorObj {
    getErrorObj(): { status: number,  msg: string };
}

class NoAuthHeaderError implements ErrorObj {
    getErrorObj(): { status: number,  msg: string } {
        return {
            status: 400,
            msg: Message.noAuthHeader_message
        }
    }
}

class NoPayloadHeaderError implements ErrorObj {
    getErrorObj(): { status: number,  msg: string } {
        return {
            status: 400,
            msg: Message.noPayoadHeader_message
        }
    }
}

class MissingToken implements ErrorObj {
    getErrorObj(): { status: number,  msg: string } {
        return {
            status: 400,
            msg: Message.missingToken_message
        }
    }
}

class InvalidToken implements ErrorObj {
    getErrorObj(): { status: number,  msg: string } {
        return {
            status: 403,
            msg: Message.invalidToken_message
        }
    }
}

class MalformedPayloadError implements ErrorObj {
    getErrorObj(): { status: number,  msg: string } {
        return {
            status: 400,
            msg: Message.malformedPayload_message
        }
    }
}

class RouteNotFound implements ErrorObj {
    getErrorObj(): { status: number,  msg: string } {
        return {
            status: 404,
            msg: Message.routeNotFound_message
        }
    }
}

class UnauthorizedError implements ErrorObj {
    getErrorObj(): { status: number,  msg: string } {
        return {
            status: 401,
            msg: Message.unauthorized_message
        }
    }
}

class ForbiddenError implements ErrorObj {
    getErrorObj(): { status: number,  msg: string } {
        return {
            status: 403,
            msg: Message.Forbidden_message
        }
    }
}

class NotFoundError implements ErrorObj {
    getErrorObj(): { status: number,  msg: string } {
        return {
            status: 404,
            msg: Message.notFound_message
        }
    }
}

class InternalServerError implements ErrorObj {
    getErrorObj(): { status: number,  msg: string } {
        return {
            status: 500,
            msg: Message.internalServerError_message
        }
    }
}

class ServiceUnavailableError implements ErrorObj {
    getErrorObj(): { status: number,  msg: string } {
        return {
            status: 503,
            msg: Message.serviceUnavailable_message
        }
    }
}

class BadRequest implements ErrorObj {
    getErrorObj(): { status: number,  msg: string } {
        return {
            status: 400,
            msg: Message.badRequest_message
        }
    }
}

class EventClosed implements ErrorObj {
    getErrorObj(): { status: number,  msg: string } {
        return {
            status: 403,
            msg: Message.errorEventClosed_message
        }
    }
}

class DuplicateDatetimes implements ErrorObj {
    getErrorObj(): { status: number,  msg: string } {
        return {
            status: 400,
            msg: Message.duplicateDatetimes_message
        }
    }
}

class UserNotFound implements ErrorObj {
    getErrorObj(): { status: number,  msg: string } {
        return {
            status: 404,
            msg: Message.userNotFound_message
        }
    }
}

class EventNotFound implements ErrorObj {
    getErrorObj(): { status: number,  msg: string } {
        return {
            status: 404,
            msg: Message.eventNotFound_message
        }
    }
}

class InsufficientBalance implements ErrorObj {
    getErrorObj(): { status: number,  msg: string } {
        return {
            status: 401,
            msg: Message.insufficientBalance_message
        }
    }
}

class UnplannedDatetimes implements ErrorObj {
    getErrorObj(): { status: number,  msg: string } {
        return {
            status: 400,
            msg: Message.unplannedDatetimes_message
        }
    }
}

class BookedEvent implements ErrorObj {
    getErrorObj(): { status: number,  msg: string } {
        return {
            status: 403,
            msg: Message.bookedEvent_message
        }
    }
}

class AlreadyBookedDatetime implements ErrorObj {
    getErrorObj(): { status: number,  msg: string } {
        return {
            status: 403,
            msg: Message.alreadyBookedDatetime_message
        }
    }
}

class AlreadyBookedEvent implements ErrorObj {
    getErrorObj(): { status: number,  msg: string } {
        return {
            status: 403,
            msg: Message.alreadyBookedEvent_message
        }
    }
}

export enum ErrorEnum {
    MissingToken,//
    InvalidToken,//
    RouteNotFound,//
    NoAuthHeader,//
    NoPayloadHeader,//
    MalformedPayload,//
    DuplicateDatetimes,//
    UserNotFound,//
    EventNotFound,//
    InsufficientBalance,//
    UnplannedDatetimes,//
    BookedEvent,//
    AlreadyBookedDatetime,//
    AlreadyBookedEvent,
    BadRequest,
    EventClosed,//
    Unauthorized,//
    Forbidden,//
    NotFound,
    InternalServer,//
    ServiceUnavailable
}

export function getError(type: ErrorEnum): ErrorObj{
    let retval: ErrorObj = null;
    switch (type){
        case ErrorEnum.AlreadyBookedEvent:
            retval = new AlreadyBookedEvent();
            break;
        case ErrorEnum.AlreadyBookedDatetime:
            retval = new AlreadyBookedDatetime();
            break;
        case ErrorEnum.BookedEvent:
            retval = new BookedEvent();
            break;
        case ErrorEnum.UnplannedDatetimes:
            retval = new UnplannedDatetimes();
            break;
        case ErrorEnum.InsufficientBalance:
            retval = new InsufficientBalance();
            break;
        case ErrorEnum.EventNotFound:
            retval = new EventNotFound();
            break;
        case ErrorEnum.UserNotFound:
            retval = new UserNotFound();
            break;
        case ErrorEnum.DuplicateDatetimes:
            retval = new DuplicateDatetimes();
            break;
        case ErrorEnum.RouteNotFound:
            retval = new RouteNotFound();
            break;
        case ErrorEnum.InvalidToken:
            retval = new InvalidToken();
            break;
        case ErrorEnum.MissingToken:
            retval = new MissingToken();
            break;
        case ErrorEnum.NoAuthHeader:
            retval = new NoAuthHeaderError();
            break;
        case ErrorEnum.NoPayloadHeader:
            retval = new NoPayloadHeaderError();
            break;
        case ErrorEnum.MalformedPayload:
            retval = new MalformedPayloadError();
            break;            
        case ErrorEnum.Unauthorized:
            retval = new UnauthorizedError();
            break;
        case ErrorEnum.Forbidden:
            retval = new ForbiddenError();
            break;
        case ErrorEnum.NotFound:
            retval = new NotFoundError();
            break;
        case ErrorEnum.InternalServer:
            retval = new InternalServerError();
            break;
        case ErrorEnum.ServiceUnavailable:
            retval = new ServiceUnavailableError();
            break;
        case ErrorEnum.BadRequest:
            retval = new BadRequest();
            break; 
        case ErrorEnum.EventClosed:
            retval = new EventClosed();
            break;       
    }
    return retval;
}