interface  ErrorObj {
    getErrorObj(): { status: number,  msg: string };
}

class NoAuthHeaderError implements ErrorObj {
    getErrorObj(): { status: number,  msg: string } {
        return {
            status: 400,
            msg: "Bad Request - No authorization header"
        }
    }
}

class NoPayloadHeaderError implements ErrorObj {
    getErrorObj(): { status: number,  msg: string } {
        return {
            status: 400,
            msg: "Bad Request - No JSON payload header"
        }
    }
}

class MissingToken implements ErrorObj {
    getErrorObj(): { status: number,  msg: string } {
        return {
            status: 400,
            msg: "Bad Request - Missing JWT Token"
        }
    }
}

class InvalidToken implements ErrorObj {
    getErrorObj(): { status: number,  msg: string } {
        return {
            status: 400,
            msg: "Bad Request - Invalid JWT Token"
        }
    }
}

class MalformedPayloadError implements ErrorObj {
    getErrorObj(): { status: number,  msg: string } {
        return {
            status: 400,
            msg: "Bad Request - Malformed payload"
        }
    }
}

class RouteNotFound implements ErrorObj {
    getErrorObj(): { status: number,  msg: string } {
        return {
            status: 404,
            msg: "Not Found - Route not found"
        }
    }
}

class UnauthorizedError implements ErrorObj {
    getErrorObj(): { status: number,  msg: string } {
        return {
            status: 401,
            msg: "ERROR - Unauthorized"
        }
    }
}

class ForbiddenError implements ErrorObj {
    getErrorObj(): { status: number,  msg: string } {
        return {
            status: 403,
            msg: "ERROR - Forbidden"
        }
    }
}

class NotFoundError implements ErrorObj {
    getErrorObj(): { status: number,  msg: string } {
        return {
            status: 404,
            msg: "ERROR - Not found"
        }
    }
}

class InternalServerError implements ErrorObj {
    getErrorObj(): { status: number,  msg: string } {
        return {
            status: 500,
            msg: "ERROR - Internal server error"
        }
    }
}

class ServiceUnavailableError implements ErrorObj {
    getErrorObj(): { status: number,  msg: string } {
        return {
            status: 503,
            msg: "ERROR - Service unavailable"
        }
    }
}

class BadRequest implements ErrorObj {
    getErrorObj(): { status: number,  msg: string } {
        return {
            status: 400,
            msg: "ERROR - Bad request"
        }
    }
}

class EventClosed implements ErrorObj {
    getErrorObj(): { status: number,  msg: string } {
        return {
            status: 400,
            msg: "ERROR - Event bookings are closed"
        }
    }
}

class DuplicateDatetimes implements ErrorObj {
    getErrorObj(): { status: number,  msg: string } {
        return {
            status: 400,
            msg: "Bad Request - Duplicate datetimes"
        }
    }
}

class UserNotFound implements ErrorObj {
    getErrorObj(): { status: number,  msg: string } {
        return {
            status: 404,
            msg: "Not Found - User not found"
        }
    }
}

class EventNotFound implements ErrorObj {
    getErrorObj(): { status: number,  msg: string } {
        return {
            status: 404,
            msg: "Not Found - Event not found"
        }
    }
}

class InsufficientBalance implements ErrorObj {
    getErrorObj(): { status: number,  msg: string } {
        return {
            status: 401,
            msg: "Unauthorized - Insufficient token balance"
        }
    }
}

class UnplannedDatetimes implements ErrorObj {
    getErrorObj(): { status: number,  msg: string } {
        return {
            status: 400,
            msg: "Bad Request - Specified unplanned datetimes"
        }
    }
}

class BookedEvent implements ErrorObj {
    getErrorObj(): { status: number,  msg: string } {
        return {
            status: 403,
            msg: "Bad Request - Couldn't delete an already booked event"
        }
    }
}

class AlreadyBookedDatetime implements ErrorObj {
    getErrorObj(): { status: number,  msg: string } {
        return {
            status: 403,
            msg: "Forbidden - Datetime already booked"
        }
    }
}

class AlreadyBookedEvent implements ErrorObj {
    getErrorObj(): { status: number,  msg: string } {
        return {
            status: 403,
            msg: "Forbidden - You already booked this event"
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
    Forbidden,
    NotFound,
    InternalServer,
    ServiceUnavailable
}

export function getError(type: ErrorEnum): ErrorObj{
    let retval: ErrorObj = null;
    switch (type){
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