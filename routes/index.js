/** @module routes/index */

exports.slides = require('./slides');
exports.upload = require('./upload');
exports.edit = require('./edit');

exports.index = function(req, res){
    res.render('index', { title: 'Express' });
};