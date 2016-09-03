var config = require('../../config/config');

var mongoose = require('mongoose'),
Item = require('../models/item');

var _ = require('underscore');
var multiparty = require('multiparty');
var sh = require('shorthash');
var fs = require('fs');
var path = require('path');


module.exports = function(app) {

    app.get('/items', function (req, res) {
        Item.find({}, function(err, items) {
            if (err) {
                res.status(406).json({message: 'Could not get items from database'});
            } else {
                res.json(items);
            }
        })
    });

    app.post('/items', function (req, res) {
        var error = function(err) {
            res.status(406).json(err);
        };

        var saveItem = function (item) {
            new Item(item).save(function(err, item) {
                if (err) {
                    error(err);
                } else {
                    res.status(201).json(item);                
                }
            }); 
        };

        if (Object.keys(req.body).length !== 0) { // Not a file upload
            saveItem(req.body);
        } else { // Consider this a file upload with type image
            var form = new multiparty.Form();
            form.parse(req, function(err, fields, files) {
                
                if (!files || !files.file[0]) {
                    return error({message: 'Attempted to add an image item but no files found.'});
                }

                var file = files.file[0];

                var fn = sh.unique('' + new Date().getTime()) + '.png';
                var newPath = path.resolve(__dirname, '../../' + config.uploadDir + '/' + fn);
                fs.rename(file.path, newPath, function (err, data) {
                    if (err) {
                        error(err);
                    }  else {
                        // Get item data
                        for (var field in fields) {
                            fields[field] = fields[field][0];
                        }

                        // Fill in url field with newly uploaded file url
                        fields.url = 'uploads/' + fn;
                        saveItem(fields);
                    }                
                });
            });

        }
   });

    app.delete('/items/:id', function (req, res) {
        Item.findOne({_id: req.params.id}, function(err, item) {
            if (err || !item) {
                res.status(404).send();
            } else {
                item.remove(function() {
                    if (item.type === 'image') {
                        fs.unlink(path.resolve(__dirname, '../../public/' + item.url), function (err) {
                            res.json({message: 'Success'});
                        });
                    } else {
                        res.send({message: 'Success'});
                    }
                });
                
            } 
        });
    });
};