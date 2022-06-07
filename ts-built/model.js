"use strict";
exports.__esModule = true;
exports.Preference = exports.Event = exports.User = void 0;
var sequelize_1 = require("./singleton/sequelize");
var sequelize_2 = require("sequelize");
var sequelize = sequelize_1.SequelizeSingleton.getConnection();
exports.User = sequelize.define('user', {
    email: {
        type: sequelize_2.DataTypes.STRING(30),
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: sequelize_2.DataTypes.STRING(30),
        allowNull: false
    },
    surname: {
        type: sequelize_2.DataTypes.STRING(30),
        allowNull: false
    },
    role: {
        type: sequelize_2.DataTypes.TINYINT,
        allowNull: false
    },
    token: {
        type: sequelize_2.DataTypes.INTEGER,
        allowNull: false
    }
}, {
    modelName: 'user',
    timestamps: false,
    freezeTableName: true
});
exports.Event = sequelize.define('event', {
    id: {
        type: sequelize_2.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: sequelize_2.DataTypes.STRING,
        allowNull: false
    },
    owner: {
        type: sequelize_2.DataTypes.INTEGER,
        allowNull: false
    },
    utc: {
        type: sequelize_2.DataTypes.TINYINT,
        allowNull: false
    },
    modality: {
        type: sequelize_2.DataTypes.TINYINT,
        allowNull: false
    },
    datetimes: {
        type: sequelize_2.DataTypes.JSON,
        allowNull: false
    },
    status: {
        type: sequelize_2.DataTypes.TINYINT,
        allowNull: false
    },
    latitude: {
        type: sequelize_2.DataTypes.FLOAT,
        defaultValue: null
    },
    longitude: {
        type: sequelize_2.DataTypes.FLOAT,
        defaultValue: null
    },
    link: {
        type: sequelize_2.DataTypes.STRING,
        defaultValue: null
    }
}, {
    modelName: 'event',
    timestamps: false,
    freezeTableName: true
});
exports.Preference = sequelize.define('preference', {
    event_id: {
        type: sequelize_2.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    datetime: {
        type: sequelize_2.DataTypes.STRING,
        primaryKey: true
    },
    email: {
        type: sequelize_2.DataTypes.STRING,
        primaryKey: true
    },
    name: {
        type: sequelize_2.DataTypes.STRING(30),
        allowNull: false
    },
    surname: {
        type: sequelize_2.DataTypes.STRING(30),
        allowNull: false
    }
}, {
    modelName: 'preference',
    timestamps: false,
    freezeTableName: true
});
