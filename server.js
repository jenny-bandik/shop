// server.js
const express        = require('express');

const mongoose       = require('mongoose');

const app            = express();



app.use(express.static('dist/ang-shop'));


let index = require('./route');


// server.js
const port = 8000;



app.use('/', index);
app.use('/category/:id', index);
app.use('/mailing/', index);





app.listen(port, () => {
	console.log('We are live on ' + port);
});
