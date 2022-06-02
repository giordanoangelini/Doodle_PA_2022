require('dotenv').config();
const { Sequelize, Model, DataTypes } = require('sequelize');

/*const sequelize = new Sequelize('event_tracker', 'root', 'root', {
    host: 'localhost',
    port: '8889',
    dialect: 'mysql'
});*/

const sequelize = new Sequelize(process.env.MYSQL_DATABASE, process.env.MYSQL_USER, process.env.MYSQL_PASSWORD, {
    host: process.env.MYSQL_HOST,
    port: process.env.MYSQL_PORT,
    dialect: 'mysql'
});

class User extends Model {}
User.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING(30),
        allowNull: false
    },
    surname: {
        type: DataTypes.STRING(30),
        allowNull: false
    },
    role: {
        type: DataTypes.TINYINT,
        allowNull: false
    },
    token: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, 
{
    sequelize,
    modelName: 'user',
    timestamps: false,
    freezeTableName: true
});

class Event extends Model{}
Event.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    owner: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    gmt: {
        type: DataTypes.TINYINT,
        allowNull: false
    },
    modality: {
        type: DataTypes.TINYINT,
        allowNull: false
    },
    datetimes: {
        type: DataTypes.JSON,
        allowNull: false,
    },
    status: {
        type: DataTypes.TINYINT,
        allowNull: false
    },
    latitude: {
        type: DataTypes.FLOAT
    },
    longitude: {
        type: DataTypes.FLOAT
    },
    link: {
        type: DataTypes.STRING
    }
}, {
    sequelize,
    modelName: 'event',
    timestamps: false,
    freezeTableName: true

});

class Preference extends Model {}
Preference.init({
    event_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    datetime: {
        type: DataTypes.STRING,
        primaryKey: true
    },
    email: {
        type: DataTypes.STRING,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING(30),
        allowNull: false
    },
    surname: {
        type: DataTypes.STRING(30),
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'preference',
    timestamps: false,
    freezeTableName: true
});

exports.User = User
exports.Event = Event
exports.Preference = Preference