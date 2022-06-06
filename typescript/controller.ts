import { Optional } from 'sequelize/types';
import { User, Event, Preference} from './model';

let hashDecreaseToken: Map<number, number> = new Map();
hashDecreaseToken.set(1,1); 
hashDecreaseToken.set(2,2); 
hashDecreaseToken.set(3,4); 

export async function checkUserbyEmail (email: string): Promise<boolean>{
    const result = await User.findByPk(email);
    if (result) return true;
    else return false;
}

export function createEvent (event: any, res: any): void{
    Event.create(event).then((item) => {
        res.json({"Response": "DONE: create event","Event": item})
        User.decrement(['token'], {by: hashDecreaseToken.get(event.modality), where: { email: event.owner } });
    }).catch((error) => {
        console.log(error);
    });
}

export  function showEvents (email: string, res: any): void{
    Event.findAll({where: { owner : email }}).then ((items) => {
        res.json(items);
    }).catch ((error) => {
        console.log(error);
    });
}
    