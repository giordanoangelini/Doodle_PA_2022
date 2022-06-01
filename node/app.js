const express = require('express');
const middleware = require('./middleware');
const app = express();
  
app.use(middleware.requestTime);
app.use(middleware.checkToken);
app.use(middleware.verifyAndAuthenticate);
app.use(middleware.logErrors);
app.use(middleware.errorHandler);

app.post('/', function (req, res) {
    console.log(req.user);
});

app.listen(3000);

//curl -X POST -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJHaXZlbk5hbWUiOiJHaW9yZGFubyIsIlN1cm5hbWUiOiJBbmdlbGluaSJ9.egjPIXxp4Y5QrH_UBKS4342nloyQCd82gy2O6Wc2mVo" localhost:3000/