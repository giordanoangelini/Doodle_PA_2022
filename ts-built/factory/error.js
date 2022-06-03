var GenericError = /** @class */ (function () {
    function GenericError() {
    }
    GenericError.prototype.getMsg = function () {
        return "this is a generic error";
    };
    return GenericError;
}());
var Forbidden = /** @class */ (function () {
    function Forbidden() {
    }
    Forbidden.prototype.getMsg = function () {
        return "no rights...";
    };
    return Forbidden;
}());
var BadRequest = /** @class */ (function () {
    function BadRequest() {
    }
    BadRequest.prototype.getMsg = function () {
        return "bad bad...fix and retry...";
    };
    return BadRequest;
}());
var ErrEnum;
(function (ErrEnum) {
    ErrEnum[ErrEnum["None"] = 0] = "None";
    ErrEnum[ErrEnum["Generic"] = 1] = "Generic";
    ErrEnum[ErrEnum["Forbidden"] = 2] = "Forbidden";
    ErrEnum[ErrEnum["BadRequest"] = 3] = "BadRequest";
})(ErrEnum || (ErrEnum = {}));
var ErrorFactory = /** @class */ (function () {
    function ErrorFactory() {
    }
    ErrorFactory.prototype.getError = function (type) {
        var retval = null;
        switch (type) {
            case ErrEnum.Generic:
                retval = new GenericError();
                break;
            case ErrEnum.Forbidden:
                retval = new Forbidden();
                break;
            case ErrEnum.BadRequest:
                retval = new BadRequest();
                break;
        }
        return retval;
    };
    return ErrorFactory;
}());
var factory = new ErrorFactory();
var errCode = Math.floor(Math.floor((Math.random() * 3)) + 1);
console.log(errCode);
if (errCode != ErrEnum.None) {
    console.log(factory.getError(errCode).getMsg());
}
