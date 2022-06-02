require('dotenv').config();
const { Sequelize, Model, DataTypes } = require('sequelize');

const sequelize = (function(){
	var instance;
	return {
		getInstance: function() {
			if (!instance) {
				instance = new Sequelize(process.env.MYSQL_DATABASE, process.env.MYSQL_USER, process.env.MYSQL_PASSWORD, {
                    host: process.env.MYSQL_HOST,
                    port: process.env.MYSQL_PORT,
                    dialect: 'mysql'
                });
			}
			return instance;
		}
	};
})();

exports.sequelize = sequelize;