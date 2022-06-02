const express = require('express');
const Middleware = require('./middleware');
const Model = require('./model');
const app = express();
  
app.use(Middleware.requestTime);
app.use(Middleware.checkToken);
app.use(Middleware.verifyAndAuthenticate);
app.use(Middleware.logErrors);
app.use(Middleware.errorHandler);

app.get('/', function (req, res) {
    Model.User.findAll().then(console.log);
    console.log(req.user);
});

app.post('/create-event', function (req, res) {
    console.log(req.user);
    try {
        Model.Event.create(req.user).then(() => {
            res.send("Done");
            console.log("Done");
        });
    } catch (error) {
        res.send('Error:', error);
        console.error(error);
    }
})

app.listen(3000);

/*

Modalità 1: 
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0aXRsZSI6IlJpdW5pb25lIGRpIFNUQUZGIiwiZGF0ZXRpbWVzIjpbIjIwMjItMDYtMDEgMjE6MDA6MDAiLCIyMDIyLTA2LTAyIDIxOjAwOjAwIiwiMjAyMi0wNi0wMiAyMjowMDowMCJdLCJnbXQiOiIrMiIsIm1vZGFsaXR5IjoiMSIsImxhdGl0dWRlIjoiIiwibG9uZ2l0dWRlIjoiIiwibGluayI6IiJ9.pZmqLdv3uhAkvZ6HnreM_g-Z-RYpJQhZb5nxq5aZV-k

*/