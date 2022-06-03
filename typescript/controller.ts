import { Optional } from 'sequelize/types';
import { User, Event, Preference} from './model';

// Validazioni
export function createEvent (event: any, res: any): void{
    
    Event.create(event).then(function(item) {
        res.json({
            "Item" : item 
        });
        console.log("Done");
    }).catch(function(error){
        console.log(error);
    });
    
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
    