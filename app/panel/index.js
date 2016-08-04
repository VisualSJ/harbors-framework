'use strict';

const Path = require('path');

var manager = {};

exports.register = function (pkg, path) {
    var name = pkg.name;
    var url = Path.join(pkg.path, path);
    manager[name] = url;
};

exports.unregister = function () {

};

exports.getUrl = function (name) {
    return manager[name] || '';
};