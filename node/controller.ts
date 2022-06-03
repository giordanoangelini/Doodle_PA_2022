import { User, Event, Preference} from './model';

export function createEvent (event): void{
    try {
        Event.create(event).then(() => {
            console.log("Done");
        });
    } catch (error) {
        console.error(error);
    }
}
    