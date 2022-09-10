const express = require('express');
const path = require('path');

const app = express();

app.use(function (req, res, next) {

    // Website to allow to connect
    const allowedOrigins = ['https://evolveacademymalta.com/', 'https://www.evolveacademymalta.com/', 'https://domain.com'];
    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin)) {
         res.setHeader('Access-Control-Allow-Origin', origin);
    }
    // Request methods to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if need the website to include cookies in the requests sent
    // to the API (e.g. in case use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

app.use(express.static('./public'));
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
})

console.log('process.env.PORT::', process.env.PORT);
app.listen(process.env.PORT || 8080);
