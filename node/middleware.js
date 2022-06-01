require('dotenv').config();
const jwt = require('jsonwebtoken');

module.exports = {

    requestTime: function (req, res, next) {
        req.requestTime = Date.now();
        next();
    },

    checkHeader: function (req, res, next){
        const authHeader = req.headers.authorization;
        if (authHeader) {
            next();
        } else {
            let err = new Error("Ahi ahi no auth header");
            next(err);
        }
    },

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

    verifyAndAuthenticate: function(req, res, next){
    let decoded = jwt.verify(req.token, process.env.KEY);
    if(decoded !== null)
        req.user = decoded;
        console.log('LOGGED');
        next();
    },

    logErrors: function(err, req, res, next) {
        console.error(err.stack);
        next(err);
    },

    errorHandler: function(err, req, res, next) {   
        res.status(500).send({"Error": err.message});
    }

}