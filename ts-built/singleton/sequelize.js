"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SequelizeSingleton = void 0;
require('dotenv').config();
var sequelize_1 = require("sequelize");
var SequelizeSingleton = /** @class */ (function () {
    function SequelizeSingleton() {
        this.connection = new sequelize_1.Sequelize(process.env.MYSQL_DATABASE, process.env.MYSQL_USER, process.env.MYSQL_PASSWORD, {
            host: process.env.MYSQL_HOST,
            port: Number(process.env.MYSQL_PORT),
            dialect: 'mysql'
        });
    }
    SequelizeSingleton.getConnection = function () {
        if (!SequelizeSingleton.instance) {
            this.instance = new SequelizeSingleton();
        }
        return SequelizeSingleton.instance.connection;
    };
    return SequelizeSingleton;
}());
exports.SequelizeSingleton = SequelizeSingleton;
