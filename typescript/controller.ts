import { Optional } from 'sequelize/types';
import { User, Event, Preference} from './model';

export function createEvent (event: any, res: any): void{

    console.log(event);
    
    Event.create(event).then(function(item) {
        res.json({
            "Item" : item 
        });
        console.log("Done");
    }).catch(function(error){
        console.log(error);
    });
    
}

export function checkUserbyEmail (email: string): boolean{
    
    var result: boolean = false;
    
    User.findByPk(email).then((user) => {
        console.log(user);
        //f (user) result = true;
    }).catch(function(error){
        console.log(error);
    });
    
    return result;
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
    