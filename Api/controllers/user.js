'use strict'

var bcrypt = require('bcrypt-nodejs');
var User = require('../models/user');
const { param } = require('../rutes/user');

function home(req, res) {
    res.status(200).send({
        message: "Hola mundo desde metodo API"
    });
}

function pruebas(req, res) {
    console.log(req.body);
    res.status(200).send({
        message: "Metodo de Prueba"
    });
}

//Registro de usuarios
function saveUser(req, res) {
    var params = req.body;
    var user = new User();

    if (params.name &&
        params.surname &&
        params.nick &&
        params.email &&
        params.password) {

        user.name = params.name;
        user.surname = params.surname;
        user.nick = params.nick;
        user.email = params.email;
        user.role = 'ROLE_USER';
        user.image = null;

        // comprobamos que el usuario no existe
        User.find({
            $or: [
                { email: user.email.toLowerCase() },
                { nick: user.nick.toLowerCase() }
            ]
        }).exec((err, users) => {

            if (err) return resstatus(500).send({ message: "Error en la peticion de usuarios" });

            if (users && users.length >= 1) {
                return res.status(200).send({ message: "El usuario ya existe" });
            } else {

                //ciframos password
                bcrypt.hash(params.password, null, null, (err, hash) => {
                    user.password = hash;

                    user.save((err, userStored) => {
                        if (err) return res.status(500).send({
                            message: "Error al guardar el Usuario"
                        });
                        if (userStored) {
                            return res.status(200).send({ user: userStored });
                        } else {
                            res.status(404).send({ message: " No se ha registrado el Usuario" });
                        }
                    });
                });
            }
        })

    } else {
        res.status(200).send({
            message: "Envia todos los campos necesarios"
        })
    }
}

module.exports = {
    home,
    pruebas,
    saveUser
}

