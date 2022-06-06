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

export enum SuccessEnum {
    // 200
    // 201
    EventCreated
}

export function getSuccess(type: SuccessEnum): SuccessObj{
    let retval: SuccessObj = null;
    switch (type){
        case SuccessEnum.EventCreated:
            retval = new EventCreated();
            break;          
    }
    return retval;
}