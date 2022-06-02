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
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0aXRsZSI6IlJpdW5pb25lIGRpIFNUQUZGIiwib3duZXIiOiIxIiwiZGF0ZXRpbWVzIjpbIjIwMjItMDYtMDEgMjE6MDA6MDAiLCIyMDIyLTA2LTAyIDIxOjAwOjAwIiwiMjAyMi0wNi0wMiAyMjowMDowMCJdLCJnbXQiOiIrMiIsInN0YXR1cyI6MSwibW9kYWxpdHkiOiIxIiwibGF0aXR1ZGUiOjQzLjUyLCJsb25naXR1ZGUiOjEzLjM2LCJsaW5rIjoiaHR0cHM6Ly9tZWV0LmNvbSJ9.tCJIC8Hp7oM6Csgq-0SZey-dJfV1E57duaPEZX2zuLY

*/