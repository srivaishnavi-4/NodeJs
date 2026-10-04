var express = require('express');

var app = express();

// Middleware
app.use((req, res, next) => {

    console.log(
        'Request method is',
        req.method,
        'and',
        req.url,
        'url address page is running'
    );

    next();
});

// Home route
app.get('/', (req, res, next) => {

    console.log("First page");

    res.send('This is sample middleware');
});

// Exit route
app.get('/exit', (req, res, next) => {

    console.log("Exit page");

    res.send('This is the exit page');
    next();
});

app.listen(3000, () => {
    console.log('Server running at http://localhost:3000');
});