require('dotenv').config();
import { Sequelize } from 'sequelize';

export class SequelizeSingleton {
    private static instance: SequelizeSingleton;
	private connection: Sequelize;

    private constructor() {
		SequelizeSingleton.instance.connection = new Sequelize (process.env.MYSQL_DATABASE, process.env.MYSQL_USER, process.env.MYSQL_PASSWORD, {
			host: process.env.MYSQL_HOST,
			port: Number(process.env.MYSQL_PORT),
			dialect: 'mysql'
		});
	}

	public static getConnection(): Sequelize {
        if (!SequelizeSingleton.instance) {
            this.instance = new SequelizeSingleton();
        }
        return SequelizeSingleton.instance.connection;
    }
}