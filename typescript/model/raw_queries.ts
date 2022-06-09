import { Sequelize } from 'sequelize';
import { SequelizeSingleton } from '../singleton/sequelize';

const sequelize: Sequelize = SequelizeSingleton.getConnection();

export async function countOccurences(event_id: number, limit: number): Promise<any>{
    let items: any;
    try {
        items = await sequelize.query(`SELECT datetime, COUNT(*) as occurrences FROM preference WHERE event_id = ${event_id} GROUP BY datetime ORDER BY occurrences DESC LIMIT ${limit}`);
    } catch(error) {
        return {error_flag: 1, result_body: error};
    }
    return {error_flag: 0, result_body: items};
}
