require('dotenv').config();
import * as jwt from 'jsonwebtoken';
import { getError, ErrorEnum } from '../factory/error';

// Controlla che la richiesta HTTP abbia un Authorization Header
export function checkAuthHeader (req: any, res: any, next: any): void{
    if (req.headers.authorization) next();
    else next(ErrorEnum.NoAuthHeader);
}

/* Controlla che la richiesta HTTP abbia un Content Header che specifichi 
 * il tipo di contenuto 'application/json' */
export function checkPayloadHeader (req: any, res: any, next: any): void{
    if (req.headers["content-type"] == 'application/json') next();
    else next(ErrorEnum.NoPayloadHeader);
}

// Controlla che nell'header compaia il TOKEN
export function checkToken (req: any, res: any, next: any): void{
    const bearerHeader: string = req.headers.authorization;
    if (typeof bearerHeader !== 'undefined'){
        const bearerToken: string = bearerHeader.split(' ')[1];
        req.token = bearerToken;
        next();
    } else next(ErrorEnum.Forbidden);
}

// Verifica la chiave segreta del TOKEN
export function verifyAndAuthenticate (req: any, res: any, next: any): void{
    try {
        const decoded: string | jwt.JwtPayload  = jwt.verify(req.token, process.env.KEY);
        if (decoded != null) {
            req.body = decoded;
            next();
        }
    } catch (error) { 
        next(ErrorEnum.Forbidden); 
    }
}

// Controlla che la richiesta HTTP abbia un JSON ben formattato nel body
 export function checkJSONPayload (req: any, res: any, next: any): void{
    try {
        req.body = JSON.parse(JSON.stringify(req.body));
        next();
    } catch (error) { 
        next(ErrorEnum.MalformedPayload)
    }
}

// Stampa gli errori sulla console
export function logErrors (err: ErrorEnum, req: any, res: any, next: any): void {
    const new_err = getError(err).getErrorObj();
    console.log(new_err);
    next(new_err);
}

// Ritorna nella response l'errore sollevato
export function errorHandler (err: any, req: any, res: any, next: any): void { 
    res.status(err.status).send(err.msg);
}