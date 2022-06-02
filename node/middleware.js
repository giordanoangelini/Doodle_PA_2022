require('dotenv').config();
const jwt = require('jsonwebtoken');

module.exports = {

    // Aggiunge nel corpo della richiesta il timestamp 
    requestTime: function (req, res, next) {
        req.requestTime = Date.now();
        next();
    },

    // Controlla che la richiesta HTTP abbia un header
    checkHeader: function (req, res, next){
        const authHeader = req.headers.authorization;
        if (authHeader) {
            next();
        } else {
            let err = new Error("No authorization header");
            next(err);
        }
    },

    // Controlla che nell'header compaia il TOKEN
    checkToken: function(req, res, next){
        const bearerHeader = req.headers.authorization;
        if(typeof bearerHeader !== 'undefined'){
            const bearerToken = bearerHeader.split(' ')[1];
            req.token=bearerToken;
            next();
        }else{
            res.sendStatus(403);
        }
    },

    // Verifica la chiave segreta del TOKEN
    verifyAndAuthenticate: function(req, res, next){
    let decoded = jwt.verify(req.token, process.env.KEY);
    if(decoded !== null)
        req.user = decoded;
        console.log('LOGGED');
        next();
    },

    // Stampa gli errori sulla consol
    logErrors: function(err, req, res, next) {
        console.error(err.stack);
        next(err);
    },

    // Ritorna nella response l'errore sollevato
    errorHandler: function(err, req, res, next) {   
        res.status(500).send({"Error": err.message});
    }

}