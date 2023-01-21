//const http = require('http');
const path = require('path');
const express = require('express');
//const fs = require('fs');
const app = express();
//const fsPromises = require('fs').promises;
const PORT = process.env.PORT || 3500;

app.use(express.urlencoded({extended: false}));

app.use(express.json());

app.listen(express.static(path.join(__dirname, '/public')));

app.get('^/$|/index(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.get('/new-page(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'new-page.html'));
});

app.get('/old-page(.html)?', (req, res) => {
    res.redirect(301, '/new-page.html'); //302 by default
});

app.get('/hello(.html)?', (req,res, next) => {
    console.log('attempted to load hello.html');
    next();
}, (req, res) => {
    res.send('Hello World');
});

const one = (req, res, next) =>{
    console.log('one');
    next();
}

const two = (req, res, next) =>{
    console.log('two');
    next();
}
const three = (req, res, next) =>{
    console.log('three');
    res.send('Finished!');
}

app.get('/chain(.html)?', [one,two,three]);

app.get('/*', (req,res) => {
    res.status(404).sendFile(path.join(__dirname, 'views', '404.html')); 
})


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
