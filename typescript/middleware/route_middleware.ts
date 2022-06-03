export function create_event (req: any, res: any, next: any) : void {
    console.log("CreateEvent MW");
    next();
}

export function show_events (req: any, res: any, next: any) : void {
    console.log("ShowEvents MW");
    next();
}