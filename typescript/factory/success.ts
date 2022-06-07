interface  SuccessObj {
    getSuccObj(): { status : number,  msg : string };
}

class EventCreated implements SuccessObj {
    getSuccObj(): { status : number,  msg : string } {
        return {
            status: 201,
            msg: "SUCCESS - Event created succesfully"
        }
    }
}

class ShowEvents implements SuccessObj {
    getSuccObj(): { status : number,  msg : string } {
        return {
            status: 200,
            msg: "SUCCESS - Events displayed succesfully"
        }
    }
}

export enum SuccessEnum {
    // 200
    ShowEvents,
    // 201
    EventCreated
}

export function getSuccess(type: SuccessEnum): SuccessObj{
    let retval: SuccessObj = null;
    switch (type){
        case SuccessEnum.EventCreated:
            retval = new EventCreated();
            break;
        case SuccessEnum.ShowEvents:
            retval = new ShowEvents();  
            break;        
    }
    return retval;
}