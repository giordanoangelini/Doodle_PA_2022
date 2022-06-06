"use strict";
exports.__esModule = true;
exports.getSuccess = exports.SuccessEnum = void 0;
var EventCreated = /** @class */ (function () {
    function EventCreated() {
    }
    EventCreated.prototype.getSuccObj = function () {
        return {
            status: 201,
            msg: "SUCCESS - Event created succesfully"
        };
    };
    return EventCreated;
}());
var SuccessEnum;
(function (SuccessEnum) {
    // 200
    // 201
    SuccessEnum[SuccessEnum["EventCreated"] = 0] = "EventCreated";
})(SuccessEnum = exports.SuccessEnum || (exports.SuccessEnum = {}));
function getSuccess(type) {
    var retval = null;
    switch (type) {
        case SuccessEnum.EventCreated:
            retval = new EventCreated();
            break;
    }
    return retval;
}
exports.getSuccess = getSuccess;
