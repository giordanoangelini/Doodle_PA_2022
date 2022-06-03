require('dotenv').config();
import * as jwt from 'jsonwebtoken';

// Controlla che la richiesta HTTP abbia un Authorization Header
export function checkAuthHeader (req: any, res: any, next: any): void{
    if (req.headers.authorization) {
        console.log('checkAuthHeader MW Passed');
        next();
    } else next(new Error("No Authorization Header"));
}

/* Controlla che la richiesta HTTP abbia un Content Header che specifichi 
 * il tipo di contenuto 'application/json' */
export function checkPayloadHeader (req: any, res: any, next: any): void{
    if (req.headers["content-type"] == 'application/json') {
        console.log('checkPayloadHeader MW Passed');    
        next();
    } else next(new Error("No JSON Payload Header"));
}

// Controlla che nell'header compaia il TOKEN
export function checkToken (req: any, res: any, next: any): void{
    const bearerHeader: string = req.headers.authorization;
    if (typeof bearerHeader !== 'undefined'){
        const bearerToken: string = bearerHeader.split(' ')[1];
        req.token = bearerToken;
        console.log('checkToken MW Passed');
        next();
    } else res.send(403);
}

// Verifica la chiave segreta del TOKEN
export function verifyAndAuthenticate (req: any, res: any, next: any): void{
    try {
        const decoded: string | jwt.JwtPayload  = jwt.verify(req.token, process.env.KEY);
        if (decoded != null) {
            req.body = decoded;
            console.log('verifyAndAuthenticate MW Passed');
            next();
        }
    } catch (error) { 
        next(error); 
    }
}

// Controlla che la richiesta HTTP abbia un JSON ben formattato nel body
 export function checkPayload (req: any, res: any, next: any): void{
    try {
        req.body = JSON.parse(JSON.stringify(req.body));
        console.log('checkPayload MW Passed');
        next();
    } catch (error) { 
        next(error)
    }
}

// Stampa gli errori sulla console
export function logErrors (err: Error, req: any, res: any, next: any): void {
    console.error(err.stack);
    next(err);
}

// Ritorna nella response l'errore sollevato
export function errorHandler (err: Error, req: any, res: any, next: any): void {   
    res.status(500).send({"Error": err.message});
}