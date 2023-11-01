var express = require('express');
var router = express.Router();
var usuariosModel = require('./../../models/usuariosModels');

// GET HOME PAGE
router.get('/', function (req, res, next) {
    res.render('admin/login', {
        layout: 'admin/layout',
    });
});

router.get('/logout', function (req, res, next) {
    res.session.destroy(); 
    res.render('admin/login', {
        layout: 'admin/layout',
    });
});

router.post('/', async (req, res) => {
    try {
        var usuario = req.body.usuario;
        var password = req.body.password;

        var data = await usuariosModel.getUser(usuario, password);

        if (data != undefined) {
            req.session.idUsuario = data.id;
            req.session.nombre = data.usuario;
            res.redirect('/admin/home');
        }
        else {
            res.render('admin/login', {
                layout: 'admin/layout',
                error: true
            });
        }
    }
    catch (error) {
        console.log(error)
    }
});

module.exports = router;