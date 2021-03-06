'use strict'

var mongoose = require('mongoose');
var app = require('./app');
var port = 3800;

//conectar a database
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/curso_mean_social', {useNewUrlParser: true, useUnifiedTopology: true})
                      .then(() => {
                          console.log ("La conexion a la base de datos se realizo correctamente");
                          //crear servidor
                          app.listen(port, () => {
                              console.log ("servidor corriendo en http://localhost:3800");
                          });
                      })
                      .catch (err => console.log (err));