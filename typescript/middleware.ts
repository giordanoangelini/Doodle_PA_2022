require('dotenv').config();
import * as jwt from 'jsonwebtoken';

    // Aggiunge nel corpo della richiesta il timestamp 
    export function requestTime (req: any, res: any, next: any): void{
        req.requestTime = Date.now();
        next();
    }

    // Controlla che la richiesta HTTP abbia un header
    export function checkHeader (req: any, res: any, next: any): void{
        const authHeader: string = req.headers.authorization;
        if (authHeader) {
            next();
        } else {
            let err: Error = new Error("No authorization header");
            next(err);
        }
    }

    // Controlla che nell'header compaia il TOKEN
    export function checkToken (req: any, res: any, next: any): void{
        const bearerHeader: string = req.headers.authorization;
        if(typeof bearerHeader !== 'undefined'){
            const bearerToken: string = bearerHeader.split(' ')[1];
            req.token=bearerToken;
            next();
        }else{
            res.sendStatus(403);
        }
    }

    // Verifica la chiave segreta del TOKEN
    export function verifyAndAuthenticate (req: any, res: any, next: any): void{
    let decoded: string | jwt.JwtPayload  = jwt.verify(req.token, process.env.KEY);
    if(decoded !== null)
        req.user = decoded;
        console.log('LOGGED');
        next();
    }

    // Stampa gli errori sulla consol
    export function logErrors (err: Error, req: any, res: any, next: any): void {
        console.error(err.stack);
        next(err);
    }

    // Ritorna nella response l'errore sollevato
    export function errorHandler (err: Error, req: any, res: any, next: any): void {   
        res.status(500).send({"Error": err.message});
    }