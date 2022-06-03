"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createEvent = void 0;
var model_1 = require("./model");
function createEvent(event) {
    try {
        model_1.Event.create(event).then(function () {
            console.log("Done");
        });
    }
    catch (error) {
        console.error(error);
    }
}
exports.createEvent = createEvent;
