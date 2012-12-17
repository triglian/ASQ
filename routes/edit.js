var schemas = require('../models/models')
  , path = require('path')
  , fs = require('fs');

module.exports.editHTML = function(req, res) {
    if (!req.query.id) res.redirect('/user/' + req.user.name
    + '/?alert=You need to specify the slides id&type=error');
    var Slideshow = db.model('Slideshow', schemas.slideshowSchema);
    Slideshow.findById(req.query.id, function(err, slideshow) {
        if(err) throw err;
        if(!slideshow || slideshow.owner.toString() !== String(req.user._id))
            res.redirect('/user/' + req.user.name
            + '/?alert=This slideshow does not exist or you cannot edit it.&type=error');
        fs.readFile(path.relative(process.cwd(), slideshow.path + 'index.html'), 'utf8',
            function(err, file) {
                if (err) throw err;
                file = String(file);
                console.log(file);
                res.render('edithtml', {username: req.user.name, id:slideshow._id,
                   path: path.relative(app.get('views'), slideshow.path + 'index.html'),
                   file: file});
            });
    });
}