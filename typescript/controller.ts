import { Optional } from 'sequelize/types';
import { User, Event, Preference} from './model';

export function createEvent (event: any): void{
    try {
        Event.create(event).then(() => {
            console.log("Done");
        });
    } catch (error) {
        console.error(error);
    }
}
    