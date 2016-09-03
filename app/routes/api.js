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
        var saveItem = function (item) {
            new Item(item).save(function(err, item) {
                if (err) {
                    res.status(406).json({message: err.message});
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
                var file = files.file[0];
                var fn = sh.unique('' + new Date().getTime());
                var newPath = path.resolve(__dirname, '../../public/uploads/' + fn);
                fs.rename(file.path, newPath, function (err, data) {
                    if (err) {
                        res.status(406).json(err);
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
};