let PORT = process.env.PORT || 4000;

const express = require('express');
const app = express();
const path = require('path');

const routes = require('./routes/routes'); 


app.use(express.json());
app.use(express.static(path.join(__dirname,'public')));
app.use(routes);


app.listen(PORT, ()=>{
    console.log('Server started at http://localhost:4000');
})