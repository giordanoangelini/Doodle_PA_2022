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
var ShowEvents = /** @class */ (function () {
    function ShowEvents() {
    }
    ShowEvents.prototype.getSuccObj = function () {
        return {
            status: 200,
            msg: "SUCCESS - Events displayed succesfully"
        };
    };
    return ShowEvents;
}());
var SuccessEnum;
(function (SuccessEnum) {
    // 200
    SuccessEnum[SuccessEnum["ShowEvents"] = 0] = "ShowEvents";
    // 201
    SuccessEnum[SuccessEnum["EventCreated"] = 1] = "EventCreated";
})(SuccessEnum = exports.SuccessEnum || (exports.SuccessEnum = {}));
function getSuccess(type) {
    var retval = null;
    switch (type) {
        case SuccessEnum.EventCreated:
            retval = new EventCreated();
            break;
        case SuccessEnum.ShowEvents:
            retval = new ShowEvents();
            break;
    }
    return retval;
}
exports.getSuccess = getSuccess;
