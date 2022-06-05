import { Optional } from 'sequelize/types';
import { User, Event, Preference} from './model';

export async function createEvent (event: any, res: any): Promise<boolean>{

    console.log(event);
    
    let result: boolean = false;

    try{
        await Event.create(event);
        result = true;
        console.log("Done: Create Event");
    }catch(error){
        console.log(error);
    };
    
    return result;
}

export function decreaseToken (event: any): void{
    
    let decrease: number;
    switch(event.modality){
        case (1): {
            decrease = 1;
            break;
        }
        case (2): {
            decrease = 2;
            break;
        }
        case (3): {
            decrease = 4;
            break;
        }
        default: decrease = 1; 
    }
    
    User.decrement(['token'], {by: decrease, where: { email: event.owner } });
        console.log("Decrease token: DONE!");
}

export async function checkUserbyEmail (email: string): Promise<boolean>{
    
    const result = await User.findByPk(email);
    if (result) return true;
    else return false;
}

export async function showEvents (email: string): Promise<any>{
    let item: any;
    try{
        item = await Event.findAll({where: { owner : email }});
    }catch (error) {
        console.log(error);
    };
    return item;
}
    