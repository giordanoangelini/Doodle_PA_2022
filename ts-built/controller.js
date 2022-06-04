"use strict";
exports.__esModule = true;
exports.showEvents = exports.checkUserbyEmail = exports.createEvent = void 0;
var model_1 = require("./model");
function createEvent(event, res) {
    console.log(event);
    model_1.Event.create(event).then(function (item) {
        res.json({
            "Item": item
        });
        console.log("Done");
    })["catch"](function (error) {
        console.log(error);
    });
}
exports.createEvent = createEvent;
function checkUserbyEmail(email) {
    var result = false;
    model_1.User.findByPk(email).then(function (user) {
        console.log(user);
        //f (user) result = true;
    })["catch"](function (error) {
        console.log(error);
    });
    return result;
}
exports.checkUserbyEmail = checkUserbyEmail;
function showEvents(id, res) {
    model_1.Event.findAll({ where: { owner: id } }).then(function (item) {
        res.json({
            "Item": item
        });
        console.log("Done");
    })["catch"](function (error) {
        console.log(error);
    });
}
exports.showEvents = showEvents;
