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
    /*User.findByPk(email).then((user) => {
        console.log(user);
        if (user !== null) result = true;
    }).catch(function(error){
        console.log(error);
    });*/
}

export function showEvents (id: number, res: any): void{
    
    Event.findAll({where: { owner : id }}).then(function(item) {
        res.json({
            "Item" : item 
        });
        console.log("Done");
    }).catch(function(error){
        console.log(error);
    });
    
}
    