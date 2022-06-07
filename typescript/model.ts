import { SequelizeSingleton } from "./singleton/sequelize";
import { DataTypes, Sequelize } from 'sequelize';

const sequelize: Sequelize = SequelizeSingleton.getConnection();

export const User = sequelize.define('user', {
    email: {
        type: DataTypes.STRING(30),
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
        type: DataTypes.STRING(5),
        allowNull: false
    },
    token: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, 
{
    modelName: 'user',
    timestamps: false,
    freezeTableName: true
});

export const Event = sequelize.define('event', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    owner: {
        type: DataTypes.INTEGER,
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
        allowNull: false,
        defaultValue: 1
    },
    latitude: {
        type: DataTypes.FLOAT,
        defaultValue: null
    },
    longitude: {
        type: DataTypes.FLOAT,
        defaultValue: null
    },
    link: {
        type: DataTypes.STRING(100),
        defaultValue: null
    }
}, {
    modelName: 'event',
    timestamps: false,
    freezeTableName: true

});

export const Preference = sequelize.define('preference', {
    event_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    datetime: {
        type: DataTypes.STRING(25),
        primaryKey: true
    },
    email: {
        type: DataTypes.STRING(100),
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
    modelName: 'preference',
    timestamps: false,
    freezeTableName: true
});