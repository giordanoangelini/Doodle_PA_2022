"use strict";
exports.__esModule = true;
exports.getError = exports.ErrorEnum = void 0;
var NoAuthHeaderError = /** @class */ (function () {
    function NoAuthHeaderError() {
    }
    NoAuthHeaderError.prototype.getErrorObj = function () {
        return {
            status: 400,
            msg: "ERROR - No authorization header"
        };
    };
    return NoAuthHeaderError;
}());
var NoPayloadHeaderError = /** @class */ (function () {
    function NoPayloadHeaderError() {
    }
    NoPayloadHeaderError.prototype.getErrorObj = function () {
        return {
            status: 400,
            msg: "ErrorOR - No JSON payload header"
        };
    };
    return NoPayloadHeaderError;
}());
var MalformedPayloadError = /** @class */ (function () {
    function MalformedPayloadError() {
    }
    MalformedPayloadError.prototype.getErrorObj = function () {
        return {
            status: 400,
            msg: "ERROR - Malformed payload"
        };
    };
    return MalformedPayloadError;
}());
var UnauthorizedError = /** @class */ (function () {
    function UnauthorizedError() {
    }
    UnauthorizedError.prototype.getErrorObj = function () {
        return {
            status: 401,
            msg: "ERROR - Unauthorized"
        };
    };
    return UnauthorizedError;
}());
var ForbiddenError = /** @class */ (function () {
    function ForbiddenError() {
    }
    ForbiddenError.prototype.getErrorObj = function () {
        return {
            status: 403,
            msg: "ERROR - Forbidden"
        };
    };
    return ForbiddenError;
}());
var NotFoundError = /** @class */ (function () {
    function NotFoundError() {
    }
    NotFoundError.prototype.getErrorObj = function () {
        return {
            status: 404,
            msg: "ERROR - Not found"
        };
    };
    return NotFoundError;
}());
var InternalServerError = /** @class */ (function () {
    function InternalServerError() {
    }
    InternalServerError.prototype.getErrorObj = function () {
        return {
            status: 500,
            msg: "ERROR - Internal server error"
        };
    };
    return InternalServerError;
}());
var ServiceUnavailableError = /** @class */ (function () {
    function ServiceUnavailableError() {
    }
    ServiceUnavailableError.prototype.getErrorObj = function () {
        return {
            status: 503,
            msg: "ERROR - Service unavailable"
        };
    };
    return ServiceUnavailableError;
}());
var ErrorEnum;
(function (ErrorEnum) {
    // 400
    ErrorEnum[ErrorEnum["NoAuthHeader"] = 0] = "NoAuthHeader";
    ErrorEnum[ErrorEnum["NoPayloadHeader"] = 1] = "NoPayloadHeader";
    ErrorEnum[ErrorEnum["MalformedPayload"] = 2] = "MalformedPayload";
    ErrorEnum[ErrorEnum["Unauthorized"] = 3] = "Unauthorized";
    ErrorEnum[ErrorEnum["Forbidden"] = 4] = "Forbidden";
    ErrorEnum[ErrorEnum["NotFound"] = 5] = "NotFound";
    ErrorEnum[ErrorEnum["InternalServer"] = 6] = "InternalServer";
    ErrorEnum[ErrorEnum["ServiceUnavailable"] = 7] = "ServiceUnavailable"; // 503
})(ErrorEnum = exports.ErrorEnum || (exports.ErrorEnum = {}));
function getError(type) {
    var retval = null;
    switch (type) {
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
exports.getError = getError;
