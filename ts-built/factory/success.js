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
var EventDeleted = /** @class */ (function () {
    function EventDeleted() {
    }
    EventDeleted.prototype.getSuccObj = function () {
        return {
            status: 200,
            msg: "SUCCESS - Event deleted succesfully"
        };
    };
    return EventDeleted;
}());
var EventClosed = /** @class */ (function () {
    function EventClosed() {
    }
    EventClosed.prototype.getSuccObj = function () {
        return {
            status: 200,
            msg: "SUCCESS - Event bookings closed succesfully"
        };
    };
    return EventClosed;
}());
var ShowBookings = /** @class */ (function () {
    function ShowBookings() {
    }
    ShowBookings.prototype.getSuccObj = function () {
        return {
            status: 200,
            msg: "SUCCESS - Event bookings displayed succesfully"
        };
    };
    return ShowBookings;
}());
var TokenRefill = /** @class */ (function () {
    function TokenRefill() {
    }
    TokenRefill.prototype.getSuccObj = function () {
        return {
            status: 200,
            msg: "SUCCESS - Tokens refilled succesfully"
        };
    };
    return TokenRefill;
}());
var SuccessEnum;
(function (SuccessEnum) {
    // 200
    SuccessEnum[SuccessEnum["ShowEvents"] = 0] = "ShowEvents";
    SuccessEnum[SuccessEnum["EventDeleted"] = 1] = "EventDeleted";
    SuccessEnum[SuccessEnum["EventClosed"] = 2] = "EventClosed";
    SuccessEnum[SuccessEnum["ShowBookings"] = 3] = "ShowBookings";
    SuccessEnum[SuccessEnum["TokenRefill"] = 4] = "TokenRefill";
    // 201
    SuccessEnum[SuccessEnum["EventCreated"] = 5] = "EventCreated";
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
exports.getSuccess = getSuccess;
