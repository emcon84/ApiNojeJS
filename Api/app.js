'use strict'

var express = require('express');
var bodyParser = require('body-parser');

var app = express();

//cargar rutas
var user_rutes =  require('./rutes/user');

//cargar midlewares
app.use(express.urlencoded({extended:false}));
app.use(express.json());


//cors

//rutas
app.use('/api', user_rutes);

//exportar
module.exports = app;