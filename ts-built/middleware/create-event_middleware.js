"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cemw = void 0;
function cemw(req, res, next) {
    console.log("CreateEvent MW");
    next();
}
exports.cemw = cemw;
