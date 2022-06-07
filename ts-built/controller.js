"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.showEvents = exports.createEvent = exports.checkBalance = exports.checkUserbyEmail = void 0;
var error_1 = require("./factory/error");
var success_1 = require("./factory/success");
var model_1 = require("./model");
var hashDecreaseToken = new Map();
hashDecreaseToken.set(1, 1);
hashDecreaseToken.set(2, 2);
hashDecreaseToken.set(3, 4);
// Funzione che controlla se un utente esiste data la sua email
function checkUserbyEmail(email) {
    return __awaiter(this, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, model_1.User.findByPk(email)];
                case 1:
                    result = _a.sent();
                    if (result)
                        return [2 /*return*/, true];
                    else
                        return [2 /*return*/, false];
                    return [2 /*return*/];
            }
        });
    });
}
exports.checkUserbyEmail = checkUserbyEmail;
// Funzione che controlla che un utente abbia la quantità di token sufficienti a creare l'evento 
function checkBalance(email, modality) {
    return __awaiter(this, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, model_1.User.findAll({ raw: true, where: { email: email } })];
                case 1:
                    result = _a.sent();
                    if (result[0].token >= hashDecreaseToken.get(modality))
                        return [2 /*return*/, true];
                    return [2 /*return*/, false];
            }
        });
    });
}
exports.checkBalance = checkBalance;
// Funzione che crea l'evento e lo inserisce nel database
function createEvent(event, res) {
    model_1.Event.create(event).then(function (item) {
        model_1.User.decrement(['token'], { by: hashDecreaseToken.get(event.modality), where: { email: event.owner } });
        var new_res = (0, success_1.getSuccess)(success_1.SuccessEnum.EventCreated).getSuccObj();
        res.status(new_res.status).json({ "message": new_res.msg, "event": item });
    })["catch"](function () {
        controllerErrors(error_1.ErrorEnum.InternalServer, res);
    });
}
exports.createEvent = createEvent;
function showEvents(email, res) {
    model_1.Event.findAll({ raw: true, where: { owner: email } }).then(function (items) {
        var active = items.filter(function (element) { return element.status == 1; });
        var inactive = items.filter(function (element) { return element.status == 0; });
        var new_res = (0, success_1.getSuccess)(success_1.SuccessEnum.ShowEvents).getSuccObj();
        res.status(new_res.status).json({ "message": new_res.msg, "active_events": active, "inactive_events": inactive });
    })["catch"](function () {
        controllerErrors(error_1.ErrorEnum.NotFound, res);
    });
}
exports.showEvents = showEvents;
function controllerErrors(err, res) {
    var new_err = (0, error_1.getError)(err).getErrorObj();
    console.log(new_err);
    res.status(new_err.status).send(new_err.msg);
}
