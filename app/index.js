const express = require('express');
const path = require('path');
const hbs = require('hbs');
const fs = require('fs');
const os = require('os');

const app = express();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));
hbs.registerPartials(path.join(__dirname, 'views/partials'));
hbs.registerHelper('getCurrentYear', () => new Date().getFullYear());
hbs.registerHelper('toUpper', (value) => value.toUpperCase());

app.use((rq, rs, next) => {
    const now = new Date().toString();
    const entry = `${now}: ${rq.method} ${rq.url}`;
    console.log(entry);
    fs.appendFile('server.log', entry + os.EOL, (er) => {
        if (er) {
            console.error('Unable to log request');
        }
    });
    next();
});

app.get('/', (req, res) => {
    res.json('Hello Express 4!');
});

app.use('/static', express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

app.listen(3000, () => {
    console.log(`Running on port 3000 from directory '${__dirname}'`);
});