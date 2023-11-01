var express = require('express');
var router = express.Router();

// GET HOME PAGE
router.get('/', function(req, res) {
    res.render('admin/home', {
        layout: 'admin/layout',
        usuario: req.session.nombre,
    });
});

module.exports = router;
