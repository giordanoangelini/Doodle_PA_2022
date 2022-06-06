interface  ErrorObj {
    getErrorObj(): { status: number,  msg: string };
}

class NoAuthHeaderError implements ErrorObj {
    getErrorObj(): { status: number,  msg: string } {
        return {
            status: 400,
            msg: "ERROR - No authorization header"
        }
    }
}

class NoPayloadHeaderError implements ErrorObj {
    getErrorObj(): { status: number,  msg: string } {
        return {
            status: 400,
            msg: "ErrorOR - No JSON payload header"
        }
    }
}

class MalformedPayloadError implements ErrorObj {
    getErrorObj(): { status: number,  msg: string } {
        return {
            status: 400,
            msg: "ERROR - Malformed payload"
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

export enum ErrorEnum {
    // 400
    NoAuthHeader,
    NoPayloadHeader,
    MalformedPayload,
    Unauthorized, // 401
    Forbidden, // 403
    NotFound, // 404
    InternalServer, // 500
    ServiceUnavailable // 503
}

export function getError(type: ErrorEnum): ErrorObj{
    let retval: ErrorObj = null;
    switch (type){
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
    }
    return retval;
}