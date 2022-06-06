import { ErrorEnum, getError } from './factory/error';
import { SuccessEnum, getSuccess } from './factory/success';
import { User, Event, Preference} from './model';

let hashDecreaseToken: Map<number, number> = new Map();
hashDecreaseToken.set(1,1); 
hashDecreaseToken.set(2,2); 
hashDecreaseToken.set(3,4); 

// Funzione che controlla se un utente esiste data la sua email
export async function checkUserbyEmail(email: string): Promise<boolean>{
    const result: object= await User.findByPk(email);
    if (result) return true;
    else return false;
}

// Funzione che controlla che un utente abbia la quantità di token sufficienti a creare l'evento 
export async function checkBalance(email: string, modality: number): Promise<boolean>{
    const result: object= await User.findAll({ raw: true, where:{ email: email }});
    if(result[0].token >= hashDecreaseToken.get(modality)) return true;
    return false;
}

// Funzione che crea l'evento e lo inserisc nel database
export function createEvent(event: any, res: any): void{
    Event.create(event).then((item) => {
        User.decrement(['token'], {by: hashDecreaseToken.get(event.modality), where: { email: event.owner } });
        const new_res = getSuccess(SuccessEnum.EventCreated).getSuccObj();
        res.status(new_res.status).json({"Message":new_res.msg,"Item":item});
    }).catch(() => {
        controllerErrors(ErrorEnum.InternalServer, res);
    });
}

export function showEvents(email: string, res: any): void{
    Event.findAll({where: { owner : email }}).then((items) => {
        res.json(items);
    }).catch(() => {
        controllerErrors(ErrorEnum.NotFound, res);
    });
}

function controllerErrors(err: ErrorEnum, res: any) {
    const new_err = getError(err).getErrorObj();
    console.log(new_err);
    res.status(new_err.status).send(new_err.msg);
}
    